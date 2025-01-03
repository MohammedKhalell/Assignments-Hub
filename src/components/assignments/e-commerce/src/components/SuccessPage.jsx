import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h2>Order Successful!</h2>
      <p>Thank you for your purchase.</p>
      <button 
        className="continue-shopping-btn"
        onClick={() => navigate('/E-commerce')}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
