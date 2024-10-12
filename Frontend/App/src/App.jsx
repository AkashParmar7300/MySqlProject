// App.jsx
import React, { useState } from 'react';
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

const App = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(null);

    const handlesubmit= (email, id) => {
        setUserEmail(email);
        setUserId(id);
    };

    const handleLogout = () => {
        setUserEmail('');
        setUserId(null);
    };

    return (
        <Router>
            <Routes>
            <Route path="/change-password" element={<ChangePassword userId={userId} />} />

                <Route path="/" element={<LoginForm onLogin={handlesubmit} />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/dashboard" element={<Dashboard email={userEmail} userId={userId} onLogout={handleLogout} />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/update" element={<UpdateForm />} />

                <Route path="/change-password" element={<ChangePassword userId={userId} />} />
                <Route path="/view" element={<View />} />
                <Route path="/cart/:id" element={<Cart />} />
                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
};

export default App;
