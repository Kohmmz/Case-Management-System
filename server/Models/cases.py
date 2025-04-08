from Models import db

class Case(db.Model):
    __tablename__ = 'cases'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)  # Add attributes as needed
