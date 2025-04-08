from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

# Import models after db initialization
from Models.advocates import Advocate, advocate_case_association
from Models.cases import Case
from Models.clients import Client
from Models.documents import Document

def create_app():
    app = Flask(__name__)
    
    # Configurations from environment variables
    from config import Config
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # Register blueprints
    from Routes.advocates import advocates_bp
    from Routes.clients import clients_bp
    from Routes.auth import auth_bp
    from Routes.cases import cases_bp

    app.register_blueprint(advocates_bp, url_prefix='/api/advocates')
    app.register_blueprint(clients_bp, url_prefix='/api/clients')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(cases_bp, url_prefix='/api/cases')

    return app
