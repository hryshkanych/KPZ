import React, { useState } from 'react';

import { BrowserRouter as BrowserRouter, Router, Route, Routes, Navigate} from 'react-router-dom';
import Brand from './Brand';
import Employee from './Employee';
import Customer from './Customer';
import HomePage from './HomePage';
import Home from "./Home";
import Login from './Login';
;

const MyPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState("");

    const handleLogin = (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
        ) : (
            <div>
                <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<Home />} />
                        <Route path="brands" element={<Brand />} />
                        <Route path="employee" element={<Employee />} />
                        <Route path="customer" element={<Customer />} />
                    </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )}
        </div>
    );
};

export default MyPage;