"""
EduVault - Database Models
"""

from app import db, bcrypt
from datetime import datetime
from enum import Enum

class User(db.Model):
    """User model for student accounts"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    roll_number = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    branch = db.Column(db.String(50), nullable=True)
    semester = db.Column(db.Integer, nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    viewed_documents = db.relationship('PDFDocument', secondary='user_documents', backref='viewers')
    security_logs = db.relationship('SecurityLog', backref='user', lazy='dynamic')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'roll_number': self.roll_number,
            'email': self.email,
            'name': self.name,
            'branch': self.branch,
            'semester': self.semester,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat()
        }

class PDFDocument(db.Model):
    """PDF Document model"""
    __tablename__ = 'pdf_documents'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    file_path = db.Column(db.String(255), nullable=False, unique=True)
    file_size = db.Column(db.Integer, nullable=False)  # in bytes
    branch = db.Column(db.String(100), nullable=False)
    semester = db.Column(db.Integer, nullable=False)
    subject = db.Column(db.String(150), nullable=False)
    doc_type = db.Column(db.String(50), nullable=False)  # PDF, Lab Manual, Notes, etc.
    uploaded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    views_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_published = db.Column(db.Boolean, default=True)
    
    # Relationships
    uploader = db.relationship('User', backref='uploaded_documents')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'branch': self.branch,
            'semester': self.semester,
            'subject': self.subject,
            'doc_type': self.doc_type,
            'views_count': self.views_count,
            'file_size': self.file_size,
            'created_at': self.created_at.isoformat(),
            'uploader': self.uploader.name if self.uploader else 'Admin'
        }

class Video(db.Model):
    """Video resource model"""
    __tablename__ = 'videos'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    youtube_url = db.Column(db.String(255), nullable=False)
    branch = db.Column(db.String(100), nullable=False)
    semester = db.Column(db.Integer, nullable=False)
    subject = db.Column(db.String(150), nullable=False)
    views_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_published = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'youtube_url': self.youtube_url,
            'branch': self.branch,
            'semester': self.semester,
            'subject': self.subject,
            'views_count': self.views_count,
            'created_at': self.created_at.isoformat()
        }

class Contact(db.Model):
    """Contact form submissions"""
    __tablename__ = 'contacts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    subscribe = db.Column(db.Boolean, default=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }

class SecurityLog(db.Model):
    """Security event logs"""
    __tablename__ = 'security_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    event_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    ip_address = db.Column(db.String(50), nullable=True)
    user_agent = db.Column(db.String(255), nullable=True)
    severity = db.Column(db.String(20), default='info')  # info, warning, critical
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'event_type': self.event_type,
            'description': self.description,
            'severity': self.severity,
            'created_at': self.created_at.isoformat()
        }

# Association table for user-document relationship
user_documents = db.Table(
    'user_documents',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('pdf_id', db.Integer, db.ForeignKey('pdf_documents.id'), primary_key=True),
    db.Column('viewed_at', db.DateTime, default=datetime.utcnow)
)
