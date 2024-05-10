import { FaUser, FaLock } from "react-icons/fa";
import { useState } from 'react';
import '../styles/login.css';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="body">
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="forgot">
                        <a href="/reset-password">Forgot Password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register">
                        <p>Don't have an account? <a href="/signup">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
