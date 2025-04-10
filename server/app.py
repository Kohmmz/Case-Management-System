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

# app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
#         'DATABASE_URL',
#         'postgresql://8Law:8Law@2650@localhost/flask_app_db'  # Local fallback
#     )

# Initialize extensions
db = SQLAlchemy()  # Database
migrate = Migrate(app, db)  # Database migrations
jwt = JWTManager(app)  # JWT for authentication

db.init_app(app)

# Import and register blueprints
from Routes.advocates import advocates_bp  # Blueprint for advocate routes
app.register_blueprint(advocates_bp, url_prefix='/adv')
from Routes.cases import cases_bp  # Blueprint for case routes
app.register_blueprint(cases_bp, url_prefix='/api')  # Blueprint for case routes
from Routes.auth import auth_bp  # Blueprint for authentication routes
app.register_blueprint(auth_bp, url_prefix='/auth')  # Blueprint for authentication routes
from Routes.resources import resources  # Blueprint for resource routes
app.register_blueprint(resources, url_prefix='/resources')  # Blueprint for resource routes
from Routes.clients import clients_bp  # Blueprint for client routes
app.register_blueprint(clients_bp, url_prefix='/api')  # Blueprint for client routes

# Home route for testing
@app.route("/")
def home():
    return {"message": "Welcome to the Case Management System!"}

if __name__ == "__main__":
    app.run(debug=True)  # Set debug to False in productio