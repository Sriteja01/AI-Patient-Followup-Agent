import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkInQuestions } from '../../utils/mockData';
import './CheckIn.css';

const CheckIn = ({ patientId = 1 }) => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleResponseChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const allRequiredAnswered = checkInQuestions
      .filter(q => q.required)
      .every(q => responses[q.id] !== undefined && responses[q.id] !== '');
    
    if (!allRequiredAnswered) {
      alert('Please answer all required questions');
      return;
    }

    // Simulate API call
    console.log('Submitting check-in responses:', responses);
    setSubmitted(true);
    
    // Simulate alert trigger based on pain level
    const painLevel = responses[1];
    if (painLevel > 7) {
      alert('High pain level detected. Your doctor has been notified.');
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  };

  const handleNext = () => {
    setCurrentQuestion(Math.min(checkInQuestions.length - 1, currentQuestion + 1));
  };

  if (submitted) {
    return (
      <div className="checkin-container">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h1>Check-in Submitted Successfully!</h1>
          <p>Thank you for providing your health update. Your doctor has been notified.</p>
          <div className="next-steps">
            <h2>Next Steps:</h2>
            <ul>
              <li>Continue with your prescribed exercises and medications</li>
              <li>Your next check-in is scheduled for tomorrow at 10:00 AM</li>
              <li>Contact your doctor if symptoms worsen</li>
            </ul>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/patient-dashboard')}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = checkInQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / checkInQuestions.length) * 100;

  return (
    <div className="checkin-container">
      <div className="checkin-card">
        {/* Header */}
        <div className="checkin-header">
          <h1>Recovery Check-in</h1>
          <p>Question {currentQuestion + 1} of {checkInQuestions.length}</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Form */}
        <form onSubmit={handleSubmit}>
          <div className="question-section">
            <label className="question-text">
              {question.question}
              {question.required && <span className="required">*</span>}
            </label>

            {/* Scale Input (Pain Level) */}
            {question.type === 'scale' && (
              <div className="scale-input">
                <div className="scale-labels">
                  <span>No Pain</span>
                  <span>Severe Pain</span>
                </div>
                <input
                  type="range"
                  min={question.min}
                  max={question.max}
                  value={responses[question.id] || question.min}
                  onChange={(e) => handleResponseChange(question.id, parseInt(e.target.value))}
                  className="slider"
                />
                <div className="scale-value">
                  {responses[question.id] !== undefined ? responses[question.id] : question.min}
                </div>
              </div>
            )}

            {/* Yes/No Input */}
            {question.type === 'yes-no' && (
              <div className="yes-no-input">
                <button
                  type="button"
                  className={`yes-no-btn ${responses[question.id] === true ? 'selected' : ''}`}
                  onClick={() => handleResponseChange(question.id, true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`yes-no-btn ${responses[question.id] === false ? 'selected' : ''}`}
                  onClick={() => handleResponseChange(question.id, false)}
                >
                  No
                </button>
              </div>
            )}

            {/* Text Input */}
            {question.type === 'text' && (
              <textarea
                className="text-input"
                placeholder="Enter your response here..."
                value={responses[question.id] || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                rows="4"
              />
            )}

            {/* Number Input */}
            {question.type === 'number' && (
              <input
                type="number"
                className="number-input"
                placeholder="Enter value..."
                value={responses[question.id] || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                step="0.1"
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            {currentQuestion < checkInQuestions.length - 1 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success"
              >
                Submit Check-in
              </button>
            )}
          </div>
        </form>

        {/* Tips */}
        <div className="checkin-tips">
          <p>💡 <strong>Tip:</strong> Be as accurate as possible with your responses to help your doctor monitor your recovery.</p>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
