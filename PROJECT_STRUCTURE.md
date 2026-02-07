# Project Structure

```
college-timetable-generator/
│
├── 📁 models/                          # MongoDB Schemas
│   ├── User.js                         # User authentication model
│   └── Timetable.js                    # Timetable data model
│
├── 📁 routes/                          # API Routes
│   ├── auth.js                         # Authentication endpoints
│   └── timetable.js                    # Timetable CRUD operations
│
├── 📁 middleware/                      # Express Middleware
│   └── auth.js                         # JWT authentication middleware
│
├── 📁 utils/                           # Utility Functions
│   └── timetableGenerator.js          # Core algorithm for timetable generation
│
├── 📁 client/                          # React Frontend
│   ├── 📁 public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/              # Reusable Components
│   │   │   ├── Navbar.js               # Navigation bar
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.js               # Footer component
│   │   │   ├── Footer.css
│   │   │   ├── TimetableDisplay.js     # Display generated timetable
│   │   │   ├── TimetableDisplay.css
│   │   │   │
│   │   │   └── 📁 steps/               # Multi-step Form Components
│   │   │       ├── Step1BasicInfo.js   # College/Course details
│   │   │       ├── Step2WorkingDays.js # Schedule configuration
│   │   │       ├── Step3Subjects.js    # Subject management
│   │   │       ├── Step4Faculty.js     # Faculty availability
│   │   │       ├── Step5Rules.js       # Constraints & rules
│   │   │       ├── Step6Review.js      # Review before generation
│   │   │       └── Steps.css           # Shared step styles
│   │   │
│   │   ├── 📁 pages/                   # Page Components
│   │   │   ├── Home.js                 # Landing page
│   │   │   ├── Home.css
│   │   │   ├── Login.js                # Login page
│   │   │   ├── Register.js             # Registration page
│   │   │   ├── Auth.css                # Auth pages styles
│   │   │   ├── GenerateTimetable.js    # Main wizard page
│   │   │   ├── GenerateTimetable.css
│   │   │   ├── History.js              # Saved timetables
│   │   │   └── History.css
│   │   │
│   │   ├── App.js                      # Main app component
│   │   ├── App.css                     # Global styles
│   │   ├── index.js                    # React entry point
│   │   └── index.css                   # Base styles
│   │
│   ├── package.json                    # Frontend dependencies
│   └── .gitignore
│
├── server.js                           # Express server entry point
├── package.json                        # Backend dependencies
├── .env                                # Environment variables
├── .gitignore                          # Git ignore rules
│
├── 📄 README.md                        # Main documentation
├── 📄 SETUP_GUIDE.md                   # Detailed setup instructions
├── 📄 START_APP.md                     # Quick start guide
└── 📄 PROJECT_STRUCTURE.md             # This file

```

## File Descriptions

### Backend Files

#### `server.js`
- Express server configuration
- MongoDB connection
- Route mounting
- Error handling middleware

#### `models/User.js`
- User schema with email, password, name
- Used for authentication

#### `models/Timetable.js`
- Complete timetable data structure
- Stores all form inputs and generated table
- Links to user via userId

