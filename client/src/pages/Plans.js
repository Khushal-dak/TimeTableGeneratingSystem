import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Plans.css';

function Plans({ user, onUserUpdate }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleActivatePremium = async () => {
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/auth/activate-premium',
        {},
        { headers: { 'x-auth-token': token } }
      );

      if (response.data.success && response.data.user) {
        const updatedUser = response.data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        if (onUserUpdate) onUserUpdate(updatedUser);
        setMessage('Premium activated! Redirecting...');
        setTimeout(() => navigate('/generate'), 800);
      } else {
        setMessage(response.data.message || 'Activation failed. Please try again.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isPremium = user?.isPremium === true;

  return (
    <div className="plans-page">
      <div className="container">
        <div className="plans-header">
          <h1>Choose Your Plan</h1>
          <p className="plans-subtitle">
            Get more out of the College Timetable Generator
          </p>
        </div>

        {message && (
          <div className={`plans-message ${message.includes('activated') ? 'success' : 'info'}`}>
            {message}
          </div>
        )}

        <div className="plans-grid">
          <div className="plan-card free">
            {!isPremium && <div className="plan-badge">Current</div>}
            <h2>Free Plan</h2>
            <p className="plan-desc">Get started with basic generation</p>
            <ul className="plan-features">
              <li>3 timetable generations</li>
              <li>Single section</li>
              <li>Save timetables</li>
            </ul>
            <p className="plan-label">Free</p>
            {!isPremium && (
              <span className="plan-current-badge">Your current plan</span>
            )}
          </div>

          <div className="plan-card premium">
            <h2>Premium Plan</h2>
            <p className="plan-desc">Unlimited power for your department</p>
            <ul className="plan-features">
              <li>Unlimited timetable generation</li>
              <li>Multiple sections (A, B, C…)</li>
              <li>Download as PDF &amp; Excel</li>
              <li>No generation limits</li>
            </ul>
            <p className="plan-label">Premium</p>
            {isPremium ? (
              <div className="plan-status success">You are on Premium</div>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleActivatePremium}
                disabled={loading}
              >
                {loading ? 'Activating...' : 'Activate Premium'}
              </button>
            )}
          </div>
        </div>

        <p className="plans-note">
          This is a demo flow. No payment is required. A real payment gateway can be integrated later.
        </p>

        <div className="plans-actions">
          <Link to="/generate" className="btn btn-outline">
            Back to Generate Timetable
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Plans;
