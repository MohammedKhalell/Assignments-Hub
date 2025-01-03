import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../components/slics/cartSlice";
import { motion } from "framer-motion";
import { FaArrowLeft, FaTrash, FaPlus, FaMinus, FaShoppingCart, FaShoppingBag, FaCreditCard } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.div 
      className="cart-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="cart-header">
        <motion.button 
          className="back-btn"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back to Shopping
        </motion.button>
        <h2><FaShoppingCart/> Your Shopping Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <motion.div 
          className="empty-cart"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <div className="empty-cart-icon">
            <FaShoppingBag />
          </div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet!</p>
          <motion.button 
            className="continue-shopping-btn"
            onClick={() => navigate('/E-commerce')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
          </motion.button>
        </motion.div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <motion.div 
                key={item.id} 
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="item-image">
                  <img src={item.images[0]} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">${item.price}</p>
                  <div className="quantity-controls">
                    <motion.button
                      className="quantity-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dispatch(updateQuantity({
                        id: item.id,
                        quantity: Math.max(1, item.quantity - 1)
                      }))}
                    >
                      <FaMinus />
                    </motion.button>
                    <span className="quantity">{item.quantity}</span>
                    <motion.button
                      className="quantity-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dispatch(updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1
                      }))}
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <motion.button
                    className="remove-btn"
                    whileHover={{ scale: 1.1, color: '#e53e3e' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="cart-summary"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({totalItems})</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <motion.button 
                className="clear-cart-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(clearCart())}
              >
                <FaTrash /> Clear Cart
              </motion.button>
              <motion.button 
                className="checkout-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/E-commerce/checkout')}
              >
                <FaCreditCard /> Checkout
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
