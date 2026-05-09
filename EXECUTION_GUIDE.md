# EduVault - Complete Execution Guide

## 🚀 Start the Platform & Upload PDFs

This guide shows you exactly how to upload PDFs like in the screenshot.

---

## ✅ STEP 1: Start Backend (Python Flask)

### On Windows:

```bash
# 1. Open Terminal/PowerShell
# 2. Navigate to backend folder
cd C:\Users\Lal Basha\Desktop\sneha@7\EduVault\backend

# 3. Create virtual environment (first time only)
python -m venv venv

# 4. Activate virtual environment
venv\Scripts\activate

# 5. Install dependencies (first time only)
pip install -r requirements.txt

# 6. Initialize database (first time only)
python init_db.py

# 7. START THE BACKEND
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

**Keep this terminal open!** ✅

---

## ✅ STEP 2: Start Frontend (HTML/CSS/JS)

### Open a NEW Terminal/PowerShell:

```bash
# 1. Navigate to frontend folder
cd C:\Users\Lal Basha\Desktop\sneha@7\EduVault\frontend

# 2. Start local server
python -m http.server 8000
```

You should see:
```
Serving HTTP on 0.0.0.0 port 8000
```

**Keep this terminal open too!** ✅

---

## ✅ STEP 3: Open Website

Open your browser and go to:

```
http://localhost:8000
```

You should see the **EduVault Home Page** ✨

---

## ✅ STEP 4: Login as Admin

### Option A: Quick Admin Login

1. Scroll down on home page
2. Look for **"Sign In"** button or go to: `http://localhost:8000#login`
3. Enter credentials:
   - **Email**: `admin@eduvault.com`
   - **Password**: `admin123`
4. Click **Login**

You'll receive an **access token** - this is saved automatically ✅

### Option B: Manual Register Admin (First Time)

If no one is registered yet:

```bash
# In Python terminal, paste this:
python
```

```python
from app import app, db
from models import User

with app.app_context():
    admin = User(
        email='admin@eduvault.com',
        name='Admin User',
        roll_number='ADMIN001',
        branch='CSE',
        semester=1,
        is_admin=True,
        is_active=True
    )
    admin.set_password('admin123')
    db.session.add(admin)
    db.session.commit()
    print('✅ Admin account created!')
```

Then login using credentials above.

---

## ✅ STEP 5: Upload PDFs (Admin Dashboard)

After login, go to:

```
http://localhost:8000/admin.html
```

You should see the **Admin Dashboard** like this:

```
┌─────────────────────────────────────┐
│   Admin Dashboard                   │
│                                     │
│  [Upload PDF] [Manage] [Statistics] │
└─────────────────────────────────────┘

📝 Upload PDF Document Form:

1. Document Title: "Data Structures Lab Manual"
2. Branch: "CSE" (dropdown)
3. Semester: "5" (dropdown)
4. Subject: "Data Structures"
5. Type: "Lab Manual" (dropdown)
6. Description: (optional)
7. Upload PDF: [Drag PDF here or click to select]
8. [Upload Document] Button
```

### To Upload a PDF:

1. **Fill the form:**
   - Title: `C Programming` (or your document name)
   - Branch: Select `Computer Science (CSE)`
   - Semester: Select `1`
   - Subject: `Programming`
   - Type: `PDF Notes`
   - Description: `Introduction to C programming`

2. **Select PDF File:**
   - Click the file upload area or drag a PDF
   - Must be a .pdf file (max 100MB)

3. **Click "Upload Document"**
   - You'll see a progress indicator
   - Message: "PDF uploaded successfully!"

4. **Document appears in Resources**
   - Go back to `http://localhost:8000`
   - Scroll to "Resources" section
   - Your uploaded PDF appears! 📄

---

## 📋 Sample Test Data Already Created

When you run `init_db.py`, these PDFs are already created:

```
✅ Data Structures - Complete Guide
   ├── Branch: CSE
   ├── Semester: 5
   └── Type: PDF
   
✅ Database Management Systems - Notes
   ├── Branch: CSE
   ├── Semester: 5
   └── Type: Notes

✅ Web Development Lab Manual
   ├── Branch: CSE
   ├── Semester: 5
   └── Type: Lab Manual

✅ Operating Systems - Concepts
   ├── Branch: CSE
   ├── Semester: 4
   └── Type: PDF

✅ Digital Electronics - Theory
   ├── Branch: ECE
   ├── Semester: 4
   └── Type: PDF
```

