from app.helpers.user_helper import UserHelper
from app.models.user_settings import MetricType, Theme
from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import create_access_token, set_access_cookies
from werkzeug.security import check_password_hash
from app.models.users import Users
from app.helpers.database import db
from app.helpers.api_helpers import APIHelpers
from app.helpers.api_exception import ApiException
from datetime import timedelta

bp = Blueprint('auth', __name__)

@bp.route('/auth/login', methods=['POST'])
def post_login():
    try:
        helper = APIHelpers(request)

        helper.validate_required_parameters(['email', 'password'])

        email = helper.get_parameters('email')
        password = helper.get_parameters('password')

        user = Users.query.filter_by(email=email).first()

        if user is None or not check_password_hash(user.password_hash, password):
            raise ApiException("Invalid email or password")

        user_info = {
            "id": user.id,
            "first_name": user.user_info.first_name if user.user_info else None,
            "last_name": user.user_info.last_name if user.user_info else None,
            "email": user.email,
            "account_status": user.account_status.value,
            "settings": {
                "theme": user.user_settings.theme.value if user.user_settings else Theme.DARK.value,
                "metric_type": user.user_settings.metric_type.value if user.user_settings else MetricType.METRIC.value,
                "notification_enabled": user.user_settings.notification_enabled if user.user_settings else True
            }
        }

        # Create a long-lived access token (e.g., 30 days)
        access_token = create_access_token(identity=user_info, expires_delta=timedelta(days=30))

        # Include the JWT token in the user_info
        user_info["jwt"] = access_token

        response = make_response(jsonify({
            'success': True,
            'message': '',
            'data': user_info
        }))
        
        set_access_cookies(response, access_token)
        return response
    except ApiException as e:
        raise e

@bp.route('/auth/signup', methods=['POST'])
def post_signup():
    try:
        helper = APIHelpers(request)
        helper.validate_required_parameters(['email', 'password'])

        email = helper.get_parameters('email')
        password = helper.get_parameters('password')

        # Check if user exists
        if Users.query.filter_by(email=email).first():
            raise ApiException("A account with this email already exists")

        # Create user and related records
        user = UserHelper.create_user(
            email=email,
            password=password,
        )

        # Create response data
        user_info = {
            "id": user.id,
            "email": user.email,
            "account_status": user.account_status.value
        }

        # Generate JWT token
        access_token = create_access_token(
            identity=user_info, 
            expires_delta=timedelta(days=30)
        )
        user_info["jwt"] = access_token

        return jsonify({
            'success': True,
            'message': 'User created successfully',
        })
    
    except ApiException as e:
        raise e

@bp.route('/auth/apple', methods=['POST'])
def apple_login():
    try:
        token = request.json.get('token')
        if not token:
            raise ApiException("Token is required")

        user_info = oauth.apple.parse_id_token(token)
        email = user_info.get('email')
        first_name = user_info.get('name', {}).get('firstName', '')
        last_name = user_info.get('name', {}).get('lastName', '')

        user = Users.query.filter_by(email=email).first()
        if not user:
            user = Users(firstName=first_name, lastName=last_name, email=email, password_hash='')
            db.session.add(user)
            db.session.commit()

        access_token = create_access_token(identity={'id': user.id, 'email': user.email}, expires_delta=timedelta(days=30))
        response = make_response(jsonify({
            'success': True,
            'message': '',
            'data': {'access_token': access_token}
        }))
        
        set_access_cookies(response, access_token)
        return response

    except ApiException as e:
        raise e