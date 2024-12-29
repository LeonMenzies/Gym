from app.models.users import Users, AccountStatus
from app.models.user_settings import UserSettings, Theme, MetricType
from app.models.user_info import UserInfo
from app.helpers.database import db
from werkzeug.security import generate_password_hash
from typing import Optional

class UserHelper:
    @staticmethod
    def create_user(
        email: str, 
        password: str, 
    ) -> Users:
        """Creates a new user with default settings and info records"""
        try:
            # Create user
            new_user = Users(
                email=email,
                password_hash=generate_password_hash(password),
                account_status=AccountStatus.ONBOARDING
            )
            db.session.add(new_user)
            db.session.flush()  # Get user ID without committing

            # Create default settings
            default_settings = UserSettings(
                user_id=new_user.id,
                theme=Theme.LIGHT,
                metric_type=MetricType.METRIC,
                notification_enabled=True
            )
            db.session.add(default_settings)

            # Create empty user info
            user_info = UserInfo(
                user_id=new_user.id,
            )
            db.session.add(user_info)

            db.session.commit()
            return new_user

        except Exception as e:
            db.session.rollback()
            raise e