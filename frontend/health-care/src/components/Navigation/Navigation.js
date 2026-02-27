import React from 'react';
import { Link } from 'react-router-dom';
import '../Navigation/Navigation.css';

const Navigation = ({ userRole, userName }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏥 Patient Follow-up Agent
        </Link>
        
        <div className="nav-menu">
          {userRole === 'patient' && (
            <>
              <Link to="/patient-dashboard" className="nav-link">
                My Dashboard
              </Link>
              <Link to="/check-in" className="nav-link">
                Check-in
              </Link>
              <Link to="/my-metrics" className="nav-link">
                My Metrics
              </Link>
            </>
          )}
          
          {userRole === 'doctor' && (
            <>
              <Link to="/doctor-dashboard" className="nav-link">
                Patient Overview
              </Link>
              <Link to="/alerts" className="nav-link">
                Alerts
              </Link>
            </>
          )}
          
          <Link to="/" className="nav-link logout">
            Logout
          </Link>
        </div>
        
        {userName && <div className="user-name">Welcome, {userName}</div>}
      </div>
    </nav>
  );
};

export default Navigation;
