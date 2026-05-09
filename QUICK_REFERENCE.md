# 📋 EduVault - Quick Reference Card

## ⚡ The 7-Step Process

### STEP 1️⃣ - Backend Terminal
```
cd C:\Users\Lal Basha\Desktop\sneha@7\EduVault\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
python app.py
```
✅ See: `Running on http://127.0.0.1:5000`

---

### STEP 2️⃣ - Frontend Terminal (NEW)
```
cd C:\Users\Lal Basha\Desktop\sneha@7\EduVault\frontend
python -m http.server 8000
```
✅ See: `Serving HTTP on port 8000`

---

### STEP 3️⃣ - Open Browser
```
http://localhost:8000
```
✅ See: Home page with all sections

---

### STEP 4️⃣ - Login
- Go to http://localhost:8000/admin.html (or find login on home page)
- **Email:** admin@eduvault.com
- **Password:** admin123
- Click **Login** ✅

---

### STEP 5️⃣ - Go to Admin
```
http://localhost:8000/admin.html
```
✅ See: Admin dashboard with upload form

---

### STEP 6️⃣ - Upload PDF
Fill form:
```
Title:     C Programming
Branch:    CSE
Semester:  1
Subject:   Programming
Type:      PDF Notes
File:      Click to select PDF
```
Click **"Upload Document"** ✅

---

### STEP 7️⃣ - View Resources
```
http://localhost:8000
↓ Scroll to "Resources" section
↓ See your uploaded PDFs
↓ Click "View Resource"
↓ Secure PDF viewer opens!
```
✅ Done! PDF is secure & watermarked

---

## 📱 What You Can Do

### As Admin (`admin@eduvault.com`)
- ✅ Upload PDFs
- ✅ Manage documents
- ✅ View statistics
- ✅ Delete documents
- ✅ See view counts

### As Student (`student1@eduvault.com`)
- ✅ Register/Login
- ✅ Browse resources
- ✅ Filter by branch/semester
- ✅ Search by subject
- ✅ View PDFs (no download!)
- ✅ See watermark with your ID
- ✅ Navigate pages & zoom

---

## 🔐 Security Features Active

| Feature | Status |
|---------|--------|
| Right-click | ✅ Disabled |
| Screenshots | ✅ Blocked |
| F12 (DevTools) | ✅ Blocked |
| Ctrl+P (Print) | ✅ Blocked |
| Direct download | ✅ Blocked |
| Text selection | ✅ Prevented |
| Watermark | ✅ Active |
| Tab blur | ✅ Active (20px) |
| Server logging | ✅ Active |
| JWT auth | ✅ Active |

---

## 📂 File Locations

```
Admin Upload Page:
  frontend/admin.html

Admin Functionality:
  frontend/js/admin.js

Uploaded PDFs go to:
  backend/uploads/pdfs/

Database:
  backend/eduvault.db (local)

Backend API:
  http://localhost:5000

Frontend:
  http://localhost:8000
```

---

## 🆔 Test Accounts

### Admin
- **Email:** admin@eduvault.com
- **Password:** admin123
- **Access:** Full (upload, manage, delete)

### Student
- **Email:** student1@eduvault.com
- **Password:** student123
- **Access:** View only (no download)

### Create More Students
Go to http://localhost:8000/index.html → Scroll → Find Register section

---

## 🚨 Common Issues & Quick Fixes

| Error | Fix |
|-------|-----|
| **Module not found** | `pip install -r requirements.txt` |
| **Port 5000 in use** | Kill process or use different port |
| **Port 8000 in use** | Use: `python -m http.server 9000` |
| **Database error** | Delete `backend/eduvault.db` then run `python init_db.py` |
| **Login fails** | Run `python init_db.py` to create admin account |
| **PDF won't upload** | Check: file is .pdf, < 100MB, all fields filled |
| **Can't access backend** | Make sure 2nd terminal is running `python app.py` |
| **PDFs not showing** | Refresh page (Ctrl+F5) to clear cache |
| **Styles look broken** | Clear cache: Ctrl+Shift+Delete |
| **API errors in console** | Check both terminals for error messages |

---

## 🎯 Upload Flow Diagram

```
ADMIN DASHBOARD
      ↓
Fill Form (title, branch, semester, subject, type)
      ↓
Select PDF File (drag & drop or click)
      ↓
Click "Upload Document"
      ↓
ADMIN.JS
  └─ Collect form data
  └─ Get JWT token from localStorage
  └─ Send to backend API
      ↓
BACKEND API (routes.py)
  └─ Check JWT token (admin only)
  └─ Validate PDF file
  └─ Check file size (< 100MB)
      ↓
SAVE TO DISK
  └─ File saved to: backend/uploads/pdfs/filename.pdf
      ↓
SAVE TO DATABASE
  └─ Record saved to PDFDocument table
      ↓
SUCCESS MESSAGE
  └─ "PDF uploaded successfully!"
      ↓
RESOURCES UPDATE
  └─ New PDF appears in Resources section
  └─ Students can see & view it
```

