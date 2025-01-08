import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slics/authSlice";
import { useNavigate } from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUserPlus,FaCheckCircle  } from "react-icons/fa";
import api from "../services/e-commerce_api";
import { validateForm } from "./validateForm";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
const [showSuccess, setShowSuccess] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm(formData);
  
  if (Object.keys(formErrors).length === 0) {
    try {
      const loginResponse = await api.post('/auth/login', formData);
      if (loginResponse.data) {
        dispatch(login(formData));
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setLoginMessage('User not registered. Please create an account first.');
      } else if (error.response?.status === 401) {
        setLoginMessage('Invalid email or password. Please try again.');
      } else {
        setLoginMessage('Something went wrong. Please try again later.');
      }
    }
  } else {
    setLoginMessage(Object.values(formErrors)[0]);
  }
};

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back!</h2>

          {loginMessage && (
            <motion.div
              className={`alert alert-error`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {loginMessage}
            </motion.div>
          )}

          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="form-input"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </motion.button>

          <div className="signup-section">
            <p>Don't have an account?</p>
            <motion.button
              type="button"
              className="signup-button"
              onClick={() => navigate("/signup")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus /> Create Account
            </motion.button>
            
          </div>
        </form>
        <AnimatePresence>
      {showSuccess && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="success-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h3>Login Successful!</h3>
            <p>Welcome back!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Login;
