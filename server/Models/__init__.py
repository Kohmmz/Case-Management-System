from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configurations
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://<user>:<password>@<host>:<port>/<database>'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)  # Enable cross-origin requests
    from Models.advocates import Advocate
    from Models.cases import Case  # Placeholder for cases
    from Models.clients import Client

    # Register blueprints
    from Routes.advocates import advocates_bp
    from Routes.clients import clients_bp
    from Routes.auth import auth_bp

    app.register_blueprint(advocates_bp, url_prefix='/api/advocates')
    app.register_blueprint(clients_bp, url_prefix='/api/clients')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app