These are **mock entries** (files don't actually exist). When you upload your own PDFs, they'll be stored and viewable.

---

## 🔍 VIEW YOUR UPLOADED PDFs

### In Student View:

1. Go to `http://localhost:8000`
2. Scroll to **"Resources"** section
3. Use filters:
   - **Branch**: Select `CSE`, `ECE`, etc.
   - **Semester**: Select year
   - **Search**: Type subject name
4. Click **"View Resource"** on any document
5. Opens **Secure PDF Viewer** with:
   - ✅ Watermark showing student ID
   - ✅ No right-click
   - ✅ No screenshots
   - ✅ Navigation controls
   - ✅ Zoom in/out

---

## 🎯 Admin Dashboard Features

### Upload Tab
- Upload new PDFs with metadata
- Automatic file size validation
- Drag-and-drop support
- Progress indicator

### Manage Tab
- View all uploaded documents
- See views count
- Delete documents
- Publish/unpublish (draft mode)

### Statistics Tab
- Total documents uploaded
- Total views across platform
- Total registered users
- Active users count

---

## 🐛 Troubleshooting

### "Module not found" Error
```bash
# Solution: Install dependencies
pip install -r requirements.txt
```

### "Port 5000 already in use"
```bash
# Solution: Use different port
set FLASK_ENV=development
flask run --port 5001
```

### "Port 8000 already in use"
```bash
# Solution: Use different port
python -m http.server 9000
```

### PDF won't upload
- Check file is actually .pdf
- File size must be < 100MB
- Make sure backend is running
- Check console for error messages

### Login not working
- Make sure database is initialized: `python init_db.py`
- Clear browser cache: `Ctrl+Shift+Delete`
- Check email and password are correct

### PDFs not showing in Resources
- Make sure backend is running
- Refresh browser: `Ctrl+F5`
- Check document is published (not draft)

---

## 📁 File Structure Reminder

```
EduVault/
├── frontend/
│   ├── index.html          ← Home page
│   ├── admin.html          ← Admin upload page
│   ├── viewer.html         ← PDF viewer
│   ├── about.html
│   ├── contact.html
│   ├── css/
│   │   └── style.css, animations.css, etc.
│   └── js/
│       ├── main.js
│       ├── admin.js        ← Admin functionality
│       └── security.js
│
├── backend/
│   ├── app.py              ← Start this! (python app.py)
│   ├── init_db.py          ← Create database (python init_db.py)
│   ├── models.py           ← Database schema
│   ├── routes.py           ← API endpoints
│   └── requirements.txt
```

---

## 🚀 Quick Command Reference

| Action | Command |
|--------|---------|
| Start Backend | `cd backend && venv\Scripts\activate && python app.py` |
| Start Frontend | `cd frontend && python -m http.server 8000` |
| Init Database | `python backend\init_db.py` |
| Create Admin | `python` then paste code from Step 4B |
| Access Home | `http://localhost:8000` |
| Access Admin | `http://localhost:8000/admin.html` |
| Access API | `http://localhost:5000/api/health` |

---

## 📱 Mobile Testing

Your PDFs work on mobile too!

1. Find your computer's IP:
   ```bash
   ipconfig
   # Look for IPv4 Address like: 192.168.x.x
   ```

2. On phone/tablet, go to:
   ```
   http://192.168.x.x:8000
   ```

3. Login and view PDFs on mobile ✅

---

## ✨ Next Steps

After uploading PDFs:

1. **Test Security:**
   - Try right-click (disabled ✅)
   - Try PrintScreen (disabled ✅)
   - Try F12 (developer tools disabled ✅)

2. **Invite Students:**
   - Share `http://localhost:8000`
   - They register with their roll number
   - They can view (not download) your PDFs

3. **Customize:**
   - Edit colors in `css/style.css`
   - Update branding in HTML files
   - Add more branches/subjects

4. **Deploy:**
   - When ready, deploy to Render
   - See `DEPLOYMENT_GUIDE.md` for Render steps

---

## 💡 Tips

✅ **Always keep 2 terminals open** - one for backend, one for frontend

✅ **Save admin credentials** - `admin@eduvault.com / admin123`

✅ **Clear browser cache** if styles look weird - `Ctrl+Shift+Delete`

✅ **Use real PDF files** - test with actual PDF files for best results

✅ **Check terminal logs** - if something fails, read the error in terminal

---

## 🆘 Still Having Issues?

### Check Backend Logs
Look at the terminal running `python app.py` for error messages

### Check Frontend Logs  
- Open browser console: `F12`
- Go to "Console" tab
- Look for red error messages

### Check Network Requests
- Open browser `F12`
- Go to "Network" tab
- Try uploading PDF
- Look for failed requests (red color)
- Click on it to see error details

### Test API Directly
```bash
curl http://localhost:5000/api/health
# Should return: {"status": "healthy", ...}
```

---

## 🎓 Learning Path

1. ✅ Run backend + frontend (this page)
2. ✅ Upload sample PDFs (this page)
3. ✅ Test as student (login to view)
4. ✅ Test security features (right-click, screenshots)
5. ✅ Add more branches/subjects
6. ✅ Deploy to Render (see DEPLOYMENT_GUIDE.md)

---

**Congratulations!** 🎉

You now have a complete working EduVault platform where you can:
- ✅ Upload PDFs
- ✅ Organize by branch/semester/subject
- ✅ Secure viewing (no downloads)
- ✅ Student access control
- ✅ Admin management

**Next: Deploy to Render for free global hosting!**

---

Developed with ❤️ by SHAIK LALU BASHA
