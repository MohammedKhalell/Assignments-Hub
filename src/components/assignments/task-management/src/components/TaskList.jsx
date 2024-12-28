import { useState } from 'react';
import { useTaskContext, validateField } from '../context/TaskContext';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Stack,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Sort as SortIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { isAfter, addDays } from 'date-fns';



const TaskList = () => {
  const { tasks, dispatch } = useTaskContext();
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [editingTask, setEditingTask] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, taskId: null });

  const filteredTasks = tasks
    .filter(task => {
      if (priorityFilter && task.priority !== priorityFilter) return false;
      if (dateFilter === 'overdue') {
        return !isAfter(new Date(task.dueDate), new Date());
      }
      if (dateFilter === 'next7days') {
        return isAfter(new Date(task.dueDate), new Date()) &&
               !isAfter(new Date(task.dueDate), addDays(new Date(), 7));
      }
      return true;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (sortConfig.key === 'dueDate') {
        return direction * (new Date(a.dueDate) - new Date(b.dueDate));
      }
      return direction * (a[sortConfig.key] < b[sortConfig.key] ? -1 : 1);
    });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditErrors({});
  };

  const isEditValid = () => {
    const errors = {
      taskName: validateField('taskName', editingTask.taskName),
      dueDate: validateField('dueDate', editingTask.dueDate),
      priority: validateField('priority', editingTask.priority),
      description: validateField('description', editingTask.description)
    };
    setEditErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSave = (editedTask) => {
    if (isEditValid()) {
      dispatch({ type: 'EDIT_TASK', payload: editedTask });
      setEditingTask(null);
      setEditErrors({});
    }
  };

  const handleDeleteClick = (taskId) => {
    setDeleteConfirm({ open: true, taskId });
  };

  const handleDeleteConfirm = () => {
    dispatch({ type: 'DELETE_TASK', payload: deleteConfirm.taskId });
    setDeleteConfirm({ open: false, taskId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ open: false, taskId: null });
  };

  const handleEditChange = (field, value) => {
    const updatedTask = { ...editingTask, [field]: value };
    setEditingTask(updatedTask);
    setEditErrors({
      ...editErrors,
      [field]: validateField(field, value)
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
        Task List
      </Typography>

      <Stack direction="row" spacing={2} className="filters">
        <Select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Priorities</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>

        <Select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Dates</MenuItem>
          <MenuItem value="overdue">Overdue</MenuItem>
          <MenuItem value="next7days">Next 7 Days</MenuItem>
        </Select>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="table-header">
            <TableRow>
              <TableCell>
                Task Name
                <IconButton size="small" onClick={() => handleSort('taskName')}>
                  <SortIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                Due Date
                <IconButton size="small" onClick={() => handleSort('dueDate')}>
                  <SortIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                Priority
                <IconButton size="small" onClick={() => handleSort('priority')}>
                  <SortIcon />
                </IconButton>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell className='valu-field'>
                  {editingTask?.id === task.id ? (
                    <TextField
                      value={editingTask.taskName}
                      onChange={(e) => handleEditChange('taskName', e.target.value)}
                      error={!!editErrors.taskName}
                      helperText={editErrors.taskName}
                      fullWidth
                    />
                  ) : (
                    task.taskName
                  )}
                </TableCell>
                <TableCell>
                  {editingTask?.id === task.id ? (
                    <TextField
                      type="date"
                      value={editingTask.dueDate}
                      onChange={(e) => handleEditChange('dueDate', e.target.value)}
                      error={!!editErrors.dueDate}
                      helperText={editErrors.dueDate}
                      fullWidth
                    />
                  ) : (
                    task.dueDate
                  )}
                </TableCell>
                <TableCell>
                  {editingTask?.id === task.id ? (
                    <TextField
                      select
                      value={editingTask.priority}
                      onChange={(e) => handleEditChange('priority', e.target.value)}
                      error={!!editErrors.priority}
                      helperText={editErrors.priority}
                      fullWidth
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </TextField>
                  ) : (
                    <span className={`priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  )}
                </TableCell>
                <TableCell className='valu-field'>
                  {editingTask?.id === task.id ? (
                    <TextField 
                      value={editingTask.description}
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      error={!!editErrors.description}
                      helperText={editErrors.description}
                      multiline
                      fullWidth
                    />
                  ) : (
                    task.description
                  )}
                </TableCell>
                <TableCell className="action-buttons">
                  {editingTask?.id === task.id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(editingTask)}
                      startIcon={<SaveIcon />}
                      disabled={Object.values(editErrors).some(error => error)}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton color="primary" onClick={() => handleEdit(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteConfirm.open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;