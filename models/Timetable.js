const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Step 1: Basic Info
  collegeName: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String },
  
  // Step 2: Working Days & Time
  workingDays: { type: String, required: true }, // 'mon-fri' or 'mon-sat'
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  lectureDuration: { type: Number, required: true }, // 45 or 60 minutes
  hasLunchBreak: { type: Boolean, default: false },
  lunchStartTime: { type: String },
  lunchEndTime: { type: String },
  
  // Step 3: Subjects
  subjects: [{
    name: { type: String, required: true },
    hoursPerWeek: { type: Number, required: true },
    allowMultiplePerDay: { type: Boolean, default: false },
    maxRepeatPerDay: { type: Number, default: 1 }
  }],
  
  // Step 4: Faculty
  faculty: [{
    name: { type: String, required: true },
    subject: { type: String, required: true },
    availableDays: [{ type: String }],
    availableTimeSlots: [{
      start: String,
      end: String
    }]
  }],
  
  // Step 5: Rules
  maxLecturesPerDay: { type: Number, required: true },
  minLecturesPerDay: { type: Number, required: true },
  allowManualEdit: { type: Boolean, default: true },
  
  // Generated Timetable
  generatedTable: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  
  status: {
    type: String,
    enum: ['draft', 'generated', 'saved'],
    default: 'draft'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
