import React, { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';
import FeedbackOverlay from './FeedbackOverlay';
import FeedbackFilter from './FeedbackFilter';
import { fetchFeedback } from '../services/api';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filters, setFilters] = useState({ date: '', status: '' });
  const [error, setError] = useState(''); // Error state for API calls

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await fetchFeedback();
        // Sort feedback in ascending order based on timestamp
        const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setFeedbackList(sortedData);
        setFilteredFeedback(sortedData);
      } catch (err) {
        setError('Failed to retrieve feedback. Please try again later.'); // Handle retrieval error
      }
    };

    loadFeedback(); // Load feedback data when component mounts
  }, []);

  const filterFeedback = () => {
    let filtered = [...feedbackList];

    if (filters.date) {
      filtered = filtered.filter(
        (feedback) => new Date(feedback.timestamp).toDateString() === new Date(filters.date).toDateString()
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (feedback) => feedback.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredFeedback(filtered); // Update the filtered feedback state
  };

  useEffect(() => {
    filterFeedback(); // Apply filtering whenever filters change
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value })); // Update filters state
  };

  const handleCardClick = (feedback) => {
    setSelectedFeedback(feedback); // Set the clicked feedback item to state
  };

  const closeOverlay = () => {
    setSelectedFeedback(null); // Clear the selected feedback
  };

  const handleStatusChange = (id, newStatus, responseText) => {
    const updatedFeedback = feedbackList.map((feedback) => {
      if (feedback.id === id) {
        return {
          ...feedback,
          status: newStatus, // Update the status of the selected feedback
          timestamp: new Date().toISOString(), // Update the timestamp to the current time
        };
      }
      return feedback; // Return unchanged feedback
    });

    // Find the updated feedback item and move it to the top of the list
    const updatedItem = updatedFeedback.find(feedback => feedback.id === id);
    const remainingFeedback = updatedFeedback.filter(feedback => feedback.id !== id);

    // Set the updated list with the modified item at the top
    const reorderedFeedback = [updatedItem, ...remainingFeedback];

    setFeedbackList(reorderedFeedback); // Update the feedback list state
    setFilteredFeedback(reorderedFeedback); // Update the filtered feedback state
    console.log(`Response: ${responseText}, Status updated to: ${newStatus}`); // Log the response and status update
  };

  return (
    <div className="feedback-list">
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
      <FeedbackFilter onFilterChange={handleFilterChange} />
      {filteredFeedback.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} onCardClick={handleCardClick} />
      ))}
      {selectedFeedback && (
        <FeedbackOverlay
          feedback={selectedFeedback}
          onClose={closeOverlay}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default FeedbackList;
