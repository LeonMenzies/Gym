from .auth_controller import bp as auth_bp
from .helper_controller import bp as helper_bp

def register_controllers(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(helper_bp)