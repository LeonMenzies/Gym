from .auth_controller import bp as auth_bp
from .helper_controller import bp as helper_bp
from .user_controller import bp as user_bp

def register_controllers(app):
   for blueprint in [auth_bp, helper_bp, user_bp]:
        app.register_blueprint(blueprint, url_prefix='/gym/api')