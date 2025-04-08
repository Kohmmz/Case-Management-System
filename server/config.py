import os

class Config:
    # Retrieve values from environment variables
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://8Law:8Law@2650@localhost/flask_app_db'  # Local fallback
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
