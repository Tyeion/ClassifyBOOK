import React, { useEffect, useState } from 'react';
import BookService from '../api/BookService';
import { InputBase, Paper, IconButton, Typography, List, ListItem, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/BookList.css'; // Ensure the CSS file is imported

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all books when the component mounts
    BookService.getAllBooks()
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleSearch = () => {
    // Split search term by space
    const searchTerms = searchTerm.trim().split(/\s+/);

    // Filter books based on name and price
    return books.filter(book => {
      const nameMatch = searchTerms.some(term => book.name.toLowerCase().includes(term.toLowerCase()));
      const priceMatch = searchTerms.some(term => {
        const priceTerm = parseFloat(term);
        return !isNaN(priceTerm) && book.price === priceTerm;
      });
      return nameMatch || priceMatch;
    });
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    BookService.deleteBook(id)
      .then(() => {
        setBooks(books.filter(book => book.id !== id)); // Remove the deleted book from the state
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div className="booklist-background">
      <Typography variant="h4" gutterBottom className="page-title">Book List</Typography>

      {/* Search bar */}
      <Paper component="form" className="search-bar">
        <InputBase
          placeholder="Search by name and/or price"
          value={searchTerm}
          onChange={handleChangeSearch}
          className="search-input"
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* List of books */}
      <List className="booklist-container">
        {handleSearch().map(book => (
          <React.Fragment key={book.id}>
            <ListItem className="book-card">
              <div className="book-card-info">
                <Typography variant="h6" component="div">{book.name}</Typography>
                <Typography variant="body2" component="div">Price: {book.price}</Typography>
              </div>
              <div className="book-card-actions">
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(book.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default BookList;
