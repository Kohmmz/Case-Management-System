from flask import Blueprint, request, jsonify, send_file
from Models import db, Document, Case
from werkzeug.utils import secure_filename
import os


documents_bp = Blueprint('documents', __name__)


ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'jpg', 'png'}

def allowed_file(filename):
    """Check if the file has a valid extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


UPLOAD_FOLDER = 'uploads'
REPORTS_FOLDER = 'reports'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(REPORTS_FOLDER, exist_ok=True)


@documents_bp.route('/api/cases/<int:case_id>/documents', methods=['GET'])
def get_case_documents(case_id):
    """Retrieve all documents associated with a specific case."""
    documents = Document.query.filter_by(case_id=case_id).all()
    if not documents:
        return jsonify({'error': 'No documents found for this case'}), 404
    return jsonify([doc.to_dict() for doc in documents]), 200


@documents_bp.route('/api/cases/<int:case_id>/documents', methods=['POST'])
def upload_document(case_id):
    """Upload a new document to a specific case."""
    title = request.form.get('title')
    document_type = request.form.get('document_type')
    file = request.files.get('file')

    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    filename = secure_filename(file.filename)
    if not allowed_file(filename):
        return jsonify({'error': 'Unsupported file type'}), 400

    
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    
    file_size = os.path.getsize(file_path)

    
    new_document = Document(
        case_id=case_id,
        title=title,
        document_type=document_type,
        file_path=file_path,
        original_filename=filename,
        file_size=file_size,
        mime_type=file.mimetype
    )
    db.session.add(new_document)
    db.session.commit()

    return jsonify(new_document.to_dict()), 201


@documents_bp.route('/api/documents/<int:document_id>', methods=['GET'])
def get_document(document_id):
    """Retrieve document details or download the file."""
    document = Document.query.get_or_404(document_id)
    if 'download' in request.args:
        return send_file(document.file_path, as_attachment=True)
    return jsonify(document.to_dict()), 200


@documents_bp.route('/api/documents/<int:document_id>', methods=['DELETE'])
def delete_document(document_id):
    """Delete a document."""
    document = Document.query.get_or_404(document_id)

    
    try:
        os.remove(document.file_path)
    except FileNotFoundError:
        pass  

    
    db.session.delete(document)
    db.session.commit()

    return jsonify({'message': 'Document deleted successfully'}), 200


@documents_bp.route('/api/cases/<int:case_id>/generate-report', methods=['POST'])
def generate_case_report(case_id):
    """Generate a text-based report for all documents in a case."""
    case = Case.query.get_or_404(case_id)

    
    documents = case.documents.all()
    if not documents:
        return jsonify({'error': 'No documents found for this case'}), 404

    
    report_content = f"Case Report for Case ID: {case_id}\n\n"
    for doc in documents:
        report_content += f"- {doc.title} ({doc.document_type})\n"

    
    report_path = os.path.join(REPORTS_FOLDER, f'case_{case_id}_report.txt')
    with open(report_path, 'w') as report_file:
        report_file.write(report_content)

    return jsonify({'message': 'Report generated successfully', 'report_path': report_path}), 201