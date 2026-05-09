# EduVault - System Architecture & PDF Upload Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     WEB BROWSERS                             │
│  (Students accessing resources & Admin uploading PDFs)       │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    HTTP Requests & Responses
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (port 8000)                      │
│  HTML Pages: index.html, admin.html, viewer.html, etc.      │
│  JavaScript: main.js, admin.js, security.js, pdf-viewer.js  │
│  CSS: style.css, animations.css, glassmorphism.css          │
└─────────────────────────────────────────────────────────────┘
                            ↕
        API Calls (axios/fetch) - REST Endpoints
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (port 5000)                       │
│  Flask Application (app.py)                                 │
│  ├── Authentication (JWT tokens)                            │
│  ├── PDF Management (upload/download)                       │
│  ├── Security (watermark, logging)                          │
│  └── Database Operations                                    │
└─────────────────────────────────────────────────────────────┘
                            ↕
        Read/Write Database Records
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (SQLite/PostgreSQL)              │
│  Tables: users, pdf_documents, videos, contacts, logs       │
└─────────────────────────────────────────────────────────────┘
                            ↕
        Read/Write Files
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    FILE SYSTEM                               │
│  backend/uploads/pdfs/  (Uploaded PDF files)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📤 PDF Upload Flow

### Complete Flow Diagram

```
1. ADMIN VISITS UPLOAD PAGE
   └─ Goes to: http://localhost:8000/admin.html
   └─ Page loads admin.js and displays upload form
   
2. ADMIN FILLS FORM
   ├─ Title: "Data Structures Lab Manual"
   ├─ Branch: CSE
   ├─ Semester: 5
   ├─ Subject: Data Structures
   ├─ Type: Lab Manual
   └─ Selects PDF file
   
3. ADMIN CLICKS "UPLOAD"
   ├─ admin.js collects form data
   ├─ Creates FormData object with file
   ├─ Gets JWT token from localStorage
   └─ Sends POST to: http://localhost:5000/api/pdf/upload
   
4. BACKEND RECEIVES REQUEST
   ├─ app.py receives POST request
   ├─ Validates JWT token
   ├─ Verifies admin permissions
   ├─ routes.py handles /api/pdf/upload
   └─ Checks file is valid PDF
   
5. FILE PROCESSING
   ├─ Saves PDF to: backend/uploads/pdfs/<filename>
   ├─ Creates database record in PDFDocument table
   ├─ Records: title, branch, semester, subject, type, etc.
   └─ Sets is_published = True
   
6. RESPONSE TO ADMIN
   ├─ Backend sends success response: {"message": "Uploaded"}
   ├─ admin.js displays success message
   ├─ Form clears automatically
   └─ Document list refreshes
   
7. PDF APPEARS IN SYSTEM
   ├─ Resources section updated
   ├─ Students can filter and see it
   ├─ Students can view (not download)
   └─ Views are counted & watermarked
```

---

## 📋 Database Schema for PDFs

```sql
CREATE TABLE pdf_document (
    id                  INTEGER PRIMARY KEY
    title              VARCHAR(255)      -- "Data Structures Lab Manual"
    description        TEXT              -- Optional description
    file_path          VARCHAR(255)      -- "uploads/pdfs/filename.pdf"
    file_size          INTEGER           -- Size in bytes
    branch             VARCHAR(50)       -- "CSE", "ECE", etc.
    semester           INTEGER           -- 1-8
    subject            VARCHAR(100)      -- "Data Structures"
    doc_type           VARCHAR(50)       -- "PDF", "Lab Manual", etc.
    uploaded_by        INTEGER (FK)      -- Admin user ID
    views_count        INTEGER           -- Number of views
    is_published       BOOLEAN           -- True if visible to students
    created_at         TIMESTAMP         -- Upload date
    updated_at         TIMESTAMP         -- Last modified
);
```

---

## 🔐 Security Layers

### Upload Security
```
┌─ Client Side (admin.js)
│  ├─ Validate file is PDF
│  ├─ Check file size < 100MB
│  └─ Require all fields filled
│
├─ Transport (HTTPS in production)
│  ├─ Encrypted transmission
│  └─ CORS validation
│
└─ Server Side (routes.py)
   ├─ JWT token validation
   ├─ Admin permission check
   ├─ File type verification
   ├─ File size limit check
   └─ Save to secure location
```

