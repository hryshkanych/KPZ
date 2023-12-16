import React, { useState } from 'react';
import '../Styles/login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);



    const handleLogin = () => {
        if (username === 'Vasyl' && password === '123') {
            onLogin(true);
        } else {
          // Виводимо круте вікно помилки
            toast.error('Incorrect username or password', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
            onLogin(false);
        }
    };



    return (
        <div className="login-container">
            <h2>Login</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button>
            <ToastContainer />
        </div>
);
};

export default Login;
//{error && <div className="error-message">Incorrect username or password</div>}