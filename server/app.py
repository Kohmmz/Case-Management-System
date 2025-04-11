from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os
from Models import db

load_dotenv()  

migrate = Migrate()
cors = CORS()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        'DATABASE_URL', 'sqlite:///casemanagement.db'
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv('SECRET_KEY', 'dev_key')

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    from Routes.advocates import advocates_bp
    from Routes.cases import cases_bp
    from Routes.auth import auth_bp
    from Routes.resources import resources_bp
    from Routes.clients import clients_bp
    from Routes.documents import documents_bp

    app.register_blueprint(advocates_bp, url_prefix='/adv')
    app.register_blueprint(cases_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(resources_bp, url_prefix='/resources')
    app.register_blueprint(clients_bp, url_prefix='/clients')
    app.register_blueprint(documents_bp, url_prefix='/docs')

    @app.route("/")
    def home():
        return {"message": "Welcome to the Case Management System!"}

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()  
    app.run(debug=True)
