import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import api from "../../../../../services/e-commerce_api";

const ProductForm = ({ product, onClose, onSubmitSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || "",
    description: product?.description || "",
    images: product?.images || [""], // Start with one empty URL field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const updateData = {
      title: formData.title,
      price: Number(formData.price),
      description: formData.description || "No description provided",
      images: formData.images.map(url => url.replace(/[\[\]"]/g, '').trim())
    };
  
    try {
      if (product) {
        const response = await api.put(`/products/${product.id}`, updateData);
        console.log('Update successful:', response.data);
      } else {
        await api.post('/products', {...updateData, categoryId: 1});
      }
      onSubmitSuccess();
    } catch (error) {
      console.log('Request Data:', updateData);
      console.error('Error Details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const updateImageUrl = (index, url) => {
    const newImages = [...formData.images];
    newImages[index] = url;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="product-form">
      <div className="form-header">
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>
        <motion.button
          className="close-btn"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="form-input"
            placeholder="Enter product title"
          />
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
            className="form-input"
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="4"
            className="form-input"
            placeholder="Enter product description"
          />
        </div>

        <div className="form-group">
          <label>Image URLs</label>
          {formData.images.map((url, index) => (
            <div key={index} className="image-input-preview">
              <div className="url-input">
                <input
                  type="url"
                  value={url.replace(/[\[\]"]/g, '').trim()}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                  placeholder="Enter image URL"
                  className="form-input"
                />
                <motion.button
                  type="button"
                  className="remove-url-btn"
                  onClick={() => removeImageField(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>
              {url && (
                <div className="image-preview">
                  <img 
                    src={url.replace(/[\[\]"]/g, '').trim()} 
                    alt="Preview" 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <motion.button
            type="button"
            className="add-url-btn"
            onClick={addImageField}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Add Another Image URL
          </motion.button>
        </div>

        <div className="form-actions">
          <motion.button
            type="button"
            className="cancel-button"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="save-button"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSave /> {loading ? "Saving..." : "Save Product"}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
