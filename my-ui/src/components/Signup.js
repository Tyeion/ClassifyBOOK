import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import '../styles/Signup.css'; // Import the stylesheet

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 6;
    const letter = /[a-zA-Z]/;
    const number = /[0-9]/;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return 'Password must be at least 6 characters long';
    } 
    if (!letter.test(password)) {
      return 'Password must contain at least one letter';
    }
    if (!number.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!specialCharacter.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    // Simulate successful signup
    setMessage('Signup successful!');
    setOpen(true);

    // Redirect to login page after 5 seconds
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  };

  return (
    <Container className="signup-container">
      <Paper className="signup-paper">
        <Typography variant="h4" className="signup-title">Signup</Typography>
        <form onSubmit={handleSubmit} className="signup-form">
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(''); // Clear error when typing
            }}
            className="signup-input"
            helperText={passwordError}
            error={!!passwordError}
          />
          <Button type="submit" variant="contained" color="primary" className="signup-button">
            Signup
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

export default Signup;
