import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./slics/productsSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./slics/cartSlice";
import { logout } from "./slics/authSlice";
import NavButtons from './NavButtons';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 
const handleAddToCart = (product) => {
  if (!user) {
    navigate('/E-commerce/login');
    return;
  }
  dispatch(addToCart(product));
  setAddedProduct(product);
  setShowAddedModal(true);
  setTimeout(() => setShowAddedModal(false), 2000); // Auto close after 2 seconds
};
  
return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="products-container"
  >
    <NavButtons />
    
    <div className="products-grid">
      {items.map((product) => (
        <motion.div
          key={product.id}
          className="product-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
        >
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="product-image"
            onClick={() => setSelectedProduct(product)}
          />
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <div className="product-buttons">
             
              <motion.button
                className="add-to-cart-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {selectedProduct && (
      <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
        <motion.div
          className="modal-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
          <img src={selectedProduct.images[0]} alt={selectedProduct.title} />
          <h2>{selectedProduct.title}</h2>
          <p className="modal-description">{selectedProduct.description}</p>
          <p className="modal-price">${selectedProduct.price}</p>
          <motion.button
            className="modal-cart-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleAddToCart(selectedProduct);
              setSelectedProduct(null);
            }}
          >
            <FaShoppingCart /> Add to Cart
          </motion.button>
        </motion.div>
      </div>
    )}

    {showAddedModal && (
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="added-modal"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <div className="success-icon">✓</div>
          <h3>{addedProduct.title}</h3>
          <p>Added to cart successfully!</p>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
);
};

export default Products;
