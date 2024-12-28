from app.helpers.database import db
from enum import Enum

class Theme(Enum):
    LIGHT = 'LIGHT'
    DARK = 'DARK'

class MetricType(str, Enum):
    METRIC = 'METRIC'
    IMPERIAL = 'IMPERIAL'

class UserSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    notification_enabled = db.Column(db.Boolean, default=True)
    theme = db.Column(db.Enum(Theme), nullable=False, default=Theme.LIGHT)
    metric_type = db.Column(db.Enum(MetricType), nullable=False, default=MetricType.METRIC)

    def __repr__(self):
        return '<UserSettings for user_id: %r>' % self.user_id