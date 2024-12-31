import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ReduxFavoriteList from '../components/ReduxFavoriteList';

const ReduxFavoritePage = () => {
  return (
    <Box>
      <Button 
        component={Link} 
        to="/task-management" 
        variant="contained" 
        sx={{ mb: 3 }}
      >
        Back to Tasks
      </Button>
      <ReduxFavoriteList />
    </Box>
  );
};

export default ReduxFavoritePage;
