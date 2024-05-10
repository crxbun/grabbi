import { FaLock } from "react-icons/fa";
import { useState } from 'react';
import '../styles/resetPassword.css'; 

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
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
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
