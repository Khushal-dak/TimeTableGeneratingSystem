# Sample Test Data

Use this sample data to quickly test the timetable generator.

## Sample 1: Computer Science - Semester 5

### Step 1: Basic Information
```
College Name: Department of Computer Science
Course: B.Tech Computer Science
Semester: Semester 5
Section: A
```

### Step 2: Working Days & Time
```
Working Days: Monday to Friday
Start Time: 09:00
End Time: 17:00
Lecture Duration: 60 minutes
Lunch Break: Yes
Lunch Start: 13:00
Lunch End: 14:00
```

### Step 3: Subjects
```
1. Data Structures and Algorithms
   - Hours per Week: 4
   - Allow Multiple per Day: No
   - Max Repeat: 1

2. Operating Systems
   - Hours per Week: 4
   - Allow Multiple per Day: No
   - Max Repeat: 1

3. Database Management Systems
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1

4. Computer Networks
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1

5. Software Engineering
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1

6. Web Technologies
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1
```

### Step 4: Faculty (Optional)
```
Teacher 1:
- Name: Dr. John Smith
- Subject: Data Structures and Algorithms
- Available Days: Mon, Tue, Wed, Thu, Fri
- Time Slots: 09:00 - 17:00

Teacher 2:
- Name: Prof. Sarah Johnson
- Subject: Operating Systems
- Available Days: Mon, Wed, Fri
- Time Slots: 09:00 - 16:00

Teacher 3:
- Name: Dr. Michael Brown
- Subject: Database Management Systems
- Available Days: Tue, Thu, Fri
- Time Slots: 10:00 - 17:00

Teacher 4:
- Name: Prof. Emily Davis
- Subject: Computer Networks
- Available Days: Mon, Tue, Wed, Thu
- Time Slots: 09:00 - 15:00

Teacher 5:
- Name: Dr. Robert Wilson
- Subject: Software Engineering
- Available Days: Mon, Tue, Wed, Thu, Fri
- Time Slots: 11:00 - 17:00

Teacher 6:
- Name: Prof. Lisa Anderson
- Subject: Web Technologies
- Available Days: Wed, Thu, Fri
- Time Slots: 09:00 - 16:00
```

### Step 5: Rules
```
Max Lectures per Day: 6
Min Lectures per Day: 4
Allow Manual Edit: Yes
```

---

## Sample 2: Minimal Setup (Quick Test)

### Step 1: Basic Information
```
College Name: Engineering College
Course: B.Tech
Semester: 3
Section: (leave empty)
```

### Step 2: Working Days & Time
```
Working Days: Monday to Friday
Start Time: 09:00
End Time: 15:00
Lecture Duration: 60 minutes
Lunch Break: No
```

### Step 3: Subjects
```
1. Mathematics
   - Hours per Week: 4
   - Allow Multiple per Day: Yes
   - Max Repeat: 2

2. Physics
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1

3. Chemistry
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1
```

### Step 4: Faculty
```
Skip (Click No)
```

### Step 5: Rules
```
Max Lectures per Day: 5
Min Lectures per Day: 3
Allow Manual Edit: Yes
```

---

## Sample 3: 6-Day Week with Multiple Teachers

### Step 1: Basic Information
```
College Name: Institute of Technology
Course: B.E. Electronics
Semester: Year 2
Section: B
```

### Step 2: Working Days & Time
```
Working Days: Monday to Saturday
Start Time: 08:00
End Time: 16:00
Lecture Duration: 45 minutes
Lunch Break: Yes
Lunch Start: 12:00
Lunch End: 13:00
```

### Step 3: Subjects
```
1. Digital Electronics
   - Hours per Week: 5
   - Allow Multiple per Day: Yes
   - Max Repeat: 2

2. Microprocessors
   - Hours per Week: 4
   - Allow Multiple per Day: No
   - Max Repeat: 1

3. Signals and Systems
   - Hours per Week: 4
   - Allow Multiple per Day: No
   - Max Repeat: 1

4. Control Systems
   - Hours per Week: 3
   - Allow Multiple per Day: No
   - Max Repeat: 1

5. Communication Systems
   - Hours per Week: 4
   - Allow Multiple per Day: No
   - Max Repeat: 1
```

### Step 4: Faculty
```
Teacher 1:
- Name: Dr. Kumar
- Subject: Digital Electronics
- Available Days: All days
- Time Slots: 08:00 - 16:00

Teacher 2:
- Name: Prof. Sharma
- Subject: Microprocessors
- Available Days: Mon, Wed, Fri, Sat
- Time Slots: 09:00 - 15:00

Teacher 3:
- Name: Dr. Patel
- Subject: Signals and Systems
- Available Days: Tue, Thu, Fri, Sat
- Time Slots: 08:00 - 14:00

Teacher 4:
- Name: Prof. Reddy
- Subject: Control Systems
- Available Days: Mon, Tue, Wed, Thu
- Time Slots: 10:00 - 16:00

Teacher 5:
- Name: Dr. Singh
- Subject: Communication Systems
- Available Days: All days
- Time Slots: 08:00 - 16:00
```

