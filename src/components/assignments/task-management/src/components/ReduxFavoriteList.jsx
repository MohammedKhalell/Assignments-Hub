
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell,Paper, Alert, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { removeFromFavorites } from './Slice';
import { useState } from 'react';

const ReduxFavoriteList = () => {
    console.log("Redux");
    const dispatch = useDispatch();
    const favoriteTasks = useSelector(state => state.favorites.items);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleRemoveFavorite = (taskId) => {
        dispatch(removeFromFavorites(taskId));
        setSuccessMessage('Task removed from Redux favorites!');
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
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
                Redux Favorite Tasks
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
                                <TableCell className="field">{task.taskName}</TableCell>
                                <TableCell className="field">{task.dueDate}</TableCell>
                                <TableCell className="field">
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

export default ReduxFavoriteList;
