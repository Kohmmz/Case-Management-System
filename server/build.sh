#!/usr/bin/env bash
set -o errexit

# Install pipenv
pip install pipenv

# Install dependencies
pipenv install

# Run database migrations
pipenv run flask db upgrade