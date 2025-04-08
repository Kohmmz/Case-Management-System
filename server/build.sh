#!/usr/bin/env bash
set -o errexit

# Install pipenv and dependencies
pip install pipenv
pipenv install --system --deploy

# Initialize flask-migrate
export FLASK_APP=wsgi.py
flask db init || true
flask db migrate
flask db upgrade