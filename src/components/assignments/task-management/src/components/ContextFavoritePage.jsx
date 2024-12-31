import { TaskProvider } from '../context/TaskContext';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ContextFavoriteList from '../components/ContextFavoriteList';

const ContextFavoritePage = () => {
  return (
    <TaskProvider>
      <Box>
        <Button 
          component={Link} 
          to="/task-management" 
          variant="contained" 
          sx={{ mb: 3 }}
        >
          Back to Tasks
        </Button>
        <ContextFavoriteList />
      </Box>
    </TaskProvider>
  );
};

export default ContextFavoritePage;
