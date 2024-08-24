// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './register.css';
import logo from './image/logo.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setMessage("All fields are required");
            return;
        }

        const data = { username, password };

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle non-200 status codes
                setMessage(result.error || "An error occurred");
                return;
            }

            setMessage("Login successful!");
            // Redirect to the Welcome page
            navigate('/welcome');
        } catch (error) {
            console.error("Error during login:", error);
            setMessage("An error occurred");
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h2>Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p>
                    Don't Have an Account? <a href="/register">Register</a>
                </p>
            </div>
            <div className="image-container">
                <img src={logo} alt="Barangay Logo" />
                <h3>BTRRS</h3>
                <p>Barangay Tawantawan</p>
            </div>
        </div>
    );
}

export default Login;
