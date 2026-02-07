import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>College Timetable Generator</h3>
            <p>Professional timetable generation system for educational institutions.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@timetable.edu</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 College Timetable Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
