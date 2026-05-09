# 🎯 EduVault - Quick Navigation Map

## 🏠 Home Page Layout
```
http://localhost:8000
│
├─── NAVBAR (Top)
│    ├─ Logo: "EduVault"
│    ├─ Menu Links: Home, Features, Services, About, Contact, Resources
│    └─ [LOGIN BUTTON] ← Click here to login!
│
├─── HERO SECTION
│    ├─ Title: "Welcome to EduVault"
│    ├─ Description
│    └─ [Explore Resources] [Learn More]
│
├─── FEATURES SECTION
│    ├─ Comprehensive PDFs
│    ├─ Lab Manuals
│    ├─ Easy Notes
│    └─ Video Tutorials
│
├─── RESOURCES SECTION
│    ├─ Filters: [Branch] [Semester] [Search]
│    └─ Resource Cards (scrollable)
│
├─── RESOURCES SECTION (Bottom)
│    ├─ Title: "Join EduVault Today"
│    ├─ Student Card: [Login/Register Button]
│    └─ Security Card: [Learn More Button]
│
└─── FOOTER
     ├─ Quick Links
     ├─ Resources Links
     ├─ Social Links
     └─ Copyright
```

---

## 🔐 Login Page Layout
```
http://localhost:8000/login.html
│
├─ BACK TO HOME (Top Left)
│
├─ LOGIN CARD (Center)
│  ├─ 🏛️ Vault Icon
│  ├─ Title: "EduVault"
│  ├─ Subtitle: "Secure Learning Platform"
│  │
│  ├─ [📧 Email Address]          ← Enter email
│  ├─ [🔒 Password]               ← Enter password
│  │
│  ├─ ☑ Remember me | Forgot password?
│  │
│  ├─ [LOGIN] Button              ← Click to login
│  │
│  ├─ Don't have an account?
│  └─ Links to signup
│
└─ Test Credentials (Bottom)
   ├─ Admin: admin@eduvault.com / admin123
   └─ Student: student1@eduvault.com / student123
```

---

## 👨‍💼 Admin Dashboard Layout
```
http://localhost:8000/admin.html (After admin login)
│
├─ NAVBAR
│  ├─ Logo: "EduVault Admin"
│  └─ [LOGOUT]
│
├─ ADMIN MENU
│  ├─ [Upload PDF] ← Currently selected
│  ├─ [Manage Documents]
│  └─ [Statistics]
│
├─ TAB 1: UPLOAD PDF (Default View)
│  ├─ [Title] input
│  ├─ [Branch] dropdown (CSE, ECE, Mechanical, etc.)
│  ├─ [Semester] dropdown (1-8)
│  ├─ [Subject] input
│  ├─ [Type] dropdown (PDF Notes, Lab Manual, etc.)
│  ├─ [Description] textarea
│  ├─ [PDF File] upload area (drag & drop)
│  ├─ ☑ Publish immediately
│  └─ [UPLOAD DOCUMENT] Button
│
├─ TAB 2: MANAGE DOCUMENTS
│  └─ Table with:
│     ├─ Title
│     ├─ Type
│     ├─ Branch
│     ├─ Semester
│     ├─ Views
│     ├─ Status (Published/Draft)
│     └─ Actions (Delete)
│
└─ TAB 3: STATISTICS
   ├─ Total Documents: XX
   ├─ Total Views: XXX
   ├─ Total Users: XX
   └─ Active Users: X
```

---

## 📚 Student View After Login
```
http://localhost:8000 (After student login)
│
├─ NAVBAR
│  ├─ Same as home page
│  └─ [LOGIN] → Shows user email instead
│
├─ All Home Page Sections visible
│
├─ RESOURCES SECTION (Searchable)
│  ├─ Filters:
│  │  ├─ [Branch Dropdown]: All Branches, CSE, ECE, Mechanical...
│  │  ├─ [Semester Dropdown]: All Semesters, 1, 2, 3...
│  │  └─ [Search Input]: Type subject name
│  │
│  └─ Resource Cards Grid:
│     ├─ 📄 Data Structures Lab Manual
│     │  ├─ PDF, Sem 5
│     │  ├─ 👁 1250 views
│     │  └─ [View Resource →]
│     │
│     ├─ 📄 Database Management Systems  
│     │  ├─ Notes, Sem 5
│     │  ├─ 👁 2150 views
│     │  └─ [View Resource →]
│     │
│     └─ ... more resources ...
│
└─ Click any [View Resource] → Opens PDF Viewer
```

