import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./slics/cartSlice";
import { motion } from "framer-motion";
import { FaCreditCard, FaMapMarkerAlt, FaUser, FaLock } from 'react-icons/fa';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalAmount } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  const validateCardNumber = (number) => {
    const regex = /^[\d\s]{19}$/;
    return regex.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(date)) return false;

    const [month, year] = date.split("/");
    const expiry = new Date(20 + year, month - 1);
    const today = new Date();
    return expiry > today;
  };

  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvv);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({ ...formData, [name]: formattedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date";
    }

    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      dispatch(clearCart());
      navigate("/E-commerce/order-success");
    } else {
      setErrors(formErrors);
    }
  };

  return (
 <motion.div 
      className="cart-container"
      initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    >      <motion.button
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← 
      </motion.button>
      <div className="checkout-container">
        <h2 className="title">Checkout</h2>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Total Amount: ${totalAmount}</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3>Payment Details</h3>
            <div className="form-group">
            <label><FaCreditCard /> Card Number</label>
            <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={errors.cardNumber ? "error" : ""}
              />
              {errors.cardNumber && (
                <span className="error-message">{errors.cardNumber}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? "error" : ""}
                />
                {errors.expiryDate && (
                  <span className="error-message">{errors.expiryDate}</span>
                )}
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={errors.cvv ? "error" : ""}
                />
                {errors.cvv && (
                  <span className="error-message">{errors.cvv}</span>
                )}
              </div>
            </div>

            <div className="form-group">
            <label><FaUser /> Card Holder Name</label>
            <input
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={errors.cardHolder ? "error" : ""}
              />
              {errors.cardHolder && (
                <span className="error-message">{errors.cardHolder}</span>
              )}
            </div>
          </div>

          <div className="form-section">
          <label><FaMapMarkerAlt /> Shipping Address</label>
          <div className="form-group">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "error" : ""}
                />
                {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? "error" : ""}
                />
                {errors.zipCode && (
                  <span className="error-message">{errors.zipCode}</span>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="complete-order-btn">
            Complete Order
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Checkout;
