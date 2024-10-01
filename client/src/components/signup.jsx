import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signup, update } from '../axios/actions'; 

const SignupForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const profileData = location.state?.profileData;
    const [click, setClick] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: ""
    });

    useEffect(() => {
        if (profileData) {
            setFormData({
                username: profileData.username,
                email: profileData.email,
                phone: profileData.phone
            });
        }
    }, [profileData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (profileData) {
            const response = await update(formData);
            console.log(response, 'Update response');
            navigate('/profile'); 
        } else {
            const response = await signup(formData);
            console.log(response, 'Signup response');
            navigate('/login');
        }
    };

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = () => {
        setClick(true);
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>{profileData ? 'Update' : 'Sign Up'}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleOnChange}
                        required
                    />
                </div>

                {!profileData && (
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    {profileData ? 'Update' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
