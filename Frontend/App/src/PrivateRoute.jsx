// PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ userId, children }) => {
    // Check if userId exists either from props or localStorage
    const isAuthenticated = userId || localStorage.getItem('userId');

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
