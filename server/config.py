import os

class Config:
    # Retrieve values from environment variables
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///casemanagement.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
