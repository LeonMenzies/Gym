from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.helpers.api_helpers import APIHelpers
from app.helpers.api_exception import ApiException
from app.models.user_settings import UserSettings, Theme
from app.models.user_info import ActivityLevel, FitnessLevel, Gender, UserInfo, WeightGoal
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
                'id': info.id,
                'user_id': info.user_id,
                'age': info.age,
                'gender': info.gender.value if info.gender else None,
                'height': info.height,
                'weight': info.weight,
                'activity_level': info.activity_level.value if info.activity_level else None,
                'fitness_level': info.fitness_level.value if info.fitness_level else None,
                'weight_goal': info.weight_goal.value if info.weight_goal else None,
                'focus_areas': [{'id': area.id, 'name': area.name} for area in info.focus_areas],
                'goals': [{'id': goal.id, 'name': goal.name} for goal in info.goals]
            }
        })
    except ApiException as e:
        raise e