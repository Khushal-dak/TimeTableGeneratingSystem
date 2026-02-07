import React from 'react';
import './Steps.css';

function Step3Subjects({ formData, updateFormData, errors }) {
  const addSubject = () => {
    const newSubject = {
      name: '',
      hoursPerWeek: 3,
      allowMultiplePerDay: false,
      maxRepeatPerDay: 1
    };
    updateFormData('subjects', [...formData.subjects, newSubject]);
  };

  const removeSubject = (index) => {
    const updated = formData.subjects.filter((_, i) => i !== index);
    updateFormData('subjects', updated);
  };

  const updateSubject = (index, field, value) => {
    const updated = [...formData.subjects];
    updated[index][field] = value;
    updateFormData('subjects', updated);
  };

  return (
    <div className="step-content">
      <h2>Step 3: Subject Details</h2>
      <p className="step-description">Add all subjects with their weekly hours</p>

      {errors.subjects && <div className="error-message mb-2">{errors.subjects}</div>}

      <div className="subjects-list">
        {formData.subjects.map((subject, index) => (
          <div key={index} className="subject-card">
            <div className="subject-header">
              <h4>Subject {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeSubject(index)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>

            <div className="form-group">
              <label>Subject Name *</label>
              <input
                type="text"
                value={subject.name}
                onChange={(e) => updateSubject(index, 'name', e.target.value)}
                placeholder="e.g., Data Structures"
              />
            </div>

            <div className="form-group">
              <label>Hours per Week *</label>
              <input
                type="number"
                min="1"
                max="20"
                value={subject.hoursPerWeek}
                onChange={(e) => updateSubject(index, 'hoursPerWeek', Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Allow Multiple Lectures per Day?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    checked={subject.allowMultiplePerDay === true}
                    onChange={() => updateSubject(index, 'allowMultiplePerDay', true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    checked={subject.allowMultiplePerDay === false}
                    onChange={() => updateSubject(index, 'allowMultiplePerDay', false)}
                  />
                  No
                </label>
              </div>
            </div>

            {subject.allowMultiplePerDay && (
              <div className="form-group">
                <label>Max Repeat per Day</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={subject.maxRepeatPerDay}
                  onChange={(e) => updateSubject(index, 'maxRepeatPerDay', Number(e.target.value))}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button type="button" onClick={addSubject} className="btn btn-primary">
        + Add Subject
      </button>
    </div>
  );
}

export default Step3Subjects;
