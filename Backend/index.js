const connection = require('./connection')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
var app = express();
app.use(cors());
let users=[]
app.use(bodyParser.json())

// Get all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

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

app.listen(3000, () => console.log('Server running on 3000'))
