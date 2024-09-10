// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Paper, Button } from '@mui/material';
import BookService from '../api/BookService';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    BookService.getBookById(id)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/');
  }

  return (
    <Container>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        {book ? (
          <div>
            <Typography variant="h4" gutterBottom>{book.name}</Typography>
            <Typography variant="h6">Price: {book.price}</Typography>
            <Typography variant="body1" paragraph>Description: {book.description}</Typography>
            <Button variant="contained" color="primary" onClick={handleBack}>Back to List</Button>
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default BookDetails;
