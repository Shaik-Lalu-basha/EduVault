# 🔐 EduVault - Login & Access Guide

## ✅ Where to Login?

There are **3 ways** to access the login page:

---

## 🔗 Way 1: Direct Login URL

Go directly to the login page:

```
http://localhost:8000/login.html
```

---

## 🔗 Way 2: Login Button (Top Right)

1. Go to home page: `http://localhost:8000`
2. Look at the **top right corner** of navbar
3. Click the blue **"Login"** button
4. You'll be taken to: `http://localhost:8000/login.html`

---

## 🔗 Way 3: Registration Section

1. Go to home page: `http://localhost:8000`
2. Scroll down to bottom
3. Look for **"Join EduVault Today"** section
4. Click **"Login / Register"** button
5. You'll be taken to: `http://localhost:8000/login.html`

---

## 📝 Login Page Features

The login page has:

```
┌─────────────────────────────────────┐
│        EduVault                     │
│     (Vault Icon)                    │
│                                     │
│  Email Address: [input field]       │
│  Password:      [input field]       │
│                                     │
│  ☑ Remember me  | Forgot password?  │
│                                     │
│  [Login Button]                     │
│                                     │
│  Don't have account?                │
│  "Create new account"               │
│                                     │
│  Test Credentials:                  │
│  Admin: admin@eduvault.com          │
│  Student: student1@eduvault.com     │
└─────────────────────────────────────┘
```

---

## 🆔 Test Login Credentials

### Admin Account (Full Access)
```
Email:    admin@eduvault.com
Password: admin123
```

**Access:** 
- Upload PDFs
- Manage documents
- View statistics
- Admin dashboard at `/admin.html`

### Student Account (View Only)
```
Email:    student1@eduvault.com
Password: student123
```

**Access:**
- Browse resources
- Filter by branch/semester
- View PDFs (no download)
- See watermarked content

---

## 🚀 Login Flow

```
1. Visit login page
   http://localhost:8000/login.html
                ↓
2. Enter email & password
   (or use test credentials)
                ↓
3. Click "Login" button
                ↓
4. Backend validates credentials
   (http://localhost:5000/api/auth/login)
                ↓
5. Success → JWT token received
                ↓
6. Redirected to dashboard
   Admin → http://localhost:8000/admin.html
   Student → http://localhost:8000 (home)
```

---

## 💾 Where Credentials Are Stored

After login, the system saves:

```javascript
// In Browser (localStorage or sessionStorage)
localStorage.getItem('userToken')      // JWT token
localStorage.getItem('userEmail')      // Logged-in email
localStorage.getItem('isAdmin')        // Admin status
localStorage.getItem('adminToken')     // If admin
```

This data persists across page refreshes (if you checked "Remember me").

---

## ❌ Login Issues & Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| **"Invalid credentials"** | Wrong email/password | Check spelling, use test credentials |
| **"Network error"** | Backend not running | Run `python app.py` in backend terminal |
| **"Database error"** | No database initialized | Run `python init_db.py` |
| **Login works but redirects to home** | Check `isAdmin` flag | May be student account, check user type |
| **Can't remember me** | localStorage disabled | Enable localStorage in browser |
| **Login page won't load** | Frontend server down | Run `python -m http.server 8000` |

---

## 🔑 Create Additional User Accounts

### Option 1: Create via Registration
1. Go to login page
2. Click "Create new account"
3. Fill registration form with:
   - Email
   - Name  
   - Roll Number
   - Branch
   - Semester
   - Password
4. Click "Register"
5. Auto-logged in

### Option 2: Register from Home Page
1. Go to `http://localhost:8000`
2. Scroll to bottom
3. Find "Join EduVault" section
4. Click "Login / Register"
5. On login page, click "Create new account"

### Option 3: Create via Python (Admin Only)
```python
from app import app, db
from models import User

with app.app_context():
    # Create new student
    student = User(
        email='newstudent@example.com',
        name='New Student',
        roll_number='CS2024050',
        branch='CSE',
        semester=5,
        is_admin=False,
        is_active=True
    )
    student.set_password('password123')
    db.session.add(student)
    db.session.commit()
    print('✅ New student created!')
```

---

## 🎓 User Types & Access

### Admin User
- **Created automatically** when you run `python init_db.py`
- **Default:** admin@eduvault.com / admin123
- **Access:**
  - Upload PDFs
  - Manage documents  
  - Delete documents
  - View statistics
  - Admin dashboard

### Student User
- **Self-registered** via signup page
- **Or created** when you run `python init_db.py` (test accounts)
- **Default test:** student1@eduvault.com / student123
- **Access:**
  - View published PDFs
  - Filter resources
  - Search by subject
  - View watermarked content
  - NO downloads
  - NO screenshot/print

---

## 🔒 Security During Login

