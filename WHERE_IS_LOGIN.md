# 🔐 WHERE IS THE LOGIN PAGE? 

## ✨ QUICK ANSWER

### **The login page is here:**

```
http://localhost:8000/login.html
```

---

## 🔗 3 WAYS TO ACCESS LOGIN PAGE

### **Way 1: Direct URL (Fastest)**
Just type in your browser:
```
http://localhost:8000/login.html
```

---

### **Way 2: Click Login Button in Navbar**
1. Go to: `http://localhost:8000`
2. Look at **TOP RIGHT CORNER**
3. Click blue **[Login]** button
4. You'll be taken to login page

**Visual:**
```
┌─────────────────────────────────────┐
│  EduVault    Home   Features...  [Login]  ← CLICK HERE!
└─────────────────────────────────────┘
```

---

### **Way 3: Scroll to Registration Section**
1. Go to: `http://localhost:8000`
2. Scroll **DOWN TO BOTTOM**
3. Find **"Join EduVault Today"** section
4. Click **[Login / Register]** button

**Visual:**
```
┌─────────────────────────────────────┐
│   FOR STUDENTS                      │
│   Access all resources              │
│   [Login / Register] ← CLICK HERE!  │
└─────────────────────────────────────┘
```

---

## 🆔 LOGIN CREDENTIALS (Test)

### **Admin Account** (Full Access - Upload PDFs)
```
Email:    admin@eduvault.com
Password: admin123
```

### **Student Account** (View Only)
```
Email:    student1@eduvault.com
Password: student123
```

---

## 📝 LOGIN PAGE FEATURES

The login page has:

```
┌──────────────────────────────────────┐
│    🏛️ EduVault                       │
│                                      │
│  Email:    [____________________]   │
│  Password: [____________________]   │
│                                      │
│  ☑ Remember me  | Forgot password?  │
│                                      │
│  [     LOGIN BUTTON    ]             │
│                                      │
│  Don't have account? Create one      │
└──────────────────────────────────────┘
```

---

## ✅ AFTER LOGIN

### If you login as **ADMIN**
- ↓ Redirects to Admin Dashboard
- Can upload PDFs
- Can manage documents
- Can view statistics

### If you login as **STUDENT**
- ↓ Redirects to Home Page
- Can browse resources
- Can view PDFs
- Cannot download/print

---

## 🚀 QUICK START

```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend  
cd frontend
python -m http.server 8000
```

Then:

1. Open browser: `http://localhost:8000`
2. Click **[Login]** button in navbar
3. Enter: `admin@eduvault.com` / `admin123`
4. Click **Login**
5. Upload your PDFs! 🎉

---

## 📍 LOCATION IN PROJECT

```
frontend/
├── index.html          ← Home (has login button)
└── login.html          ← 🔐 LOGIN PAGE IS HERE!
```

---

## 🎯 SUMMARY

| What | Where |
|------|-------|
| Login Page | `http://localhost:8000/login.html` |
| Login Button | Top-right corner of navbar |
| Admin Account | admin@eduvault.com / admin123 |
| Student Account | student1@eduvault.com / student123 |
| After Login (Admin) | Admin dashboard (/admin.html) |
| After Login (Student) | Home page (/) |

---

## ❓ CAN'T FIND IT?

Make sure:
1. ✅ Frontend is running (`python -m http.server 8000`)
2. ✅ You can access home page (`http://localhost:8000`)
3. ✅ Look for **[Login]** button in top-right corner
4. ✅ Or type directly: `http://localhost:8000/login.html`

---

## 🎉 YOU'RE ALL SET!

Go login now! → **`http://localhost:8000/login.html`**

**Developed by SHAIK LALU BASHA ❤️**
