# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from Models.cases import Case, db
# from Models.advocates import Advocate
# from datetime import datetime, date
# from sqlalchemy.exc import IntegrityError, SQLAlchemyError


# cases_bp = Blueprint('cases', __name__)


# @cases_bp.route('/api/cases', methods=['GET'])
# def get_all_cases():
#     try:
#         cases = Case.query.all()
#         return jsonify([{
#             'id': case.id,
#             'title': case.title,
#             'case_number': case.case_number,
#             'case_type': case.case_type,
#             'status': case.status,
#             'filing_date': case.filing_date.isoformat() if case.filing_date else None,
#             'hearing_date': case.hearing_date.isoformat() if case.hearing_date else None,
#             'client_id': case.client_id
#         } for case in cases])
#     except SQLAlchemyError as e:
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500


# @cases_bp.route('/api/cases', methods=['POST'])
# def create_case():
#     try:
#         data = request.json
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400
       
#         required_fields = ['title', 'case_number', 'case_type', 'status', 'filing_date', 'client_id']
#         for field in required_fields:
#             if field not in data:
#                 return jsonify({'error': f'Missing required field: {field}'}), 400


#         try:
#             filing_date = datetime.strptime(data['filing_date'], '%Y-%m-%d').date()
#             hearing_date = datetime.strptime(data['hearing_date'], '%Y-%m-%d').date() if 'hearing_date' in data else None
#         except ValueError:
#             return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400


#         new_case = Case(
#             title=data['title'],
#             case_number=data['case_number'],
#             case_type=data['case_type'],
#             status=data['status'],
#             filing_date=filing_date,
#             hearing_date=hearing_date,
#             description=data.get('description'),
#             client_id=data['client_id']
#         )
#         db.session.add(new_case)
#         db.session.commit()
#         return jsonify({'message': 'Case created successfully', 'id': new_case.id}), 201
#     except IntegrityError:
#         db.session.rollback()
#         return jsonify({'error': 'Case number already exists'}), 409
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500


# @cases_bp.route('/api/cases/today', methods=['GET'])
# def get_today_cases():
#     try:
#         today = date.today()
#         cases = Case.query.filter_by(hearing_date=today).all()
#         return jsonify([{
#             'id': case.id,
#             'title': case.title,
#             'case_number': case.case_number,
#             'hearing_date': case.hearing_date.isoformat()
#         } for case in cases])
#     except SQLAlchemyError as e:
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500


# @cases_bp.route('/api/cases/upcoming', methods=['GET'])
# def get_upcoming_cases():
#     try:
#         today = date.today()
#         cases = Case.query.filter(Case.hearing_date > today).all()
#         return jsonify([{
#             'id': case.id,
#             'title': case.title,
#             'case_number': case.case_number,
#             'hearing_date': case.hearing_date.isoformat()
#         } for case in cases])
#     except SQLAlchemyError as e:
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500


# @cases_bp.route('/api/cases/types', methods=['GET'])
# def get_case_types():
#     try:
#         cases = Case.query.with_entities(Case.case_type).distinct().all()
#         return jsonify([case[0] for case in cases])
#     except SQLAlchemyError as e:
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500

# @cases_bp.route('/api/cases/<int:case_id>', methods=['GET'])
# @jwt_required()
# def get_case(case_id):
#     try:
#         case = Case.query.get_or_404(case_id)
#         return jsonify(case.to_dict())
#     except SQLAlchemyError as e:
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500

# @cases_bp.route('/api/cases/<int:case_id>', methods=['PUT'])
# @jwt_required()
# def update_case(case_id):
#     try:
#         case = Case.query.get_or_404(case_id)
#         data = request.json
        
#         # Validate required fields
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400
            
#         # Update fields
#         if 'title' in data:
#             case.title = data['title']
#         if 'case_number' in data:
#             case.case_number = data['case_number']
#         if 'status' in data:
#             case.status = data['status']
#         if 'filing_date' in data:
#             try:
#                 case.filing_date = datetime.strptime(data['filing_date'], '%Y-%m-%d').date()
#             except ValueError:
#                 return jsonify({'error': 'Invalid filing_date format'}), 400
                
#         db.session.commit()
#         return jsonify(case.to_dict())
        
#     except IntegrityError:
#         db.session.rollback()
#         return jsonify({'error': 'Case number already exists'}), 409
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500

# @cases_bp.route('/api/cases/<int:case_id>', methods=['DELETE'])
# @jwt_required()
# def delete_case(case_id):
#     try:
#         case = Case.query.get_or_404(case_id)
#         db.session.delete(case)
#         db.session.commit()
#         return jsonify({'message': 'Case deleted successfully'}), 200
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500

# @cases_bp.route('/api/cases/search', methods=['GET'])
# @jwt_required()
# def search_cases():
#     try:
#         query = Case.query
        
#         # Add filters
#         if 'title' in request.args:
#             query = query.filter(Case.title.ilike(f"%{request.args['title']}%"))
#         if 'status' in request.args:
#             query = query.filter_by(status=request.args['status'])
#         if 'case_type' in request.args:
#             query = query.filter_by(case_type=request.args['case_type'])
            
#         cases = query.all()
#         return jsonify([case.to_dict() for case in cases])
#     except SQLAlchemyError as e:
#         return jsonify({'error': 'Database error', 'message': str(e)}), 500




