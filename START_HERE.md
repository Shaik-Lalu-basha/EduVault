# 🚀 START HERE - 5 Minute Setup

## 🎯 Goal
Upload PDFs and see them in your EduVault platform

---

## ⚡ Step 1: Start Backend (Copy-Paste)

**Open Command Prompt/PowerShell:**

```bash
cd C:\Users\Lal Basha\Desktop\sneha@7\EduVault\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
python app.py
```

✅ **When you see:** `Running on http://127.0.0.1:5000` - **LEAVE IT RUNNING**

---

## ⚡ Step 2: Start Frontend (New Terminal)

**Open New Command Prompt/PowerShell:**

```bash
cd C:\Users\Lal Basha\Desktop\sneha@7\EduVault\frontend
python -m http.server 8000
```

✅ **When you see:** `Serving HTTP on 0.0.0.0 port 8000` - **LEAVE IT RUNNING**

---

## ⚡ Step 3: Open Website

In your browser, go to:

```
http://localhost:8000
```

✅ **You see EduVault home page** ✨

---

## ⚡ Step 4: Login as Admin

1. Scroll down or look for **"Sign In"** 
2. Login with:
   - **Email:** `admin@eduvault.com`
   - **Password:** `admin123`
3. Click **Login** ✅

---

## ⚡ Step 5: Go to Admin Dashboard

After login, visit:

```
http://localhost:8000/admin.html
```

✅ **You see Admin Dashboard with upload form**

---

## ⚡ Step 6: Upload a PDF

In the Admin Dashboard:

1. **Fill the form:**
   ```
   Title: "C Programming"
   Branch: "CSE"
   Semester: "1"
   Subject: "Programming"
   Type: "PDF Notes"
   ```

2. **Click file upload area** and select any PDF file

3. **Click "Upload Document"** button

✅ **Success message appears** - PDF uploaded!

---

## ⚡ Step 7: View Your Uploaded PDFs

1. Go back to: `http://localhost:8000`
2. Scroll to **"Resources"** section
3. You see your uploaded PDFs! 📄
4. Click **"View Resource"** to open secure viewer

✅ **PDF opens with security features active**

---

## ✨ That's It!

You now have:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 8000
- ✅ Admin account created
- ✅ PDF upload system working
- ✅ Secure PDF viewer active
- ✅ Resources accessible to students

---

## 📖 For More Details

- **Detailed Setup:** See `EXECUTION_GUIDE.md`
- **Deployment:** See `DEPLOYMENT_GUIDE.md`
- **Quick Start:** See `QUICK_START.md`

---

## 🎓 Credentials

**Admin Login:**
- Email: `admin@eduvault.com`
- Password: `admin123`

**Student Test Account:**
- Email: `student1@eduvault.com`
- Password: `student123`

Try logging in as student to see what students see!

---

## ⚠️ Common Issues

| Issue | Fix |
|-------|-----|
| "Module not found" | Run: `pip install -r requirements.txt` |
| "Port already in use" | Use different port: `python -m http.server 9000` |
| "Can't find file" | Make sure paths are correct, use full paths |
| "Login not working" | Run: `python init_db.py` to create database |
| "Upload fails" | Make sure backend is running on port 5000 |

---

## 🎉 Next Steps

1. Try uploading 5-10 PDFs
2. Test security features (right-click disabled ✅)
3. Login as student and view PDFs
4. When ready, deploy to Render (see DEPLOYMENT_GUIDE.md)

---

**Questions?** Check `EXECUTION_GUIDE.md` for detailed troubleshooting.

Developed by SHAIK LALU BASHA ❤️
