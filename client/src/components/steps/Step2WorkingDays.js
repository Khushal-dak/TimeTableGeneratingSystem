import React from 'react';
import './Steps.css';

function Step2WorkingDays({ formData, updateFormData, errors }) {
  return (
    <div className="step-content">
      <h2>Step 2: Working Days & Time</h2>
      <p className="step-description">Define your weekly schedule and timing</p>

      <div className="form-group">
        <label>Working Days *</label>
        <select
          value={formData.workingDays}
          onChange={(e) => updateFormData('workingDays', e.target.value)}
        >
          <option value="mon-fri">Monday to Friday</option>
          <option value="mon-sat">Monday to Saturday</option>
        </select>
      </div>

      <div className="form-row">
        <div className={`form-group ${errors.startTime ? 'error' : ''}`}>
          <label>Daily Start Time *</label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => updateFormData('startTime', e.target.value)}
          />
          {errors.startTime && <span className="error-message">{errors.startTime}</span>}
        </div>

        <div className={`form-group ${errors.endTime ? 'error' : ''}`}>
          <label>Daily End Time *</label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => updateFormData('endTime', e.target.value)}
          />
          {errors.endTime && <span className="error-message">{errors.endTime}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Lecture Duration *</label>
        <select
          value={formData.lectureDuration}
          onChange={(e) => updateFormData('lectureDuration', Number(e.target.value))}
        >
          <option value={60}>1 hour (60 minutes)</option>
          <option value={45}>45 minutes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Lunch Break?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              checked={formData.hasLunchBreak === true}
              onChange={() => updateFormData('hasLunchBreak', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              checked={formData.hasLunchBreak === false}
              onChange={() => updateFormData('hasLunchBreak', false)}
            />
            No
          </label>
        </div>
      </div>

      {formData.hasLunchBreak && (
        <div className="form-row">
          <div className={`form-group ${errors.lunchStartTime ? 'error' : ''}`}>
            <label>Lunch Start Time *</label>
            <input
              type="time"
              value={formData.lunchStartTime}
              onChange={(e) => updateFormData('lunchStartTime', e.target.value)}
            />
            {errors.lunchStartTime && <span className="error-message">{errors.lunchStartTime}</span>}
          </div>

          <div className={`form-group ${errors.lunchEndTime ? 'error' : ''}`}>
            <label>Lunch End Time *</label>
            <input
              type="time"
              value={formData.lunchEndTime}
              onChange={(e) => updateFormData('lunchEndTime', e.target.value)}
            />
            {errors.lunchEndTime && <span className="error-message">{errors.lunchEndTime}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Step2WorkingDays;
