import React, { useState, useEffect } from 'react';
import { mockPatients, mockMetrics } from '../../utils/mockData';
import './RecoveryMetrics.css';

const RecoveryMetrics = ({ patientId = 1 }) => {
  const [patient, setPatient] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('painLevel');

  useEffect(() => {
    const currentPatient = mockPatients.find(p => p.id === patientId);
    setPatient(currentPatient);
    
    // Simulate fetching metrics data - in real app, filter by patientId
    const patientMetrics = mockMetrics.filter(m => m.patientId === patientId);
    setMetrics(patientMetrics);
  }, [patientId]);

  if (!patient || metrics.length === 0) {
    return <div className="loading">Loading metrics...</div>;
  }

  // Generate chart data for the selected metric
  const getChartData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const values = metrics.map(m => {
      switch (selectedMetric) {
        case 'painLevel':
          return m.painLevel;
        case 'temperature':
          return m.temperature;
        case 'mobility':
          return m.mobility_percentage;
        default:
          return 0;
      }
    });

    return { dates: last7Days, values };
  };

  const chartData = getChartData();
  const maxValue = Math.max(...chartData.values, selectedMetric === 'temperature' ? 102 : 100);

  return (
    <div className="metrics-container">
      <div className="metrics-header">
        <h1>Your Recovery Metrics</h1>
        <p className="subtitle">Track your progress over time</p>
      </div>

      {/* Current Status Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Current Pain Level</h3>
          <div className="metric-value pain">
            {metrics[metrics.length - 1]?.painLevel || 'N/A'}/10
          </div>
          <p className="metric-status">
            {metrics[metrics.length - 1]?.painLevel <= 3 ? '✅ Well managed' : 
             metrics[metrics.length - 1]?.painLevel <= 6 ? '⚠️ Moderate' : 
             '🔴 High'}
          </p>
        </div>

        <div className="metric-card">
          <h3>Body Temperature</h3>
          <div className="metric-value temperature">
            {metrics[metrics.length - 1]?.temperature || 'N/A'}°F
          </div>
          <p className="metric-status">
            {metrics[metrics.length - 1]?.temperature <= 98.6 ? '✅ Normal' :
             metrics[metrics.length - 1]?.temperature <= 100 ? '⚠️ Slightly elevated' :
             '🔴 Fever detected'}
          </p>
        </div>

        <div className="metric-card">
          <h3>Mobility Level</h3>
          <div className="metric-value mobility">
            {metrics[metrics.length - 1]?.mobility_percentage || 'N/A'}%
          </div>
          <p className="metric-status">
            {metrics[metrics.length - 1]?.mobility_percentage >= 80 ? '✅ Excellent' :
             metrics[metrics.length - 1]?.mobility_percentage >= 60 ? '⚠️ Good' :
             '🔴 Limited'}
          </p>
        </div>

        <div className="metric-card">
          <h3>Exercises Completed</h3>
          <div className="metric-value exercises">
            {metrics[metrics.length - 1]?.exercises_completed ? '✅ Yes' : '❌ No'}
          </div>
          <p className="metric-status">Keep up with your routine</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>Progress Chart</h2>
        
        <div className="metric-selector">
          <button
            className={`metric-btn ${selectedMetric === 'painLevel' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('painLevel')}
          >
            Pain Level
          </button>
          <button
            className={`metric-btn ${selectedMetric === 'temperature' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('temperature')}
          >
            Temperature
          </button>
          <button
            className={`metric-btn ${selectedMetric === 'mobility' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('mobility')}
          >
            Mobility
          </button>
        </div>

        <div className="chart-container">
          <div className="chart">
            <div className="chart-bars">
              {chartData.values.map((value, index) => (
                <div key={index} className="bar-group">
                  <div 
                    className="bar"
                    style={{ 
                      height: `${(value / maxValue) * 100}%`,
                      backgroundColor: getBarColor(value, selectedMetric)
                    }}
                    title={`${chartData.dates[index]}: ${value}`}
                  ></div>
                  <span className="bar-label">{chartData.dates[index]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chart-legend">
            <p>Latest reading: <strong>{chartData.values[chartData.values.length - 1]} {getMetricUnit(selectedMetric)}</strong></p>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="detailed-metrics">
        <h2>Detailed History</h2>
        <div className="table-container">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Pain Level</th>
                <th>Temperature</th>
                <th>Swelling</th>
                <th>Exercises</th>
                <th>Mobility</th>
              </tr>
            </thead>
            <tbody>
              {metrics.slice().reverse().map((metric, index) => (
                <tr key={index}>
                  <td>{metric.date}</td>
                  <td><span className="badge">{metric.painLevel}/10</span></td>
                  <td><span className="badge">{metric.temperature}°F</span></td>
                  <td>{metric.swelling}</td>
                  <td>{metric.exercises_completed ? '✅' : '❌'}</td>
                  <td>{metric.mobility_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="metrics-tips">
        <h2>Recovery Tips</h2>
        <ul>
          <li>📋 Track your metrics consistently for accurate monitoring</li>
          <li>💊 Take medications as prescribed by your doctor</li>
          <li>🏃 Follow your prescribed exercise routine daily</li>
          <li>🌡️ Report any fever or unusual symptoms immediately</li>
          <li>🛌 Get adequate rest for proper healing</li>
        </ul>
      </div>
    </div>
  );
};

function getBarColor(value, metric) {
  if (metric === 'painLevel') {
    if (value <= 3) return '#4CAF50';
    if (value <= 6) return '#FFC107';
    return '#F44336';
  } else if (metric === 'temperature') {
    if (value <= 98.6) return '#4CAF50';
    if (value <= 100) return '#FFC107';
    return '#F44336';
  } else if (metric === 'mobility') {
    if (value >= 80) return '#4CAF50';
    if (value >= 60) return '#FFC107';
    return '#F44336';
  }
  return '#2196F3';
}

function getMetricUnit(metric) {
  switch (metric) {
    case 'painLevel':
      return '/10';
    case 'temperature':
      return '°F';
    case 'mobility':
      return '%';
    default:
      return '';
  }
}

export default RecoveryMetrics;
