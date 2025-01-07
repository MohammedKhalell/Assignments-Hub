import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const NavButtons = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <div className="nav-buttons">
        {user ? (
          <>
            <motion.button 
              className="nav-btn cart-btn" 
              onClick={() => navigate('/E-commerce/cart')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart /> Cart ({cartItemCount})
            </motion.button>
        
          </>
        ) : (
        <>
        </>
        )}
      </div>

   
    </>
  );
};

export default NavButtons;