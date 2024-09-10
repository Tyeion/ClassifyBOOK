// src/api/BookService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books'; // Base URL for your API

// Create a new book
const createBook = (book) => {
    console.log("Create payload" , book);
    return axios.post(`${API_URL}/create`, book); // Changed to lowercase 'create'
};

// Get all books
const getAllBooks = async () => {
    return axios.get(`${API_URL}/getAll`); // Changed to lowercase 'getAll'
};

// Get a book by ID
const getBookById = (id) => {
    return axios.get(`${API_URL}/getOne/${id}`); // Changed to lowercase 'getOne' and fixed string concatenation
};

// Update a book by ID
const updateBook = (id, updatedBook) => {
    return axios.put(`${API_URL}/update/${id}`, updatedBook); // Fixed update method with proper URL
};

// Delete a book by ID
const deleteBook = (id) => {
    console.log("Delete successful1");
    return axios.delete(`${API_URL}/delete/${id}`); // Changed to lowercase 'delete' and fixed string concatenation
    console.log("Delete successful");
};

// Exporting all functions as a service
const BookService = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};

export default BookService;
