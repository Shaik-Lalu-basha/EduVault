# EduVault - Deployment Guide for Render

This guide will help you deploy EduVault to Render (free hosting) in 15-20 minutes.

## Prerequisites

1. **GitHub Account**: Create one at https://github.com
2. **Render Account**: Sign up at https://render.com (free)
3. **Code Repository**: Your EduVault code on GitHub

## Step 1: Prepare GitHub Repository

### 1.1 Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `EduVault`
3. Initialize with README, .gitignore (Python)

### 1.2 Push Your Code
```bash
# Navigate to your project
cd EduVault

# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - EduVault Platform"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/EduVault.git

# Set main branch
git branch -M main

# Push code
git push -u origin main
```

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Click "Sign up"
3. Choose "Sign up with GitHub"
4. Authorize GitHub access

### 2.2 Create Web Service for Backend
1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"**
3. Search for your `EduVault` repository
4. Click **"Connect"** next to it
5. Authorize if prompted

### 2.3 Configure Backend Service
Fill in the following settings:

| Field | Value |
|-------|-------|
| Name | `eduvault-backend` |
| Environment | `Python 3` |
| Region | Choose closest to you |
| Branch | `main` |
| Build Command | `pip install -r backend/requirements.txt` |
| Start Command | `cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT wsgi:app` |
| Plan | `Free` |

### 2.4 Set Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
FLASK_ENV=production
SECRET_KEY=<generate-random-string-here>
JWT_SECRET_KEY=<generate-another-random-string>
DATABASE_URL=<will-be-created-automatically>
```

**How to generate random strings:**
- Use Python: `python -c "import os; print(os.urandom(24).hex())"`
- Or use online generator: https://randomkeygen.com/

### 2.5 Add PostgreSQL Database
1. Click **"Create+" → "PostgreSQL"**
2. Name: `eduvault-db`
3. Choose `Free` plan
4. Click **"Create Database"**
5. Copy connection string: `postgresql://...`
6. Add to Backend Environment Variables as `DATABASE_URL`

### 2.6 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. You'll see a URL like: `https://eduvault-backend.onrender.com`

### 2.7 Verify Backend
Visit: `https://eduvault-backend.onrender.com/api/health`

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45.123456"
}
```

## Step 3: Deploy Frontend to Render

### 3.1 Create Static Site Service
1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Click **"Connect GitHub"**
3. Select `EduVault` repository
4. Click **"Connect"**

### 3.2 Configure Frontend Service
Fill in the following settings:

| Field | Value |
|-------|-------|
| Name | `eduvault-frontend` |
| Branch | `main` |
| Root Directory | `frontend` |
| Build Command | (Leave empty or `echo "Ready"`) |

### 3.3 Deploy
1. Click **"Create Static Site"**
2. Wait for deployment (1-2 minutes)
3. You'll see a URL like: `https://eduvault-frontend.onrender.com`

## Step 4: Connect Frontend to Backend

### 4.1 Update API URLs in Frontend

Edit `frontend/js/main.js`:

Find the section where API calls are made and update:

```javascript
// Before
const apiUrl = 'http://localhost:5000';

// After  
const apiUrl = 'https://eduvault-backend.onrender.com';
```

Also update `frontend/js/contact-form.js`:
```javascript
const response = await fetch('https://eduvault-backend.onrender.com/api/contact', {
    // ...
});
```

### 4.2 Push Changes
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

Frontend will auto-deploy (wait 1-2 minutes)

## Step 5: Configure Custom Domain (Optional)

### 5.1 For Backend
1. Go to Backend Service settings
2. Click **"Custom Domain"**
3. Enter your domain: `api.yourdomain.com`
4. Follow DNS instructions
5. Update `CNAME` in your domain provider

### 5.2 For Frontend
1. Go to Frontend Service settings  
2. Click **"Custom Domain"**
3. Enter your domain: `yourdomain.com`
4. Follow DNS instructions

## Step 6: Set Up Admin Account

### 6.1 Access Backend Database
1. Go to PostgreSQL database service on Render
2. Click on it
3. Find **"Connection"** section
4. Use credentials to connect via pgAdmin or command line

### 6.2 Create Admin User
```python
# Connect to backend and run:
python

from app import app, db
from models import User

with app.app_context():
    admin = User(
        email='admin@eduvault.com',
        name='Admin',
        roll_number='ADMIN001',
        is_admin=True
    )
    admin.set_password('your-strong-password')
    db.session.add(admin)
    db.session.commit()
    print('Admin user created!')
```

Or via API:
```bash
curl -X POST https://eduvault-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@eduvault.com",
    "name": "Admin User",
    "roll_number": "ADMIN001",
    "password": "your-password"
  }'
```

