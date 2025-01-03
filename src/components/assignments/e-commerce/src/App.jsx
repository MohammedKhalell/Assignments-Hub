import Products from './components/products';
import { CssBaseline, Container } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import './App.css';

function App() {
  return (
    <div className="app-container">
            <AnimatePresence mode='wait'>

      <CssBaseline />
      <Container>
          <div>
            <Products />
          </div>

      </Container>
      </AnimatePresence>

    </div>
  );
}

export default App;