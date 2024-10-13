// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import Dashboard from './Dashboard';
import Insert from './Insert';
import UpdateForm from './UpdateForm';
import ChangePassword from './ChangePassword';
import View from './View';
import Cart from './Cart';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';

const App = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Load authentication state from localStorage
        const storedUserId = localStorage.getItem('userId');
        const storedUserEmail = localStorage.getItem('userEmail');

        if (storedUserId && storedUserEmail) {
            setUserId(storedUserId);
            setUserEmail(storedUserEmail);
        }
    }, []);

    const handleLogin = (email, id) => {
        setUserEmail(email);
        setUserId(id);
        // Save to localStorage for persistence
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userId', id);
    };

    const handleLogout = () => {
        setUserEmail('');
        setUserId(null);
        // Clear localStorage
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute userId={userId}>
                            <Dashboard email={userEmail} userId={userId} onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                <Route path="/insert" element={<PrivateRoute userId={userId}><Insert /></PrivateRoute>} />
                <Route path="/update" element={<PrivateRoute userId={userId}><UpdateForm /></PrivateRoute>} />
                <Route path="/change-password" element={<PrivateRoute userId={userId}><ChangePassword userId={userId} /></PrivateRoute>} />
                <Route path="/view" element={<PrivateRoute userId={userId}><View /></PrivateRoute>} />
                <Route path="/cart/:id" element={<PrivateRoute userId={userId}><Cart /></PrivateRoute>} />
                <Route path="/logout" element={<PrivateRoute userId={userId}><Logout onLogout={handleLogout} /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
