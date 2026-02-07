import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

function History() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/timetable/history', {
        headers: { 'x-auth-token': token }
      });

      if (response.data.success) {
        setTimetables(response.data.timetables);
      }
    } catch (err) {
      console.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="container">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="container">
        <h1>Timetable History</h1>
        
        {timetables.length === 0 ? (
          <div className="empty-state">
            <p>No saved timetables yet.</p>
            <a href="/generate" className="btn btn-primary">Generate Your First Timetable</a>
          </div>
        ) : (
          <div className="history-grid">
            {timetables.map((tt) => (
              <div key={tt._id} className="history-card">
                <h3>{tt.collegeName}</h3>
                <p>{tt.course} - {tt.semester}</p>
                {tt.section && <p>Section: {tt.section}</p>}
                <p className="date">
                  Created: {new Date(tt.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
