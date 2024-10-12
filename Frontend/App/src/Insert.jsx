import React, { useState } from 'react';
import axios from 'axios';
import './Insert.css'; // Import your custom CSS

function Insert() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !quantity) {
            alert('Please fill in all fields');
            return;
        }

        console.log('Sending data:', {
            product_name: productName,
            product_price: productPrice,
            quantity: quantity
        });

        try {
            const response = await axios.post('http://localhost:3000/insertProduct', {
                product_name: productName,
                product_price: productPrice,
                quantity: quantity,
            });

            if (response.status === 201) {
                alert('Product inserted successfully!');
                setProductName('');
                setProductPrice('');
                setQuantity('');
            }
        } catch (error) {
            console.error('Error inserting product:', error.response ? error.response.data : error.message);
            alert('Failed to insert product. Please try again.');
        }
    };

    return (
        <div className="insert-product-container">
            <h2 className="insert-title">Insert Data in Product</h2>
            <form onSubmit={handleProductSubmit} className="insert-form">
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Price:</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Enter product price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <button type="submit" className="btn-insert">Insert Data in Product</button>
            </form>
        </div>
    );
}

export default Insert;
