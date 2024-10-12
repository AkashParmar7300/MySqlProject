import React, { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css'; // Import your custom CSS

const UpdateForm = () => {
    const [ID, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:3000/productdetails/${ID}`, {
                product_name: productName,
                product_price: productPrice,
                quantity: quantity,
            });
    
            setMessage(response.data.message || 'Product updated successfully!');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage('Product not found. Please check the product ID and try again.');
            } else {
                setMessage('Failed to update product. Please check the details and try again.');
            }
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="update-form-container">
            <h2 className="update-title">Update Product</h2>
            <form onSubmit={handleUpdate} className="update-form">
                <div className="form-group">
                    <label>Product ID:</label>
                    <input
                        type="text"
                        value={ID}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Enter Product ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"
                    />
                </div>
                <div className="form-group">
                    <label>Product Price:</label>
                    <input
                        type="number" // Changed to "number" for correct input type
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Enter Product Price"
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter Quantity"
                    />
                </div>
                <button type="submit" className="btn-update">Update Product</button>
            </form>
            {message && <p className="update-message">{message}</p>}
        </div>
    );
};

export default UpdateForm;
