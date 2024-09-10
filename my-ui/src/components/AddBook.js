import React, { useState } from 'react';
import BookService from '../api/BookService';
import { Container, TextField, Typography, Button, Paper } from '@mui/material';
import '../styles/AddBook.css'; // Import the CSS file for styling

const AddBook = () => {
  const [newBook, setNewBook] = useState({ name: '', price: '', description: '' });
  const [error, setError] = useState('');

  const handleAddBook = () => {
    const priceValue = parseFloat(newBook.price);

    if (priceValue < 0) {
      setError('Price cannot be negative.');
      return;
    }

    setError('');

    BookService.createBook(newBook)
      .then(response => {
        console.log('Book added successfully', response.data);
        setNewBook({ name: '', price: '', description: '' }); // Reset form
      })
      .catch(error => {
        console.error('Error creating book:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  return (
    <Container className="addbook-background">
      <Paper className="addbook-form">
        <Typography variant="h4" gutterBottom className="form-title">Add New Book</Typography>
        <TextField
          name="name"
          label="Book Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newBook.name}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newBook.price}
          onChange={handleChange}
          inputProps={{ min: 0 }} // Prevent negative values
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={newBook.description}
          onChange={handleChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={handleAddBook}>Add Book</Button>
      </Paper>
    </Container>
  );
};

export default AddBook;
