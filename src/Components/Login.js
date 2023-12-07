import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate()
  const handleLogin = () => {
    if (username === 'demo' && password === 'password') {
      // Dummy user information
      const user = {
        id: 1,
        username: 'demo',
        email: 'demo@example.com',
      };
      const token = btoa(JSON.stringify({ user }));
      localStorage.setItem('token', token);
      navigate("/ReceiptTable")
    } else {
      alert('Invalid credentials');
    }
  };

  return (
<div className="login-container">
    <div className="image-container"></div>
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label for="username">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label for="password">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
