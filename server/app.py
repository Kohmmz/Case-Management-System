from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from dotenv import load_dotenv
import os

# Load environment variables from .env file (only for local development)
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db = SQLAlchemy(app)  # Database
migrate = Migrate(app, db)  # Database migrations
jwt = JWTManager(app)  # JWT for authentication

# Import and register blueprints
from Routes.advocates import advocates_bp  # Blueprint for advocate routes
app.register_blueprint(advocates_bp, url_prefix='/advocates')

# Home route for testing
@app.route("/")
def home():
    return {"message": "Welcome to the Case Management System!"}

if __name__ == "__main__":
    app.run(debug=True)  # Set debug to False in production
