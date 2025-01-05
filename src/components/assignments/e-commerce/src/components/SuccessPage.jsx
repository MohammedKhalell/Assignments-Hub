import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSmile } from 'react-icons/fa';


const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="success-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="success-content">
        <div className="smile-icon">
          <FaSmile />
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase</p>
        <motion.button
          className="continue-shopping-btn"
          onClick={() => navigate('/E-commerce')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Shopping
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SuccessPage;