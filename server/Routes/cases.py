from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Models.cases import Case, db
from Models.advocates import Advocate
from datetime import datetime, date
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


cases_bp = Blueprint('cases', __name__)


@cases_bp.route('/cases', methods=['GET'])
def get_all_cases():
    try:
        cases = Case.query.all()
        return jsonify([{
            'id': case.id,
            'title': case.title,
            'case_number': case.case_number,
            'case_type': case.case_type,
            'status': case.status,
            'filing_date': case.filing_date.isoformat() if case.filing_date else None,
            'hearing_date': case.hearing_date.isoformat() if case.hearing_date else None,
            'client_id': case.client_id
        } for case in cases])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@cases_bp.route('/cases', methods=['POST'])
def create_case():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
       
        required_fields = ['title', 'case_number', 'case_type', 'status', 'filing_date', 'client_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400


        try:
            filing_date = datetime.strptime(data['filing_date'], '%Y-%m-%d').date()
            hearing_date = datetime.strptime(data['hearing_date'], '%Y-%m-%d').date() if 'hearing_date' in data else None
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400


        new_case = Case(
            title=data['title'],
            case_number=data['case_number'],
            case_type=data['case_type'],
            status=data['status'],
            filing_date=filing_date,
            hearing_date=hearing_date,
            description=data.get('description'),
            client_id=data['client_id']
        )
        db.session.add(new_case)
        db.session.commit()
        return jsonify({'message': 'Case created successfully', 'id': new_case.id}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Case number already exists'}), 409
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@cases_bp.route('/cases/today', methods=['GET'])
def get_today_cases():
    try:
        today = date.today()
        cases = Case.query.filter_by(hearing_date=today).all()
        return jsonify([{
            'id': case.id,
            'title': case.title,
            'case_number': case.case_number,
            'hearing_date': case.hearing_date.isoformat()
        } for case in cases])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@cases_bp.route('/cases/upcoming', methods=['GET'])
def get_upcoming_cases():
    try:
        today = date.today()
        cases = Case.query.filter(Case.hearing_date > today).all()
        return jsonify([{
            'id': case.id,
            'title': case.title,
            'case_number': case.case_number,
            'hearing_date': case.hearing_date.isoformat()
        } for case in cases])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500


@cases_bp.route('/cases/types', methods=['GET'])
def get_case_types():
    try:
        cases = Case.query.with_entities(Case.case_type).distinct().all()
        return jsonify([case[0] for case in cases])
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'message': str(e)}), 500



def handle_error(e, message="Database error"):
    db.session.rollback()
    return jsonify({'error': message, 'details': str(e)}), 500

# by id
@cases_bp.route('/cases/<int:case_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def case_operations(case_id):
    try:
        case = Case.query.get_or_404(case_id)
        
        if request.method == 'GET':
            return jsonify(case.to_dict())
            
        elif request.method == 'PUT':
            data = request.json
            for field in ['title', 'status', 'case_number']:
                if field in data:
                    setattr(case, field, data[field])
            db.session.commit()
            return jsonify(case.to_dict())
            
        elif request.method == 'DELETE':
            db.session.delete(case)
            db.session.commit()
            return jsonify({'message': 'Case deleted'})
            
    except SQLAlchemyError as e:
        return handle_error(e)