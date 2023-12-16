// src/components/HomePage.js
import React from 'react';

import { Outlet, Link } from "react-router-dom";
import '../Styles/navbar.css'

const HomePage = () => {


    return (
        <>
            <nav className="navbar">
                <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/brands" className="nav-link">Brand</Link>
                </li>
                <li className="nav-item">
                    <Link to="/employee" className="nav-link">Employee</Link>
                </li>
                <li className="nav-item">
                    <Link to="/customer" className="nav-link">Customer</Link>
                </li>
                </ul>
            </nav>
        <Outlet />
        </>
    );
};
export default HomePage;
