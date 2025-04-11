from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()

class Document(db.Model):
    __tablename__ = 'documents'
    
    id = db.Column(db.Integer, primary_key=True)
    case_id = db.Column(db.Integer, db.ForeignKey('cases.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    document_type = db.Column(db.String(100), nullable=False) 
    file_path = db.Column(db.String(255), nullable=False)
    original_filename = db.Column(db.String(255), nullable=False)
    file_size = db.Column(db.Integer) 
    mime_type = db.Column(db.String(100))
    description = db.Column(db.Text)
    filing_date = db.Column(db.DateTime)
    is_confidential = db.Column(db.Boolean, default=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('advocates.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    

    case = db.relationship('Case', backref=db.backref('documents', lazy='dynamic'))
    uploader = db.relationship('Advocate', backref=db.backref('uploaded_documents', lazy='dynamic'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'case_id': self.case_id,
            'title': self.title,
            'document_type': self.document_type,
            'original_filename': self.original_filename,
            'file_size': self.file_size,
            'mime_type': self.mime_type,
            'description': self.description,
            'filing_date': self.filing_date.isoformat() if self.filing_date else None,
            'is_confidential': self.is_confidential,
            'uploaded_by': self.uploaded_by,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Document {self.title} (Case ID: {self.case_id})>'