from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies
from werkzeug.security import check_password_hash
from app.models.users import Users
from app.helpers.database import db
from app.helpers.api_helpers import APIHelpers
from werkzeug.security import generate_password_hash
from app.helpers.api_exception import ApiException
from datetime import timedelta

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/login', methods=['POST'])
def post_login():
    try:
        helper = APIHelpers(request)

        helper.validate_required_parameters(['email', 'password'])

        email = helper.get_parameters('email')
        password = helper.get_parameters('password')

        user = Users.query.filter_by(email=email).first()

        if user is None or not check_password_hash(user.passwordHash, password):
            raise ApiException("Invalid email or password")

        user_info = {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "accountStatus": user.accountStatus.value,
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

@bp.route('/signup', methods=['POST'])
def post_signup():
    try:
        helper = APIHelpers(request)

        helper.validate_required_parameters(['firstName', 'lastName', 'email', 'password'])

        first_name = helper.get_parameters('firstName')
        last_name = helper.get_parameters('lastName')
        email = helper.get_parameters('email')
        password = helper.get_parameters('password')

        # Check if a user with this email already exists
        existing_user = Users.query.filter_by(email=email).first()
        if existing_user is not None:
            raise ApiException("A user with this email already exists")


        # Hash the password
        password_hash = generate_password_hash(password)

        # Create a new user
        new_user = Users(
            firstName=first_name,
            lastName=last_name,
            email=email,
            passwordHash=password_hash,
            accountStatus='onboarding'
        )

        db.session.add(new_user)
        db.session.commit()

        return helper.success_response()
    except ApiException as e:
        raise e

@bp.route('/apple', methods=['POST'])
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
            user = Users(firstName=first_name, lastName=last_name, email=email, passwordHash='')
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