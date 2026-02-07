# System Architecture Diagram

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    REACT FRONTEND                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components:                                           │ │
│  │  - Navbar, Footer                                      │ │
│  │  - Home, Login, Register                               │ │
│  │  - GenerateTimetable (Multi-step Wizard)               │ │
│  │  - TimetableDisplay, History                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  State Management:                                     │ │
│  │  - Form Data (6 steps)                                 │ │
│  │  - Authentication (JWT token)                          │ │
│  │  - Generated Timetable                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Axios API Calls
                           │ (with JWT token)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   EXPRESS BACKEND                            │
│                  http://localhost:5000                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Middleware:                                           │ │
│  │  - CORS                                                │ │
│  │  - JSON Parser                                         │ │
│  │  - JWT Authentication                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Routes:                                               │ │
│  │  - /api/auth (register, login, user)                   │ │
│  │  - /api/timetable (create, generate, save, history)    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Utils:                                                │ │
│  │  - Timetable Generator Algorithm                       │ │
│  │  - Validation Logic                                    │ │
│  │  - Error Handling                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Mongoose ODM
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      MONGODB DATABASE                        │
│                  mongodb://localhost:27017                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Collections:                                          │ │
│  │  - users (email, password, name)                       │ │
│  │  - timetables (all form data + generated table)        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### User Registration Flow
```
User Input (Register Form)
    ↓
React Component (Register.js)
    ↓
Axios POST /api/auth/register
    ↓
Express Route (routes/auth.js)
    ↓
Validate Input (express-validator)
    ↓
Hash Password (bcryptjs)
    ↓
Save to MongoDB (User model)
    ↓
Generate JWT Token
    ↓
Return Token + User Data
    ↓
Store in localStorage
    ↓
Redirect to /generate
```

### Timetable Generation Flow
```
User Completes 6 Steps
    ↓
Form Data State (GenerateTimetable.js)
    ↓
Step 1: Basic Info → Next
Step 2: Schedule → Next
Step 3: Subjects → Next
Step 4: Faculty → Next
Step 5: Rules → Next
Step 6: Review → Generate
    ↓
Axios POST /api/timetable/generate
    ↓
Express Route (routes/timetable.js)
    ↓
Verify JWT Token (middleware/auth.js)
    ↓
Timetable Generator (utils/timetableGenerator.js)
    ↓
┌─────────────────────────────────┐
│  Algorithm Steps:               │
│  1. Validate Inputs             │
│  2. Generate Time Slots         │
│  3. Calculate Slots Needed      │
│  4. Check Availability          │
│  5. Allocate Subjects           │
│  6. Verify Faculty              │
│  7. Return Timetable or Error   │
└─────────────────────────────────┘
    ↓
Success: Return Timetable
Error: Return Error + Step Number
    ↓
Display Result (TimetableDisplay.js)
or Show Error (scroll to error)
    ↓
User Clicks Save
    ↓
POST /api/timetable/save
    ↓
Save to MongoDB
    ↓
Show in History
```

---

## 🎯 Component Hierarchy

```
App.js (Router + Auth State)
│
├── Navbar (always visible)
│
├── Routes:
│   │
│   ├── Home.js
│   │   ├── Hero Section
│   │   ├── Features Section
│   │   ├── About Section
│   │   └── Contact Section
│   │
│   ├── Login.js
│   │   └── Login Form
│   │
│   ├── Register.js
│   │   └── Register Form
│   │
│   ├── GenerateTimetable.js (Main Wizard)
│   │   ├── Progress Indicator
│   │   ├── Error Banner
│   │   ├── Step Container:
│   │   │   ├── Step1BasicInfo.js
│   │   │   ├── Step2WorkingDays.js
│   │   │   ├── Step3Subjects.js
│   │   │   ├── Step4Faculty.js
│   │   │   ├── Step5Rules.js
│   │   │   └── Step6Review.js
│   │   └── Navigation Buttons
│   │
│   ├── TimetableDisplay.js (After Generation)
│   │   ├── Timetable Header
│   │   ├── Timetable Table
│   │   ├── Warning Box
│   │   └── Action Buttons
│   │
│   └── History.js
│       ├── History Grid
│       └── History Cards
│
└── Footer (always visible)
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│  User Not Authenticated                                 │
│  ↓                                                       │
│  Tries to access /generate                              │
│  ↓                                                       │
│  React Router checks isAuthenticated                    │
│  ↓                                                       │
│  Redirects to /login                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  User Logs In                                           │
│  ↓                                                       │
│  POST /api/auth/login                                   │
│  ↓                                                       │
│  Backend verifies credentials                           │
│  ↓                                                       │
│  Returns JWT token                                      │
│  ↓                                                       │
│  Frontend stores in localStorage                        │
│  ↓                                                       │
│  Sets isAuthenticated = true                            │
│  ↓                                                       │
│  All API calls include token in header                  │
│  ↓                                                       │
│  Backend middleware verifies token                      │
│  ↓                                                       │
│  Adds user data to request                              │
│  ↓                                                       │
│  Route handler processes request                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🧮 Algorithm Logic Flow

```
┌─────────────────────────────────────────────────────────┐
│  INPUT: Form Data (6 steps)                             │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 1: Validate Inputs                                │
│  - Check required fields                                │
│  - Validate time ranges                                 │
│  - Verify subject data                                  │
│  - Confirm constraints                                  │
└────────────────────┬────────────────────────────────────┘
                     ↓
                  Valid?
                     ↓
              ┌──────┴──────┐
              │             │
             Yes           No
              │             │
              ↓             ↓
