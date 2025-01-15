from app.models.users import AccountStatus, Users
from app.models.focus_areas import FocusArea
from app.models.goals import Goal
from app.models.health_issues import HealthIssue
from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.helpers.api_helpers import APIHelpers
from app.helpers.api_exception import ApiException
from app.models.user_settings import MetricType, UserSettings, Theme
from app.models.user_info import ActivityLevel, FitnessLevel, Gender, UserInfo
from app.helpers.database import db

bp = Blueprint('user', __name__, url_prefix='/gym/api/user')

@bp.route('/settings', methods=['GET'])
@jwt_required()
def get_user_settings():
    try:
        helper = APIHelpers(request)
        user_id = helper.get_user_id()
        
        settings = UserSettings.query.filter_by(user_id=user_id).first()
        if not settings:
            settings = UserSettings(user_id=user_id)
            db.session.add(settings)
            db.session.commit()

        return jsonify({
            'success': True,
            'data': {
                'theme': settings.theme.value,
                'metric_type': settings.metric_type.value,
                'notification_enabled': settings.notification_enabled
            }
        })
    except Exception as e:
        raise ApiException(str(e))

@bp.route('/settings', methods=['POST'])
@jwt_required()
def update_user_settings():
    try:
        helper = APIHelpers(request)
        user_id = helper.get_user_id()
        
        settings = UserSettings.query.filter_by(user_id=user_id).first()
        if not settings:
            settings = UserSettings(user_id=user_id)
            db.session.add(settings)

        # Handle enum fields
        enum_fields = {
            'theme': Theme,
            'metric_type': MetricType
        }

        for field, enum_class in enum_fields.items():
            if helper.has_parameters(field):
                value = helper.get_parameters(field)
                if value is not None:
                    if value not in [e.value for e in enum_class]:
                        raise ApiException(f"Invalid {field} value. Must be one of: {[e.value for e in enum_class]}")
                    setattr(settings, field, enum_class(value))

        # Handle boolean field
        if helper.has_parameters('notification_enabled'):
            value = helper.get_parameters('notification_enabled')
            settings.notification_enabled = bool(value)

        db.session.commit()

        return jsonify({
            'success': True,
            'data': {
                'theme': settings.theme.value,
                'metric_type': settings.metric_type.value,
                'notification_enabled': settings.notification_enabled
            }
        })
    except Exception as e:
        raise ApiException(str(e))
    
@bp.route('/info', methods=['GET'])
@jwt_required()
def get_user_info():
    try:
        helper = APIHelpers(request)
        user_id = helper.get_user_id()
        info = UserInfo.query.filter_by(user_id=user_id).first()
        
        if not info:
            # Create empty user info
            info = UserInfo(user_id=user_id)
            db.session.add(info)
            db.session.commit()

        return jsonify({
            'success': True,
            'message': '',
            'data': {
                'name': f"{info.first_name or ''} {info.last_name or ''}".strip(),
                'age': info.age,
                'gender': info.gender.value if info.gender else None,
                'height': info.height,
                'weight': info.weight,
                'activity_level': info.activity_level.value if info.activity_level else None,
                'weight_goal': info.weight_goal if info.weight_goal else None,
                'fitness_level': info.fitness_level.value if info.fitness_level else None,
                'weekly_frequency': info.weekly_frequency if info.weekly_frequency else None,
                'goals': [goal.name for goal in info.goals],
                'focus_areas': [area.name for area in info.focus_areas],
                'health_issues': [issue.name for issue in info.health_issues]
            }
        })
    except ApiException as e:
        raise e
    
