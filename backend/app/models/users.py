from app.helpers.database import db
from enum import Enum

class AccountStatus(Enum):
    ACTIVE = 'ACTIVE'
    DEACTIVATED = 'DEACTIVATED'
    ONBOARDING = 'ONBOARDING'

    def __str__(self):
        return self.value
    
    def __json__(self):
        return self.value

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    account_status = db.Column(db.Enum(AccountStatus), nullable=False, default=AccountStatus.ONBOARDING)
    
    user_info = db.relationship('UserInfo', backref='user', uselist=False, lazy=True)
    user_settings = db.relationship('UserSettings', backref='user', uselist=False, lazy=True)

    def __repr__(self):
        return '<User %r>' % self.email