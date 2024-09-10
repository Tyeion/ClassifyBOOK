// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import '../styles/Login.css'; // Import the stylesheet

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful login
    setMessage('Login successful!');
    setOpen(true);

    // Redirect to home page after 5 seconds
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  return (
    <Container className="login-container">
      <Paper className="login-paper">
        <Typography variant="h4" className="login-title">Login</Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <Button type="submit" variant="contained" color="primary" className="login-button">
            Login
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message={message}
        >
          <Alert onClose={() => setOpen(false)} severity="info">
            {message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Login;
