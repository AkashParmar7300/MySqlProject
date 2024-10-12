import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import './View.css'; // Import your custom CSS

const View = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleViewCart = (id) => {
        navigate(`/cart/${id}`); // Navigate to the cart page with the specific user ID
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/productdetails/${id}`);
            setUsers(users.filter(user => user.ID !== id));
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    useEffect(() => {
        // GSAP animation on mount
        gsap.from('.user-row', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.5,
            ease: 'power3.out',
        });
    }, [users]);

    return (
        <div className="view-container">
            <h1 className="title">Product List</h1>
            <motion.table
                className="product-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <motion.tr key={user.ID} className="user-row" whileHover={{ scale: 1.05 }}>
                            <td>{user.Product_Name}</td>
                            <td>
                                <motion.button
                                    className="view-button"
                                    onClick={() => handleViewCart(user.ID)}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    View Cart
                                </motion.button>
                                <motion.button
                                    className="delete-button"
                                    onClick={() => handleDelete(user.ID)}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Delete
                                </motion.button>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </motion.table>
        </div>
    );
};

export default View;
