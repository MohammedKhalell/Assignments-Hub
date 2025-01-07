import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slics/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import api from '../services/e-commerce_api';

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
    setLoginMessage('');
    
    try {
      const checkEmail = await api.post('/users/is-available', { 
        email: formData.email 
      });
      console.log(checkEmail.data);

      if (checkEmail.data.isAvailable) {
        setLoginMessage('User not registered. Please create an account.');
        return;
      }
  
      const loginResult = await dispatch(login(formData)).unwrap();
      
      if (loginResult) {
        navigate('/E-commerce');
      }
      
    } catch (error) {
      setLoginMessage('Invalid email or password. Please try again.');
    }
  };
  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back!</h2>
          
          {loginMessage && (
            <motion.div
              className={`alert alert-error`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {loginMessage}
            </motion.div>
          )}

          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="form-input"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </motion.button>

          <div className="signup-section">
            <p>Don't have an account?</p>
            <motion.button
              type="button"
              className="signup-button"
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus /> Create Account
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
