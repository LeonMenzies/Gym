from app.helpers.database import db

class HealthIssue(db.Model):
    __tablename__ = 'health_issues'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)


# INSERT INTO health_issues (id, name) VALUES 
# (1, 'Back Pain'),
# (2, 'Joint Issues'),
# (3, 'Heart Condition'),
# (4, 'High Blood Pressure'),
# (5, 'Asthma'),
# (6, 'Diabetes'),
# (7, 'No Health Issues');