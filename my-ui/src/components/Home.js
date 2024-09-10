// src/components/Home.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import '../styles/Home.css'; // Updated path
;// Ensure this path is correct

const Home = () => {
  return (
    <Box className="home-background">
      <Container className="welcome-container">
        <Typography variant="h2" className="welcome-title">
          Welcome to Tyeion!
        </Typography>
        <Typography variant="h4" className="welcome-subtitle">
          Your ultimate tool for managing books efficiently.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
