# EduVault - Quick Start Guide

Get EduVault running locally in 5 minutes!

## Prerequisites
- Python 3.8+
- Browser (Chrome, Firefox, Edge, Safari)

## Option 1: Quick Local Setup

### Backend
```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run Flask app
python app.py
```

Backend runs on: `http://localhost:5000`

### Frontend  
```bash
# In another terminal, navigate to frontend
cd frontend

# Run local server
python -m http.server 8000
```

Frontend runs on: `http://localhost:8000`

## Option 2: Deploy to Render (Cloud)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push
```

### Step 2: Deploy Backend
1. Go to https://render.com
2. Create new "Web Service"
3. Connect GitHub repository
4. Set:
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && gunicorn -w 4 wsgi:app`
5. Click Deploy ✅

### Step 3: Deploy Frontend
1. Create new "Static Site"
2. Connect same GitHub repository
3. Set: Root Directory = `frontend`
4. Click Deploy ✅

## First Time Use

### 1. Register Student Account
- URL: `http://localhost:8000`
- Click "Home" → Scroll to Sign Up
- Enter: Email, Name, Roll Number, Password
- Click Register

### 2. Login
- Use credentials from registration
- You'll get access token

### 3. Browse Resources
- Click "Resources"
- Filter by Branch/Semester/Subject
- Click on any resource to view

### 4. View PDF Securely
- Click "View Resource"
- PDF opens in secure viewer
- Right-click disabled
- Screenshots blocked
- Watermark shows your student ID

## File Structure Quick Reference

```
frontend/
├── index.html          # Home page
├── about.html          # About page  
├── contact.html        # Contact page
├── viewer.html         # PDF viewer
├── css/                # Styles
└── js/                 # Functionality

backend/
├── app.py              # Main app
├── models.py           # Database
├── routes.py           # API endpoints
└── requirements.txt    # Dependencies
```

## Common Commands

### Start Backend
```bash
cd backend
source venv/bin/activate  # Mac/Linux
python app.py
```

### Start Frontend
```bash
cd frontend
python -m http.server 8000
```

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

### Admin Functions (After Deployment)
1. Access: `https://yourdomain.com/admin`
2. Login with admin account
3. Upload PDFs
4. View statistics
5. Manage users

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | Change port: `python -m http.server 9000` |
| Module not found | Install: `pip install -r requirements.txt` |
| Database error | Delete `eduvault.db` and restart |
| PDF won't open | Check backend is running |
| Styling looks broken | Clear cache: Ctrl+Shift+Delete |

## Next Steps

1. ✅ Run locally
2. ✅ Test all features
3. ✅ Upload sample PDFs
4. ✅ Deploy to Render
5. ✅ Share with students
6. ✅ Get feedback
7. ✅ Enhance features

## Default Admin Setup

When you first run the backend, create admin:

```bash
python

# Paste this:
from app import app, db
from models import User

with app.app_context():
    admin = User(
        email='admin@example.com',
        name='Admin',
        roll_number='ADMIN001',
        is_admin=True
    )
    admin.set_password('admin123')
    db.session.add(admin)
    db.session.commit()
    print('Admin created!')
```

Login with:
- Email: `admin@example.com`
- Password: `admin123`

## Security Features Active ✅

- ✅ Right-click disabled
- ✅ Screenshots blocked
- ✅ Print screen disabled
- ✅ Developer tools blocked
- ✅ Watermark on PDFs
- ✅ Blur on tab change
- ✅ No direct downloads
- ✅ JWT authentication

## Need Help?

- 📖 Full docs: `README.md`
- 🚀 Deploy guide: `DEPLOYMENT_GUIDE.md`
- 💬 Issues: GitHub Issues
- 📧 Email: hello@eduvault.com

---

**Happy Learning! 🎓**

Developed by SHAIK LALU BASHA
