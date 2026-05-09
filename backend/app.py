"""
EduVault - Secure Educational Platform
Flask Backend Application
"""

from flask import Flask, render_template, request, jsonify, send_file, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///eduvault.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Upload folder configuration
UPLOAD_FOLDER = 'uploads'
PDF_FOLDER = os.path.join(UPLOAD_FOLDER, 'pdfs')
ALLOWED_EXTENSIONS = {'pdf', 'txt', 'doc', 'docx'}

if not os.path.exists(PDF_FOLDER):
    os.makedirs(PDF_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size

# Import models and routes
from models import User, PDFDocument, Video, Contact, SecurityLog
from routes import auth_bp, pdf_bp, video_bp, contact_bp, admin_bp, security_bp

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(pdf_bp)
app.register_blueprint(video_bp)
app.register_blueprint(contact_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(security_bp)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f'Server error: {error}')
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({'error': 'Unauthorized'}), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({'error': 'Forbidden'}), 403

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

# Home route
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Welcome to EduVault API',
        'version': '1.0.0',
        'documentation': '/api/docs'
    }), 200

# Initialize database
def init_db():
    """Initialize database tables"""
    with app.app_context():
        db.create_all()
        logger.info('Database initialized successfully')

if __name__ == '__main__':
    init_db()
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )
