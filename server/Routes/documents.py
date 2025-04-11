from flask import Blueprint, request, jsonify, send_file
from Models import db, Document, Case  
from werkzeug.utils import secure_filename

advocates = Blueprint('advocates', __name__)


@advocates.route('/api/cases/<int:case_id>/documents', methods=['GET'])
def get_case_documents(case_id):
    documents = Document.query.filter_by(case_id=case_id).all()
    return jsonify([doc.to_dict() for doc in documents])


@advocates.route('/api/cases/<int:case_id>/documents', methods=['POST'])
def upload_document(case_id):
    title = request.form.get('title')
    document_type = request.form.get('document_type')
    file = request.files.get('file')

    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    filename = secure_filename(file.filename)
    file_path = f'uploads/{filename}'
    file.save(file_path)

    new_document = Document(
        case_id=case_id,
        title=title,
        document_type=document_type,
        file_path=file_path,
        original_filename=filename,
        file_size=len(file.read()),
        mime_type=file.mimetype
    )
    db.session.add(new_document)
    db.session.commit()
    
    return jsonify(new_document.to_dict()), 201


@advocates.route('/api/documents/<int:document_id>', methods=['GET'])
def get_document(document_id):
    document = Document.query.get_or_404(document_id)
    if 'download' in request.args:
        return send_file(document.file_path, as_attachment=True)
    return jsonify(document.to_dict())


@advocates.route('/api/documents/<int:document_id>', methods=['DELETE'])
def delete_document(document_id):
    document = Document.query.get_or_404(document_id)
    db.session.delete(document)
    db.session.commit()
    return jsonify({'message': 'Document deleted successfully'})


@advocates.route('/api/cases/<int:case_id>/generate-report', methods=['POST'])
def generate_case_report(case_id):
    case = Case.query.get_or_404(case_id)
    
    report_content = f"Case Report for {case.title}\n"
    documents = case.documents.all()
    for doc in documents:
        report_content += f"- {doc.title} ({doc.document_type})\n"
    report_path = f'reports/case_{case_id}_report.txt'
    with open(report_path, 'w') as report_file:
        report_file.write(report_content)
    return jsonify({'message': 'Report generated successfully', 'report_path': report_path})
