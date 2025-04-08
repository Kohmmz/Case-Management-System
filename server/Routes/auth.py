from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from server.models import db
from server.models.auth import User

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        # Check if required fields are missing
        if not username or not password or not email:
            return make_response(jsonify({'message': 'Missing required fields'}), 400)

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return make_response(jsonify({'message': 'User already exists'}), 400)

        # Check if username already exists
        if User.query.filter_by(username=username).first():
            return make_response(jsonify({'message': 'Username already exists'}), 400)      

        # Create and save the user
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({'message': 'User created successfully'}), 201)

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Check if fields are missing
        if not email or not password:
            return make_response(jsonify({'message': 'Missing required fields'}), 400)

        # Check if user exists
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return make_response(jsonify({'message': 'Invalid email or password'}), 401)

        # Create access token using JWT
        access_token = create_access_token(identity=user.id)
        return make_response(jsonify({'access_token': access_token}), 200)
