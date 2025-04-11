from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Use the same SQLAlchemy instance as in advocates.py
from .advocates import db  

class Case(db.Model):
    __tablename__ = 'cases'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    case_number = db.Column(db.String(50), unique=True)
    case_type = db.Column(db.String(50))
    status = db.Column(db.String(50))
    filing_date = db.Column(db.Date)
    hearing_date = db.Column(db.Date)
    description = db.Column(db.Text)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Remove backref since it's already defined in Advocate
    advocates = db.relationship(
        'Advocate',
        secondary='advocate_case_association',  # Reference as string
        back_populates='cases',
        lazy='dynamic'  # Optional: Remove if you don't need dynamic loading
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'case_number': self.case_number,
            'case_type': self.case_type,
            'status': self.status,
            'filing_date': self.filing_date.isoformat() if self.filing_date else None,
            'hearing_date': self.hearing_date.isoformat() if self.hearing_date else None,
            'description': self.description,
            'client_id': self.client_id,
            'advocates': [advocate.to_dict() for advocate in self.advocates.all()],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<Case {self.case_number}: {self.title}>'