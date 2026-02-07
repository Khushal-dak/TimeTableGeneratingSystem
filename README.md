# 🎓 College Time Table Generator System

> A complete, professional MERN stack application for generating college timetables with intelligent scheduling algorithms.

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)]()
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()
[![License](https://img.shields.io/badge/License-MIT-blue)]()

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install && cd client && npm install

# Start backend (Terminal 1)
npm run server

# Start frontend (Terminal 2)
cd client && npm start
```

**Access:** http://localhost:3000

📖 **New User?** Start with [WELCOME.md](WELCOME.md) or [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

## ✨ Features

- **Multi-Step Form Wizard**: Guided 6-step process for timetable creation
- **Smart Scheduling**: Intelligent algorithm respecting faculty availability and constraints
- **Faculty Management**: Support for multiple teachers with custom availability
- **Error Handling**: Automatic error detection with scroll-to-error functionality
- **Manual Editing**: Optional manual adjustments with warnings
- **History Tracking**: Save and view previously generated timetables
- **JWT Authentication**: Secure user authentication system

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Pure CSS (Professional, clean design)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Edit `.env` file with your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/timetable_db
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

3. Start the backend server:
```bash
npm run server
```

### Frontend Setup

1. Navigate to client folder and install dependencies:
```bash
cd client
npm install
```

2. Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

### 1. Register/Login
Create an account or login to access the timetable generator.

### 2. Generate Timetable

Follow the 6-step wizard:

**Step 1: Basic Academic Info**
- College/Department Name
- Course/Branch
- Semester/Year
- Section (optional)

**Step 2: Working Days & Time**
- Working days (Mon-Fri or Mon-Sat)
- Daily start and end time
- Lecture duration (45 or 60 minutes)
- Lunch break configuration

**Step 3: Subject Details**
- Add subjects with weekly hours
- Configure multiple lectures per day
- Set max repeat per day

**Step 4: Faculty Availability**
- Add multiple teachers
- Assign subjects to teachers
- Define available days and time slots

**Step 5: Rules & Controls**
- Set max/min lectures per day
- Enable/disable manual editing

**Step 6: Review & Confirm**
- Review all inputs
- Confirm and generate

### 3. View & Save
- Review generated timetable
- Make manual edits if enabled
- Save to history
- Regenerate if needed

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get user data (protected)

### Timetable
- `POST /api/timetable/create` - Create timetable draft
- `POST /api/timetable/generate` - Generate timetable
- `POST /api/timetable/save` - Save generated timetable
- `GET /api/timetable/history` - Get user's timetable history
- `GET /api/timetable/:id` - Get specific timetable

## Project Structure

```
├── models/
│   ├── User.js
│   └── Timetable.js
├── routes/
│   ├── auth.js
│   └── timetable.js
├── middleware/
│   └── auth.js
├── utils/
│   └── timetableGenerator.js
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── TimetableDisplay.js
│       │   └── steps/
│       │       ├── Step1BasicInfo.js
│       │       ├── Step2WorkingDays.js
│       │       ├── Step3Subjects.js
│       │       ├── Step4Faculty.js
│       │       ├── Step5Rules.js
│       │       └── Step6Review.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── GenerateTimetable.js
│       │   └── History.js
│       ├── App.js
│       └── index.js
├── server.js
└── package.json
```

## Color Palette

- **Primary Blue**: #2563eb
- **Success Green**: #16a34a
- **Error Red**: #dc2626
- **Background**: White (#ffffff)
- **Text/Navbar/Footer**: Black (#000000)

## Error Handling

The system includes comprehensive error handling:
- Automatic scroll to error location
- Field-level error highlighting
- Clear error messages with suggestions
- Step-specific error navigation

## 📚 Complete Documentation

This project includes comprehensive documentation:

### 🎯 Getting Started
- **[WELCOME.md](WELCOME.md)** - Start here! Welcome guide with overview
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands and shortcuts
- **[START_APP.md](START_APP.md)** - How to start the application
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions

### 🧪 Testing & Development
- **[SAMPLE_DATA.md](SAMPLE_DATA.md)** - Test scenarios and sample data
- **[SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md)** - Architecture diagrams
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - File structure details

### 🚀 Deployment
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Production deployment guide

### 📊 Reference
- **[FINAL_SUMMARY.md](FINAL_SUMMARY.md)** - Complete project summary
- **[INDEX.md](INDEX.md)** - Documentation navigation index
- **[FILE_LIST.md](FILE_LIST.md)** - Complete file listing

---

## 🎯 What's Included

### ✅ 58 Files Created
- **12 Documentation files** - Complete guides and references
- **10 Backend files** - Express server, models, routes, algorithm
- **35 Frontend files** - React components, pages, styles
- **1 Configuration file** - Environment setup

### ✅ Production-Ready Features
- Multi-step form wizard (6 steps)
- Intelligent timetable generation
- Multiple teacher support
- Faculty availability management
- Smart error handling with auto-scroll
- JWT authentication
- MongoDB integration
- Responsive design
- Professional UI/UX

---

## 🏗️ Architecture

```
Frontend (React)  →  Backend (Express)  →  Database (MongoDB)
     ↓                      ↓                      ↓
  Components          API Routes              Collections
  Multi-step          Algorithm              users, timetables
  Pages               Middleware
```

See [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) for detailed diagrams.

---

## 🎨 Design Specifications

**Color Palette:**
- Primary Blue: `#2563eb`
- Success Green: `#16a34a`
- Error Red: `#dc2626`
- Background: `#ffffff`
- Text/Nav/Footer: `#000000`

**UI Principles:**
- Clean and professional
- No clutter
- College-level quality
- Minimal animations
- Intuitive navigation

---

## 🧪 Testing

Use the provided sample data for quick testing:

```bash
# See SAMPLE_DATA.md for complete test scenarios
```

**Quick Test Flow:**
1. Register account
2. Navigate through 6 steps
3. Generate timetable
4. Save and view in history

---

## 📞 Support

### Common Issues
- **MongoDB Error?** → Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Port Conflict?** → Change port in `.env`
- **Dependencies?** → Run `npm install`

### Documentation
- All questions answered in [INDEX.md](INDEX.md)
- Quick fixes in [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

## 🎉 Success Metrics

✅ Complete MERN stack application  
✅ 58 files created and configured  
✅ Multi-step wizard with 6 steps  
✅ Intelligent timetable generation  
✅ Comprehensive error handling  
✅ Professional UI/UX  
✅ JWT authentication  
✅ Production-ready code  

---

## 📖 Next Steps

1. **Start Now:** [WELCOME.md](WELCOME.md)
2. **Quick Start:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. **Full Setup:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
4. **Test Data:** [SAMPLE_DATA.md](SAMPLE_DATA.md)
5. **Deploy:** [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## License

MIT License

## Author

MERN Stack Developer

---

**Built with ❤️ using MERN Stack**

*Professional • Clean • Production-Ready*
