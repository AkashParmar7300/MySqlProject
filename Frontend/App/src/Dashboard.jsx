import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';
import { FaBars } from 'react-icons/fa';

const Dashboard = ({ email, userId, onLogout }) => {
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
        { text: 'UpdateForm', path: '/update' },
        { text: 'Change Password', path: '/change-password' },
        { text: 'View', path: '/view' },
        { text: 'Logout', path: '/logout', onClick: onLogout },
    ];

    // Group members array
    const groupMembers = [
        'Abhishek Gupta',
        'Akash Parmar',
        'Shivashish'
    ];

    return (
        <div className="dashboard">
            {/* Render animated shapes in the background */}
            <div className="shape circle"></div>
            <div className="shape circle"></div>
            <div className="shape square"></div>
            <div className="shape square"></div>
            <div className="shape triangle"></div>
            <div className="shape triangle"></div>

            <div className="header">
                <FaBars className="hamburger-icon" onClick={toggleSidebar} />
                <h1>{location.pathname.replace('/', '').toUpperCase() || 'HOME'}</h1>
            </div>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={closeSidebar}>×</button>
                <div className="sidebar-header">
                    <span>Welcome, {email}</span>
                </div>
                <ul className="sidebar-nav">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path} onClick={item.onClick ? () => { item.onClick(); closeSidebar(); } : closeSidebar}>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Group Members Section Inside Sidebar */}
                <div className="group-members mt-4">
                    <h2>Group Members</h2>
                    <ul>
                        {groupMembers.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>

            <div className="container mt-4">
                {/* Content will be displayed here based on the selected option */}
            </div>
        </div>
    );
};

export default Dashboard;
