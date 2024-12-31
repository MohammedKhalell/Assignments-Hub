import { createContext, useContext, useReducer,useEffect  } from 'react';
import { isAfter, startOfDay } from 'date-fns';

const TaskContext = createContext({
  tasks: [],
  dispatch: () => {}
});

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
  switch (action.type) {
    case 'ADD_TASK': {
      const newState = [...state, { ...action.payload, isFavorite: false }];
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    }

    case 'EDIT_TASK': {
      const newState = state.map(task =>
        task.id === action.payload.id 
          ? { ...action.payload, isFavorite: task.isFavorite }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    }

    case 'DELETE_TASK': {
      const newState = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    }

    case 'TOGGLE_FAVORITE': {

      const newState = state.map(task => {
        if (task.id === action.payload) {
          return { ...task, isFavorite: true };
        }
        return task;
      });
      
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    }

    case 'REMOVE_FAVORITE': {
      const newState = state.map(task =>
        task.id === action.payload
          ? { ...task, isFavorite: false }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  // Initialize with localStorage data
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  // Force context update when localStorage changes
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (JSON.stringify(tasks) !== JSON.stringify(storedTasks)) {
      dispatch({ type: 'INIT_TASKS', payload: storedTasks });
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
