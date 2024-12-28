import { createContext, useContext, useReducer } from 'react';
import { isAfter, startOfDay } from 'date-fns';

const TaskContext = createContext();

export const validateField = (name, value) => {
  switch (name) {
    case 'taskName':
      return value.length < 3 ? 'Task name must be at least 3 characters' : '';
    case 'dueDate':
      return !isAfter(new Date(value), startOfDay(new Date())) 
        ? 'Due date must be in the future' 
        : '';
    case 'priority':
      return !value ? 'Priority is required' : '';
    case 'description':
      return value.length > 200 ? 'Description must be less than 200 characters' : '';
    default:
      return '';
  }
};

const taskReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TASK':
      newState = [...state, action.payload];
      break;
    case 'EDIT_TASK':
      newState = state.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
      break;
    case 'DELETE_TASK':
      newState = state.filter(task => task.id !== action.payload);
      break;
    default:
      return state;
  }
  
  localStorage.setItem('tasks', JSON.stringify(newState));
  return newState;
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(
    taskReducer, 
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);