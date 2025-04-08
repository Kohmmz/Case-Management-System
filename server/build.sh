#!/usr/bin/env bash
set -o errexit

# Install pipenv and upgrade pip
pip install --upgrade pip
pip install pipenv

# Install dependencies and lock file
rm -f Pipfile.lock  # Remove existing lock file
pipenv lock  # Generate new lock file
pipenv install --deploy --system  # Install dependencies

# Initialize flask-migrate
export FLASK_APP=wsgi.py
flask db init || true
flask db migrate
flask db upgrade