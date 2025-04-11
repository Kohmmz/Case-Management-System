from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


db = SQLAlchemy()
migrate = Migrate()

from .clients import Client
from .cases import Case
from .advocates import Advocate, advocate_case_association
from .documents import Document
