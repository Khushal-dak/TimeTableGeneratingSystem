# College Timetable Generator - Setup Guide

## Quick Start Guide

### Step 1: Install MongoDB

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. MongoDB will run on default port: 27017

**Or use MongoDB Atlas (Cloud):**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and update `.env` file

### Step 2: Configure Environment

Edit the `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/timetable_db
JWT_SECRET=your_secure_secret_key_here
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### Step 3: Start Backend Server

Open terminal in project root:

```bash
npm run server
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### Step 4: Start Frontend

Open a NEW terminal window and run:

```bash
cd client
npm start
```

The React app will open automatically at `http://localhost:3000`

## Testing the Application

### 1. Register a New Account
- Click "Register" in the navbar
- Fill in your details
- You'll be redirected to the timetable generator

### 2. Generate Your First Timetable

Follow the 6-step wizard:

**Step 1: Basic Info**
```
College: Computer Science Department
Course: B.Tech CS
Semester: Semester 5
Section: A (optional)
```

**Step 2: Working Days**
```
Working Days: Monday to Friday
Start Time: 09:00
End Time: 17:00
Lecture Duration: 60 minutes
Lunch Break: Yes
Lunch Time: 13:00 - 14:00
```

**Step 3: Subjects**
Add subjects like:
```
1. Data Structures - 4 hours/week
2. Operating Systems - 4 hours/week
3. Database Management - 3 hours/week
4. Computer Networks - 3 hours/week
5. Software Engineering - 3 hours/week
```

**Step 4: Faculty** (Optional)
```
Teacher 1:
- Name: Dr. John Smith
- Subject: Data Structures
- Available: Mon, Tue, Wed, Thu, Fri
- Time: 09:00 - 17:00

Teacher 2:
- Name: Prof. Jane Doe
- Subject: Operating Systems
- Available: Mon, Wed, Fri
- Time: 10:00 - 16:00
```

**Step 5: Rules**
```
Max Lectures per Day: 6
Min Lectures per Day: 4
Allow Manual Edit: Yes
```

**Step 6: Review**
- Check all details
- Confirm and click "Generate Timetable"

### 3. View and Save
- Review the generated timetable
- Click "Save Timetable" to store it
- View saved timetables in "History"

## Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB Connection Error
```
**Solution:**
- Make sure MongoDB is running
- Check if port 27017 is available
- Verify MONGO_URI in `.env` file

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:**
- Change PORT in `.env` to another port (e.g., 5001)
- Or stop the process using port 5000

### React App Won't Start
```
Error: Something is already running on port 3000
```
**Solution:**
- Press `Y` to run on different port
- Or stop the process on port 3000

### Cannot Generate Timetable
```
Error: Insufficient slots available
```
**Solution:**
- Reduce total subject hours
- Increase working hours
- Add Saturday as working day
- Reduce lunch break duration

### Faculty Availability Issues
```
Error: Cannot allocate all lectures for "Subject Name"
```
**Solution:**
- Increase faculty available days
- Expand faculty time slots
- Add more teachers for the subject
- Reduce subject hours per week

## Development Scripts

### Backend
```bash
npm run server          # Start backend with nodemon
```

### Frontend
```bash
cd client
npm start              # Start React development server
npm run build          # Build for production
```

### Full Stack
```bash
npm run dev            # Run both backend and frontend (requires concurrently)
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use strong `JWT_SECRET`
3. Use MongoDB Atlas for database
4. Deploy to Heroku, Railway, or DigitalOcean

### Frontend
1. Build React app: `cd client && npm run build`
2. Serve build folder with Express
3. Or deploy to Vercel/Netlify

## API Testing with Postman

### Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Generate Timetable
```
POST http://localhost:5000/api/timetable/generate
Headers:
x-auth-token: <your_jwt_token>

Body (JSON):
{
  "collegeName": "CS Department",
  "course": "B.Tech CS",
  "semester": "5",
  "workingDays": "mon-fri",
  "startTime": "09:00",
  "endTime": "17:00",
  "lectureDuration": 60,
  "hasLunchBreak": true,
  "lunchStartTime": "13:00",
  "lunchEndTime": "14:00",
  "subjects": [
    {
      "name": "Data Structures",
      "hoursPerWeek": 4,
      "allowMultiplePerDay": false,
      "maxRepeatPerDay": 1
    }
  ],
  "faculty": [],
  "maxLecturesPerDay": 6,
  "minLecturesPerDay": 4
}
```

## Support

For issues or questions:
- Check the README.md file
- Review error messages carefully
- Ensure all dependencies are installed
- Verify MongoDB is running

## Next Steps

1. Customize the color scheme in `client/src/App.css`
2. Add more validation rules
3. Implement timetable export (PDF/Excel)
4. Add email notifications
5. Implement subscription features
6. Add admin dashboard

Happy Coding! 🚀
