# 🧪 Testing the New Algorithm

## Quick Test Guide

The algorithm has been updated to **ALWAYS generate a timetable**. Let's test it!

---

## ✅ Test 1: Normal Case (Should work perfectly)

### Input Data
```
Step 1:
- College: CS Department
- Course: B.Tech CS
- Semester: 5

Step 2:
- Days: Monday-Friday
- Time: 09:00 - 17:00
- Duration: 60 minutes
- Lunch: Yes (13:00-14:00)

Step 3: Add 4 subjects
1. Data Structures - 4 hrs/week
2. Operating Systems - 4 hrs/week
3. DBMS - 3 hrs/week
4. Networks - 3 hrs/week

Step 4: Skip faculty

Step 5:
- Max: 6
- Min: 4
```

**Expected Result:** ✅ Timetable generated without warnings

---

## ⚠️ Test 2: Insufficient Slots (Should auto-adjust)

### Input Data
```
Step 1:
- College: Engineering College
- Course: B.Tech
- Semester: 3

Step 2:
- Days: Monday-Friday
- Time: 09:00 - 13:00  ← Only 4 hours!
- Duration: 60 minutes
- Lunch: No

Step 3: Add 6 subjects (too many for 4 hours)
1. Math - 4 hrs/week
2. Physics - 4 hrs/week
3. Chemistry - 4 hrs/week
4. English - 3 hrs/week
5. Programming - 4 hrs/week
6. Electronics - 3 hrs/week

Step 4: Skip

Step 5:
- Max: 5
- Min: 3
```

**Expected Result:** ✅ Timetable generated with warning:
```
⚠️ Insufficient slots (need 22, have 20). Auto-adjusting subject hours...
```

---

## 🎓 Test 3: Restrictive Faculty (Should relax constraints)

### Input Data
```
Step 1:
- College: Tech Institute
- Course: MCA
- Semester: 2

Step 2:
- Days: Monday-Friday
- Time: 09:00 - 16:00
- Duration: 60 minutes
- Lunch: Yes (13:00-14:00)

Step 3: Add 3 subjects
1. DSA - 5 hrs/week
2. Java - 4 hrs/week
3. Web Tech - 3 hrs/week

Step 4: Add VERY restrictive faculty
Teacher 1:
- Name: Dr. Smith
- Subject: DSA
- Days: Monday, Tuesday ONLY  ← Very restrictive!
- Time: 09:00 - 11:00 ONLY  ← Very restrictive!

Step 5:
- Max: 6
- Min: 4
```

**Expected Result:** ✅ Timetable generated with warnings:
```
⚠️ Relaxing faculty time constraints to fit all lectures
⚠️ Allowing flexible subject distribution across days
```

---

## 🚀 Test 4: Extreme Case (Should use AI-assisted)

### Input Data
```
Step 1:
- College: University
- Course: B.Sc IT
- Semester: 4

Step 2:
- Days: Monday-Wednesday ONLY  ← Only 3 days!
- Time: 10:00 - 14:00  ← Only 4 hours!
- Duration: 60 minutes
- Lunch: No

Step 3: Add 8 subjects (way too many!)
1. Subject A - 4 hrs
2. Subject B - 4 hrs
3. Subject C - 3 hrs
4. Subject D - 3 hrs
5. Subject E - 3 hrs
6. Subject F - 3 hrs
7. Subject G - 2 hrs
8. Subject H - 2 hrs

Step 4: Skip

Step 5:
- Max: 5
- Min: 2
```

**Expected Result:** ✅ Timetable generated with warnings:
```
⚠️ Insufficient slots (need 24, have 12). Auto-adjusting subject hours...
⚠️ Using AI-assisted optimization for remaining lectures
```

---

## 🎯 Test 5: Priority System (Core subjects first)

### Input Data
```
Step 1-2: Standard setup (Mon-Fri, 09:00-17:00)

Step 3: Mix of core and non-core subjects
1. Elective A - 3 hrs/week
2. Data Structures - 4 hrs/week  ← Core subject
3. Elective B - 2 hrs/week
4. Operating Systems - 4 hrs/week  ← Core subject
5. Elective C - 3 hrs/week

Step 4-5: Standard
```

**Expected Result:** ✅ Timetable shows DSA and OS scheduled in better time slots (earlier in the day/week)

---

## 📊 What to Check

### 1. Timetable Always Generates
- ✅ No blocking errors
- ✅ Always shows timetable table
- ✅ Can click "Save Timetable"

### 2. Warnings Display
- ✅ Yellow warning box appears when needed
- ✅ Lists all auto-adjustments
- ✅ Includes helpful note

### 3. Priority Works
- ✅ Core subjects (DSA, OS, DBMS) scheduled first
- ✅ Higher hour subjects get priority
- ✅ Electives fill remaining slots

### 4. Constraints Relaxed Properly
- ✅ Phase 1: Strict (no warnings)
- ✅ Phase 2: Relaxed faculty time (warning)
- ✅ Phase 3: Flexible distribution (warning)
- ✅ Phase 4: AI-assisted (warning)

---

## 🔍 How to Test

### Step-by-Step
1. **Open browser:** http://localhost:3000
2. **Login** with your account
3. **Click "Generate Timetable"**
4. **Fill in test data** from above
5. **Click through all 6 steps**
6. **Click "Generate Timetable"**
7. **Check results:**
   - Timetable displays? ✅
   - Warnings shown (if applicable)? ✅
   - Can save? ✅

### Quick Test (2 minutes)
Use **Test 1** for quick verification that system works.

### Stress Test (5 minutes)
Use **Test 4** to verify extreme cases are handled.

---

## ✅ Success Criteria

### All Tests Should:
- ✅ Generate a timetable (no errors)
- ✅ Show appropriate warnings
- ✅ Allow saving
- ✅ Display in history

### NO Test Should:
- ❌ Show blocking error
- ❌ Stop at final step
- ❌ Prevent timetable generation
- ❌ Crash the system

---

## 🐛 If Something Goes Wrong

### Check Backend
```bash
# View backend logs
# Process ID: 2
```

### Check Frontend
```bash
# Check browser console (F12)
# Look for errors
```

### Restart Servers
```bash
# Stop both processes
# Restart: npm run server
# Restart: cd client && npm start
```

---

## 📝 Expected Behavior Summary

| Test | Slots Needed | Slots Available | Result | Warnings |
|------|--------------|-----------------|--------|----------|
| Test 1 | 14 | 30 | ✅ Perfect | None |
| Test 2 | 22 | 20 | ✅ Adjusted | Insufficient slots |
| Test 3 | 12 | 30 | ✅ Relaxed | Faculty constraints |
| Test 4 | 24 | 12 | ✅ AI-assisted | Multiple warnings |
| Test 5 | 16 | 30 | ✅ Prioritized | None |

---

## 🎉 Success!

If all tests pass, the new algorithm is working perfectly!

**Key Achievement:** 100% success rate for timetable generation! 🚀

---

**Test Date:** February 7, 2026
**Algorithm Version:** 2.0
**Status:** Ready for Testing
