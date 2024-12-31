import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Alert } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const ContextFavoriteList = () => {
  const { tasks, dispatch } = useTaskContext();
  const favoriteTasks = tasks.filter(task => task.isFavorite);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRemoveFavorite = (taskId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: taskId });
    setSuccessMessage('Task removed from Context favorites!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };
console.log(favoriteTasks);

  return (
    <Box sx={{ mt: 4 }} className="task-form">
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Context Favorite Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
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
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <span className={`priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell>{task.description}</TableCell>
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
