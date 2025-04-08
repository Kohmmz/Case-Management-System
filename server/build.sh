#!/usr/bin/env bash
set -o errexit

# Install pipenv
pip install pipenv

# Install dependencies
pipenv install --python 3.8.13  # Update this version to match your local Python version

# Run database migrations
pipenv run flask db upgrade