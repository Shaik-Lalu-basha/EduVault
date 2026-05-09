# EduVault - Secure Educational Platform

A modern, secure educational platform for B.Tech and M.Tech students to access PDFs, lab manuals, notes, and video tutorials with advanced security features.

## 🎯 Features

### 🔒 Security Features
- **Secure PDF Viewer**: No download, no right-click, no screenshot capability
- **Watermarking**: Every PDF viewed is watermarked with student ID
- **Blur on Tab Change**: Content blurs when user switches tabs
- **Print Screen Disabled**: Screenshot shortcuts are blocked
- **Developer Tools Disabled**: F12, Ctrl+U, Ctrl+Shift+I are blocked
- **Encrypted Streaming**: PDFs are streamed, never exposed directly
- **Session Logging**: All security events are logged

### 📚 Content Management
- **Year-wise Organization**: Resources organized by academic year
- **Branch-wise Filters**: Filter by engineering branch
- **Subject-wise Classification**: Organize by subject
- **Multiple Document Types**: PDFs, Lab Manuals, Notes, Exam Papers
- **Video Integration**: Embedded YouTube videos
- **Search Functionality**: Smart search across all resources

### 👨‍💼 User Features
- **Student Registration**: Simple registration with roll number
- **Dashboard**: Personalized learning dashboard
- **View History**: Track viewed documents
- **Recommendations**: Get personalized resource suggestions
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🎨 Design
- **Modern UI**: Dark theme with glassmorphism effects
- **Smooth Animations**: Scroll reveals, hover effects, transitions
- **Neon Gradients**: Cyberpunk-inspired color scheme
- **Floating Particles**: Animated background particles
- **Mobile Responsive**: Fully optimized for all devices

## 📁 Project Structure

```
EduVault/
├── frontend/
│   ├── index.html                 # Home page
│   ├── about.html                 # About page
│   ├── contact.html               # Contact page
│   ├── viewer.html                # Secure PDF viewer
│   ├── css/
│   │   ├── style.css              # Main styles
│   │   ├── animations.css         # Animation effects
│   │   ├── glassmorphism.css      # Glass effect styles
│   │   └── pdf-viewer.css         # PDF viewer styles
│   ├── js/
│   │   ├── main.js                # Main functionality
│   │   ├── animations.js          # Animation logic
│   │   ├── particles-config.js    # Particle background
│   │   ├── security.js            # Security features
│   │   ├── pdf-viewer.js          # PDF viewer logic
│   │   └── contact-form.js        # Contact form handling
│   └── assets/
│       ├── images/
│       └── icons/
│
├── backend/
│   ├── app.py                     # Flask application
│   ├── models.py                  # Database models
│   ├── routes.py                  # API endpoints
│   ├── config.py                  # Configuration
│   ├── wsgi.py                    # Production entry point
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example               # Environment variables template
│   └── uploads/
│       ├── pdfs/                  # Uploaded PDF files
│       └── videos/                # Video metadata
│
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions CI/CD
│
├── .gitignore                     # Git ignore file
├── render.yaml                    # Render deployment config
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js (optional, for frontend tools)
- Git

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/EduVault.git
cd EduVault
```

#### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run migrations (create database)
python app.py

# Start server
flask run
```

Backend will be available at: `http://localhost:5000`

#### 3. Frontend Setup
```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Start a local server (Python)
python -m http.server 8000

# Or use Node.js http-server
npx http-server
```

Frontend will be available at: `http://localhost:8000`

## 🔐 Security Implementation

### Backend Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password hashing
- **Database Security**: SQLAlchemy ORM with parameterized queries
- **CORS Protection**: Cross-origin resource sharing control
- **Rate Limiting**: (Can be added) Prevent brute force attacks
- **Security Logging**: All access attempts logged

### Frontend Security
- **Right-Click Prevention**: Disabled context menu
- **Screenshot Prevention**: Blocks Print Screen and related keys
- **Developer Tools**: F12, Ctrl+U, Ctrl+Shift+I disabled
- **Tab Change Detection**: Blur content when tab is not active
- **Watermarking**: Overlay with student ID and timestamp
- **No Direct Download**: PDFs streamed only, never exposed
- **Session Timeout**: (Can be added) Auto-logout after inactivity

## 🌐 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "student@example.com",
  "name": "John Doe",
  "roll_number": "CS2024001",
  "password": "password123",
  "branch": "CSE",
  "semester": 5
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### PDF Endpoints

#### Get All PDFs
```
GET /api/pdf/?branch=cse&semester=5&subject=database

Query Parameters:
- branch: Filter by branch
- semester: Filter by semester
- subject: Filter by subject
- type: Filter by document type
```

#### View PDF (Secure)
```
GET /api/pdf/view/<doc_id>
Authorization: Bearer <access_token>
```

#### Upload PDF (Admin)
```
POST /api/pdf/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Form Data:
- file: (PDF file)
- title: Document title
- branch: Engineering branch
- semester: Semester number
- subject: Subject name
- type: Document type (PDF/Lab Manual/Notes/etc)
- description: Optional description
```

### Contact Endpoint
```
POST /api/contact/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Feature Request",
  "message": "I would like to request...",
  "subscribe": true
}
```

## 📦 Deployment

### Deploy to Render (Free)

#### 1. Prepare Repository
```bash
# Create GitHub account and repository
# Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/EduVault.git
git push -u origin main
```

