# Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend Configuration

- [ ] Update `.env` file with production values
  - [ ] Change `JWT_SECRET` to a strong random string
  - [ ] Update `MONGO_URI` to production MongoDB (MongoDB Atlas)
  - [ ] Set `NODE_ENV=production`
  - [ ] Update `PORT` if needed

- [ ] Security Checks
  - [ ] JWT_SECRET is strong and unique
  - [ ] MongoDB credentials are secure
  - [ ] CORS is properly configured
  - [ ] Rate limiting added (optional)
  - [ ] Input validation is working

- [ ] Database
  - [ ] MongoDB Atlas cluster created
  - [ ] Database user created with proper permissions
  - [ ] IP whitelist configured (or allow all for cloud deployment)
  - [ ] Connection string tested

### Frontend Configuration

- [ ] Update API URLs
  - [ ] Change `http://localhost:5000` to production API URL
  - [ ] Update in all axios calls (Login.js, Register.js, GenerateTimetable.js, History.js)

- [ ] Build Optimization
  - [ ] Remove console.logs
  - [ ] Optimize images
  - [ ] Test production build locally

### Code Quality

- [ ] All components working correctly
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Cross-browser compatibility checked
- [ ] Error handling implemented
- [ ] Loading states added

## 🚀 Deployment Options

### Option 1: Heroku (Full Stack)

#### Backend Deployment

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-timetable-app
```

4. **Set Environment Variables**
```bash
heroku config:set MONGO_URI="your_mongodb_atlas_connection_string"
heroku config:set JWT_SECRET="your_secure_secret"
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

6. **Open App**
```bash
heroku open
```

#### Frontend Deployment (on same Heroku app)

1. **Build React App**
```bash
cd client
npm run build
```

2. **Update server.js** to serve React build
```javascript
// Add after routes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
```

3. **Deploy again**
```bash
git add .
git commit -m "Add frontend build"
git push heroku main
```

### Option 2: Separate Deployment

#### Backend: Railway/Render

**Railway:**
1. Go to railway.app
2. Connect GitHub repo
3. Add environment variables
4. Deploy automatically

**Render:**
1. Go to render.com
2. New Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy

#### Frontend: Vercel/Netlify

**Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. In client folder: `vercel`
3. Follow prompts
4. Update API URLs to backend URL

**Netlify:**
1. Build: `cd client && npm run build`
2. Drag `build` folder to netlify.com
3. Or connect GitHub repo
4. Update API URLs

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. **Setup Server**
   - Ubuntu 20.04 or later
   - Install Node.js, MongoDB, Nginx

2. **Clone Repository**
```bash
git clone your-repo-url
cd your-repo
npm install
cd client && npm install && npm run build
```

3. **Setup PM2**
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

4. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🧪 Testing Before Deployment

### Manual Testing Checklist

- [ ] **Authentication**
  - [ ] Register new user
  - [ ] Login with correct credentials
  - [ ] Login with wrong credentials (should fail)
  - [ ] Logout
  - [ ] Protected routes redirect to login

- [ ] **Timetable Generation**
  - [ ] Complete all 6 steps
  - [ ] Validate each step
  - [ ] Test back button
  - [ ] Generate timetable successfully
  - [ ] Handle generation errors
  - [ ] Save timetable
  - [ ] Regenerate timetable

- [ ] **Error Scenarios**
  - [ ] Empty fields validation
  - [ ] Insufficient time slots
  - [ ] Faculty unavailability conflicts
  - [ ] Invalid time ranges
  - [ ] Max < Min lectures error

- [ ] **UI/UX**
  - [ ] All pages load correctly
  - [ ] Navigation works
  - [ ] Forms are user-friendly
  - [ ] Error messages are clear
  - [ ] Loading states show
  - [ ] Responsive on mobile
  - [ ] Responsive on tablet

- [ ] **History**
  - [ ] View saved timetables
  - [ ] Empty state shows correctly
  - [ ] Timetables display properly

### API Testing with Postman

Create a Postman collection with these requests:

1. **Register**
   - POST `/api/auth/register`
   - Test: Success, duplicate email

2. **Login**
   - POST `/api/auth/login`
   - Test: Success, wrong password, wrong email

3. **Get User**
   - GET `/api/auth/user`
   - Test: With token, without token

4. **Generate Timetable**
   - POST `/api/timetable/generate`
   - Test: Valid data, invalid data, conflicts

5. **Save Timetable**
   - POST `/api/timetable/save`
   - Test: With valid data

6. **Get History**
   - GET `/api/timetable/history`
   - Test: With timetables, empty

## 📊 Performance Optimization

### Backend
- [ ] Add compression middleware
- [ ] Implement caching
- [ ] Optimize database queries
- [ ] Add request rate limiting
- [ ] Enable GZIP compression

### Frontend
- [ ] Code splitting
- [ ] Lazy loading routes
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Use production build

## 🔒 Security Checklist

- [ ] Environment variables not in code
- [ ] JWT secret is strong
- [ ] Passwords are hashed
- [ ] Input validation on backend
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention
- [ ] CORS properly configured
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented
- [ ] Error messages don't leak sensitive info

## 📝 Post-Deployment

- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Check database connections
- [ ] Verify email notifications (if added)
- [ ] Test from different devices
- [ ] Test from different networks
- [ ] Setup monitoring (optional)
- [ ] Setup backups for database
- [ ] Document API endpoints
- [ ] Create user guide

## 🐛 Common Deployment Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Ensure database user has correct permissions

### Issue: "CORS Error"
**Solution:**
- Update CORS origin to frontend URL
- Check if credentials are included

### Issue: "404 on refresh"
**Solution:**
- Configure server to serve index.html for all routes
- Add catch-all route in Express

### Issue: "Environment variables not working"
**Solution:**
- Set variables in hosting platform dashboard
- Restart server after setting variables

### Issue: "Build fails"
**Solution:**
- Check Node version compatibility
- Clear node_modules and reinstall
- Check for missing dependencies

## 📞 Support Resources

- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Heroku Docs: https://devcenter.heroku.com/
- React Deployment: https://create-react-app.dev/docs/deployment/
- Express Best Practices: https://expressjs.com/en/advanced/best-practice-security.html

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Users can register and login
- ✅ Timetables generate correctly
- ✅ Data persists in database
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Fast load times
- ✅ Secure (HTTPS)
- ✅ Error handling works

---

**Ready to Deploy?** Follow this checklist step by step and you'll have a production-ready application!
