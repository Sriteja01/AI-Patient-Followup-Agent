import React, { useState, useEffect } from 'react';
import { mockPatients, mockAlerts } from '../../utils/mockData';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [unreadAlerts, setUnreadAlerts] = useState(0);

  useEffect(() => {
    setPatients(mockPatients);
    setAlerts(mockAlerts);
    setUnreadAlerts(mockAlerts.filter(a => !a.read).length);
  }, []);

  const handleAlertRead = (alertId) => {
    const updatedAlerts = alerts.map(a => 
      a.id === alertId ? { ...a, read: true } : a
    );
    setAlerts(updatedAlerts);
    setUnreadAlerts(updatedAlerts.filter(a => !a.read).length);
  };

  const handleDismissAlert = (alertId) => {
    const updatedAlerts = alerts.filter(a => a.id !== alertId);
    setAlerts(updatedAlerts);
  };

  const filteredPatients = filterStatus === 'all' 
    ? patients 
    : patients.filter(p => p.alertLevel === filterStatus);

  const getCriticalPatients = () => {
    return patients.filter(p => p.alertLevel === 'critical').length;
  };

  const getWarningPatients = () => {
    return patients.filter(p => p.alertLevel === 'warning').length;
  };

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Doctor's Patient Management</h1>
        <p className="subtitle">Monitor patient recovery and respond to alerts</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-value">{patients.length}</div>
          <div className="kpi-label">Total Patients</div>
        </div>
        <div className="kpi-card alert-critical">
          <div className="kpi-value">{getCriticalPatients()}</div>
          <div className="kpi-label">Critical Alerts</div>
        </div>
        <div className="kpi-card alert-warning">
          <div className="kpi-value">{getWarningPatients()}</div>
          <div className="kpi-label">Warnings</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">{unreadAlerts}</div>
          <div className="kpi-label">Unread Alerts</div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Alerts Section */}
        <div className="alerts-panel">
          <h2>Active Alerts</h2>
          
          {alerts.length === 0 ? (
            <div className="no-alerts">
              <p>✅ No active alerts</p>
            </div>
          ) : (
            <div className="alerts-list">
              {alerts.map(alert => (
                <div key={alert.id} className={`alert-item alert-${alert.severity}`}>
                  <div className="alert-header">
                    <div className="alert-meta">
                      <span className="alert-patient">{alert.patientName}</span>
                      <span className="alert-time">{alert.timestamp}</span>
                    </div>
                    <button
                      className="close-btn"
                      onClick={() => handleDismissAlert(alert.id)}
                      title="Dismiss alert"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="alert-message">{alert.message}</p>
                  {!alert.read && (
                    <button
                      className="btn btn-small"
                      onClick={() => handleAlertRead(alert.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patients Section */}
        <div className="patients-panel">
          <div className="patients-header">
            <h2>Patient Overview</h2>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterStatus === 'critical' ? 'active' : ''}`}
                onClick={() => setFilterStatus('critical')}
              >
                Critical
              </button>
              <button
                className={`filter-btn ${filterStatus === 'warning' ? 'active' : ''}`}
                onClick={() => setFilterStatus('warning')}
              >
                Warnings
              </button>
              <button
                className={`filter-btn ${filterStatus === 'none' ? 'active' : ''}`}
                onClick={() => setFilterStatus('none')}
              >
                Good
              </button>
            </div>
          </div>

          <div className="patients-table">
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Surgery</th>
                  <th>Days Post-Surgery</th>
                  <th>Recovery %</th>
                  <th>Status</th>
                  <th>Last Check-in</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id} className={`patient-row alert-${patient.alertLevel}`}>
                    <td className="patient-name">
                      <strong>{patient.name}</strong>
                      <br />
                      <small>{patient.email}</small>
                    </td>
                    <td>{patient.surgeryType}</td>
                    <td><span className="days-badge">{patient.daysPostSurgery}</span></td>
                    <td>
                      <div className="progress-mini">
                        <div 
                          className="progress-fill"
                          style={{ width: `${patient.recoveryProgress}%` }}
                        ></div>
                      </div>
                      <small>{patient.recoveryProgress}%</small>
                    </td>
                    <td>
                      <span className={`status-badge status-${patient.alertLevel}`}>
                        {patient.alertLevel === 'critical' ? '🔴 Critical' :
                         patient.alertLevel === 'warning' ? '🟡 Warning' :
                         '✅ Good'}
                      </span>
                    </td>
                    <td>{patient.lastCheckIn}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedPatient(null)}
            >
              ✕
            </button>
            
            <h2>{selectedPatient.name}</h2>
            
            <div className="patient-details">
              <div className="detail-row">
                <label>Email:</label>
                <p>{selectedPatient.email}</p>
              </div>
              <div className="detail-row">
                <label>Phone:</label>
                <p>{selectedPatient.phone}</p>
              </div>
              <div className="detail-row">
                <label>Surgery Type:</label>
                <p>{selectedPatient.surgeryType}</p>
              </div>
              <div className="detail-row">
                <label>Surgery Date:</label>
                <p>{new Date(selectedPatient.surgeryDate).toLocaleDateString()}</p>
              </div>
              <div className="detail-row">
                <label>Days Post-Surgery:</label>
                <p>{selectedPatient.daysPostSurgery}</p>
              </div>
              <div className="detail-row">
                <label>Recovery Progress:</label>
                <div className="progress-bar-large">
                  <div 
                    className="progress-fill"
                    style={{ width: `${selectedPatient.recoveryProgress}%` }}
                  ></div>
                </div>
                <p>{selectedPatient.recoveryProgress}%</p>
              </div>
              <div className="detail-row">
                <label>Current Status:</label>
                <p>
                  {selectedPatient.alertLevel === 'critical' ? '🔴 Critical Attention Needed' :
                   selectedPatient.alertLevel === 'warning' ? '🟡 Warning Issued' :
                   '✅ All Good'}
                </p>
              </div>
              {selectedPatient.alertMessage && (
                <div className="detail-row alert-box">
                  <label>Alert Message:</label>
                  <p>{selectedPatient.alertMessage}</p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary">Send Message</button>
              <button className="btn btn-secondary">Schedule Call</button>
              <button 
                className="btn btn-outline"
                onClick={() => setSelectedPatient(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
