import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Import your custom CSS

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Call the logout handler passed from App
        navigate('/'); // Redirect to the login page
    };

    return (
        <div className="logout-container">
            <h1 className="logout-title">Logout</h1>
            <p className="logout-message">Are you sure you want to log out?</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