---

## 📊 Resource Display

After uploading, PDFs appear like this:

```
┌──────────────────────────────────────┐
│   📄 C Programming                   │
│   PDF Sem 1                          │
│   👁 1250 views                      │
│   [View Resource →]                  │
└──────────────────────────────────────┘

Filters Available:
├─ Branch: CSE, ECE, Mechanical, Civil, etc.
├─ Semester: 1-8
└─ Search: Type subject name
```

---

## 🔗 All URLs

| Page | URL |
|------|-----|
| Home | `http://localhost:8000` |
| About | `http://localhost:8000/about.html` |
| Contact | `http://localhost:8000/contact.html` |
| Admin | `http://localhost:8000/admin.html` |
| PDF Viewer | `http://localhost:8000/viewer.html` |
| Backend Health | `http://localhost:5000/api/health` |

---

## 📋 Metadata for PDFs

When uploading, specify:

```
Title:       Document name (required)
Branch:      CSE, ECE, Mechanical, Civil, Electrical, EEE, Biomedical
Semester:    1-8 (semester/year level)
Subject:     Subject name (e.g., "Data Structures")
Type:        PDF Notes, Lab Manual, Exam Paper, Assignment, Textbook
Description: Optional details about content
```

---

## ✨ Student Experience

1. **Student visits** `http://localhost:8000`
2. **Registers** with roll number and password
3. **Browses resources** using filters
4. **Clicks PDF** to open secure viewer
5. **Sees:**
   - PDF content
   - Their watermark (student ID + date)
   - Page navigation
   - Zoom controls
6. **Can't:**
   - Right-click
   - Take screenshots
   - Open developer tools
   - Download file
   - Select/copy text (optional)

---

## 🎓 Sample Test Data

When you run `python init_db.py`, these PDFs are created automatically:

```
✅ Data Structures - Complete Guide (CSE, Sem 5)
✅ Database Management Systems - Notes (CSE, Sem 5)
✅ Web Development Lab Manual (CSE, Sem 5)
✅ Operating Systems - Concepts (CSE, Sem 4)
✅ Network Programming - Lab Manual (CSE, Sem 4)
✅ Digital Electronics - Theory (ECE, Sem 4)
✅ Microprocessors - Lab Manual (ECE, Sem 4)
✅ Thermodynamics - Theory & Problems (Mechanical, Sem 3)
✅ Mechanics of Machines - Notes (Mechanical, Sem 3)

These are MOCK entries (files don't exist)
Your uploaded PDFs will be REAL and VIEWABLE
```

---

## 🎯 Success Checklist

- [ ] Backend running on port 5000 ✅
- [ ] Frontend running on port 8000 ✅
- [ ] Can access home page ✅
- [ ] Admin login works ✅
- [ ] Admin dashboard loads ✅
- [ ] Can upload PDF ✅
- [ ] Success message appears ✅
- [ ] PDF appears in resources ✅
- [ ] Student can view PDF ✅
- [ ] Watermark visible ✅
- [ ] Right-click disabled ✅
- [ ] Screenshots blocked ✅

All ✅? Congrats! Platform is working! 🎉

---

## 🚀 Next Steps

1. **Upload 5-10 PDFs** to test
2. **Test as student** (login with student account)
3. **Verify security** (try right-click, F12, etc.)
4. **Add more branches** if needed
5. **Deploy to Render** (see DEPLOYMENT_GUIDE.md)

---

## 📞 Documentation Files

| File | Purpose |
|------|---------|
| `START_HERE.md` | 5-minute quick start |
| `EXECUTION_GUIDE.md` | Detailed step-by-step |
| `DEPLOYMENT_GUIDE.md` | Deploy to Render |
| `ARCHITECTURE.md` | System design & flows |
| `README.md` | Complete project info |
| `QUICK_START.md` | Development setup |

---

## 💡 Pro Tips

✅ **Keep both terminals open** while developing
✅ **Bookmark localhost URLs** for quick access
✅ **Clear cache** if styles/JS don't update
✅ **Check terminal logs** if something fails
✅ **Use real PDFs** for testing
✅ **Test on mobile** using your computer's IP
✅ **Save admin credentials** in safe place

---

**Developed with ❤️ by SHAIK LALU BASHA**

Ready to upload PDFs? Let's go! 🚀
