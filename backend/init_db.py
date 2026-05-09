"""
Database Initialization and Seeding Script for EduVault
Populates database with sample data for testing
"""

import os
import sys
from datetime import datetime, timedelta
from random import choice, randint

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

from app import app, db
from models import User, PDFDocument, Video, Contact, SecurityLog

def init_database():
    """Initialize database with tables"""
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("✅ Database tables created!")

def seed_users():
    """Create sample user accounts"""
    with app.app_context():
        if User.query.first() is None:
            print("\nSeeding users...")
            
            users_data = [
                {
                    'email': 'admin@eduvault.com',
                    'name': 'Admin User',
                    'roll_number': 'ADMIN001',
                    'password': 'admin123',
                    'branch': 'CSE',
                    'semester': 1,
                    'is_admin': True,
                    'phone': '9999999999'
                },
                {
                    'email': 'student1@eduvault.com',
                    'name': 'Student One',
                    'roll_number': 'CS2024001',
                    'password': 'student123',
                    'branch': 'CSE',
                    'semester': 5,
                    'is_admin': False,
                    'phone': '9876543210'
                },
                {
                    'email': 'student2@eduvault.com',
                    'name': 'Student Two',
                    'roll_number': 'CS2024002',
                    'password': 'student123',
                    'branch': 'CSE',
                    'semester': 5,
                    'is_admin': False,
                    'phone': '9876543211'
                },
                {
                    'email': 'student3@eduvault.com',
                    'name': 'Student Three',
                    'roll_number': 'EC2024001',
                    'password': 'student123',
                    'branch': 'ECE',
                    'semester': 4,
                    'is_admin': False,
                    'phone': '9876543212'
                },
                {
                    'email': 'student4@eduvault.com',
                    'name': 'Student Four',
                    'roll_number': 'ME2024001',
                    'password': 'student123',
                    'branch': 'Mechanical',
                    'semester': 3,
                    'is_admin': False,
                    'phone': '9876543213'
                }
            ]
            
            for user_data in users_data:
                user = User(
                    email=user_data['email'],
                    name=user_data['name'],
                    roll_number=user_data['roll_number'],
                    branch=user_data['branch'],
                    semester=user_data['semester'],
                    phone=user_data['phone'],
                    is_admin=user_data.get('is_admin', False),
                    is_active=True
                )
                user.set_password(user_data['password'])
                db.session.add(user)
                print(f"  ✅ Created user: {user_data['email']}")
            
            db.session.commit()
            print("✅ Users seeded successfully!")

def seed_documents():
    """Create sample PDF documents"""
    with app.app_context():
        if PDFDocument.query.first() is None:
            print("\nSeeding documents...")
            
            admin = User.query.filter_by(email='admin@eduvault.com').first()
            
            documents_data = [
                {
                    'title': 'Data Structures - Complete Guide',
                    'description': 'Comprehensive guide covering arrays, linked lists, stacks, queues, trees, and graphs',
                    'branch': 'CSE',
                    'semester': 5,
                    'subject': 'Data Structures',
                    'doc_type': 'PDF',
                    'file_path': 'uploads/pdfs/data_structures.pdf'
                },
                {
                    'title': 'Database Management Systems - Notes',
                    'description': 'DBMS concepts including normalization, transactions, and SQL queries',
                    'branch': 'CSE',
                    'semester': 5,
                    'subject': 'Database Systems',
                    'doc_type': 'Notes',
                    'file_path': 'uploads/pdfs/dbms_notes.pdf'
                },
                {
                    'title': 'Web Development Lab Manual',
                    'description': 'Step-by-step lab exercises for HTML, CSS, JavaScript, and PHP',
                    'branch': 'CSE',
                    'semester': 5,
                    'subject': 'Web Development',
                    'doc_type': 'Lab Manual',
                    'file_path': 'uploads/pdfs/web_dev_lab.pdf'
                },
                {
                    'title': 'Operating Systems - Concepts',
                    'description': 'OS fundamentals including process management, memory management, and file systems',
                    'branch': 'CSE',
                    'semester': 4,
                    'subject': 'Operating Systems',
                    'doc_type': 'PDF',
                    'file_path': 'uploads/pdfs/os_concepts.pdf'
                },
                {
                    'title': 'Network Programming - Lab Manual',
                    'description': 'Hands-on exercises for socket programming and network protocols',
                    'branch': 'CSE',
                    'semester': 4,
                    'subject': 'Computer Networks',
                    'doc_type': 'Lab Manual',
                    'file_path': 'uploads/pdfs/network_lab.pdf'
                },
                {
                    'title': 'Digital Electronics - Theory',
                    'description': 'Boolean algebra, logic gates, combinational circuits, and sequential circuits',
                    'branch': 'ECE',
                    'semester': 4,
                    'subject': 'Digital Electronics',
                    'doc_type': 'PDF',
                    'file_path': 'uploads/pdfs/digital_electronics.pdf'
                },
                {
                    'title': 'Microprocessors - Lab Manual',
                    'description': 'Intel 8085 and 8086 microprocessor programming and interfacing',
                    'branch': 'ECE',
                    'semester': 4,
                    'subject': 'Microprocessors',
                    'doc_type': 'Lab Manual',
                    'file_path': 'uploads/pdfs/microprocessor_lab.pdf'
                },
                {
                    'title': 'Thermodynamics - Theory & Problems',
                    'description': 'First law, second law, thermodynamic cycles, and solved problems',
                    'branch': 'Mechanical',
                    'semester': 3,
                    'subject': 'Thermodynamics',
                    'doc_type': 'PDF',
                    'file_path': 'uploads/pdfs/thermodynamics.pdf'
                },
                {
                    'title': 'Mechanics of Machines - Notes',
                    'description': 'Kinematic and dynamic analysis of mechanisms',
                    'branch': 'Mechanical',
                    'semester': 3,
                    'subject': 'Theory of Machines',
                    'doc_type': 'Notes',
                    'file_path': 'uploads/pdfs/mom_notes.pdf'
                },
            ]
            
            for doc_data in documents_data:
                document = PDFDocument(
                    title=doc_data['title'],
                    description=doc_data['description'],
                    branch=doc_data['branch'],
                    semester=doc_data['semester'],
                    subject=doc_data['subject'],
                    doc_type=doc_data['doc_type'],
                    file_path=doc_data['file_path'],
                    file_size=randint(1000000, 10000000),
                    uploaded_by=admin.id,
                    is_published=True,
                    views_count=randint(0, 100)
                )
                db.session.add(document)
                print(f"  ✅ Created document: {doc_data['title']}")
            
            db.session.commit()
            print("✅ Documents seeded successfully!")

