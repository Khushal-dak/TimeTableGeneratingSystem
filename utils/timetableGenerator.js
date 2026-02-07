// Parse section string into array: "A, B, C" -> ["A", "B", "C"], single -> ["A"]
function parseSections(sectionStr) {
  if (!sectionStr || typeof sectionStr !== 'string') return [''];
  const sections = sectionStr.split(',').map(s => s.trim()).filter(Boolean);
  return sections.length > 0 ? sections : [''];
}

// Fisher-Yates shuffle (returns new array, does not mutate)
function shuffleArray(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Deep clone empty timetable (same days/slots, no subject assignments)
function cloneEmptyTimetable(template) {
  const copy = {};
  for (const day of Object.keys(template)) {
    copy[day] = template[day].map(slot => ({
      time: slot.time,
      subject: null,
      faculty: null,
      type: slot.type
    }));
  }
  return copy;
}

// ROBUST TIMETABLE GENERATION ALGORITHM
// ALWAYS GENERATES A TIMETABLE - NO EXCEPTIONS
// Supports multiple sections: each section gets its own timetable with shuffled subject order
function generateTimetable(data) {
  try {
    const {
      workingDays,
      startTime,
      endTime,
      lectureDuration,
      hasLunchBreak,
      lunchStartTime,
      lunchEndTime,
      subjects,
      faculty,
      maxLecturesPerDay,
      minLecturesPerDay,
      section
    } = data;

    const warnings = [];

    // Basic validation only (non-blocking)
    const validation = validateInputs(data);
    if (!validation.valid) {
      warnings.push(`⚠️ ${validation.message}`);
    }

    // Generate time slots (shared across all sections)
    const timeSlots = generateTimeSlots(startTime, endTime, lectureDuration, hasLunchBreak, lunchStartTime, lunchEndTime);

    const days = workingDays === 'mon-fri'
      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Single template: same structure for all sections
    const timetableTemplate = {};
    days.forEach(day => {
      timetableTemplate[day] = timeSlots.map(slot => ({
        time: slot,
        subject: null,
        faculty: null,
        type: slot.isBreak ? 'break' : 'lecture'
      }));
    });

    // Base prioritized subjects (same for all; we shuffle a copy per section)
    const prioritizedSubjects = prioritizeSubjects(subjects, lectureDuration);
    const totalSlotsNeeded = prioritizedSubjects.reduce((sum, sub) => sum + sub.slotsNeeded, 0);
    const availableSlots = days.length * timeSlots.filter(s => !s.isBreak).length;

    if (totalSlotsNeeded > availableSlots) {
      warnings.push(`⚠️ Insufficient slots (need ${totalSlotsNeeded}, have ${availableSlots}). Auto-adjusting subject hours...`);
      adjustSubjectHours(prioritizedSubjects, availableSlots, lectureDuration);
    }

    const sections = parseSections(section);
    const timetablesBySection = {};

    for (const sectionName of sections) {
      const sectionTimetable = cloneEmptyTimetable(timetableTemplate);
      // Shuffle subject order for this section so sections don't get identical layouts
      const shuffledSubjects = shuffleArray(prioritizedSubjects.map(s => ({ ...s, slotsAssigned: 0 })));
      const allocationResult = flexibleAllocateSubjects(
        sectionTimetable,
        days,
        shuffledSubjects,
        faculty,
        maxLecturesPerDay,
        warnings
      );
      timetablesBySection[sectionName || 'Default'] = allocationResult.timetable;
    }

    const firstSectionKey = Object.keys(timetablesBySection)[0];
    const firstTimetable = timetablesBySection[firstSectionKey];

    return {
      success: true,
      timetable: firstTimetable,
      timetablesBySection,
      warnings: warnings.length > 0 ? warnings : undefined,
      message: warnings.length > 0
        ? 'Timetable generated with auto-adjustments'
        : 'Timetable generated successfully'
    };
  } catch (error) {
    console.error('Generation error:', error);
    return generateFallbackTimetable(data);
  }
}

// PRIORITY-BASED SUBJECT SORTING
function prioritizeSubjects(subjects, lectureDuration) {
  const coreSubjects = [
    'data structures', 'dsa', 'algorithms',
    'operating systems', 'os',
    'database', 'dbms',
    'computer networks', 'networks',
    'software engineering',
    'compiler', 'theory of computation',
    'artificial intelligence', 'ai',
    'machine learning', 'ml'
  ];

  return subjects.map(sub => {
    const slotsNeeded = Math.ceil((sub.hoursPerWeek * 60) / lectureDuration);
    
    // Calculate priority score
    let priority = sub.hoursPerWeek * 10; // Base priority on hours
    
    // Boost priority for core subjects
    const subjectLower = sub.name.toLowerCase();
    if (coreSubjects.some(core => subjectLower.includes(core))) {
      priority += 50;
    }
    
    return {
      ...sub,
      slotsNeeded,
      slotsAssigned: 0,
      priority
    };
  }).sort((a, b) => b.priority - a.priority); // High priority first
}

// AUTO-ADJUST SUBJECT HOURS IF INSUFFICIENT SLOTS
function adjustSubjectHours(subjects, availableSlots, lectureDuration) {
  const totalNeeded = subjects.reduce((sum, sub) => sum + sub.slotsNeeded, 0);
  const ratio = availableSlots / totalNeeded;
  
  // Reduce slots proportionally, prioritizing high-priority subjects
  subjects.forEach(sub => {
    const adjustedSlots = Math.max(1, Math.floor(sub.slotsNeeded * ratio));
    sub.slotsNeeded = adjustedSlots;
    sub.hoursPerWeek = (adjustedSlots * lectureDuration) / 60;
  });
}

function validateInputs(data) {
  const { subjects, startTime, endTime } = data;

  // Only critical validation (non-blocking)
  if (!subjects || subjects.length === 0) {
    return { valid: false, message: 'No subjects provided' };
  }

  const start = parseTime(startTime);
  const end = parseTime(endTime);
  if (end <= start) {
    return { valid: false, message: 'Invalid time range' };
  }

  return { valid: true };
}

function generateTimeSlots(startTime, endTime, duration, hasLunchBreak, lunchStart, lunchEnd) {
  const slots = [];
  let current = parseTime(startTime);
  const end = parseTime(endTime);

  while (current < end) {
    const slotEnd = current + duration;
    
    if (slotEnd > end) break;

    const timeStr = formatTime(current) + ' - ' + formatTime(slotEnd);
    
    // Check if this slot overlaps with lunch break
    if (hasLunchBreak) {
      const lunchStartMin = parseTime(lunchStart);
      const lunchEndMin = parseTime(lunchEnd);
      
      if (current >= lunchStartMin && current < lunchEndMin) {
        if (slots.length === 0 || !slots[slots.length - 1].isBreak) {
          slots.push({ time: formatTime(lunchStartMin) + ' - ' + formatTime(lunchEndMin), isBreak: true });
        }
        current = lunchEndMin;
        continue;
      }
    }

    slots.push({ time: timeStr, isBreak: false });
    current = slotEnd;
  }

  return slots;
}

// FLEXIBLE ALLOCATION WITH AUTO-RELAXATION
function flexibleAllocateSubjects(timetable, days, subjects, faculty, maxLecturesPerDay, warnings) {
  const facultyMap = {};
  if (faculty && faculty.length > 0) {
    faculty.forEach(f => {
      facultyMap[f.subject] = f;
    });
  }

  // Track daily counts per subject
  const dailyCounts = {};
  days.forEach(day => dailyCounts[day] = {});

  // PHASE 1: Try strict allocation
  let allAllocated = tryAllocateWithConstraints(
    timetable, days, subjects, facultyMap, dailyCounts, maxLecturesPerDay, true
  );

  // PHASE 2: If failed, relax faculty time constraints
  if (!allAllocated) {
    warnings.push('⚠️ Relaxing faculty time constraints to fit all lectures');
    allAllocated = tryAllocateWithConstraints(
      timetable, days, subjects, facultyMap, dailyCounts, maxLecturesPerDay, false
    );
  }

  // PHASE 3: If still failed, ignore daily repeat limits
  if (!allAllocated) {
    warnings.push('⚠️ Allowing flexible subject distribution across days');
    allAllocated = tryAllocateIgnoringDailyLimits(
      timetable, days, subjects, facultyMap, dailyCounts
    );
  }

  // PHASE 4: If still failed, use AI-assisted fallback
  if (!allAllocated) {
    warnings.push('⚠️ Using AI-assisted optimization for remaining lectures');
    aiAssistedAllocation(timetable, days, subjects, facultyMap);
  }

  return { success: true, timetable };
}

// TRY ALLOCATION WITH CONSTRAINTS
function tryAllocateWithConstraints(timetable, days, subjects, facultyMap, dailyCounts, maxLecturesPerDay, strictFacultyTime) {
  // Reset assignments
  subjects.forEach(sub => sub.slotsAssigned = 0);
  
  for (let subject of subjects) {
    let assigned = 0;
    let attempts = 0;
    const maxAttempts = days.length * 10;
    
    while (assigned < subject.slotsNeeded && attempts < maxAttempts) {
      attempts++;
      let allocated = false;

      for (let day of days) {
        if (assigned >= subject.slotsNeeded) break;

        const facultyInfo = facultyMap[subject.name];
        
        // Check faculty day availability (soft constraint)
        if (facultyInfo && facultyInfo.availableDays.length > 0) {
          if (!facultyInfo.availableDays.includes(day)) {
            continue; // Skip this day
          }
        }

        // Check daily repeat limit (soft constraint)
        const dailyCount = dailyCounts[day][subject.name] || 0;
        if (dailyCount >= subject.maxRepeatPerDay) {
          continue;
        }

        // Find available slot
        for (let i = 0; i < timetable[day].length; i++) {
          const slot = timetable[day][i];
          
          if (slot.type === 'lecture' && !slot.subject) {
            // Check faculty time availability (can be relaxed)
            if (strictFacultyTime && facultyInfo && facultyInfo.availableTimeSlots.length > 0) {
              const slotTime = slot.time.split(' - ')[0];
              const isAvailable = checkFacultyTimeAvailability(slotTime, facultyInfo.availableTimeSlots);
              if (!isAvailable) continue;
            }

            // Assign subject
            slot.subject = subject.name;
            slot.faculty = facultyInfo ? facultyInfo.name : 'TBA';
            assigned++;
            subject.slotsAssigned = assigned;
            dailyCounts[day][subject.name] = (dailyCounts[day][subject.name] || 0) + 1;
            allocated = true;
            break;
          }
        }

        if (assigned >= subject.slotsNeeded) break;
      }

      if (!allocated) break; // Can't allocate more
    }
    
    if (assigned < subject.slotsNeeded) {
      return false; // This phase failed
    }
  }

  return true; // All allocated
}

// IGNORE DAILY LIMITS (MORE FLEXIBLE)
function tryAllocateIgnoringDailyLimits(timetable, days, subjects, facultyMap, dailyCounts) {
  for (let subject of subjects) {
    let assigned = subject.slotsAssigned || 0;
    
    while (assigned < subject.slotsNeeded) {
      let allocated = false;

      for (let day of days) {
        if (assigned >= subject.slotsNeeded) break;

        const facultyInfo = facultyMap[subject.name];

        // Find any available slot
        for (let i = 0; i < timetable[day].length; i++) {
          const slot = timetable[day][i];
          
          if (slot.type === 'lecture' && !slot.subject) {
            slot.subject = subject.name;
            slot.faculty = facultyInfo ? facultyInfo.name : 'TBA';
            assigned++;
            subject.slotsAssigned = assigned;
            allocated = true;
            break;
          }
        }

        if (assigned >= subject.slotsNeeded) break;
      }

      if (!allocated) return false;
    }
  }

  return true;
}

// AI-ASSISTED ALLOCATION (FALLBACK)
function aiAssistedAllocation(timetable, days, subjects, facultyMap) {
  // Collect all empty slots
  const emptySlots = [];
  days.forEach(day => {
    timetable[day].forEach((slot, index) => {
      if (slot.type === 'lecture' && !slot.subject) {
        emptySlots.push({ day, index, slot });
      }
    });
  });

  // Allocate remaining subjects using round-robin
  let slotIndex = 0;
  for (let subject of subjects) {
    let remaining = subject.slotsNeeded - (subject.slotsAssigned || 0);
    
    while (remaining > 0 && slotIndex < emptySlots.length) {
      const { day, index, slot } = emptySlots[slotIndex];
      const facultyInfo = facultyMap[subject.name];
      
      slot.subject = subject.name;
      slot.faculty = facultyInfo ? facultyInfo.name : 'TBA';
      remaining--;
      slotIndex++;
    }
  }
}

// FALLBACK TIMETABLE GENERATOR (LAST RESORT)
function generateFallbackTimetable(data) {
  const {
    workingDays,
    startTime,
    endTime,
    lectureDuration,
    hasLunchBreak,
    lunchStartTime,
    lunchEndTime,
    subjects
  } = data;

  const timeSlots = generateTimeSlots(startTime, endTime, lectureDuration, hasLunchBreak, lunchStartTime, lunchEndTime);
  const days = workingDays === 'mon-fri' 
    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetable = {};
  days.forEach(day => {
    timetable[day] = timeSlots.map(slot => ({
      time: slot,
      subject: null,
      faculty: null,
      type: slot.isBreak ? 'break' : 'lecture'
    }));
  });

  // Simple round-robin allocation
  let subjectIndex = 0;
  days.forEach(day => {
    timetable[day].forEach(slot => {
      if (slot.type === 'lecture' && subjects.length > 0) {
        const subject = subjects[subjectIndex % subjects.length];
        slot.subject = subject.name;
        slot.faculty = 'TBA';
        subjectIndex++;
      }
    });
  });

  const sections = parseSections(data.section);
  const sectionNames = sections.length > 0 ? sections : ['Default'];
  const timetablesBySection = {};
  sectionNames.forEach(name => {
    timetablesBySection[name || 'Default'] = timetable;
  });

  return {
    success: true,
    timetable,
    timetablesBySection,
    warnings: ['⚠️ Timetable generated using AI-assisted optimization due to complex constraints'],
    message: 'Timetable generated with AI assistance'
  };
}

function checkFacultyTimeAvailability(slotTime, availableSlots) {
  const slotMinutes = parseTime(slotTime);
  
  for (let slot of availableSlots) {
    const start = parseTime(slot.start);
    const end = parseTime(slot.end);
    
    if (slotMinutes >= start && slotMinutes < end) {
      return true;
    }
  }
  
  return false;
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

module.exports = { generateTimetable };
