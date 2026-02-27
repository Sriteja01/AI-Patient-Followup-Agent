import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ onUserLogin }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientLogin = (patientId) => {
    onUserLogin('patient', `Patient ${patientId}`, patientId);
    navigate('/patient-dashboard');
  };

  const handleDoctorLogin = () => {
    onUserLogin('doctor', 'Dr. Medical Professional', null);
    navigate('/doctor-dashboard');
  };

  if (!userType) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1>🏥 Autonomous Patient Follow-up Agent</h1>
            <p className="hero-subtitle">Smart Recovery Monitoring & Doctor Alerts</p>
            
            <div className="description">
              <p>
                Automated post-surgery patient monitoring system that tracks recovery metrics,
                conducts check-ins, and alerts medical professionals when intervention is needed.
              </p>
            </div>

            <div className="login-options">
              <button
                className="login-btn patient-btn"
                onClick={() => setUserType('patient')}
              >
                <span className="btn-icon">👤</span>
                <div className="btn-text">
                  <span className="btn-title">Login as Patient</span>
                  <span className="btn-desc">Track your recovery</span>
                </div>
              </button>

              <button
                className="login-btn doctor-btn"
                onClick={() => setUserType('doctor')}
              >
                <span className="btn-icon">👨‍⚕️</span>
                <div className="btn-text">
                  <span className="btn-title">Login as Doctor</span>
                  <span className="btn-desc">Monitor patients</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Automated Check-ins</h3>
              <p>Regular health updates via WhatsApp and web interface</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Recovery Tracking</h3>
              <p>Monitor pain levels, temperature, mobility, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Smart Alerts</h3>
              <p>Automatic notifications when anomalies are detected</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Doctor Dashboard</h3>
              <p>Comprehensive patient overview and alert management</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'patient') {
    return (
      <div className="selection-container">
        <button 
          className="back-btn"
          onClick={() => setUserType(null)}
        >
          ← Back
        </button>

        <h1>Select Your Account</h1>
        <p className="selection-desc">Choose which patient profile to access</p>

        <div className="patient-selection">
          <div 
            className="patient-option"
            onClick={() => handlePatientLogin(1)}
          >
            <div className="patient-avatar">👤</div>
            <h3>John Doe</h3>
            <p>Knee Replacement</p>
            <p className="patient-info">12 days post-surgery</p>
            <span className="status-badge">✅ Good</span>
          </div>

          <div 
            className="patient-option"
            onClick={() => handlePatientLogin(2)}
          >
            <div className="patient-avatar">👤</div>
            <h3>Jane Smith</h3>
            <p>Shoulder Rotator Cuff Repair</p>
            <p className="patient-info">17 days post-surgery</p>
            <span className="status-badge warning">⚠️ Warning</span>
          </div>

          <div 
            className="patient-option"
            onClick={() => handlePatientLogin(3)}
          >
            <div className="patient-avatar">👤</div>
            <h3>Robert Wilson</h3>
            <p>Hip Replacement</p>
            <p className="patient-info">38 days post-surgery</p>
            <span className="status-badge critical">🔴 Critical</span>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'doctor') {
    return (
      <div className="selection-container">
        <button 
          className="back-btn"
          onClick={() => setUserType(null)}
        >
          ← Back
        </button>

        <h1>Doctor Login</h1>
        <p className="selection-desc">Access your patient management dashboard</p>

        <div className="doctor-login">
          <form onSubmit={(e) => { e.preventDefault(); handleDoctorLogin(); }}>
            <div className="form-group">
              <label>Doctor ID / Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Login to Dashboard
            </button>
          </form>
          
          <p className="demo-note">
            💡 <strong>Demo:</strong> Any credentials will work for demonstration
          </p>
        </div>
      </div>
    );
  }
};

export default Home;
