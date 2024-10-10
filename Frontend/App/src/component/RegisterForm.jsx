import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors before submission
        setSuccess(''); // Clear previous success messages

        try {
            const response = await axios.post('http://localhost:3000/register', {
                email,
                password,
            });
            setSuccess(response.data.message || 'User registered successfully!'); // Use the message from the response
            console.log(response.data);
            setEmail('');
            setPassword('');
        } catch (err) {
            // Ensure error response is present and contains the error message
            if (err.response) {
                if (err.response.status === 400) {
                    setError(err.response.data.error); // This will be "User already registered"
                } else {
                    setError('Error registering user: ' + (err.response.data.error || err.message));
                }
            } else {
                setError('Network error: ' + err.message); // Handle network errors
            }
            console.error('Error registering user:', err);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterForm;
