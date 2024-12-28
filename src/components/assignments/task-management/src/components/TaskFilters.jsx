import React from 'react';

const TaskFilters
 = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label>Filter by Priority:</label>
      <select
        name="priority"
        value={filter.priority}
        onChange={handleFilterChange}
      >
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label>Filter by Due Date:</label>
      <select
        name="dueDate"
        value={filter.dueDate}
        onChange={handleFilterChange}
      >
        <option value="">Select Due Date</option>
        <option value="overdue">Overdue</option>
        <option value="next7days">Next 7 days</option>
      </select>
      <label>Sort by:</label>
      <select
        name="sorting"
        value={filter.sorting}
        onChange={handleFilterChange}
      >
        <option value="">Select Sorting</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
      <label>Sort Order:</label>
      <select
        name="sortingOrder"
        value={filter.sortingOrder}
        onChange={handleFilterChange}
      >
        <option value="">Select Sorting Order</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default TaskFilters
;