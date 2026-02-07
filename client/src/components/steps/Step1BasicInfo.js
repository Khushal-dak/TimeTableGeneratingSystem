import React from 'react';
import './Steps.css';

function Step1BasicInfo({ formData, updateFormData, errors }) {
  return (
    <div className="step-content">
      <h2>Step 1: Basic Academic Information</h2>
      <p className="step-description">Enter your college and course details</p>

      <div className={`form-group ${errors.collegeName ? 'error' : ''}`}>
        <label>College / Department Name *</label>
        <input
          type="text"
          value={formData.collegeName}
          onChange={(e) => updateFormData('collegeName', e.target.value)}
          placeholder="e.g., Computer Science Department"
        />
        {errors.collegeName && <span className="error-message">{errors.collegeName}</span>}
      </div>

      <div className={`form-group ${errors.course ? 'error' : ''}`}>
        <label>Course / Branch *</label>
        <input
          type="text"
          value={formData.course}
          onChange={(e) => updateFormData('course', e.target.value)}
          placeholder="e.g., B.Tech Computer Science"
        />
        {errors.course && <span className="error-message">{errors.course}</span>}
      </div>

      <div className={`form-group ${errors.semester ? 'error' : ''}`}>
        <label>Semester / Year *</label>
        <input
          type="text"
          value={formData.semester}
          onChange={(e) => updateFormData('semester', e.target.value)}
          placeholder="e.g., Semester 5 or Year 3"
        />
        {errors.semester && <span className="error-message">{errors.semester}</span>}
      </div>

      <div className="form-group">
        <label>Section (Optional)</label>
        <input
          type="text"
          value={formData.section}
          onChange={(e) => updateFormData('section', e.target.value)}
          placeholder="e.g., Section A"
        />
      </div>
    </div>
  );
}

export default Step1BasicInfo;
