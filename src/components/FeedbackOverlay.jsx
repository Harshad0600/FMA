import React, { useState } from 'react';

const FeedbackOverlay = ({ feedback, onClose, onStatusChange }) => {
  const [responseText, setResponseText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (status) => {
    if (!responseText.trim()) {
      setError('Response cannot be empty.');
      return;
    }

    try {
      onStatusChange(feedback.id, status, responseText);
      setResponseText('');
      setError('');
      onClose();
    } catch (err) {
      setError('Failed to update status. Please try again.');
    }
  };

  return (
    <div className="overlay">
      <h2>{feedback.name}</h2>
      <textarea
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        placeholder="Enter your response here"
      />
      {error && <div className="error-message">{error}</div>}
      <div className="actions">
        <button onClick={() => handleSubmit('acknowledged')} className='acc'>Acknowledge</button>
        <button onClick={() => handleSubmit('addressed')} className='add'>Address</button>
        <button onClick={() => handleSubmit('ignored')} className='ing'>Ignore</button>
      </div>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default FeedbackOverlay;
