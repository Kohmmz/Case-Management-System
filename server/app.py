from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from Models import db

load_dotenv()

migrate = Migrate()
cors = CORS()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, static_folder="../client/dist", static_url_path="/")

    # Configure the Flask app
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        'DATABASE_URL', 'sqlite:///casemanagement.db'
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv('SECRET_KEY', 'dev_key')
    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY', app.config["SECRET_KEY"])
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 86400))  # 24 hours

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={r"/*": {"origins": "*"}}) #Set CORS to accept requests from any origin
    jwt.init_app(app)

    # Register blueprints
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
    # Serve React app for undefined routes
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react_app(path):
        # Serve the React app for all routes except API routes
        if path != "" and not path.startswith(("auth", "api", "clients", "adv", "docs", "resources")):
            return send_from_directory(app.static_folder, "index.html")
        return "Not Found", 404

    # Example API route
    @app.route("/api/example", methods=["GET"])
    def example_api():
        return {"message": "This is an example API route"}

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()  
    app.run(debug=True)