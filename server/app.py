from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

def create_app():
    app = Flask(__name__)
    
    # Database configuration with environment variables


    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:postgres@localhost/casemanagement'
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv('SECRET_KEY', 'dev_key')
    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', 'jwt_dev_key')
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)
    
    # Register blueprints
    from Routes.advocates import advocates_bp
    from Routes.cases import cases_bp
    from Routes.auth import auth_bp
    from Routes.resources import resources_bp
    from Routes.clients import clients_bp
    
    app.register_blueprint(advocates_bp, url_prefix='/adv')
    app.register_blueprint(cases_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(resources_bp, url_prefix='/resources')
    app.register_blueprint(clients_bp, url_prefix='/api')
    
    # Home route
    @app.route("/")
    def home():
        return {"message": "Welcome to the Case Management System!"}
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)