┌─────────────────────┐  ┌──────────────────────┐
│  STEP 2:            │  │  Return Error        │
│  Generate Slots     │  │  + Step Number       │
│  - Parse times      │  │  + Field Name        │
│  - Create slots     │  │  + Suggestion        │
│  - Add breaks       │  └──────────────────────┘
└──────────┬──────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 3: Calculate Requirements                         │
│  - Total slots needed per subject                       │
│  - Total available slots                                │
│  - Check if allocation possible                         │
└────────────────────┬────────────────────────────────────┘
                     ↓
              Sufficient Slots?
                     ↓
              ┌──────┴──────┐
              │             │
             Yes           No
              │             │
              ↓             ↓
┌─────────────────────┐  ┌──────────────────────┐
│  STEP 4:            │  │  Return Error:       │
│  Allocate Subjects  │  │  "Insufficient       │
│  - Loop subjects    │  │   slots available"   │
│  - Find free slots  │  └──────────────────────┘
│  - Check faculty    │
│  - Assign slots     │
└──────────┬──────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│  STEP 5: Verify Faculty Availability                    │
│  - Check teacher days                                   │
│  - Check time slots                                     │
│  - Prevent conflicts                                    │
└────────────────────┬────────────────────────────────────┘
                     ↓
              All Allocated?
                     ↓
              ┌──────┴──────┐
              │             │
             Yes           No
              │             │
              ↓             ↓
┌─────────────────────┐  ┌──────────────────────┐
│  STEP 6:            │  │  Return Error:       │
│  Return Timetable   │  │  "Faculty conflict"  │
│  - Format data      │  │  + Subject name      │
│  - Color code       │  │  + Suggestion        │
│  - Success message  │  └──────────────────────┘
└─────────────────────┘
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  createdAt: Date (default: now)
}
```

### Timetables Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  
  // Step 1
  collegeName: String,
  course: String,
  semester: String,
  section: String,
  
  // Step 2
  workingDays: String ('mon-fri' | 'mon-sat'),
  startTime: String,
  endTime: String,
  lectureDuration: Number (45 | 60),
  hasLunchBreak: Boolean,
  lunchStartTime: String,
  lunchEndTime: String,
  
  // Step 3
  subjects: [{
    name: String,
    hoursPerWeek: Number,
    allowMultiplePerDay: Boolean,
    maxRepeatPerDay: Number
  }],
  
  // Step 4
  faculty: [{
    name: String,
    subject: String,
    availableDays: [String],
    availableTimeSlots: [{
      start: String,
      end: String
    }]
  }],
  
  // Step 5
  maxLecturesPerDay: Number,
  minLecturesPerDay: Number,
  allowManualEdit: Boolean,
  
  // Generated
  generatedTable: Map,
  status: String ('draft' | 'generated' | 'saved'),
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 UI Component Structure

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (Black background)                              │
│  Logo | Home | Features | Generate | History | Login    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MAIN CONTENT AREA                                      │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Progress Bar (Blue)                              │ │
│  │  Step 3 of 6                                      │ │
│  │  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  STEP CONTENT (White card)                        │ │
│  │                                                   │ │
│  │  Form Fields                                      │ │
│  │  [Input boxes with labels]                        │ │
│  │  [Dropdowns, checkboxes, etc.]                    │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [Back Button]              [Next Button (Blue)]       │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  FOOTER (Black background)                              │
│  Links | Contact | Copyright                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management

```
App Level State:
├── isAuthenticated (boolean)
├── user (object: id, name, email)
└── token (string: JWT)

GenerateTimetable State:
├── currentStep (1-6)
├── formData (object with all fields)
├── errors (object with field errors)
├── generatedTimetable (object or null)
├── loading (boolean)
└── errorMessage (string)

Form Data Structure:
├── Step 1: collegeName, course, semester, section
├── Step 2: workingDays, times, duration, lunch
├── Step 3: subjects array
├── Step 4: faculty array
└── Step 5: maxLectures, minLectures, allowEdit
```

---

## 🚀 Request/Response Flow

### Generate Timetable Request
```
Frontend → Backend

POST /api/timetable/generate
Headers: {
  'x-auth-token': 'jwt_token_here',
  'Content-Type': 'application/json'
}
Body: {
  collegeName, course, semester, section,
  workingDays, startTime, endTime, lectureDuration,
  hasLunchBreak, lunchStartTime, lunchEndTime,
  subjects: [...],
  faculty: [...],
  maxLecturesPerDay, minLecturesPerDay,
  allowManualEdit
}
```

### Success Response
```
Backend → Frontend

Status: 200
Body: {
  success: true,
  timetable: {
    Monday: [
      { time: '09:00-10:00', subject: 'Math', faculty: 'Dr. Smith', type: 'lecture' },
      { time: '10:00-11:00', subject: 'Physics', faculty: 'Prof. Jones', type: 'lecture' },
      ...
    ],
    Tuesday: [...],
    ...
  },
  message: 'Timetable generated successfully'
}
```

### Error Response
```
Backend → Frontend

Status: 400
Body: {
  success: false,
  message: 'Insufficient slots available. Need 30 slots but only 25 available.',
  errorField: 'subjects',
  errorStep: 3
}
```

---

This architecture ensures clean separation of concerns, scalability, and maintainability!
