import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './slics/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginMessage, setLoginMessage] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionResult = await dispatch(login(formData));
    
    if (!actionResult.error) {
      setLoginMessage('Login successful!');
      navigate('/E-commerce');
    } else {
      setLoginMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {loginMessage && (
          <div className={`alert ${!error ? 'alert-success' : 'alert-error'}`}>
            {loginMessage}
          </div>
        )}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="form-input"
            required
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
    </motion.div>
  );
};

export default Login;