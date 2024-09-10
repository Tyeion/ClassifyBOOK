// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import About from './components/About';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'; // Import Login

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
      </Routes>
    </Router>
  );
};

export default App;
