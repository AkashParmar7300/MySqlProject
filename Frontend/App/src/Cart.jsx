import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Cart.css'; // Import your custom CSS

const Cart = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}/cart`); // Make sure this endpoint is correct
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [id]);

    return (
        <div className="cart-container">
            <h2 className="cart-title">Product Details for ID: {id}</h2>
            {cartItems.length > 0 ? (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.ID}>
                            <h3 className="item-name">{item.Product_Name}</h3>
                            <p className="item-detail">ID: {item.ID}</p>
                            <p className="item-detail">Price: ${item.Product_Price}</p>
                            <p className="item-detail">Quantity: {item.Quantity}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-cart">No items found in the cart.</p>
            )}
        </div>
    );
};

export default Cart;
