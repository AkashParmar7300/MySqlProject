import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom'; 
const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            setMessage('User not logged in.');
        }
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage('User ID is required to change password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/change-password', {
                userId,
                newPassword,
            });
            setMessage('Password updated successfully!');
            navigate('/Dashboard');
        } catch (error) {
            console.error('Error updating password:', error);
            setMessage('Failed to update password. Please try again.');
        }
    };

    return (
        <div className="change-password-container">
            {/* Moving Shapes Background */}
            <div className="shapes-container">
                <div className="shape circle"></div>
                <div className="shape square"></div>
                <div className="shape triangle"></div>
                <div className="shape star"></div>
            </div>

            {/* Password Change Form */}
            <div className="form-box">
                <h1>Change Password</h1>
                <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-change-password">Change Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ChangePassword;
