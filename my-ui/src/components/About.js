// src/components/About.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Paper, Button } from '@mui/material'; // Added Button import
import { Link } from 'react-router-dom';
import '../styles/About.css'; // Ensure this file exists for additional styles

const About = () => {
  return (
    <Box className="about-background">
      <AppBar position="static" color="transparent" elevation={0} className="MuiAppBar-root">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Tyeion
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/books">Books</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>
      <Container className="container">
        <Paper elevation={8} className="about-content">
          <Typography variant="h8" gutterBottom className="about-title">
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Tyeion, your go-to application for managing books efficiently and effortlessly. Our app is designed to provide a seamless experience for tracking and organizing your book collection.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to simplify book management by offering a user-friendly interface and robust functionality. Whether you’re a book enthusiast or just looking to keep track of your collection, Tyeion is here to help you.
          </Typography>
          <Typography variant="body1" paragraph>
            Feel free to explore the features and let us know if you have any feedback or suggestions.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
