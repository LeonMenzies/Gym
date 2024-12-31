from app.helpers.database import db

class Goal(db.Model):
    __tablename__ = 'goals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)


# INSERT INTO goals (id, name) VALUES 
# (1, 'Build Muscle'),
# (2, 'Lose Fat'),
# (3, 'Improve Strength'),
# (4, 'Increase Endurance'),
# (5, 'Improve Flexibility'),
# (6, 'Better Health'),
# (7, 'Sports Performance');