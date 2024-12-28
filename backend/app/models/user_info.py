from app.helpers.database import db

class UserInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    notification_enabled = db.Column(db.Boolean, default=True)
    theme = db.Column(db.String(20), default='light')
    
    def __repr__(self):
        return '<UserInfo for user_id: %r>' % self.user_id