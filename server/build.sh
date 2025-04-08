#!/usr/bin/env bash
set -o errexit

# Install pipenv and upgrade pip
pip install --upgrade pip
pip install pipenv

# Clean up any existing virtual environment
pipenv --rm || true

# Install dependencies
pipenv install --deploy --system

# Initialize flask-migrate
export FLASK_APP=wsgi.py
flask db init || true
flask db migrate
flask db upgrade