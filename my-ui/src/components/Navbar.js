// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the stylesheet

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="navbar-title">
          Tyeion
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/" className="navbar-button">Home</Button>
          <Button color="inherit" component={Link} to="/books" className="navbar-button">Books</Button>
          <Button color="inherit" component={Link} to="/add" className="navbar-button">Add Book</Button>
          <Button color="inherit" component={Link} to="/about" className="navbar-button">About</Button>
        </Box>
        <Box>
          <Button color="inherit" component={Link} to="/login" className="navbar-button">Login</Button>
          <Button color="inherit" component={Link} to="/signup" className="navbar-button">Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
