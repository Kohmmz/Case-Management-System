from flask import Blueprint, request, jsonify
from Models.clients import Client, db
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


clients_bp = Blueprint('clients', __name__)


@clients_bp.route('/clients', methods=['GET'])
def get_all_clients():
    try:
        clients = Client.query.all()
        return jsonify([{
            'id': client.id,
            'name': client.name,
            'email': client.email,
            'phone': client.phone,
            'address': client.address
        } for client in clients])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@clients_bp.route('/clients', methods=['POST'])
def create_client():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
       
        # Enhanced input validation
        required_fields = ['name', 'email']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({'error': f'Missing or empty required field: {field}'}), 400


        # Email format validation
        if '@' not in data['email'] or '.' not in data['email']:
            return jsonify({'error': 'Invalid email format'}), 400


        # Phone number validation (if provided)
        if data.get('phone'):
            phone = data['phone'].strip()
            if not phone.isdigit() or len(phone) < 10:
                return jsonify({'error': 'Invalid phone number format'}), 400


        new_client = Client(
            name=data['name'].strip(),
            email=data['email'].lower().strip(),
            phone=data.get('phone', '').strip(),
            address=data.get('address', '').strip()
        )
        db.session.add(new_client)
        db.session.commit()
       
        # Return the created client data
        return jsonify({
            'message': 'Client created successfully',
            'client': {
                'id': new_client.id,
                'name': new_client.name,
                'email': new_client.email,
                'phone': new_client.phone,
                'address': new_client.address
            }
        }), 201


    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already exists'}), 409
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@clients_bp.route('/clients/<int:id>', methods=['GET'])
def get_client(id):
    try:
        client = Client.query.get(id)
        if not client:
            return jsonify({'error': 'Client not found'}), 404
        return jsonify({
            'id': client.id,
            'name': client.name,
            'email': client.email,
            'phone': client.phone,
            'address': client.address
        })
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@clients_bp.route('/clients/<int:id>', methods=['PUT'])
def update_client(id):
    try:
        client = Client.query.get(id)
        if not client:
            return jsonify({'error': 'Client not found'}), 404
       
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400


        client.name = data.get('name', client.name)
        client.email = data.get('email', client.email)
        client.phone = data.get('phone', client.phone)
        client.address = data.get('address', client.address)
       
        db.session.commit()
        return jsonify({'message': 'Client updated successfully'})
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already exists'}), 409
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@clients_bp.route('/api/clients/<int:id>', methods=['DELETE'])
def delete_client(id):
    try:
        client = Client.query.get(id)
        if not client:
            return jsonify({'error': 'Client not found'}), 404
       
        if client.cases:
            return jsonify({'error': 'Cannot delete client with active cases'}), 400
           
        db.session.delete(client)
        db.session.commit()
        return jsonify({'message': 'Client deleted successfully'})
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500

