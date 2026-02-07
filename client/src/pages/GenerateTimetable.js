import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Step1BasicInfo from '../components/steps/Step1BasicInfo';
import Step2WorkingDays from '../components/steps/Step2WorkingDays';
import Step3Subjects from '../components/steps/Step3Subjects';
import Step4Faculty from '../components/steps/Step4Faculty';
import Step5Rules from '../components/steps/Step5Rules';
import Step6Review from '../components/steps/Step6Review';
import TimetableDisplay from '../components/TimetableDisplay';
import './GenerateTimetable.css';

function GenerateTimetable({ user, onUserUpdate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    collegeName: '',
    course: '',
    semester: '',
    section: '',
    workingDays: 'mon-fri',
    startTime: '09:00',
    endTime: '17:00',
    lectureDuration: 60,
    hasLunchBreak: false,
    lunchStartTime: '13:00',
    lunchEndTime: '14:00',
    subjects: [],
    faculty: [],
    maxLecturesPerDay: 6,
    minLecturesPerDay: 4,
    allowManualEdit: true
  });

  const [errors, setErrors] = useState({});
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef(null);

  const totalSteps = 6;

  useEffect(() => {
    if (errorMessage && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errorMessage]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setErrorMessage('');
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
        if (!formData.course.trim()) newErrors.course = 'Course is required';
        if (!formData.semester.trim()) newErrors.semester = 'Semester is required';
        break;
      case 2:
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';
        if (formData.hasLunchBreak && !formData.lunchStartTime) {
          newErrors.lunchStartTime = 'Lunch start time is required';
        }
        if (formData.hasLunchBreak && !formData.lunchEndTime) {
          newErrors.lunchEndTime = 'Lunch end time is required';
        }
        break;
      case 3:
        if (formData.subjects.length === 0) {
          newErrors.subjects = 'Please add at least one subject';
        }
        break;
      case 5:
        if (formData.maxLecturesPerDay < formData.minLecturesPerDay) {
          newErrors.maxLecturesPerDay = 'Max lectures cannot be less than min lectures';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/timetable/generate',
        formData,
        { headers: { 'x-auth-token': token } }
      );

      if (response.data.success) {
        if (onUserUpdate && (response.data.freeGenerationsUsed !== undefined || response.data.isPremium !== undefined)) {
          onUserUpdate({
            ...user,
            freeGenerationsUsed: response.data.freeGenerationsUsed ?? user?.freeGenerationsUsed,
            freeGenerationsLimit: response.data.freeGenerationsLimit ?? user?.freeGenerationsLimit,
            isPremium: response.data.isPremium ?? user?.isPremium
          });
        }
        setGeneratedTimetable({
          timetable: response.data.timetable,
          timetablesBySection: response.data.timetablesBySection || null,
          warnings: response.data.warnings,
          message: response.data.message
        });
      } else {
        setErrorMessage(response.data.message || 'Generation failed');
      }
    } catch (err) {
      const errorData = err.response?.data;
      const isLimitReached = err.response?.status === 403 && errorData?.limitReached;

      if (isLimitReached) {
        setErrorMessage('limit_reached');
      } else {
        setErrorMessage(errorData?.message || 'Failed to generate timetable');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/timetable/save',
        { ...formData, generatedTable: generatedTimetable },
        { headers: { 'x-auth-token': token } }
      );
      alert('Timetable saved successfully!');
    } catch (err) {
      alert('Failed to save timetable');
    }
  };

  const handleRegenerate = () => {
    setGeneratedTimetable(null);
    setCurrentStep(6);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 2:
        return <Step2WorkingDays formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 3:
        return <Step3Subjects formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 4:
        return <Step4Faculty formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 5:
        return <Step5Rules formData={formData} updateFormData={updateFormData} errors={errors} />;
      case 6:
        return <Step6Review formData={formData} />;
      default:
        return null;
    }
  };

  if (generatedTimetable) {
    return (
      <TimetableDisplay
        timetable={generatedTimetable}
        formData={formData}
        onSave={handleSave}
        onRegenerate={handleRegenerate}
      />
    );
  }

  return (
    <div className="generate-page">
      <div className="container">
        <div className="generate-header">
          <h1>Generate Timetable</h1>
          <div className="progress-indicator">
            <span>Step {currentStep} of {totalSteps}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {errorMessage === 'limit_reached' && (
          <div ref={errorRef} className="upgrade-banner">
            <p>You&apos;ve used all your free generations. Upgrade to Premium for unlimited timetables.</p>
            <Link to="/plans" className="btn btn-primary">Upgrade to Premium</Link>
          </div>
        )}
        {errorMessage && errorMessage !== 'limit_reached' && (
          <div ref={errorRef} className="error-banner">
            {errorMessage}
          </div>
        )}
        {user && !user.isPremium && user.freeGenerationsUsed !== undefined && (
          <div className="usage-banner">
            <span>You have {Math.max(0, (user.freeGenerationsLimit || 3) - user.freeGenerationsUsed)} of {user.freeGenerationsLimit || 3} free generations left.</span>
            <Link to="/plans" className="usage-link">Upgrade for unlimited</Link>
          </div>
        )}

        <div className="step-container">
          {renderStep()}
        </div>

        <div className="step-navigation">
          {currentStep > 1 && (
            <button onClick={handleBack} className="btn btn-secondary">
              Back
            </button>
          )}
          
          {currentStep < totalSteps && (
            <button onClick={handleNext} className="btn btn-primary">
              Next
            </button>
          )}

          {currentStep === totalSteps && (
            <button onClick={handleGenerate} className="btn btn-success" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Timetable'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateTimetable;
