import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPatients, mockAlerts } from '../../utils/mockData';
import './PatientDashboard.css';

const PatientDashboard = ({ userId = 1 }) => {
  const [patient, setPatient] = useState(null);
  const [upcomingCheckIn, setUpcomingCheckIn] = useState(null);

  useEffect(() => {
    // Simulate fetching patient data
    const currentPatient = mockPatients.find(p => p.id === userId);
    setPatient(currentPatient);
    
    // Calculate next check-in time
    const nextCheckInDate = new Date();
    nextCheckInDate.setHours(nextCheckInDate.getHours() + 8);
    setUpcomingCheckIn(nextCheckInDate);
  }, [userId]);

  if (!patient) {
    return <div className="loading">Loading patient data...</div>;
  }

  const progressColor = 
    patient.recoveryProgress >= 80 ? 'progress-excellent' :
    patient.recoveryProgress >= 60 ? 'progress-good' :
    'progress-fair';

  const alertColor = 
    patient.alertLevel === 'critical' ? 'alert-critical' :
    patient.alertLevel === 'warning' ? 'alert-warning' :
    'alert-none';

  return (
    <div className="patient-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>Recovery Dashboard</h1>
        <p className="subtitle">Your post-surgery recovery journey</p>
      </div>

      {/* Alert Banner */}
      {patient.alertLevel !== 'none' && (
        <div className={`alert-banner ${patient.alertLevel}`}>
          <span className="alert-icon">⚠️</span>
          <div>
            <strong>Alert:</strong> {patient.alertMessage}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Patient Info Card */}
        <div className="card patient-info-card">
          <h2>Your Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Surgery Type</label>
              <p>{patient.surgeryType}</p>
            </div>
            <div className="info-item">
              <label>Surgery Date</label>
              <p>{new Date(patient.surgeryDate).toLocaleDateString()}</p>
            </div>
            <div className="info-item">
              <label>Days Post-Surgery</label>
              <p className="days-badge">{patient.daysPostSurgery} days</p>
            </div>
            <div className="info-item">
              <label>Assigned Doctor</label>
              <p>{patient.doctor}</p>
            </div>
          </div>
        </div>

        {/* Recovery Progress Card */}
        <div className="card recovery-card">
          <h2>Recovery Progress</h2>
          <div className="progress-section">
            <div className="progress-label">
              <span>Overall Progress</span>
              <span className="progress-percent">{patient.recoveryProgress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${progressColor}`}
                style={{ width: `${patient.recoveryProgress}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {patient.recoveryProgress >= 80 
                ? "Excellent progress! Keep up with your exercises." 
                : patient.recoveryProgress >= 60 
                ? "Good progress. Continue with your recovery plan." 
                : "You're making progress. Follow your doctor's recommendations."}
            </p>
          </div>
        </div>

        {/* Health Alert Card */}
        <div className="card alert-card">
          <h2>Health Status</h2>
          <div className="status-indicator">
            <div className={`status-dot ${alertColor}`}></div>
            <div className="status-info">
              <p className="status-label">
                {patient.alertLevel === 'critical' ? '🔴 Critical Attention Needed' :
                 patient.alertLevel === 'warning' ? '🟡 Warning Issued' :
                 '✅ All Good'}
              </p>
              <p className="status-time">Last check-in: {patient.lastCheckIn}</p>
            </div>
          </div>
        </div>

        {/* Next Check-in Card */}
        <div className="card checkin-card">
          <h2>Next Check-in</h2>
          <div className="checkin-info">
            <p className="checkin-time">
              {upcomingCheckIn?.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <p className="checkin-subtitle">
              You'll receive an automated message with check-in questions
            </p>
            <Link to="/check-in" className="btn btn-primary">
              Start Check-in Now
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/my-metrics" className="action-card">
            <span className="action-icon">📊</span>
            <h3>View Metrics</h3>
            <p>Track your vital signs and progress</p>
          </Link>
          <a href="https://wa.me/1234567890" className="action-card">
            <span className="action-icon">💬</span>
            <h3>Contact Doctor</h3>
            <p>Message your assigned physician</p>
          </a>
          <Link to="/" className="action-card">
            <span className="action-icon">📋</span>
            <h3>View Instructions</h3>
            <p>Recovery guidelines and exercises</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
