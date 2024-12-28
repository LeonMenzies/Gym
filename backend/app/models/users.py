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
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    passwordHash = db.Column(db.String(255), nullable=False)
    accountStatus = db.Column(db.Enum(AccountStatus), nullable=False, default=AccountStatus.ONBOARDING)
    
    # Relationship to UserSettings
    settings = db.relationship('UserSettings', backref='user', uselist=False)

    def __repr__(self):
        return '<User %r>' % self.email