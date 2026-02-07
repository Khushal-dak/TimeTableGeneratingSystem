# 🚀 Quick Reference Card

## ⚡ Start Application (2 Commands)

```bash
# Terminal 1
npm run server

# Terminal 2
cd client
npm start
```

**Access:** http://localhost:3000

---

## 📋 First Time Setup

```bash
npm install
cd client && npm install
```

**Configure:** Edit `.env` file with MongoDB connection

---

## 🎯 Test Flow (5 Minutes)

1. **Register:** Click "Register" → Fill form → Submit
2. **Generate:** Click "Generate Timetable"
3. **Step 1:** College: "CS Dept", Course: "B.Tech", Semester: "5"
4. **Step 2:** Mon-Fri, 09:00-17:00, 60 min, Lunch: Yes (13:00-14:00)
5. **Step 3:** Add 3-4 subjects (4 hours each)
6. **Step 4:** Skip or add 1 teacher
7. **Step 5:** Max: 6, Min: 4
8. **Step 6:** Review → Generate
9. **Save:** Click "Save Timetable"

---

## 🔑 Key Files

### Backend
- `server.js` - Main server
- `models/Timetable.js` - Data schema
- `utils/timetableGenerator.js` - Algorithm
- `routes/timetable.js` - API endpoints

### Frontend
- `client/src/App.js` - Main app
- `client/src/pages/GenerateTimetable.js` - Wizard
- `client/src/components/steps/` - 6 step components
- `client/src/components/TimetableDisplay.js` - Result view

---

## 🎨 Color Codes

```css
Primary:   #2563eb  (Blue)
Success:   #16a34a  (Green)
Error:     #dc2626  (Red)
Background: #ffffff (White)
Text:      #000000  (Black)
```

---

## 📡 API Endpoints

```
POST /api/auth/register
POST /api/auth/login
POST /api/timetable/generate
POST /api/timetable/save
GET  /api/timetable/history
```

---

## 🐛 Quick Fixes

**MongoDB Error?**
```bash
# Start MongoDB
net start MongoDB
```

**Port 5000 in use?**
```
Change PORT in .env to 5001
```

**Dependencies missing?**
```bash
npm install
cd client && npm install
```

---

## 📚 Documentation

- **Setup:** SETUP_GUIDE.md
- **Start:** START_APP.md
- **Deploy:** DEPLOYMENT_CHECKLIST.md
- **Test Data:** SAMPLE_DATA.md
- **Structure:** PROJECT_STRUCTURE.md
- **Summary:** FINAL_SUMMARY.md

---

## ✅ Feature Checklist

- ✅ 6-step wizard
- ✅ Multi-teacher support
- ✅ Faculty availability
- ✅ Error handling
- ✅ Auto-scroll to errors
- ✅ Save/Regenerate
- ✅ History tracking
- ✅ JWT auth
- ✅ Responsive design

---

## 🎓 Sample Quick Test

**Step 1:**
```
College: CS Department
Course: B.Tech CS
Semester: 5
```

**Step 2:**
```
Days: Mon-Fri
Time: 09:00-17:00
Duration: 60 min
Lunch: 13:00-14:00
```

**Step 3:**
```
1. Data Structures - 4 hrs
2. OS - 4 hrs
3. DBMS - 3 hrs
```

**Step 4:** Skip

**Step 5:**
```
Max: 6, Min: 4
```

**Step 6:** Generate!

---

## 🚀 Deploy Commands

**Heroku:**
```bash
heroku create
heroku config:set MONGO_URI="..."
git push heroku main
```

**Build Frontend:**
```bash
cd client
npm run build
```

---

## 📞 Need Help?

1. Check error message
2. Read SETUP_GUIDE.md
3. Try SAMPLE_DATA.md
4. Verify MongoDB is running
5. Check .env configuration

---

## 🎯 Success Indicators

✅ Backend: "MongoDB Connected"
✅ Frontend: Opens at localhost:3000
✅ Register: Creates account
✅ Generate: Shows timetable
✅ Save: Appears in history

---

**Everything Ready! Start Coding! 🚀**
