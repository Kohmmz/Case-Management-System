from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy.orm import relationship

db = SQLAlchemy()

advocate_case_association = db.Table('advocate_case_association',
    db.Column('advocate_id', db.Integer, db.ForeignKey('advocates.id')),
    db.Column('case_id', db.Integer, db.ForeignKey('cases.id')),
    db.Column('assigned_date', db.DateTime, default=datetime.utcnow),
    db.Column('primary_advocate', db.Boolean, default=False)
)

class Advocate(db.Model):
    __tablename__ = 'advocates'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(50), default='advocate')
    specialization = db.Column(db.String(100))
    bar_number = db.Column(db.String(50), unique=True)
    years_of_experience = db.Column(db.Integer)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cases = db.relationship('Case', secondary=advocate_case_association, backref=db.backref('advocates', lazy='dynamic'))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'role': self.role,
            'specialization': self.specialization,
            'bar_number': self.bar_number,
            'years_of_experience': self.years_of_experience,
            'active': self.active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<Advocate {self.username} ({self.first_name} {self.last_name})>'
