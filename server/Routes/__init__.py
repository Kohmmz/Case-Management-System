from flask import Blueprint


from .advocates import advocates_bp
from .cases import cases_bp
from .auth import auth_bp
from .resources import resources_bp
from .clients import clients_bp
from .documents import documents_bp
from flask_sqlalchemy import SQLAlchemy
from Models import db


blueprints = {
    "advocates": {"blueprint": advocates_bp, "prefix": "/adv"},
    "cases": {"blueprint": cases_bp, "prefix": "/api"},
    "auth": {"blueprint": auth_bp, "prefix": "/auth"},
    "resources": {"blueprint": resources_bp, "prefix": "/resources"},
    "clients": {"blueprint": clients_bp, "prefix": "/clients"},
    "documents": {"blueprint": documents_bp, "prefix": "/docs"},
}
