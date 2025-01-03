import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from "./slics/authSlice";
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const NavButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    window.location.reload();
  };

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
            <motion.button 
              className="nav-btn logout-btn" 
              onClick={handleLogoutClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt /> Logout
            </motion.button>
          </>
        ) : (
          <>
            <motion.button 
              className="nav-btn login-btn" 
              onClick={() => navigate('/E-commerce/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignInAlt /> Login
            </motion.button>
            <motion.button 
              className="nav-btn signup-btn" 
              onClick={() => navigate('/E-commerce/signup')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus /> Sign Up
            </motion.button>
          </>
        )}
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <motion.div 
            className="logout-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <h2>Do you want to logout?</h2>
            <div className="logout-buttons">
              <motion.button 
                className="confirm-btn" 
                onClick={confirmLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes
              </motion.button>
              <motion.button 
                className="cancel-btn" 
                onClick={() => setShowLogoutModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default NavButtons;