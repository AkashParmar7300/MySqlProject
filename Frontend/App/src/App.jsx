import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './component/LoginForm'
import RegisterForm from './component/RegisterForm'
import Dashboard from './Dashboard';
import Insert from './Insert';
import Update from './Update';
import ChangePassword from './ChangePassword';
import View from './View';
import Logout from './Logout';

const App = () => {
    const [userEmail, setUserEmail] = useState('');

    const handleLogin = (email) => {
        setUserEmail(email); // Store logged-in user's email
    };

    return (
        <Router>
            <Routes>
            <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/dashboard" element={<Dashboard email={userEmail} />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/update" element={<Update />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/view" element={<View />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
};

export default App;
