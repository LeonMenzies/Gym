from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.helpers.api_helpers import APIHelpers
from app.helpers.api_exception import ApiException
from app.models.user_settings import UserSettings, Theme
from app.models.user_info import ActivityLevel, FitnessLevel, FocusArea, Gender, Goal, HealthIssue, UserInfo
from app.helpers.database import db

bp = Blueprint('user', __name__, url_prefix='/api/user')

@bp.route('/settings', methods=['POST'])
@jwt_required()
def update_user_settings():
    try:
        helper = APIHelpers(request)
        user_id = get_jwt_identity()['id']
        
        settings = UserSettings.query.filter_by(user_id=user_id).first()
        if not settings:
            settings = UserSettings(user_id=user_id)
            db.session.add(settings)

        if helper.has_parameters('notification_enabled'):
            settings.notification_enabled = helper.get_parameters('notification_enabled')
        
        if helper.has_parameters('theme'):
            theme = helper.get_parameters('theme')
            if theme not in [t.value for t in Theme]:
                raise ApiException("Invalid theme value")
            settings.theme = Theme(theme)

        db.session.commit()

        return jsonify({
            'success': True,
            'message': '',
            'data': {
                'notification_enabled': settings.notification_enabled,
                'theme': settings.theme.value
            }
        })
    except ApiException as e:
        raise e

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
                'goals': [{'id': goal.id, 'name': goal.name} for goal in info.goals],
                'focus_areas': [{'id': area.id, 'name': area.name} for area in info.focus_areas],
                'health_issues': [{'id': health_issue.id, 'name': health_issue.name} for health_issue in info.health_issues]
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

        fields = [
            "name",
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
                if values is not None:  # Fix: changed 'value' to 'values'
                    if not isinstance(values, list):
                        raise ApiException(f"{field} must be an array")
                    
                    # Get related model class
                    model_class = {
                        'focus_areas': FocusArea,
                        'goals': Goal,
                        'health_issues': HealthIssue
                    }[field]
                    
                    # Get or create items
                    items = []
                    for item_id in values:
                        item = model_class.query.get(item_id)
                        if item:
                            items.append(item)
                    
                    # Set relationship
                    setattr(info, field, items)


        db.session.commit()

        return jsonify({
            'success': True,
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
                'goals': [{'id': goal.id, 'name': goal.name} for goal in info.goals],
                'focus_areas': [{'id': area.id, 'name': area.name} for area in info.focus_areas],
                'health_issues': [{'id': health_issue.id, 'name': health_issue.name} for health_issue in info.health_issues]
            }
        })
    except ApiException as e:
        raise e