### Viewing Security
```
┌─ Client Side (security.js)
│  ├─ Disable right-click
│  ├─ Disable F12
│  ├─ Disable PrintScreen
│  ├─ Add watermark overlay
│  └─ Blur on tab change
│
├─ PDF Delivery (pdf-viewer.js)
│  ├─ Stream only (not direct URL)
│  ├─ Require valid JWT token
│  ├─ Check user permissions
│  └─ Log all access
│
└─ Server Side (routes.py)
   ├─ Authenticate user
   ├─ Verify access rights
   ├─ Stream PDF (not download)
   ├─ Log security event
   └─ Add server-side watermark
```

---

## 📁 PDF File Organization

```
backend/
└── uploads/
    └── pdfs/
        ├── 2024_data_structures_manual.pdf      (Admin uploaded)
        ├── 2024_web_dev_lab.pdf                 (Admin uploaded)
        ├── 2024_database_systems.pdf            (Admin uploaded)
        ├── 2024_os_concepts.pdf                 (Admin uploaded)
        └── ...
```

**File Naming Convention:**
```
[branch]_[semester]_[subject]_[type].pdf
Example: CSE_5_DataStructures_LabManual.pdf
```

---

## 🔌 API Endpoints for PDF Management

### Upload PDF
```
POST /api/pdf/upload
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Request:
{
  file: <PDF file>,
  title: "Data Structures Lab Manual",
  branch: "CSE",
  semester: 5,
  subject: "Data Structures",
  type: "Lab Manual",
  description: "Optional"
}

Response:
{
  "message": "PDF uploaded successfully",
  "pdf": {
    "id": 1,
    "title": "Data Structures Lab Manual",
    ...
  }
}
```

### Get All PDFs (with filters)
```
GET /api/pdf/?branch=CSE&semester=5&subject=Data%20Structures
Authorization: Bearer <JWT_TOKEN>

Response:
[
  {
    "id": 1,
    "title": "Data Structures Lab Manual",
    "branch": "CSE",
    "semester": 5,
    "subject": "Data Structures",
    "doc_type": "Lab Manual",
    "views_count": 245,
    "is_published": true
  },
  ...
]
```

### View PDF (Secure Stream)
```
GET /api/pdf/view/1
Authorization: Bearer <JWT_TOKEN>

Response: (PDF file stream with watermark)
```

### Delete PDF (Admin only)
```
DELETE /api/pdf/1
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "message": "Document deleted successfully"
}
```

---

## 👥 User Workflows

### Admin Workflow
```
Admin User
├─ Login (http://localhost:8000)
│  ├─ Email: admin@eduvault.com
│  └─ Password: admin123
│
├─ Go to Admin Dashboard (http://localhost:8000/admin.html)
│
├─ Upload PDFs
│  ├─ Fill form with metadata
│  ├─ Select PDF file
│  └─ Click Upload
│
├─ Manage Documents
│  ├─ View all uploaded PDFs
│  ├─ See view counts
│  └─ Delete if needed
│
└─ View Statistics
   ├─ Total documents
   ├─ Total views
   ├─ Total users
   └─ Active users
```

### Student Workflow
```
Student User
├─ Visit (http://localhost:8000)
│
├─ Register or Login
│  ├─ Register with roll number
│  └─ Or login if already registered
│
├─ Browse Resources
│  ├─ Filter by Branch
│  ├─ Filter by Semester
│  ├─ Search by Subject
│  └─ See PDFs list
│
├─ View PDF
│  ├─ Click "View Resource"
│  ├─ Secure PDF Viewer opens
│  ├─ Watermark shows their ID
│  ├─ Navigate pages
│  └─ Zoom in/out
│
└─ Security Active
   ├─ Can't right-click
   ├─ Can't take screenshots
   ├─ Can't open DevTools
   └─ Can't download
```

---

## 🚀 Deployment Architecture

### Local Development
```
Your Computer:
├─ Port 5000: Python Flask Backend
└─ Port 8000: Frontend (Static Files)
```

### Render Production
```
Render.com:
├─ Web Service (Port 10000): Flask Backend
│  ├─ Processes requests
│  ├─ Stores files
│  └─ Manages database
│
└─ Static Site: Frontend
   ├─ Serves HTML/CSS/JS
   └─ Redirects to backend for API
```

---

## 📊 Data Flow for PDF Upload

```
Admin Browser                   Backend Server              File System
     │                               │                           │
     │─── Fill Form ─────────────────│                           │
     │                               │                           │
     │─── Select PDF ────────────────│                           │
     │                               │                           │
     │─── POST /api/pdf/upload ─────→│                           │
     │      (File + Metadata)         │                           │
     │                               │─── Validate ────────────→│
     │                               │                           │
     │                               │← OK (Safe) ─────────────│
     │                               │                           │
     │                               │─── Save File ───────────→│
     │                               │    uploads/pdfs/...       │
     │                               │                           │
     │                               │─── Create DB Record ─────│
     │                               │    PDFDocument table      │
     │                               │                           │
     │←─── Success Response ─────────│                           │
     │    {"message": "Uploaded"}    │                           │
     │                               │                           │
  Display Success Message         Process Complete       File Stored
```