def seed_videos():
    """Create sample video entries"""
    with app.app_context():
        if Video.query.first() is None:
            print("\nSeeding videos...")
            
            videos_data = [
                {
                    'title': 'Data Structures Fundamentals - Part 1',
                    'description': 'Introduction to data structures and basic concepts',
                    'youtube_url': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'branch': 'CSE',
                    'semester': 5,
                    'subject': 'Data Structures'
                },
                {
                    'title': 'SQL Queries - Complete Tutorial',
                    'description': 'Learn SQL from basics to advanced queries',
                    'youtube_url': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'branch': 'CSE',
                    'semester': 5,
                    'subject': 'Database Systems'
                },
                {
                    'title': 'Web Development with HTML & CSS',
                    'description': 'Create beautiful websites with HTML and CSS',
                    'youtube_url': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'branch': 'CSE',
                    'semester': 5,
                    'subject': 'Web Development'
                },
                {
                    'title': 'Process Management in Operating Systems',
                    'description': 'Understanding OS processes and scheduling',
                    'youtube_url': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'branch': 'CSE',
                    'semester': 4,
                    'subject': 'Operating Systems'
                },
                {
                    'title': 'Digital Logic Design - Part 1',
                    'description': 'Boolean algebra and logic gates explained',
                    'youtube_url': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'branch': 'ECE',
                    'semester': 4,
                    'subject': 'Digital Electronics'
                },
            ]
            
            for video_data in videos_data:
                video = Video(
                    title=video_data['title'],
                    description=video_data['description'],
                    youtube_url=video_data['youtube_url'],
                    branch=video_data['branch'],
                    semester=video_data['semester'],
                    subject=video_data['subject'],
                    is_published=True,
                    views_count=randint(0, 500)
                )
                db.session.add(video)
                print(f"  ✅ Created video: {video_data['title']}")
            
            db.session.commit()
            print("✅ Videos seeded successfully!")

def seed_contacts():
    """Create sample contact submissions"""
    with app.app_context():
        if Contact.query.first() is None:
            print("\nSeeding contacts...")
            
            contacts_data = [
                {
                    'name': 'Raj Kumar',
                    'email': 'raj@example.com',
                    'phone': '9876543210',
                    'subject': 'Feature Request',
                    'message': 'Could you add more materials for CSE students?',
                    'subscribe': True
                },
                {
                    'name': 'Priya Singh',
                    'email': 'priya@example.com',
                    'phone': '9876543211',
                    'subject': 'Bug Report',
                    'message': 'PDF viewer not working on mobile',
                    'subscribe': False
                },
                {
                    'name': 'Arjun Patel',
                    'email': 'arjun@example.com',
                    'phone': '9876543212',
                    'subject': 'General Inquiry',
                    'message': 'Great platform! Keep up the good work',
                    'subscribe': True
                },
            ]
            
            for contact_data in contacts_data:
                contact = Contact(
                    name=contact_data['name'],
                    email=contact_data['email'],
                    phone=contact_data['phone'],
                    subject=contact_data['subject'],
                    message=contact_data['message'],
                    subscribe=contact_data['subscribe'],
                    is_read=choice([True, False])
                )
                db.session.add(contact)
                print(f"  ✅ Created contact: {contact_data['name']}")
            
            db.session.commit()
            print("✅ Contacts seeded successfully!")

def main():
    """Run all initialization steps"""
    print("\n" + "="*50)
    print("  EduVault Database Initialization")
    print("="*50)
    
    try:
        init_database()
        seed_users()
        seed_documents()
        seed_videos()
        seed_contacts()
        
        print("\n" + "="*50)
        print("  ✅ Database initialization completed!")
        print("="*50)
        print("\n📝 Test Accounts:")
        print("  Admin: admin@eduvault.com / admin123")
        print("  Student: student1@eduvault.com / student123")
        print("\n🚀 To start the server, run: python app.py")
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error during initialization: {str(e)}")
        print("="*50 + "\n")
        sys.exit(1)

if __name__ == '__main__':
    main()
