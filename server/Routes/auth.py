from flask import request, jsonify, make_response, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from Models import db
from Models.advocates import Advocate


auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if fields are missing
    if not email or not password:
        return make_response(jsonify({'success': False, 'message': 'Missing required fields'}), 400)

    # Check if user exists
    advocate = Advocate.query.filter_by(email=email).first()
    if not advocate or not advocate.check_password(password):
        return make_response(jsonify({'success': False, 'message': 'Invalid email or password'}), 401)

    # Check if user is active
    if not advocate.active:
        return make_response(jsonify({'success': False, 'message': 'Account is inactive'}), 401)

    # Create access token using JWT
    access_token = create_access_token(identity=advocate.id)
    return make_response(jsonify({
        'success': True,
        'access_token': access_token,
        'advocate': {
            'id': advocate.id,
            'username': advocate.username,
            'email': advocate.email,
            'first_name': advocate.first_name,
            'last_name': advocate.last_name,
            'role': advocate.role,
            'bar_number': advocate.bar_number,
        }
    }), 200)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    required = ['username', 'email', 'password', 'first_name', 'last_name']
    
    # Check if all required fields are present
    for field in required:
        if not data.get(field):
            return jsonify({'success': False, 'message': f'Missing: {field}'}), 400
            
    # Check if username or email already exists
    if Advocate.query.filter_by(username=data['username']).first():
        return jsonify({'success': False, 'message': 'Username already taken'}), 400
    if Advocate.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'Email already registered'}), 400
        
    # Create new advocate
    advocate = Advocate(
        username=data['username'],
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        phone=data.get('phone', ''),
        role=data.get('role', 'advocate'),
        specialization=data.get('specialization', ''),
        bar_number=data.get('bar_number', ''),
        active=True
    )
    advocate.set_password(data['password'])
    
    # Save to database
    db.session.add(advocate)
    db.session.commit()
    
    # Create access token
    access_token = create_access_token(identity=advocate.id)
    
    return jsonify({
        'success': True, 
        'message': 'Registration successful',
        'access_token': access_token,
        'advocate': advocate.to_dict()
    }), 201

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    advocate_id = get_jwt_identity()
    advocate = Advocate.query.get(advocate_id)
    
    if not advocate:
        return jsonify({'success': False, 'message': 'Advocate not found'}), 404
        
    return jsonify({'success': True, 'advocate': advocate.to_dict()}), 200

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    advocate_id = get_jwt_identity()
    advocate = Advocate.query.get(advocate_id)
    
    if not advocate:
        return jsonify({'success': False, 'message': 'Advocate not found'}), 404
        
    data = request.get_json()
    
    # Update fields if provided
    if 'first_name' in data:
        advocate.first_name = data['first_name']
    if 'last_name' in data:
        advocate.last_name = data['last_name']
    if 'phone' in data:
        advocate.phone = data['phone']
    if 'specialization' in data:
        advocate.specialization = data['specialization']
    if 'bar_number' in data:
        if data['bar_number'] != advocate.bar_number:
            # Check if bar number already exists
            existing = Advocate.query.filter_by(bar_number=data['bar_number']).first()
            if existing and existing.id != advocate.id:
                return jsonify({'success': False, 'message': 'Bar number already registered'}), 400
        advocate.bar_number = data['bar_number']
    if 'password' in data and data['password']:
        advocate.set_password(data['password'])
    
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Profile updated successfully', 'advocate': advocate.to_dict()}), 200