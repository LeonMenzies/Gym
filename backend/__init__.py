import os
import logging
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .helpers.database import db
from dotenv import load_dotenv
from .cron.scheduler import create_scheduler
from .helpers.apple_oauth import create_oauth
from .handlers.error_handlers import register_error_handlers

migrate = Migrate()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    
    # Configure logging
    logging.basicConfig(
        filename='app.log',
        level=logging.ERROR,
        format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s'
    )

    # Configure app
    app.config.update(
        JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY'),
        SQLALCHEMY_DATABASE_URI=os.getenv('SQLALCHEMY_DATABASE_URI'),
        JWT_TOKEN_LOCATION=['cookies'],
        JWT_COOKIE_CSRF_PROTECT=False,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        JWT_COOKIE_MAX_AGE=604800
    )

    # Initialize extensions
    CORS(app, supports_credentials=True)
    db.init_app(app)
    jwt = JWTManager(app)
    migrate.init_app(app, db)

    with app.app_context():
        scheduler = create_scheduler(app, db)
        db.create_all()

    # Register blueprints and handlers
    from .controllers import register_controllers
    register_controllers(app)
    register_error_handlers(app)
    
    # Initialize OAuth
    oauth = create_oauth(app)

    return app