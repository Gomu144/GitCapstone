import React, { useState } from 'react';
import './register.css';
import logo from './image/logo.png';

function Register() {
    // State hooks for form fields
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form from reloading the page

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        // Prepare data to send to the backend
        const data = { user, username, password, confirmPassword };

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Check if response is ok
            if (!response.ok) {
                const result = await response.json();
                setMessage(result.error || "An error occurred while registering");
            } else {
                const result = await response.json();
                setMessage(result.message || "User registered successfully!");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage(`An unexpected error occurred: ${error.message}`);
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h2>Register Your Account!</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="User"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p>
                    Already Have an Account? <a href="/login">Login</a>
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

export default Register;
