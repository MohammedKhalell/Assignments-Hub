import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ChatApp from './components/assignments/chat-app/src/App';
import Form from './components/assignments/form/src/form';
import TaskManagement from './components/assignments/task-management/src/App';
import ContextFavoritePage from './components/assignments/task-management/src/components/ContextFavoriteList';
import ReduxFavoritePage from './components/assignments/task-management/src/components/ReduxFavoritePage';
import Ecommerce from './components/assignments/e-commerce/src/App';
import Products from './components/assignments/e-commerce/src/components/products';
import Login from './components/assignments/e-commerce/src/components/login';
import Cart from './components/assignments/e-commerce/src/components/cart';
import Signup from './components/assignments/e-commerce/src/components/signup';
import Checkout from './components/assignments/e-commerce/src/components/checkout';
import OrderSuccess from './components/assignments/e-commerce/src/components/SuccessPage';


import './App.css'

function App() {
  return (
      <Router>
        <div className="background">
          <Navbar />
          <div className="container">
            <Routes>
            <Route path="/ChatApp" element={<><h1 className='title'>Chat App </h1><ChatApp /> </>} />
              <Route path="/Form" element={<><h1 className='title'>Form</h1><Form /> </>} />
              <Route path="/task-management" element={<><h1 className='title'>Task Management </h1><TaskManagement /> </>} />
              <Route path="/task-management/context-favorites" element={<ContextFavoritePage />} />
              <Route path="/task-management/redux-favorites" element={<ReduxFavoritePage />} />
              <Route path="/E-commerce" element={<><h1 className='title'>E-commerce</h1><Ecommerce /> </>} />
              <Route path="/E-commerce/products" element={<Products />} />
              <Route path="/E-commerce/login" element={<Login />} />
              <Route path="/E-commerce/cart"element={<Cart />}/>
              <Route path="/E-commerce/signup"element={<Signup />}/>
              <Route path="/E-commerce/checkout" element={<Checkout />} />
              <Route path="/E-commerce/order-success" element={<OrderSuccess />} />
              <Route path="/" element={<h1 className='title'>Welcome to Assignments Hub</h1>} />
               </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;