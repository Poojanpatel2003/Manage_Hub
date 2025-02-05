import { useState } from 'react';
import axios from 'axios';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                'https://manage-hub.onrender.com/api/auth/login',
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Server Response:", response.data);
            const { token } = response.data;

            localStorage.setItem('token', token);
            handleLogin();

            // Navigate to the dashboard after successful login
            navigate('/customer-management');
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <h2>Sign In</h2>
                {error && <p className={styles.error}>{error}</p>}
       
                <form onSubmit={handleSubmit} className={styles.formInput}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="example.email@gmail.com"
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <div className={styles.navigation}>
                    <p>Don&apos;t have an account? 
                        <a href="#" onClick={handleSignUpClick}> Register</a>
                    </p>
                </div>
            </div>
            <div className={styles.img}>
                <img src="logo-removebg-preview.png" alt="Logo" />
            </div>
        </div>
    );
};

export default LoginPage;
