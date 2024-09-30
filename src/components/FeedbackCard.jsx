import React from 'react';

const FeedbackCard = ({ feedback, onCardClick }) => {
    const formattedDate = new Date(feedback.timestamp);

    return (
        <div className="feedback-card" onClick={() => onCardClick(feedback)}>
            <h4>{feedback.id}</h4>
            <h3>{feedback.name}</h3>
            <p>{feedback.body}</p>
            <span className="timestamp">
                {isNaN(formattedDate.getTime()) ? 'Invalid Date' : formattedDate.toLocaleString()}
            </span>
            <span className={`status ${feedback.status}`}>{feedback.status}</span>
        </div>
    );
};

export default FeedbackCard;
