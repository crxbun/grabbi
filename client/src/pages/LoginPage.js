import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useState } from 'react';

function LoginPage({ onLogin }) {
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                console.log('Login was successful!');
                alert("Login was successful! Redirecting ...");
                onLogin();
                navigate('/myfeed');
            }
            else {
                console.error('Login failed! Please check your credentials to ensure they are correct.');
                alert("Login failed! Please check your credentials to ensure they are correct.");
            }
        }
        catch (error) {
            console.error('Error: ', error);
            alert("Login failed! Please check your credentials to ensure they are correct.");
        }
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
                        <a href="#">Forgot Password?</a>
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
