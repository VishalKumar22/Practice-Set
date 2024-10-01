import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("Token");
        setShowLogout(!!token); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1 className="navbar-title">TEST</h1>
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/profile" className="navbar-link">Profile</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/login" className="navbar-link" >Login</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Signup</Link>
                </li>
                {showLogout && (
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link" onClick={handleLogout}>Logout</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
