const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(cors());
let users = []
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    console.log('Login request received with:', req.body);
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            // Send back user ID and success status
            const user = results[0];
            res.status(200).json({ success: true, message: 'Login successful!', userId: user.ID });
        } else {
            res.status(400).json({ success: false, error: 'Invalid credentials' });
        }
    });
});
// Get all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM productdetails';

    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows); // Send the user data as JSON
        }
    });
});


// Get a specific user by ID
app.get('/users/:ID', (req, res) => {
    const { ID } = req.params;
    const query = 'SELECT * FROM users WHERE ID = ?';


    connection.query(query, [ID], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving user data');
        } else if (rows.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(rows[0]); // Send the specific user data as JSON
        }
    });
});
// server.js (or your main server file)

// Endpoint to delete data by ID
// Endpoint to delete data by ID
app.delete('/users/:ID', (req, res) => { // Make sure the route starts with a '/'
    const { ID } = req.params;
    const query = 'DELETE FROM users WHERE ID = ?'; // Ensure we're deleting from the 'users' table

    connection.query(query, [ID], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
        } else {
            res.status(200).json({ message: 'User deleted successfully!' });
        }
    });
});


app.post('/login', (req, res) => {
    console.log('Login request received with:', req.body);
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful!' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid credentials' });
        }
    });
});





app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' }); // Return database error
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'User already registered' });
        }

        // Register new user
        const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        connection.query(insertQuery, [email, password], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Error inserting user' }); // Return insertion error
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});

// Get cart data for a specific user
// Endpoint to get cart data for a specific user by ID
app.get('/users/:ID/cart', (req, res) => {
    const { ID } = req.params;
    const query = 'SELECT * FROM productdetails  WHERE  ID = ?';

    connection.query(query, [ID], (err, rows) => {
        if (err) {
            console.error('Error retrieving cart data:', err);
            res.status(500).send('Error retrieving cart data');
        } else {
            res.status(200).json(rows);
        }
    });
});
// Endpoit to update the password for a specific user

// Get cart data for a specific user including images


// Endpoint to update the password of a specific user

app.post('/change-password', (req, res) => {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
        return res.status(400).send('User ID and new password are required');
    }

    const query = 'UPDATE users SET password = ? WHERE ID = ?';
    connection.query(query, [newPassword, userId], (err, result) => {
        if (err) {
            console.error(err); // Log the error
            return res.status(500).send('An error occurred while updating the password');
            console.log('Received data:', req.body);

        }

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('Password updated successfully');
    });
});
// Get all products from productdetails
app.get('/productdetails', (req, res) => {
    const query = 'SELECT * FROM productdetails';

    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error retrieving product details:', err);
            return res.status(500).send('Error retrieving product details');
        }
        res.status(200).json(rows); // Send the product data as JSON
    });
});
app.post('/insertProduct', (req, res) => {
    const { product_name, product_price, quantity } = req.body;

    if (!product_name || !product_price || !quantity) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO productdetails (Product_Name, Product_Price, Quantity) VALUES (?, ?, ?)';
    connection.query(sql, [product_name, product_price, quantity], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to insert product' });
        }
        res.status(201).json({ message: 'Product inserted successfully' });
    });
});

app.delete('/productdetails/:ID', (req, res) => { // Updated to match product deletion
    const { ID } = req.params;
    const query = 'DELETE FROM productdetails WHERE ID = ?';

    connection.query(query, [ID], (err, results) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send('Error deleting product');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json({ message: 'Product deleted successfully!' });
    });
});

app.put('/productdetails/:ID', (req, res) => {
    const { ID } = req.params;
    const { product_name, product_price, quantity } = req.body;

    const query = 'UPDATE productdetails SET Product_Name = ?, Product_Price = ?, Quantity = ? WHERE ID = ?';

    connection.query(query, [product_name, product_price, quantity, ID], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Failed to update product' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully!' });
    });
});


app.listen(3000, () => console.log('Server running on 3000'))