Then manually set `is_admin=true` in database.

## Step 7: Upload Sample Content

### 7.1 Login as Admin
```bash
curl -X POST https://eduvault-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@eduvault.com",
    "password": "your-password"
  }'
```

Response will include `access_token`

### 7.2 Upload PDF
```bash
curl -X POST https://eduvault-backend.onrender.com/api/pdf/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@path/to/sample.pdf" \
  -F "title=Sample PDF" \
  -F "branch=CSE" \
  -F "semester=5" \
  -F "subject=Database Systems" \
  -F "type=PDF"
```

## Deployment Checklist

✅ **Backend Deployed**
- [ ] GitHub repository created
- [ ] Render account created
- [ ] Backend service created
- [ ] PostgreSQL database created
- [ ] Environment variables set
- [ ] `/api/health` endpoint responds

✅ **Frontend Deployed**
- [ ] Static site created
- [ ] API URLs updated
- [ ] Changes pushed to GitHub
- [ ] Frontend accessible at URL

✅ **Configuration**
- [ ] Admin account created
- [ ] Sample content uploaded
- [ ] Custom domain configured (optional)
- [ ] Email notifications configured (optional)

## Troubleshooting

### Backend Won't Deploy

**Error: "Build failed"**
- Check `requirements.txt` in backend folder
- Ensure all dependencies are listed
- Check Python version compatibility

**Error: "Database connection refused"**
- Verify `DATABASE_URL` environment variable
- Check PostgreSQL service is running
- Ensure credentials are correct

**Error: "Module not found"**
- Update `requirements.txt` with missing module
- Push changes to GitHub
- Render will redeploy automatically

### Frontend Shows Blank Page

- Check browser console (F12) for errors
- Verify API URLs are correct
- Check CORS is enabled in backend
- Clear browser cache (Ctrl+Shift+Delete)

### PDF Viewer Not Working

- Ensure backend is running
- Check PDF.js library is loaded
- Verify `/api/pdf/view/<id>` endpoint works
- Check browser allows access to PDFs

### High Latency / Slow Loading

- Render free tier has limited resources
- Upgrade to Paid plan for better performance
- Use CDN for static files
- Optimize PDF file sizes

## Performance Optimization

### For Production:

1. **Enable Caching**
   - Add cache headers in Flask app
   - Use browser caching for static files

2. **Compress PDFs**
   - Reduce file sizes to 5-10MB each
   - Use online PDF compressors

3. **Add CDN**
   - Use Cloudflare CDN
   - Cache static assets
   - Improve global access speed

4. **Database Optimization**
   - Add indexes to frequently queried columns
   - Implement pagination for lists

5. **Upgrade Plan (After Verification)**
   - Render Free: Good for testing
   - Render Paid: Better performance and reliability
   - Recommended for production use

## Monitoring & Maintenance

### Render Dashboard
- Monitor logs: Service → Logs
- Check metrics: Service → Metrics
- View deployments: Service → Deploys

### Daily Tasks
- Check error logs
- Verify API availability
- Monitor user access

### Weekly Tasks
- Review security logs
- Check storage usage
- Update dependencies

### Monthly Tasks
- Review analytics
- Plan feature updates
- Backup database

## Scaling Up (When Ready)

As your platform grows:

1. **Upgrade Render Plans**
   - Free → Paid tier
   - More resources, better uptime SLA

2. **Optimize Database**
   - Add caching layer (Redis)
   - Implement read replicas

3. **Use CDN**
   - Render + Cloudflare
   - Global content delivery

4. **Add Monitoring**
   - Sentry for error tracking
   - LogRocket for user tracking

5. **Load Testing**
   - Test with thousands of concurrent users
   - Identify bottlenecks

## Next Steps

After successful deployment:

1. **Test all features**
   - User registration/login
   - PDF viewing
   - Contact form
   - Admin functions

2. **Security audit**
   - Test security features
   - Verify no vulnerabilities
   - SSL certificate installed

3. **Promote platform**
   - Share with students
   - Get feedback
   - Fix issues

4. **Add content**
   - Upload more PDFs
   - Add video links
   - Organize by subjects

5. **Enhance features**
   - Add email notifications
   - Implement search
   - Add analytics

---

**Need Help?**
- Render Support: https://support.render.com
- EduVault Issues: Create GitHub Issue
- Contact: hello@eduvault.com

**Successful Deployment? 🎉**
- Share your experience
- Give this project a star ⭐
- Consider contributing back

---

**Happy Deploying! 🚀**

Developed with ❤️ by SHAIK LALU BASHA
