import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isAuthenticated, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          College Timetable Generator
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><a href="#features">Features</a></li>
          {isAuthenticated && <li><Link to="/generate">Generate Timetable</Link></li>}
          {isAuthenticated && <li><Link to="/history">History</Link></li>}
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              {user && !user.isPremium && (
                <Link to="/plans" className="btn btn-premium">Upgrade to Premium</Link>
              )}
              <span className="user-name">Hello, {user?.name}</span>
              <button onClick={onLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