---

## 🖼️ PDF Viewer Layout
```
http://localhost:8000/viewer.html?id=1
│
├─ NAVBAR
│  ├─ 🏠 [Home]
│  ├─ Document Title
│  ├─ [🖨️ Print] (Disabled ❌)
│  └─ [⛶ Fullscreen]
│
├─ MAIN AREA
│  ├─ SIDEBAR (Left)
│  │  ├─ Document Info
│  │  │  ├─ Pages: 150
│  │  │  ├─ Branch: CSE
│  │  │  ├─ Semester: 5
│  │  │  └─ Subject: Data Structures
│  │  │
│  │  ├─ Navigation
│  │  │  ├─ [◄ Previous]
│  │  │  ├─ [Input: Page Number]
│  │  │  └─ [Next ►]
│  │  │
│  │  ├─ Zoom
│  │  │  ├─ [🔍+ Zoom In]
│  │  │  ├─ 100%
│  │  │  └─ [🔍- Zoom Out]
│  │  │
│  │  └─ Security Notice
│  │     └─ ⚠️ "This document is protected..."
│  │
│  └─ PDF DISPLAY (Center)
│     ├─ [PDF Page Canvas]
│     ├─ Watermark: "Student ID: CS2024001\nDate: 2024-05-09" (semi-transparent)
│     └─ Right-click: DISABLED ✅
│        Screenshot: BLOCKED ✅
│        DevTools (F12): DISABLED ✅
│
└─ Blur Overlay (Appears when tab loses focus)
   └─ Temporary 20px blur
```

---

## 🗺️ Complete Site Map

```
EduVault Platform
│
├─ Frontend Routes
│  ├─ / (index.html)              ← Home with resources
│  ├─ /login.html                 ← Login page
│  ├─ /about.html                 ← About page
│  ├─ /contact.html               ← Contact page
│  ├─ /admin.html                 ← Admin dashboard
│  └─ /viewer.html                ← PDF viewer
│
├─ Backend API Routes
│  ├─ http://localhost:5000/api/auth/login       ← Login endpoint
│  ├─ http://localhost:5000/api/auth/register    ← Register endpoint
│  ├─ http://localhost:5000/api/pdf/             ← Get all PDFs
│  ├─ http://localhost:5000/api/pdf/upload       ← Upload PDF
│  ├─ http://localhost:5000/api/pdf/view/<id>    ← Stream PDF
│  ├─ http://localhost:5000/api/admin/statistics ← Get stats
│  └─ http://localhost:5000/api/health           ← Health check
│
└─ Database Tables
   ├─ users                ← User accounts
   ├─ pdf_documents        ← Uploaded PDFs
   ├─ videos               ← Video links
   ├─ contacts             ← Contact form submissions
   └─ security_logs        ← Access logs
```

---

## 📍 Key Locations

| Item | Location | Access |
|------|----------|--------|
| **Login Page** | `frontend/login.html` | Via navbar button or direct URL |
| **Admin Dashboard** | `frontend/admin.html` | After admin login |
| **PDF Viewer** | `frontend/viewer.html` | After clicking PDF in resources |
| **Uploaded PDFs** | `backend/uploads/pdfs/` | Stored on server |
| **Database** | `backend/eduvault.db` | SQLite (local) |
| **Backend Server** | `http://localhost:5000` | Python Flask app |
| **Frontend Server** | `http://localhost:8000` | Static file server |

---

## 🚀 User Journey

### New Student
```
1. Visit home page
   ↓
2. Click [Login] button in navbar
   ↓
3. On login page, click "Create new account"
   ↓
4. Fill registration form
   ↓
5. Account created, auto-logged in
   ↓
6. See resources on home page
   ↓
7. Click [View Resource] on any PDF
   ↓
8. PDF opens in secure viewer
   ↓
9. ✅ Can read, zoom, navigate
   ❌ Can't download, screenshot, or print
```

