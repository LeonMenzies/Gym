from app.helpers.database import db
from enum import Enum

class ActivityLevel(str, Enum):
    SEDENTARY = 'SEDENTARY'
    LIGHT = 'LIGHT'
    MODERATE = 'MODERATE'
    VERY_ACTIVE = 'VERY_ACTIVE'

class FitnessLevel(str, Enum):
    BEGINNER = 'BEGINNER'
    INTERMEDIATE = 'INTERMEDIATE'
    ADVANCED = 'ADVANCED'

class Gender(str, Enum):
    MALE = 'MALE'
    FEMALE = 'FEMALE'
    OTHER = 'OTHER'

class WeightGoal(str, Enum):
    LOSE = 'LOSE'
    MAINTAIN = 'MAINTAIN'
    GAIN = 'GAIN'

user_info_focus_areas = db.Table('user_info_focus_areas',
    db.Column('user_info_id', db.Integer, db.ForeignKey('user_info.id'), primary_key=True),
    db.Column('focus_area_id', db.Integer, db.ForeignKey('focus_areas.id'), primary_key=True)
)

user_info_goals = db.Table('user_info_goals',
    db.Column('user_info_id', db.Integer, db.ForeignKey('user_info.id'), primary_key=True),
    db.Column('goal_id', db.Integer, db.ForeignKey('goals.id'), primary_key=True)
)

class FocusArea(db.Model):
    __tablename__ = 'focus_areas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

class Goal(db.Model):
    __tablename__ = 'goals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

class UserInfo(db.Model):
    __tablename__ = 'user_info'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    
    # Personal Info
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.Enum(Gender), nullable=True)
    
    # Physical Stats
    height = db.Column(db.Float, nullable=True)  # in cm
    weight = db.Column(db.Float, nullable=True)  # in kg
    
    # Fitness Profile
    activity_level = db.Column(db.Enum(ActivityLevel), nullable=True)
    fitness_level = db.Column(db.Enum(FitnessLevel), nullable=True)
    weight_goal = db.Column(db.Enum(WeightGoal), nullable=True)
    
    # Relationships
    focus_areas = db.relationship('FocusArea', secondary=user_info_focus_areas, lazy='subquery')
    goals = db.relationship('Goal', secondary=user_info_goals, lazy='subquery')

    def __repr__(self):
        return f'<UserInfo {self.first_name} {self.last_name}>'