@bp.route('/info', methods=['POST'])
@jwt_required()
def update_user_info():
    try:
        helper = APIHelpers(request)
        user_id = helper.get_user_id()
        
        info = UserInfo.query.filter_by(user_id=user_id).first()
        if not info:
            info = UserInfo(user_id=user_id)
            db.session.add(info)

        # Handle name field specially
        if helper.has_parameters("name"):
            name_parts = helper.get_parameters("name").strip().split()
            if name_parts:
                info.first_name = name_parts[0]
                info.last_name = ' '.join(name_parts[1:]) if len(name_parts) > 1 else None

        fields = [
            "age",
            "gender",
            "height",
            "weight",
            "weight_goal",
            "fitness_level",
            "weekly_frequency",
        ]

        for field in fields:
            if helper.has_parameters(field):
                value = helper.get_parameters(field)
                if value is not None:  # Skip null values
                    setattr(info, field, value)

        # Handle enum fields with validation
        enum_fields = {
            'activity_level': ActivityLevel,
            'fitness_level': FitnessLevel,
            'gender': Gender
        }

        for field, enum_class in enum_fields.items():
            if helper.has_parameters(field):
                value = helper.get_parameters(field)
                if value is not None:
                    if value not in [e.value for e in enum_class]:
                        raise ApiException(f"Invalid {field} value")
                    setattr(info, field, enum_class(value))

        # Handle array fields
        array_fields = ['focus_areas', 'goals', 'health_issues']
        for field in array_fields:
            if helper.has_parameters(field):
                values = helper.get_parameters(field)
                if values is not None:
                    # Handle string input
                    if isinstance(values, str):
                        # Remove brackets if present
                        values = values.strip('[]')
                        # Split by comma and clean
                        values = [v.strip().strip('"\'') for v in values.split(',')]
                    
                    if not isinstance(values, list):
                        raise ApiException(f"{field} must be an array or comma-separated string")
                    
                    # Get related model class
                    model_class = {
                        'focus_areas': FocusArea,
                        'goals': Goal,
                        'health_issues': HealthIssue
                    }[field]
                    
                    # Get items by name (case insensitive)
                    items = []
                    for value in values:
                        item = model_class.query.filter(
                            db.func.lower(model_class.name) == db.func.lower(value)
                        ).first()
                        if item:
                            items.append(item)
                    
                    # Set relationship
                    setattr(info, field, items)


        db.session.commit()

        return jsonify({
            'success': True,
            'message': '',
            'data': {
                'name': f"{info.first_name or ''} {info.last_name or ''}".strip(),
                'age': info.age,
                'gender': info.gender.value if info.gender else None,
                'height': info.height,
                'weight': info.weight,
                'activity_level': info.activity_level.value if info.activity_level else None,
                'weight_goal': info.weight_goal if info.weight_goal else None,
                'fitness_level': info.fitness_level.value if info.fitness_level else None,
                'weekly_frequency': info.weekly_frequency if info.weekly_frequency else None,
                'goals': [goal.name for goal in info.goals],
                'focus_areas': [area.name for area in info.focus_areas],
                'health_issues': [issue.name for issue in info.health_issues]
            }
        })
    except ApiException as e:
        raise e
    
@bp.route('/complete-onboarding', methods=['POST'])
@jwt_required()
def complete_onboarding():
    try:
        helper = APIHelpers(request)
        user_id = helper.get_user_id()
        
        # Get user and info
        user = Users.query.get(user_id)
        info = UserInfo.query.filter_by(user_id=user_id).first()
        
        if not info:
            raise ApiException("User info not found")

        # Required fields
        required_fields = {
            'name': bool(info.first_name),
            'age': bool(info.age),
            'gender': bool(info.gender),
            'height': bool(info.height),
            'weight': bool(info.weight),
            'activity_level': bool(info.activity_level),
            'fitness_level': bool(info.fitness_level),
            'weekly_frequency': bool(info.weekly_frequency),
            'goals': bool(info.goals),
            'focus_areas': bool(info.focus_areas)
        }

        # Check for missing fields
        missing_fields = [field for field, is_present in required_fields.items() if not is_present]
        
        if missing_fields:
            message = f"Please complete the following fields: {', '.join(missing_fields)}"
            return jsonify({
                'success': False,
                'message': message
            })


        # Update account status
        user.account_status = AccountStatus.ACTIVE
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Onboarding completed',
            'data': {
                'name': f"{info.first_name or ''} {info.last_name or ''}".strip(),
                'age': info.age,
                'gender': info.gender.value,
                'height': info.height,
                'weight': info.weight,
                'activity_level': info.activity_level.value,
                'weight_goal': info.weight_goal,
                'fitness_level': info.fitness_level.value,
                'weekly_frequency': info.weekly_frequency,
                'goals': [{'id': goal.id, 'name': goal.name} for goal in info.goals],
                'focus_areas': [{'id': area.id, 'name': area.name} for area in info.focus_areas],
                'health_issues': [{'id': issue.id, 'name': issue.name} for issue in info.health_issues],
                'account_status': user.account_status.value
            }
        })
    except ApiException as e:
        raise e
    

@bp.route('/options', methods=['GET'])
@jwt_required()
def get_options():
    try:
        return jsonify({
            'success': True,
            'message': '',
            'data': {
                'focus_areas': [{'id': area.id, 'name': area.name} for area in FocusArea.query.all()],
                'goals': [{'id': goal.id, 'name': goal.name} for goal in Goal.query.all()],
                'health_issues': [{'id': issue.id, 'name': issue.name} for issue in HealthIssue.query.all()],
                'activity_levels': [{'id': level.value, 'name': level.name} for level in ActivityLevel],
                'fitness_levels': [{'id': level.value, 'name': level.name} for level in FitnessLevel],
                'genders': [{'id': gender.value, 'name': gender.name} for gender in Gender],
            }
        })
    except Exception as e:
        raise e