### Admin User
```
1. Visit home page
   ↓
2. Click [Login] button in navbar
   ↓
3. Enter admin credentials
   (admin@eduvault.com / admin123)
   ↓
4. Login successful
   ↓
5. Auto-redirects to admin dashboard
   ↓
6. Click [Upload PDF] tab
   ↓
7. Fill form and select PDF file
   ↓
8. Click [Upload Document]
   ↓
9. ✅ PDF uploaded and appears in resources
   ✅ Students can now view it
```

---

## 🔄 Data Flow

### Login Request
```
Browser (login.html)
    │
    ├─ User enters email & password
    │
    ├─ JavaScript sends POST request
    │
    └─→ Backend (http://localhost:5000/api/auth/login)
           │
           ├─ Validate email
           ├─ Check password hash
           ├─ Generate JWT token
           │
           └─→ Response: {access_token, user}
               │
               └─→ Browser saves token
                  └─→ Redirects to dashboard
```

### PDF Upload Request
```
Admin (admin.html)
    │
    ├─ Fill form and select PDF
    │
    ├─ JavaScript sends POST (multipart/form-data)
    │
    └─→ Backend (http://localhost:5000/api/pdf/upload)
           │
           ├─ Verify JWT token
           ├─ Check admin permission
           ├─ Validate PDF file
           ├─ Save to backend/uploads/pdfs/
           ├─ Create database record
           │
           └─→ Response: {message, pdf_id}
               │
               └─→ Admin sees success message
                  └─→ PDF appears in resources
```

---

## 📊 File Structure for Reference

```
eduvault/
│
├─ frontend/
│  ├─ index.html          ← Home page (with Login button in navbar)
│  ├─ login.html          ← 🔐 LOGIN PAGE (THIS IS NEW!)
│  ├─ admin.html          ← Admin dashboard
│  ├─ about.html
│  ├─ contact.html
│  ├─ viewer.html
│  ├─ css/
│  │  ├─ style.css        ← Updated with nav-buttons & signup styles
│  │  ├─ animations.css
│  │  ├─ glassmorphism.css
│  │  └─ pdf-viewer.css
│  └─ js/
│     ├─ main.js
│     ├─ admin.js
│     ├─ security.js
│     ├─ pdf-viewer.js
│     └─ contact-form.js
│
├─ backend/
│  ├─ app.py
│  ├─ models.py
│  ├─ routes.py
│  ├─ config.py
│  ├─ init_db.py
│  ├─ requirements.txt
│  └─ uploads/
│     └─ pdfs/            ← Uploaded PDFs saved here
│
└─ docs/
   ├─ LOGIN_GUIDE.md      ← 🆕 Complete login documentation
   ├─ QUICK_REFERENCE.md
   ├─ EXECUTION_GUIDE.md
   ├─ DEPLOYMENT_GUIDE.md
   ├─ QUICK_START.md
   ├─ START_HERE.md
   ├─ ARCHITECTURE.md
   └─ README.md
```

---

## ✅ What's New

1. ✅ **Login Page** - Beautiful login interface at `/login.html`
2. ✅ **Navbar Button** - Easy access [Login] button in top right
3. ✅ **Registration Section** - Call-to-action at bottom of home page
4. ✅ **Admin Upload Interface** - Already existed, now fully functional
5. ✅ **Complete Documentation** - All guides updated

---

## 🎯 Quick Start (30 Seconds)

```
1. Terminal 1: cd backend && python app.py
   ↓
2. Terminal 2: cd frontend && python -m http.server 8000
   ↓
3. Browser: http://localhost:8000
   ↓
4. Click [Login] button in navbar
   ↓
5. Use credentials:
   Email: admin@eduvault.com
   Password: admin123
   ↓
6. Go to: http://localhost:8000/admin.html
   ↓
7. Upload your first PDF! 🎉
```

---

## 📞 Need Help?

- 📖 See: `LOGIN_GUIDE.md` - Detailed login instructions
- 🚀 See: `QUICK_START.md` - Quick setup guide
- ⚙️ See: `EXECUTION_GUIDE.md` - Complete execution steps
- 🏗️ See: `ARCHITECTURE.md` - System design overview
- 📦 See: `DEPLOYMENT_GUIDE.md` - Deploy to Render

---

**Everything is ready! Start by clicking the [Login] button! 🚀**

Developed by SHAIK LALU BASHA ❤️
