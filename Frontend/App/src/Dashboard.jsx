import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard = ({ email }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const menuItems = [
        { text: 'Insert', path: '/insert' },
        { text: 'Update', path: '/update' },
        { text: 'Change Password', path: '/change-password' },
        { text: 'View', path: '/view' },
        { text: 'Logout', path: '/logout' },
    ];

    return (
        <div>
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={closeSidebar}>×</button>
                <div className="sidebar-header">
                    <span>Welcome, {email}</span>
                </div>
                <ul className="sidebar-nav">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path} onClick={closeSidebar}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>

            <div className="container mt-4">
                <h1>{location.pathname.replace('/', '').toUpperCase() || 'HOME'}</h1>
                {/* Content will be displayed here based on the selected option */}
            </div>
        </div>
    );
};

export default Dashboard;
