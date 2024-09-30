import React from 'react';
import FeedbackList from './components/FeedbackList';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <h1>Customer Feedback</h1>
      <FeedbackList />
    </div>
  );
}

export default App;
