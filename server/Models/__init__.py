# models/__init__.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import models after db is initialized
from .advocates import Advocate, advocate_case_association
from .cases import Case
from .clients import Client
from .documents import Document