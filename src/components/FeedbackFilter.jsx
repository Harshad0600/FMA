import React from 'react';

const FeedbackFilter = ({ onFilterChange }) => {
  return (
    <div className="filter-section">
      <label>
        Date Range:
        <input type="date" onChange={(e) => onFilterChange('date', e.target.value)} />
      </label>
      <label>
        Status:
        <select onChange={(e) => onFilterChange('status', e.target.value)}>
          <option value="">All</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="addressed">Addressed</option>
          <option value="ignored">Ignored</option>
        </select>
      </label>
    </div>
  );
};

export default FeedbackFilter;