```
┌─ Client Side (login.html)
│  ├─ Password NEVER shown in console
│  ├─ Email validated before sending
│  └─ HTTPS in production
│
├─ Transport
│  ├─ Encrypted transmission
│  └─ HTTPS enabled
│
└─ Server Side (routes.py)
   ├─ Password compared with bcrypt hash
   ├─ Never stored in plain text
   ├─ JWT token generated
   └─ Token expires in 30 days
```

---

## 🌐 URLs Reference

| Page | URL |
|------|-----|
| **Login Page** | `http://localhost:8000/login.html` |
| **Home Page** | `http://localhost:8000` |
| **Admin Dashboard** | `http://localhost:8000/admin.html` |
| **About** | `http://localhost:8000/about.html` |
| **Contact** | `http://localhost:8000/contact.html` |
| **Viewer** | `http://localhost:8000/viewer.html` |
| **API Base** | `http://localhost:5000` |
| **API Health** | `http://localhost:5000/api/health` |

---

## 🎯 After Login - What You Can Do

### As Admin
```
Login → Admin Dashboard Opens
            ↓
      [Upload PDF] [Manage] [Statistics]
            ↓
      Choose Tab:
      
      1. Upload PDF
         - Select PDF file
         - Fill metadata (branch, semester, subject, etc.)
         - Click Upload
         - PDF saved to: backend/uploads/pdfs/
         
      2. Manage Documents  
         - View all uploaded PDFs
         - See view counts
         - Delete documents
         
      3. View Statistics
         - Total documents
         - Total views
         - Total users
         - Active users
```

### As Student
```
Login → Home Page Loads
            ↓
      Scroll to "Resources" section
            ↓
      Use Filters:
      - Branch (CSE, ECE, Mechanical, etc.)
      - Semester (1-8)
      - Search by subject name
            ↓
      Click "View Resource"
            ↓
      PDF Viewer Opens with:
      - Navigation controls
      - Zoom controls
      - Watermark (Your Student ID + Date)
      - Security features active:
        * No right-click
        * No screenshots
        * No download
        * No F12/DevTools
```

---

## 📋 Complete Login Checklist

Before logging in, make sure:

- [ ] Backend is running on port 5000 (`python app.py`)
- [ ] Frontend is running on port 8000 (`python -m http.server 8000`)
- [ ] Database is initialized (`python init_db.py`)
- [ ] Browser can access `http://localhost:8000`
- [ ] You have valid credentials (use test credentials)
- [ ] JavaScript is enabled in browser
- [ ] localStorage is enabled (for "Remember me")

✅ All checked? Ready to login! 🚀

---

## 🆘 Still Can't Login?

Check these in order:

1. **Is backend running?**
   ```
   Check terminal: Should say "Running on http://127.0.0.1:5000"
   ```

2. **Is frontend running?**
   ```
   Check terminal: Should say "Serving HTTP on port 8000"
   ```

3. **Is database initialized?**
   ```
   Should exist at: backend/eduvault.db
   If not, run: python init_db.py
   ```

4. **Check browser console for errors:**
   ```
   Press F12
   Go to "Console" tab
   Look for red errors
   ```

5. **Check network tab:**
   ```
   Press F12
   Go to "Network" tab
   Click login
   Look for red entries
   Click on failed request to see error
   ```

6. **Test API directly:**
   ```
   In browser, go to: http://localhost:5000/api/health
   Should show: {"status": "healthy", ...}
   ```

---

## 📞 Test Everything

### Test Login with Admin
```
1. Go to: http://localhost:8000/login.html
2. Enter:
   Email: admin@eduvault.com
   Password: admin123
3. Click Login
4. Should redirect to: http://localhost:8000/admin.html
5. See admin dashboard
```

### Test Login with Student
```
1. Go to: http://localhost:8000/login.html
2. Enter:
   Email: student1@eduvault.com
   Password: student123
3. Click Login
4. Should redirect to: http://localhost:8000
5. See home page with resources
```

### Test PDF Upload (Admin Only)
```
1. Login as admin
2. Go to: http://localhost:8000/admin.html
3. Click "Upload PDF" tab
4. Fill form and select PDF file
5. Click "Upload Document"
6. See success message
```

### Test PDF View (Student)
```
1. Login as student
2. Scroll to Resources
3. Click "View Resource"
4. PDF opens in secure viewer
5. Verify watermark shows your ID
6. Try right-click (disabled ✅)
7. Try F12 (disabled ✅)
8. Try PrintScreen (blocked ✅)
```

---

## ✨ Next Steps

1. ✅ Access login page
2. ✅ Login with test credentials
3. ✅ Upload PDFs (as admin)
4. ✅ View PDFs (as student)
5. ✅ Test security features
6. ✅ Create more users
7. ✅ Deploy to Render

---

**Congrats! You now know where to login and how to use EduVault! 🎉**

Developed by SHAIK LALU BASHA ❤️