---

## 🔄 Data Flow for PDF View

```
Student Browser            Backend Server          File System
     │                           │                      │
     │─ Login ──────────────────→│                      │
     │                           │                      │
     │← JWT Token ───────────────│                      │
     │                           │                      │
     │─ Browse Resources ────────│                      │
     │   GET /api/pdf/?branch... │                      │
     │                           │                      │
     │← PDF List ────────────────│                      │
     │                           │                      │
     │─ View PDF ────────────────│                      │
     │  GET /api/pdf/view/1      │                      │
     │  (With JWT Token)         │                      │
     │                           │                      │
     │                           │─ Read PDF File ─────→│
     │                           │ uploads/pdfs/...     │
     │                           │                      │
     │                           │← File Content ──────│
     │                           │                      │
     │                           │─ Add Watermark ──────│
     │                           │ (Student ID + Date)  │
     │                           │                      │
     │                           │─ Log Access Event ───│
     │                           │ (Security audit)     │
     │                           │                      │
     │← PDF Stream ──────────────│                      │
     │ (With watermark)          │                      │
     │                           │                      │
  PDF Opens in Viewer         Transaction Complete   
  Security Active ✅
```

---

## 🛡️ Complete Security Model

```
┌─ AUTHENTICATION
│  ├─ User registers/logs in
│  ├─ Password hashed with Bcrypt
│  ├─ JWT token issued (30-day expiry)
│  └─ Token stored in localStorage
│
├─ AUTHORIZATION
│  ├─ Admin can upload/delete PDFs
│  ├─ Students can view PDFs
│  ├─ Permissions checked on every request
│  └─ Role-based access control
│
├─ DATA ENCRYPTION
│  ├─ HTTPS in production (Render auto)
│  ├─ JWT tokens signed
│  ├─ Passwords never stored plain
│  └─ Database queries parameterized
│
├─ CLIENT-SIDE SECURITY
│  ├─ Right-click disabled
│  ├─ F12 (DevTools) disabled
│  ├─ PrintScreen blocked
│  ├─ Ctrl+U (View Source) blocked
│  ├─ Ctrl+S (Save) blocked
│  ├─ Screenshot prevented
│  ├─ Tab blur (20px) when inactive
│  ├─ Drag/drop disabled
│  ├─ Text selection prevented
│  └─ Watermark overlay (0.1 opacity)
│
├─ SERVER-SIDE SECURITY
│  ├─ JWT validation on every request
│  ├─ CORS protection
│  ├─ Request validation
│  ├─ File type verification
│  ├─ File size limits (100MB)
│  ├─ Server-side watermarking
│  ├─ Security event logging
│  └─ Rate limiting (can be added)
│
└─ PDF DELIVERY SECURITY
   ├─ Stream only (not direct URL)
   ├─ Require valid JWT token
   ├─ Verify user access rights
   ├─ Add unique watermark per student
   ├─ Log all access attempts
   ├─ No download options
   ├─ No copy/paste
   └─ Canvas fingerprinting detection
```

---

## 📈 Scalability Path

### Phase 1: Local Development (Now)
- ✅ SQLite database
- ✅ Local file storage
- ✅ Single machine

### Phase 2: Initial Deployment (Next)
- ✅ PostgreSQL database (Render)
- ✅ File storage (Render disk)
- ✅ Global CDN ready

### Phase 3: Growth (Future)
- S3/Cloud storage for files
- Redis caching layer
- Database read replicas
- Load balancing
- Microservices

---

## 🎯 Key Takeaways

1. **Admin uploads PDF**
   - Fills form → Selects file → Clicks upload
   - File saved to `backend/uploads/pdfs/`
   - Database record created
   - API returns success

2. **Student views PDF**
   - Browses resources → Clicks view
   - Backend verifies permissions
   - PDF streamed with watermark
   - Security features active
   - Access logged

3. **Security enforced at multiple levels**
   - Frontend: UI controls + JavaScript blocks
   - Transport: HTTPS in production
   - Backend: JWT + authorization checks
   - Server: Watermarking + logging
   - File system: Restricted access

4. **Everything works locally first**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:8000
   - Then deploy to Render for production

---

Developed by SHAIK LALU BASHA ❤️
