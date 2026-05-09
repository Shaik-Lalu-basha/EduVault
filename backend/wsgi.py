"""
WSGI Entry Point for EduVault
Used for production deployment with Gunicorn/Render
"""

import os
from app import app, init_db

if __name__ == "__main__":
    # Initialize database
    with app.app_context():
        init_db()
    
    # Run app
    app.run()
