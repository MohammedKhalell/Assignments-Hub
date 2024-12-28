import { useState } from 'react';
import { useTaskContext, validateField } from '../context/TaskContext';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
  Alert,
  Typography
} from '@mui/material';

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const [formData, setFormData] = useState({
    taskName: '',
    dueDate: '',
    priority: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      ...formData
    };
    
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    setFormData({
      taskName: '',
      dueDate: '',
      priority: '',
      description: ''
    });
  };

  const isFormValid = () => {
    return (
      formData.taskName.length >= 3 &&
      formData.dueDate &&
      formData.priority &&
      !Object.values(errors).some(error => error)
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Create New Task
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Task added successfully!
        </Alert>
      )}
      
      <Stack spacing={3}>
        <TextField
          label="Task Name"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          error={!!errors.taskName}
          helperText={errors.taskName}
          fullWidth
          variant="outlined"
        />

        <TextField
          type="date"
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          error={!!errors.dueDate}
          helperText={errors.dueDate}
          InputLabelProps={{ shrink: true }}
          fullWidth
          variant="outlined"
        />

        <TextField
          select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          error={!!errors.priority}
          helperText={errors.priority}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!isFormValid()}
          sx={{
            height: '48px',
            textTransform: 'none',
            fontSize: '16px'
          }}
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;