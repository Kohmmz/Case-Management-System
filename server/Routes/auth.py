from flask import request, jsonify, make_response,Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from Models import db
from Models.advocates import Advocate 


auth_bp =Blueprint("auth", __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Check if fields are missing
        if not email or not password:
            return make_response(jsonify({'message': 'Missing required fields'}), 400)

        # Check if user exists
        advocate = Advocate.query.filter_by(email=email).first()
        if not advocate or not advocate.check_password(password):
            return make_response(jsonify({'message': 'Invalid email or password'}), 401)

        # Create access token using JWT
        access_token = create_access_token(identity=advocate.id)
        return make_response(jsonify({
             'access_token': access_token,
             'advocate':advocate.id,
             "username":advocate.username,
             "bar_number":advocate.bar_number,
             }),200)

        
