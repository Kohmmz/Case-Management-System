from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import insert, delete
from Models import db, Advocate, Case, advocate_case_association

advocates_bp = Blueprint('advocates', __name__)

# GET route to list all advocates
@advocates_bp.route('', methods=['GET', 'POST'])
@jwt_required()
def get_or_create_advocates():
    if request.method == 'GET':
        """Retrieve a list of all advocates"""
        advocates = Advocate.query.all()
        return jsonify([advocate.to_dict() for advocate in advocates]), 200

    if request.method == 'POST':
        """Create a new advocate (admin only)"""
        current_user = Advocate.query.get(get_jwt_identity())
        if current_user.role != 'admin':
            return jsonify({'success': False, 'message': 'Unauthorized'}), 403

        data = request.get_json()
        required = ['username', 'email', 'password', 'first_name', 'last_name']
        for field in required:
            if not data.get(field):
                return jsonify({'success': False, 'message': f'Missing: {field}'}), 400

        if Advocate.query.filter_by(username=data['username']).first():
            return jsonify({'success': False, 'message': 'Username taken'}), 400
        if Advocate.query.filter_by(email=data['email']).first():
            return jsonify({'success': False, 'message': 'Email registered'}), 400

        advocate = Advocate(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone', ''),
            role=data.get('role', 'advocate'),
            specialization=data.get('specialization', ''),
            bar_number=data.get('bar_number', ''),
            years_of_experience=data.get('years_of_experience', 0),
            active=data.get('active', True)
        )
        advocate.set_password(data['password'])
        db.session.add(advocate)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Advocate created', 'advocate': advocate.to_dict()}), 201


@advocates_bp.route('/cases/<int:case_id>/assign', methods=['POST'])
@jwt_required()
def assign_advocate(case_id):
    """Assign or reassign advocate to case"""
    current_user = Advocate.query.get(get_jwt_identity())
    if current_user.role not in ['admin', 'supervisor']:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    case = Case.query.get(case_id)
    if not case:
        return jsonify({'success': False, 'message': 'Case not found'}), 404

    data = request.get_json()
    advocate_id = data.get('advocate_id')
    if not advocate_id:
        return jsonify({'success': False, 'message': 'Advocate ID required'}), 400

    advocate = Advocate.query.get(advocate_id)
    if not advocate:
        return jsonify({'success': False, 'message': 'Advocate not found'}), 404
    if advocate in case.advocates:
        return jsonify({'success': False, 'message': 'Already assigned'}), 400

    if data.get('primary'):
        for assoc in case.advocate_associations:
            if assoc.primary_advocate:
                assoc.primary_advocate = False

    stmt = insert(advocate_case_association).values(
        advocate_id=advocate.id,
        case_id=case.id,
        primary_advocate=data.get('primary', False)
    )
    db.session.execute(stmt)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Advocate assigned'})


@advocates_bp.route('/cases/<int:case_id>/unassign/<int:advocate_id>', methods=['DELETE'])
@jwt_required()
def unassign_advocate(case_id, advocate_id):
    """Unassign advocate from case"""
    current_user = Advocate.query.get(get_jwt_identity())
    if current_user.role not in ['admin', 'supervisor']:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 403

    case = Case.query.get(case_id)
    advocate = Advocate.query.get(advocate_id)
    if not case or not advocate:
        return jsonify({'success': False, 'message': 'Case or advocate not found'}), 404
    if advocate not in case.advocates:
        return jsonify({'success': False, 'message': 'Not assigned'}), 400

    stmt = delete(advocate_case_association).where(
        advocate_case_association.c.advocate_id == advocate.id,
        advocate_case_association.c.case_id == case.id
    )
    db.session.execute(stmt)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Advocate unassigned'})
