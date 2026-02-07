import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './TimetableDisplay.css';

// Safely get display string for a timetable cell value (time column or cell content).
function getCellDisplay(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    if (value.isBreak === true) return 'Break';
    if (typeof value.time === 'string') return value.time;
    return '';
  }
  return String(value);
}

function getSlotDisplayText(slot) {
  if (slot.type === 'break') return 'LUNCH BREAK';
  if (slot.subject) {
    const sub = getCellDisplay(slot.subject);
    const fac = slot.faculty ? getCellDisplay(slot.faculty) : '';
    return fac ? `${sub} (${fac})` : sub;
  }
  return '-';
}

function getDownloadBaseName(formData, sectionKey) {
  const course = (formData.course || 'Course').replace(/[^a-z0-9]/gi, '_');
  const semester = (formData.semester || 'Semester').replace(/[^a-z0-9]/gi, '_');
  const section = (sectionKey !== undefined && sectionKey !== '' ? String(sectionKey) : 'All').replace(/[^a-z0-9]/gi, '_');
  return `Timetable_${course}_${semester}_${section}`;
}

function downloadTimetablePDF(timetable, formData, sectionKey) {
  const days = Object.keys(timetable);
  if (days.length === 0) return;
  const doc = new jsPDF({ orientation: 'landscape' });
  const headers = ['Time', ...days];
  const rows = timetable[days[0]].map((_, slotIndex) => {
    const timeStr = getCellDisplay(timetable[days[0]][slotIndex].time);
    const dayCells = days.map(day => getSlotDisplayText(timetable[day][slotIndex]));
    return [timeStr, ...dayCells];
  });
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 41, 41] }
  });
  doc.setFontSize(14);
  doc.text(`${formData.collegeName || ''} - ${formData.course || ''} - ${formData.semester || ''}${sectionKey !== undefined && sectionKey !== '' ? ` - Section ${sectionKey}` : ''}`, 14, 14);
  doc.save(getDownloadBaseName(formData, sectionKey) + '.pdf');
}

function downloadTimetableExcel(timetable, formData, sectionKey) {
  const days = Object.keys(timetable);
  if (days.length === 0) return;
  const headers = ['Time', ...days];
  const rows = timetable[days[0]].map((_, slotIndex) => {
    const timeStr = getCellDisplay(timetable[days[0]][slotIndex].time);
    const dayCells = days.map(day => getSlotDisplayText(timetable[day][slotIndex]));
    return [timeStr, ...dayCells];
  });
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Timetable');
  XLSX.writeFile(wb, getDownloadBaseName(formData, sectionKey) + '.xlsx');
}

function TimetableDisplay({ timetable, formData, onSave, onRegenerate }) {
  const timetablesBySection = timetable.timetablesBySection || null;
  const singleTimetable = timetable.timetable || timetable;
  const warnings = timetable.warnings || [];
  const sections = timetablesBySection ? Object.keys(timetablesBySection) : [];
  const hasMultipleSections = sections.length > 1;

  const [selectedSection, setSelectedSection] = useState(
    hasMultipleSections ? sections[0] : (sections[0] || null)
  );

  const actualTimetable = hasMultipleSections && selectedSection
    ? timetablesBySection[selectedSection]
    : singleTimetable;

  const days = actualTimetable ? Object.keys(actualTimetable) : [];

  const handleDownloadPDF = () => {
    if (actualTimetable) downloadTimetablePDF(actualTimetable, formData, selectedSection);
  };

  const handleDownloadExcel = () => {
    if (actualTimetable) downloadTimetableExcel(actualTimetable, formData, selectedSection);
  };

  return (
    <div className="timetable-page">
      <div className="container">
        <div className="timetable-header">
          <h1>Generated Timetable</h1>
          <p className="timetable-info">
            {formData.collegeName} - {formData.course} - {formData.semester}
            {selectedSection != null && selectedSection !== '' ? ` - Section ${selectedSection}` : formData.section ? ` - ${formData.section}` : ''}
          </p>
        </div>

        {hasMultipleSections && (
          <div className="section-tabs">
            {sections.map(sec => (
              <button
                key={sec}
                type="button"
                className={`section-tab ${selectedSection === sec ? 'active' : ''}`}
                onClick={() => setSelectedSection(sec)}
              >
                Section {sec || 'Default'}
              </button>
            ))}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="warnings-box">
            <h3>⚠️ Auto-Adjustments Made</h3>
            <ul>
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
            <p className="warning-note">
              The timetable has been optimized automatically. You can still save and use it.
            </p>
          </div>
        )}

        <div className="timetable-wrapper">
          {days.length > 0 && (
            <table className="timetable">
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map(day => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {actualTimetable[days[0]].map((_, slotIndex) => (
                  <tr key={slotIndex}>
                    <td className="time-cell">
                      {getCellDisplay(actualTimetable[days[0]][slotIndex].time)}
                    </td>
                    {days.map(day => {
                      const slot = actualTimetable[day][slotIndex];
                      return (
                        <td
                          key={day}
                          className={`slot-cell ${slot.type === 'break' ? 'break-cell' : 'lecture-cell'}`}
                        >
                          {slot.type === 'break' ? (
                            <div className="break-slot">
                              <strong>LUNCH BREAK</strong>
                            </div>
                          ) : slot.subject ? (
                            <div className="lecture-slot">
                              <strong>{getCellDisplay(slot.subject)}</strong>
                              {slot.faculty && <div className="faculty-name">{getCellDisplay(slot.faculty)}</div>}
                            </div>
                          ) : (
                            <div className="empty-slot">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {formData.allowManualEdit && (
          <div className="warning-box">
            ⚠️ Manual editing is enabled. You can modify the timetable, but be careful of conflicts.
          </div>
        )}

        <div className="timetable-actions">
          <button type="button" onClick={handleDownloadPDF} className="btn btn-outline">
            Download PDF
          </button>
          <button type="button" onClick={handleDownloadExcel} className="btn btn-outline">
            Download Excel
          </button>
          <button type="button" onClick={onRegenerate} className="btn btn-secondary">
            Regenerate
          </button>
          <button type="button" onClick={onSave} className="btn btn-success">
            Save Timetable
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimetableDisplay;
