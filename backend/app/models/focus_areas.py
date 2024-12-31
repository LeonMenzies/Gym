from app.helpers.database import db

class FocusArea(db.Model):
    __tablename__ = 'focus_areas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)


# INSERT INTO focus_areas (id, name) VALUES 
# (1, 'Chest'),
# (2, 'Back'),
# (3, 'Arms'),
# (4, 'Shoulders'),
# (5, 'Legs'),
# (6, 'Core');