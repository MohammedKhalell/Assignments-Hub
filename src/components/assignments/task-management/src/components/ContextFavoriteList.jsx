import { useState,useEffect  } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Alert } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const ContextFavoriteList = () => {
  console.log("Context");
  const { dispatch } = useTaskContext();
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const favorites = storedTasks.filter(task => task.isFavorite === true);
    setFavoriteTasks(favorites);
  }, []);
  const handleRemoveFavorite = (taskId) => {
    // Get current tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Update the task's favorite status
    const updatedTasks = storedTasks.map(task =>
      task.id === taskId ? { ...task, isFavorite: false } : task
    );
    
    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    // Update context state
    dispatch({ type: 'REMOVE_FAVORITE', payload: taskId });
    
    // Update local state to refresh the UI
    setFavoriteTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
    // Show success message
    setSuccessMessage('Task removed from favorites successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Box sx={{ mt: 4 }} className="task-form">
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      <Typography  variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Context Favorite Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell className="field">{task.taskName}</TableCell>
                <TableCell className="field">{task.dueDate}</TableCell>
                <TableCell>
                  <span className={`priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell className="field">{task.description}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFavorite(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ContextFavoriteList;