### Step 5: Rules
```
Max Lectures per Day: 7
Min Lectures per Day: 5
Allow Manual Edit: No
```

---

## Sample 4: Error Testing (Insufficient Slots)

This will intentionally cause an error to test error handling:

### Step 1-2: Same as Sample 1

### Step 3: Subjects (TOO MANY HOURS)
```
1. Subject A - 10 hours/week
2. Subject B - 10 hours/week
3. Subject C - 10 hours/week
4. Subject D - 10 hours/week
5. Subject E - 10 hours/week
```

**Expected Result:** Error message about insufficient slots

---

## Sample 5: Faculty Conflict Testing

### Step 1-3: Same as Sample 1

### Step 4: Faculty (RESTRICTED AVAILABILITY)
```
Teacher 1:
- Name: Dr. Test
- Subject: Data Structures and Algorithms
- Available Days: Monday only
- Time Slots: 09:00 - 11:00
```

**Expected Result:** Error about faculty availability being too restrictive

---

## API Testing Sample (Postman)

### Register User
```json
POST http://localhost:5000/api/auth/register

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123456"
}
```

### Login
```json
POST http://localhost:5000/api/auth/login

{
  "email": "test@example.com",
  "password": "test123456"
}
```

### Generate Timetable
```json
POST http://localhost:5000/api/timetable/generate
Headers: x-auth-token: <your_token_here>

{
  "collegeName": "CS Department",
  "course": "B.Tech CS",
  "semester": "5",
  "section": "A",
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
    },
    {
      "name": "Operating Systems",
      "hoursPerWeek": 4,
      "allowMultiplePerDay": false,
      "maxRepeatPerDay": 1
    },
    {
      "name": "DBMS",
      "hoursPerWeek": 3,
      "allowMultiplePerDay": false,
      "maxRepeatPerDay": 1
    }
  ],
  "faculty": [
    {
      "name": "Dr. Smith",
      "subject": "Data Structures",
      "availableDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "availableTimeSlots": [
        {
          "start": "09:00",
          "end": "17:00"
        }
      ]
    }
  ],
  "maxLecturesPerDay": 6,
  "minLecturesPerDay": 4,
  "allowManualEdit": true
}
```

---

## Quick Copy-Paste Values

### Common College Names
- Department of Computer Science
- School of Engineering
- Institute of Technology
- College of Engineering and Technology
- Faculty of Science and Technology

### Common Courses
- B.Tech Computer Science
- B.E. Electronics
- B.Sc. Information Technology
- M.Tech Software Engineering
- BCA

### Common Semesters
- Semester 1, Semester 2, ... Semester 8
- Year 1, Year 2, Year 3, Year 4
- First Year, Second Year, etc.

### Common Subject Names
- Data Structures and Algorithms
- Operating Systems
- Database Management Systems
- Computer Networks
- Software Engineering
- Web Technologies
- Machine Learning
- Artificial Intelligence
- Cloud Computing
- Cyber Security
- Mobile Application Development
- Object Oriented Programming

### Common Teacher Names
- Dr. John Smith
- Prof. Sarah Johnson
- Dr. Michael Brown
- Prof. Emily Davis
- Dr. Robert Wilson
- Prof. Lisa Anderson
- Dr. James Taylor
- Prof. Maria Garcia

---

## Testing Scenarios

### ✅ Success Scenarios
1. **Basic 5-day week** - Sample 1
2. **Minimal setup** - Sample 2
3. **6-day week** - Sample 3
4. **Without faculty** - Sample 2
5. **With multiple teachers** - Sample 1

### ❌ Error Scenarios
1. **Insufficient slots** - Sample 4
2. **Faculty conflicts** - Sample 5
3. **Invalid time range** - End time before start time
4. **Empty subjects** - No subjects added
5. **Max < Min lectures** - Max: 3, Min: 5

### 🔄 Edge Cases
1. **Single subject** - Only 1 subject
2. **Maximum subjects** - 15+ subjects
3. **Very short day** - 09:00 to 11:00
4. **Very long day** - 08:00 to 20:00
5. **45-minute lectures** - Test with 45 min duration
6. **No lunch break** - Test without break
7. **Long lunch break** - 2-hour lunch

---

Use these samples to thoroughly test your timetable generator!
