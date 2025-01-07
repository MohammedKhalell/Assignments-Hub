import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../../slics/productsSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../../../slics/cartSlice";
import NavButtons from "./NavButtons";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "./ProductForm";
import {
  FaShoppingCart,
  FaPlus,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loader from "./Loader";
import api from "../../../../../services/e-commerce_api";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isAdmin = true;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
    setAddedProduct(product);
    setShowAddedModal(true);
    setTimeout(() => setShowAddedModal(false), 2000); // Auto close after 2 seconds
  };
  const handleViewDetails = (product) => {
    setViewProduct(product);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };
  const getCleanImageUrl = (imageUrl) => {
    if (Array.isArray(imageUrl)) {
      // Remove any brackets, quotes and clean the URL
      return imageUrl[0].replace(/[\[\]"]/g, "").trim();
    }
    return imageUrl;
  };
  const handleDelete = (product) => {
    setItemToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${itemToDelete.id}`);
      dispatch(fetchProducts());
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === viewProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? viewProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="products-container"
    >
      <NavButtons />
      {status === "loading" ? (
        <Loader />
      ) : (
        <div>
          {user && ( // Only show Add Product button if user is logged in
            <motion.button
              className="add-product-btn"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Add New Product
            </motion.button>
          )}
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
                  src={getCleanImageUrl(product.images)}
                  alt={product.title}
                  className="product-image"
                  onClick={() => handleViewDetails(product)}
                />
                <div className="product-info">
                  <h3 onClick={() => handleViewDetails(product)}>
                    {product.title}
                  </h3>
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
                    {user && ( // Only show admin controls if user is logged in
                      <div className="admin-controls">
                        <motion.button
                          className="edit-btn"
                          onClick={() => handleEdit(product)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          className="delete-btn"
                          onClick={() => handleDelete(product)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {viewProduct && (
            <div
              className="modal-overlay"          
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => {
                    setViewProduct(null);
                    setCurrentImageIndex(0);
                  }}
                >
                  ×
                </button>
                <div className="image-slider">
                  <button className="slider-arrow left" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <img
                    src={
                      Array.isArray(viewProduct.images)
                        ? viewProduct.images[currentImageIndex]
                            .replace(/[\[\]"]/g, "")
                            .trim()
                        : viewProduct.images.replace(/[\[\]"]/g, "").trim()
                    }
                    alt={viewProduct.title}
                  />
                  <button className="slider-arrow right" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                </div>
                <h2>{viewProduct.title}</h2>
                <p className="modal-description">{viewProduct.description}</p>
                <p className="modal-price">${viewProduct.price}</p>
                <motion.button
                  className="modal-cart-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAddToCart(viewProduct);
                    setViewProduct(null);
                  }}
                >
                  <FaShoppingCart /> Add to Cart
                </motion.button>
              </motion.div>
            </div>
          )}

          {showForm && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <ProductForm
                  product={selectedProduct}
                  onClose={handleCloseForm}
                  onSubmitSuccess={() => {
                    handleCloseForm();
                    dispatch(fetchProducts());
                  }}
                />
              </motion.div>
            </motion.div>
          )}

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
                <h3>Delete Product?</h3>
                <div className="item-preview">
                  <img
                    src={getCleanImageUrl(itemToDelete?.images)}
                    alt={itemToDelete?.title}
                    className="preview-image"
                  />
                  <div className="item-info">
                    <h4>{itemToDelete?.title}</h4>
                    <p className="price">${itemToDelete?.price}</p>
                  </div>
                </div>
                <div className="modal-buttons">
                  <motion.button
                    className="cancel-btn"
                    onClick={() => setShowDeleteModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="confirm-btn"
                    onClick={confirmDelete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
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
        </div>
      )}
    </motion.div>
  );
};

export default Products;
