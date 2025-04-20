import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse styles

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate input
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } else {
                setError(data.error || 'Signup failed.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Create an account</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                <button type="submit" className="login-btn">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
