import React from 'react';
import './Steps.css';

function Step5Rules({ formData, updateFormData, errors }) {
  return (
    <div className="step-content">
      <h2>Step 5: Rules & Final Controls</h2>
      <p className="step-description">Set constraints for timetable generation</p>

      <div className={`form-group ${errors.maxLecturesPerDay ? 'error' : ''}`}>
        <label>Maximum Lectures per Day *</label>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.maxLecturesPerDay}
          onChange={(e) => updateFormData('maxLecturesPerDay', Number(e.target.value))}
        />
        {errors.maxLecturesPerDay && <span className="error-message">{errors.maxLecturesPerDay}</span>}
      </div>

      <div className="form-group">
        <label>Minimum Lectures per Day *</label>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.minLecturesPerDay}
          onChange={(e) => updateFormData('minLecturesPerDay', Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Allow Manual Edit After Generation?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              checked={formData.allowManualEdit === true}
              onChange={() => updateFormData('allowManualEdit', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              checked={formData.allowManualEdit === false}
              onChange={() => updateFormData('allowManualEdit', false)}
            />
            No
          </label>
        </div>
        {formData.allowManualEdit && (
          <p className="info-text">
            ⚠️ Manual edits may create conflicts. Use with caution.
          </p>
        )}
      </div>
    </div>
  );
}

export default Step5Rules;
