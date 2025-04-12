from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


from .clients import Client
from .cases import Case
from .advocates import Advocate, advocate_case_association
from .documents import Document