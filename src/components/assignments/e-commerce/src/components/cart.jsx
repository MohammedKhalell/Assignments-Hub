import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../../../slics/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaShoppingBag,
  FaCreditCard,
} from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleRemoveFromCart = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removeFromCart(itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowClearModal(false);
  };
  const getCleanImageUrl = (imageUrl) => {
    if (Array.isArray(imageUrl)) {
      // Remove any brackets, quotes and clean the URL
      return imageUrl[0].replace(/[\[\]"]/g, "").trim();
    }
    return imageUrl;
  };

  return (
    <>
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
          <h2>
            <FaShoppingCart /> Your Shopping Cart
          </h2>
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
              onClick={() => navigate("/E-commerce")}
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
                    <img
                      src={getCleanImageUrl(item.images)}
                      alt={item.title}
                      className="cart-item-image"
                    />{" "}
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p className="item-price">${item.price}</p>
                    <div className="quantity-controls">
                      <motion.button
                        className="quantity-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                      >
                        <FaMinus />
                      </motion.button>
                      <span className="quantity">{item.quantity}</span>
                      <motion.button
                        className="quantity-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        <FaPlus />
                      </motion.button>
                    </div>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <motion.button
                      className="remove-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveFromCart(item)} // Changed from direct dispatch
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
                  onClick={handleClearCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrash /> Clear Cart
                </motion.button>
                <motion.button
                  className="checkout-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/E-commerce/checkout")}
                >
                  <FaCreditCard /> Checkout
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="delete-modal"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <div className="warning-icon">
                  <FaExclamationTriangle />
                </div>
                <h3>Remove Item?</h3>
                <div className="item-preview">
                  <img
                    src={getCleanImageUrl(itemToDelete.images)}
                    alt={itemToDelete.title}
                  />{" "}
                  <div className="item-info">
                    <p>{itemToDelete.title}</p>
                    <span>${itemToDelete.price}</span>
                  </div>
                </div>
                <div className="modal-buttons">
                  <motion.button
                    className="cancel-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="confirm-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showClearModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="clear-cart-modal"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <div className="warning-icon">
                  <FaExclamationTriangle />
                </div>
                <h3>Clear Your Cart?</h3>
                <p>The following items will be removed:</p>

                <div className="items-to-clear">
                  {cartItems.map((item) => (
                    <div key={item.id} className="clear-item-preview">
                      <img
                        src={getCleanImageUrl(item.images)}
                        alt={item.title}
                      />{" "}
                      <div className="clear-item-details">
                        <p className="item-name">{item.title}</p>
                        <p className="item-price">${item.price}</p>
                        <p className="item-quantity">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="total-items">Total Items: {totalItems}</div>

                <div className="modal-buttons">
                  <motion.button
                    className="cancel-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowClearModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="confirm-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmClearCart}
                  >
                    Clear All
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Cart;
