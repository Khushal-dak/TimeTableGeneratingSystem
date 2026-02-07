import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const features = [
    {
      title: 'Smart Scheduling',
      description: 'Intelligent algorithm that respects faculty availability and subject requirements'
    },
    {
      title: 'Multi-Step Process',
      description: 'Easy-to-follow wizard that guides you through timetable creation'
    },
    {
      title: 'Faculty Management',
      description: 'Define multiple teachers with specific availability and time slots'
    },
    {
      title: 'Flexible Rules',
      description: 'Set custom rules for lectures per day, breaks, and subject distribution'
    },
    {
      title: 'Error Detection',
      description: 'Automatic validation with clear error messages and suggestions'
    },
    {
      title: 'Manual Editing',
      description: 'Option to manually adjust generated timetables as needed'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>College Timetable Generator</h1>
            <p>Create professional, conflict-free timetables in minutes with our intelligent scheduling system</p>
            <Link to="/generate" className="btn btn-primary btn-large">
              Generate Timetable
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <p>
              Our College Timetable Generator is a professional MERN stack application designed to simplify 
              the complex task of creating academic schedules. With intelligent algorithms and user-friendly 
              interface, we help educational institutions save time and eliminate scheduling conflicts.
            </p>
            <p>
              The system considers faculty availability, subject requirements, working hours, and custom rules 
              to generate optimal timetables that work for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <p>info@timetable.edu</p>
              </div>
              <div className="contact-item">
                <h4>Phone</h4>
                <p>+1 234 567 8900</p>
              </div>
              <div className="contact-item">
                <h4>Address</h4>
                <p>123 Education Street, College City, ST 12345</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
