import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);
  const animationRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const userId = response.data.userId;
        localStorage.setItem('userId', userId);
        onLogin(email, userId);  // Pass both email and userId to onLogin
        navigate('/dashboard');
      } else {
        setError('Invalid credentials, please try again.');
        alert('Please register if you are not already registered.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    gsap.fromTo(formRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    gsap.fromTo(animationRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
  }, []);

  return (
    <div className="login-background">
      <div className="shapes-container">
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
        <div className="shape star"></div>
      </div>
      <motion.div
        className="animation-section"
        ref={animationRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <div className="animation-container">
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
          <div className="animation-circle"></div>
        </div>
        <h2 style={{ color: 'white' }}>Welcome to Farz!! Application</h2>
      </motion.div>
      <motion.div
        className="login-form-container"
        ref={formRef}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)' }}
      >
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Login
          </motion.button>
        </form>
        {error && (
          <motion.p
            className="error-message"
            style={{ color: 'red' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
