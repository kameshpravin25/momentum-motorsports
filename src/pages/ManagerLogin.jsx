import { useState } from 'react';
import './ManagerLogin.css';

export default function ManagerLogin({ onSuccess, onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const validUser = import.meta.env.VITE_MANAGER_USERNAME;
        const validPass = import.meta.env.VITE_MANAGER_PASSWORD;

        if (username === validUser && password === validPass) {
            onSuccess();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Admin Login</h1>
                <p className="login-subtitle">Enter your credentials to access the dashboard</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <label className="form-field">
                        <span className="form-label" style={{ color: '#fff' }}>Username</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(''); }}
                            placeholder="Enter username"
                            autoComplete="username"
                            required
                        />
                    </label>
                    <label className="form-field">
                        <span className="form-label" style={{ color: '#fff' }}>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="Enter password"
                            autoComplete="current-password"
                            required
                        />
                    </label>
                    {error && <p className="login-error">{error}</p>}
                    <button type="submit" className="btn-primary login-btn">Sign In</button>
                </form>
                <button className="login-back" onClick={onBack}>Back to role selection</button>
            </div>
        </div>
    );
}