#### 2. Deploy Backend
- Go to https://render.com
- Sign up with GitHub
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select the repository and authorize
- Build Command: `pip install -r backend/requirements.txt`
- Start Command: `cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT wsgi:app`
- Add Environment Variables:
  - `DATABASE_URL`: (Render will provide)
  - `SECRET_KEY`: Generate a random key
  - `JWT_SECRET_KEY`: Generate a random key
  - `FLASK_ENV`: production
- Click "Deploy"

#### 3. Deploy Frontend
- Create a new "Static Site" service on Render
- Connect same GitHub repository
- Publish directory: `frontend`
- Build Command: `echo "Frontend is ready"`
- Click "Deploy"

#### 4. Configure Custom Domain (Optional)
- Go to service settings
- Add custom domain
- Update DNS records with your domain provider

#### 5. Set Environment Variables for Backend
```
In Render Dashboard → Backend Service → Environment

DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[dbname]
SECRET_KEY=your-random-secret-key
JWT_SECRET_KEY=your-random-jwt-key
FLASK_ENV=production
```

### Alternative: Deploy to Heroku

#### 1. Create Procfile
```
web: cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT wsgi:app
```

#### 2. Deploy
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Manual Server Deployment

#### On Ubuntu/Linux Server:
```bash
# 1. Install dependencies
sudo apt-get update
sudo apt-get install python3-pip python3-venv nginx

# 2. Clone repository
cd /home/username
git clone https://github.com/yourusername/EduVault.git
cd EduVault/backend

# 3. Setup Python environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Create systemd service
sudo nano /etc/systemd/system/eduvault.service

# Add:
[Unit]
Description=EduVault Flask Application
After=network.target

[Service]
User=www-data
WorkingDirectory=/home/username/EduVault/backend
ExecStart=/home/username/EduVault/backend/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 wsgi:app

[Install]
WantedBy=multi-user.target

# 5. Configure Nginx
sudo nano /etc/nginx/sites-available/eduvault

# Add:
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
    }
    
    location /static/ {
        alias /home/username/EduVault/frontend/;
    }
}

# 6. Enable site
sudo ln -s /etc/nginx/sites-available/eduvault /etc/nginx/sites-enabled/
sudo systemctl restart nginx
sudo systemctl enable eduvault
```

## 📱 Using the Platform

### Student Access
1. Visit the website: `https://yourdomain.com`
2. Click "Sign Up" or "Register"
3. Enter your details (Email, Name, Roll Number, Branch, Semester)
4. Create password
5. Click "Browse Resources"
6. Filter by branch, semester, or search by subject
7. Click on a resource to view it securely
8. Use navigation controls to browse the PDF
9. Zoom in/out as needed
10. Close to return to resource list

### Admin Access
1. Login with admin credentials
2. Go to admin dashboard
3. Upload new PDFs
4. Manage users
5. View analytics
6. Read contact messages

## 🛠️ Customization

### Change Color Scheme
Edit `frontend/css/style.css`:
```css
:root {
    --primary-dark: #0f0f1e;
    --accent-primary: #00d4ff;
    --accent-secondary: #a300d4;
    /* ... more colors ... */
}
```

### Change Platform Name
1. Replace "EduVault" in all files
2. Update logo image
3. Update branding in CSS/HTML

### Add More Features
- Email notifications
- Student peer sharing
- Discussion forums
- Assignment submission
- Marks display
- Attendance tracking

## 📊 Analytics & Statistics

The platform tracks:
- Total active users
- PDF views per document
- Most viewed content
- User access patterns
- Security events
- Contact form submissions

View statistics in admin dashboard at: `/admin/statistics`

## 🐛 Troubleshooting

### Backend Issues

#### Database Error
```bash
# Reset database
rm backend/eduvault.db
python backend/app.py
```

#### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

#### Import Errors
```bash
# Reinstall dependencies
pip install --force-reinstall -r backend/requirements.txt
```

### Frontend Issues

#### PDF Not Loading
- Check PDF URL in viewer.html
- Ensure CORS is enabled in backend
- Check browser console for errors

#### Styling Issues
- Clear browser cache
- Check CSS file paths
- Ensure all CSS files are linked in HTML

## 📞 Support & Contribution

### Report Issues
- Create GitHub Issue with detailed description
- Include error logs and screenshots
- Specify browser and OS

### Contribute
1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -am 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Developer

**SHAIK LALU BASHA**
- Full Stack Developer
- Cybersecurity Enthusiast  
- Hackathon Finalist

### Contact & Links
- 📧 Email: hello@eduvault.com
- 🐙 GitHub: [github.com/shaikhalu](https://github.com)
- 💼 LinkedIn: [linkedin.com/in/shaikhalu](https://linkedin.com)
- 🐦 Twitter: [@shaikhalu](https://twitter.com)

## 🎓 Technology Stack

### Frontend
- HTML5
- CSS3 (Glassmorphism, Animations)
- JavaScript (Vanilla, no framework)
- PDF.js (PDF viewer)
- Particles.js (Background animation)
- Font Awesome (Icons)

### Backend
- Python 3
- Flask (Web framework)
- SQLAlchemy (ORM)
- PostgreSQL/SQLite (Database)
- JWT (Authentication)
- Bcrypt (Password hashing)
- Gunicorn (Production server)

### Deployment
- GitHub (Version control)
- Render/Heroku (Hosting)
- Nginx (Web server)
- Docker (Containerization - optional)

## 🌟 Features Coming Soon

- Email notifications
- Two-factor authentication
- Discussion forums
- Live chat support
- Mobile app
- AI-powered recommendations
- Advanced analytics dashboard
- Integration with college management system

## ⭐ Show Your Support

If you find this project helpful, please give it a star! ⭐

---

**Made with ❤️ for Students | © 2024 EduVault**
