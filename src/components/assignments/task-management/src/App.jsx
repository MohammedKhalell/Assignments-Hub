import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { CssBaseline, Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <CssBaseline />
      <Container>
        <TaskProvider>
          <div className="task-form">
            <TaskForm />
          </div>
          <div className="task-list">
            <TaskList />
          </div>
        </TaskProvider>
      </Container>
    </div>
  );
}

export default App;