import React from 'react';
import './Steps.css';

function Step4Faculty({ formData, updateFormData, errors }) {
  const [defineFaculty, setDefineFaculty] = React.useState(formData.faculty.length > 0);

  const addTeacher = () => {
    const newTeacher = {
      name: '',
      subject: '',
      availableDays: [],
      availableTimeSlots: []
    };
    updateFormData('faculty', [...formData.faculty, newTeacher]);
  };

  const removeTeacher = (index) => {
    const updated = formData.faculty.filter((_, i) => i !== index);
    updateFormData('faculty', updated);
  };

  const updateTeacher = (index, field, value) => {
    const updated = [...formData.faculty];
    updated[index][field] = value;
    updateFormData('faculty', updated);
  };

  const toggleDay = (teacherIndex, day) => {
    const teacher = formData.faculty[teacherIndex];
    const days = teacher.availableDays.includes(day)
      ? teacher.availableDays.filter(d => d !== day)
      : [...teacher.availableDays, day];
    updateTeacher(teacherIndex, 'availableDays', days);
  };

  const addTimeSlot = (teacherIndex) => {
    const teacher = formData.faculty[teacherIndex];
    const newSlot = { start: '09:00', end: '17:00' };
    updateTeacher(teacherIndex, 'availableTimeSlots', [...teacher.availableTimeSlots, newSlot]);
  };

  const removeTimeSlot = (teacherIndex, slotIndex) => {
    const teacher = formData.faculty[teacherIndex];
    const updated = teacher.availableTimeSlots.filter((_, i) => i !== slotIndex);
    updateTeacher(teacherIndex, 'availableTimeSlots', updated);
  };

  const updateTimeSlot = (teacherIndex, slotIndex, field, value) => {
    const teacher = formData.faculty[teacherIndex];
    const updated = [...teacher.availableTimeSlots];
    updated[slotIndex][field] = value;
    updateTeacher(teacherIndex, 'availableTimeSlots', updated);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="step-content">
      <h2>Step 4: Faculty Availability</h2>
      <p className="step-description">Define teacher schedules (optional but recommended)</p>

      <div className="form-group">
        <label>Do you want to define faculty availability?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              checked={defineFaculty === true}
              onChange={() => setDefineFaculty(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              checked={defineFaculty === false}
              onChange={() => {
                setDefineFaculty(false);
                updateFormData('faculty', []);
              }}
            />
            No
          </label>
        </div>
      </div>

      {defineFaculty && (
        <>
          <div className="faculty-list">
            {formData.faculty.map((teacher, index) => (
              <div key={index} className="faculty-card">
                <div className="faculty-header">
                  <h4>Teacher {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeTeacher(index)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>

                <div className="form-group">
                  <label>Teacher Name *</label>
                  <input
                    type="text"
                    value={teacher.name}
                    onChange={(e) => updateTeacher(index, 'name', e.target.value)}
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>

                <div className="form-group">
                  <label>Subject Assigned *</label>
                  <select
                    value={teacher.subject}
                    onChange={(e) => updateTeacher(index, 'subject', e.target.value)}
                  >
                    <option value="">Select Subject</option>
                    {formData.subjects.map((sub, i) => (
                      <option key={i} value={sub.name}>{sub.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Available Days</label>
                  <div className="checkbox-group">
                    {days.map(day => (
                      <label key={day}>
                        <input
                          type="checkbox"
                          checked={teacher.availableDays.includes(day)}
                          onChange={() => toggleDay(index, day)}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Available Time Slots</label>
                  {teacher.availableTimeSlots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="time-slot-row">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(index, slotIndex, 'start', e.target.value)}
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(index, slotIndex, 'end', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeTimeSlot(index, slotIndex)}
                        className="btn-remove-small"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTimeSlot(index)}
                    className="btn btn-secondary btn-small"
                  >
                    + Add Time Slot
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={addTeacher} className="btn btn-primary">
            + Add Teacher
          </button>
        </>
      )}
    </div>
  );
}

export default Step4Faculty;