#### `routes/auth.js`
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/user` - Get user data

#### `routes/timetable.js`
- POST `/api/timetable/create` - Save draft
- POST `/api/timetable/generate` - Generate timetable
- POST `/api/timetable/save` - Save final timetable
- GET `/api/timetable/history` - Get user's history
- GET `/api/timetable/:id` - Get specific timetable

#### `middleware/auth.js`
- JWT token verification
- Protects private routes
- Adds user data to request

#### `utils/timetableGenerator.js`
- Core scheduling algorithm
- Validates inputs
- Generates time slots
- Allocates subjects to slots
- Respects faculty availability
- Returns errors with specific step info

### Frontend Files

#### `App.js`
- Main application component
- Routing configuration
- Authentication state management
- Protected route handling

#### `components/Navbar.js`
- Fixed navigation bar
- Conditional rendering based on auth
- Links to all pages

#### `components/Footer.js`
- Site footer with links
- Contact information
- Copyright notice

#### `components/TimetableDisplay.js`
- Displays generated timetable in table format
- Color-coded cells (lectures, breaks)
- Save and regenerate buttons
- Manual edit warning

#### `pages/Home.js`
- Landing page
- Hero section with CTA
- Features showcase
- About section
- Contact information

#### `pages/Login.js` & `pages/Register.js`
- Authentication forms
- Error handling
- Redirect after success

#### `pages/GenerateTimetable.js`
- Multi-step wizard controller
- Form state management
- Step validation
- Error handling with scroll-to-error
- API integration

#### `pages/History.js`
- Display saved timetables
- Grid layout
- Empty state handling

#### Step Components (`components/steps/`)
Each step is a separate component:
- **Step1**: Basic academic information
- **Step2**: Working days and timing
- **Step3**: Subject details with dynamic rows
- **Step4**: Faculty availability (multiple teachers)
- **Step5**: Rules and constraints
- **Step6**: Review all inputs before generation

## Data Flow

### Registration/Login Flow
```
User Input → Login/Register Component → API Call → Backend Auth Route
→ JWT Token Generated → Stored in localStorage → User Authenticated
```

### Timetable Generation Flow
```
Step 1-6 Forms → Form Data State → Review Step → Generate Button
→ API Call with Token → Backend Generator → Algorithm Processing
→ Success/Error Response → Display Timetable or Show Error
→ Save Button → Store in MongoDB → History Page
```

### Error Handling Flow
```
Error Occurs → Backend Returns Error with Step Number
→ Frontend Receives Error → Sets Current Step to Error Step
→ Scrolls to Error Location → Highlights Error Field
→ Shows Clear Error Message
```

## Color Scheme

```css
Primary Blue:    #2563eb  (Buttons, Links, Headings)
Success Green:   #16a34a  (Success messages, Breaks)
Error Red:       #dc2626  (Errors, Delete buttons)
Background:      #ffffff  (Main background)
Text Black:      #000000  (Text, Navbar, Footer)
Gray Shades:     #f3f4f6, #e5e7eb, #d1d5db, #4b5563
```

## Key Features Implementation

### Multi-Step Form
- State managed in `GenerateTimetable.js`
- Each step is a separate component
- Progress indicator shows current step
- Validation before moving to next step
- Back button to return to previous step

### Error Handling
- Field-level validation
- Step-level validation
- API error handling
- Automatic scroll to error
- Error highlighting with red border
- Clear error messages

### Faculty Management
- Dynamic teacher addition/removal
- Subject assignment dropdown
- Multiple available days (checkboxes)
- Multiple time slots per teacher
- Add/remove time slot functionality

### Timetable Algorithm
- Time slot generation based on duration
- Lunch break handling
- Subject allocation with constraints
- Faculty availability checking
- Conflict detection
- Insufficient slots detection

## Technologies Used

### Backend
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Input validation
- **cors**: Cross-origin requests
- **dotenv**: Environment variables

### Frontend
- **React**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **Pure CSS**: Styling (no frameworks)

## Development Workflow

1. **Backend Development**
   - Create models
   - Build API routes
   - Implement authentication
   - Develop algorithm
   - Test with Postman

2. **Frontend Development**
   - Create components
   - Build pages
   - Implement routing
   - Connect to API
   - Style with CSS

3. **Integration**
   - Connect frontend to backend
   - Test full flow
   - Handle errors
   - Optimize performance

4. **Testing**
   - Test all user flows
   - Verify error handling
   - Check responsive design
   - Validate algorithm

## Future Enhancements

- PDF/Excel export
- Email notifications
- Admin dashboard
- Subscription plans
- Timetable templates
- Conflict resolution UI
- Mobile app
- Calendar integration
