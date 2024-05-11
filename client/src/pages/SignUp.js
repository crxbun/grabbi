import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
            const res = await fetch('api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Signup successful! Redirecting ...');
                console.log('Signup successful! Redirecting ...');
                navigate('/login')
            }
            else {
                if (res.status === 403 && data.error === "User already exists!") {
                    alert('A user already exists with this username. Please enter a new username and try again.');
                }
                else {
                    console.error('Signup failed! Please try again.');
                    alert('Signup failed! Please try again.');
                }
            }
        }
        catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div className="body">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
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
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FaEnvelope className="icon" />
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

                    <button type="submit">Sign Up</button>

                    <div className="login">
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
