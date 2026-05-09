"""
EduVault - Routes/Blueprints
API endpoints for all functionality
"""

from flask import Blueprint, request, jsonify, send_file, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from models import User, PDFDocument, Video, Contact, SecurityLog, user_documents
from app import db, logger
import os
from datetime import datetime
from functools import wraps

# ============================================
# AUTHENTICATION ROUTES
# ============================================
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    if not all(k in data for k in ['email', 'name', 'password', 'roll_number']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    if User.query.filter_by(roll_number=data['roll_number']).first():
        return jsonify({'error': 'Roll number already registered'}), 400
    
    user = User(
        email=data['email'],
        name=data['name'],
        roll_number=data['roll_number'],
        branch=data.get('branch'),
        semester=data.get('semester')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    logger.info(f'New user registered: {user.email}')
    
    return jsonify({
        'message': 'User registered successfully',
        'user': user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user and return JWT token"""
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        logger.warning(f'Failed login attempt: {data.get("email")}')
        return jsonify({'error': 'Invalid credentials'}), 401
    
    if not user.is_active:
        return jsonify({'error': 'Account is deactivated'}), 403
    
    user.last_login = datetime.utcnow()
    db.session.commit()
    
    access_token = create_access_token(identity=user.id)
    
    logger.info(f'User login successful: {user.email}')
    
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200

# ============================================
# PDF DOCUMENT ROUTES
# ============================================
pdf_bp = Blueprint('pdf', __name__, url_prefix='/api/pdf')

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}

@pdf_bp.route('/', methods=['GET'])
def get_documents():
    """Get all PDF documents with filters"""
    branch = request.args.get('branch')
    semester = request.args.get('semester')
    subject = request.args.get('subject')
    doc_type = request.args.get('type')
    
    query = PDFDocument.query.filter_by(is_published=True)
    
    if branch:
        query = query.filter_by(branch=branch)
    if semester:
        query = query.filter_by(semester=int(semester))
    if subject:
        query = query.filter(PDFDocument.subject.ilike(f'%{subject}%'))
    if doc_type:
        query = query.filter_by(doc_type=doc_type)
    
    documents = query.order_by(PDFDocument.created_at.desc()).all()
    
    return jsonify({
        'documents': [doc.to_dict() for doc in documents],
        'count': len(documents)
    }), 200

@pdf_bp.route('/<int:doc_id>', methods=['GET'])
def get_document(doc_id):
    """Get specific document details"""
    doc = PDFDocument.query.get(doc_id)
    
    if not doc or not doc.is_published:
        return jsonify({'error': 'Document not found'}), 404
    
    doc.views_count += 1
    db.session.commit()
    
    return jsonify(doc.to_dict()), 200

@pdf_bp.route('/view/<int:doc_id>', methods=['GET'])
@jwt_required()
def view_document(doc_id):
    """Stream PDF file securely"""
    user_id = get_jwt_identity()
    doc = PDFDocument.query.get(doc_id)
    
    if not doc or not doc.is_published:
        return jsonify({'error': 'Document not found'}), 404
    
    # Check if file exists
    if not os.path.exists(doc.file_path):
        return jsonify({'error': 'File not found'}), 404
    
    # Log view
    log_security_event(user_id, 'pdf_view', f'User viewed document: {doc.title}', 'info')
    
    # Add watermark with student ID
    try:
        return send_file(
            doc.file_path,
            mimetype='application/pdf',
            as_attachment=False,
            download_name=secure_filename(doc.title + '.pdf')
        )
    except Exception as e:
        logger.error(f'Error serving PDF: {e}')
        return jsonify({'error': 'Error serving document'}), 500

@pdf_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_document():
    """Upload a new PDF document (admin only)"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user or not user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file'}), 400
    
    # Get form data
    data = request.form
    required_fields = ['title', 'branch', 'semester', 'subject', 'type']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Save file
    filename = secure_filename(f"{datetime.utcnow().timestamp()}_{file.filename}")
    filepath = os.path.join(current_app.config['PDF_FOLDER'], filename)
    file.save(filepath)
    
    # Create document record
    doc = PDFDocument(
        title=data['title'],
        description=data.get('description'),
        file_path=filepath,
        file_size=os.path.getsize(filepath),
        branch=data['branch'],
        semester=int(data['semester']),
        subject=data['subject'],
        doc_type=data['type'],
        uploaded_by=user_id
    )
    
    db.session.add(doc)
    db.session.commit()
    
    logger.info(f'PDF uploaded: {doc.title} by {user.email}')
    
    return jsonify({
        'message': 'Document uploaded successfully',
        'document': doc.to_dict()
    }), 201

# ============================================
# VIDEO ROUTES
# ============================================
video_bp = Blueprint('video', __name__, url_prefix='/api/video')

@video_bp.route('/', methods=['GET'])
def get_videos():
    """Get all video tutorials"""
    branch = request.args.get('branch')
    semester = request.args.get('semester')
    
    query = Video.query.filter_by(is_published=True)
    
    if branch:
        query = query.filter_by(branch=branch)
    if semester:
        query = query.filter_by(semester=int(semester))
    
    videos = query.order_by(Video.created_at.desc()).all()
    
    return jsonify({
        'videos': [video.to_dict() for video in videos],
        'count': len(videos)
    }), 200

# ============================================
# CONTACT ROUTES
# ============================================
contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')

@contact_bp.route('/', methods=['POST'])
def submit_contact():
    """Submit contact form"""
    data = request.get_json()
    
    required_fields = ['name', 'email', 'subject', 'message']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        subject=data['subject'],
        message=data['message'],
        subscribe=data.get('subscribe', False)
    )
    
    db.session.add(contact)
    db.session.commit()
    
    logger.info(f'Contact form submitted by: {data["email"]}')
    
    return jsonify({
        'message': 'Thank you for contacting us. We will get back to you soon.'
    }), 201

# ============================================
# ADMIN ROUTES
# ============================================
admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

def admin_required(f):
    """Decorator to check admin privileges"""
    @wraps(f)
    @jwt_required()
    def decorated_function(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user or not user.is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        
        return f(*args, **kwargs)
    
    return decorated_function

@admin_bp.route('/contacts', methods=['GET'])
@admin_required
def get_contacts():
    """Get all contact submissions"""
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    
    return jsonify({
        'contacts': [contact.to_dict() for contact in contacts],
        'count': len(contacts)
    }), 200

@admin_bp.route('/contacts/<int:contact_id>', methods=['PUT'])
@admin_required
def mark_contact_read(contact_id):
    """Mark contact as read"""
    contact = Contact.query.get(contact_id)
    
    if not contact:
        return jsonify({'error': 'Contact not found'}), 404
    
    contact.is_read = True
    db.session.commit()
    
    return jsonify({'message': 'Contact marked as read'}), 200

@admin_bp.route('/statistics', methods=['GET'])
@admin_required
def get_statistics():
    """Get platform statistics"""
    stats = {
        'total_users': User.query.count(),
        'total_documents': PDFDocument.query.count(),
        'total_videos': Video.query.count(),
        'total_views': sum(doc.views_count for doc in PDFDocument.query.all()),
        'active_users': User.query.filter_by(is_active=True).count(),
        'contacts_received': Contact.query.count(),
        'unread_contacts': Contact.query.filter_by(is_read=False).count()
    }
    
    return jsonify(stats), 200

# ============================================
# SECURITY ROUTES
# ============================================
security_bp = Blueprint('security', __name__, url_prefix='/api/security')

def log_security_event(user_id, event_type, description, severity='info'):
    """Log security event"""
    log = SecurityLog(
        user_id=user_id,
        event_type=event_type,
        description=description,
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent'),
        severity=severity
    )
    db.session.add(log)
    db.session.commit()

@security_bp.route('/log', methods=['POST'])
def log_event():
    """Log security event from frontend"""
    data = request.get_json()
    
    log = SecurityLog(
        event_type=data.get('event'),
        description=data.get('description'),
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent'),
        severity=data.get('severity', 'info')
    )
    
    db.session.add(log)
    db.session.commit()
    
    return jsonify({'message': 'Event logged'}), 201

@security_bp.route('/logs', methods=['GET'])
@admin_required
def get_security_logs():
    """Get security logs"""
    limit = request.args.get('limit', 100, type=int)
    logs = SecurityLog.query.order_by(SecurityLog.created_at.desc()).limit(limit).all()
    
    return jsonify({
        'logs': [log.to_dict() for log in logs],
        'count': len(logs)
    }), 200
