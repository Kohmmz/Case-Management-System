from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = #???
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)

    def set_password(self, password):
        # Hash the password using bcrypt"
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        # HAsh the password using bcrypt and compare it with the stored hash
        return bcrypt.check_password_hash(self.password_hash, password)

    serialize_only = ('id', 'username', 'email')  
