import React, { useState } from 'react';
import './Steps.css';

function Step6Review({ formData }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="step-content">
      <h2>Step 6: Review & Confirm</h2>
      <p className="step-description">Review all details before generating</p>

      <div className="review-section">
        <h3>Basic Information</h3>
        <div className="review-item">
          <span className="review-label">College:</span>
          <span className="review-value">{formData.collegeName}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Course:</span>
          <span className="review-value">{formData.course}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Semester:</span>
          <span className="review-value">{formData.semester}</span>
        </div>
        {formData.section && (
          <div className="review-item">
            <span className="review-label">Section:</span>
            <span className="review-value">{formData.section}</span>
          </div>
        )}
      </div>

      <div className="review-section">
        <h3>Schedule</h3>
        <div className="review-item">
          <span className="review-label">Working Days:</span>
          <span className="review-value">
            {formData.workingDays === 'mon-fri' ? 'Monday - Friday' : 'Monday - Saturday'}
          </span>
        </div>
        <div className="review-item">
          <span className="review-label">Time:</span>
          <span className="review-value">{formData.startTime} - {formData.endTime}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Lecture Duration:</span>
          <span className="review-value">{formData.lectureDuration} minutes</span>
        </div>
        {formData.hasLunchBreak && (
          <div className="review-item">
            <span className="review-label">Lunch Break:</span>
            <span className="review-value">
              {formData.lunchStartTime} - {formData.lunchEndTime}
            </span>
          </div>
        )}
      </div>

      <div className="review-section">
        <h3>Subjects ({formData.subjects.length})</h3>
        {formData.subjects.map((subject, index) => (
          <div key={index} className="review-item">
            <span className="review-label">{subject.name}:</span>
            <span className="review-value">{subject.hoursPerWeek} hours/week</span>
          </div>
        ))}
      </div>

      {formData.faculty.length > 0 && (
        <div className="review-section">
          <h3>Faculty ({formData.faculty.length})</h3>
          {formData.faculty.map((teacher, index) => (
            <div key={index} className="review-item">
              <span className="review-label">{teacher.name}:</span>
              <span className="review-value">{teacher.subject}</span>
            </div>
          ))}
        </div>
      )}

      <div className="review-section">
        <h3>Rules</h3>
        <div className="review-item">
          <span className="review-label">Lectures per Day:</span>
          <span className="review-value">
            {formData.minLecturesPerDay} - {formData.maxLecturesPerDay}
          </span>
        </div>
      </div>

      <div className="confirmation-box">
        <label>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I confirm all details are correct
        </label>
      </div>
    </div>
  );
}

export default Step6Review;
