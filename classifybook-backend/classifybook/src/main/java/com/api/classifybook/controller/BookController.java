package com.api.classifybook.controller;

import com.api.classifybook.CustomException.BookNotFoundException;
import com.api.classifybook.model.ABook;
import com.api.classifybook.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3001")
public class BookController {

    @Autowired
    private BookService bookService;


    @PostMapping("/create")
    public ABook saveBook(@RequestBody ABook aBook)
    {
        return bookService.saveBook(aBook);
    }


    @GetMapping("/getAll")
    public List<ABook> getAllBooks()
    {
       return bookService.getAllBook();
    }

    @GetMapping("/getOne/{id}")
    public ABook getBookById(@PathVariable String id)
    {
        ABook aBook=bookService.getBookbyId(id);
        if(aBook==null)
        {
            throw new BookNotFoundException(id);
        }

        return aBook;
    }


    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable String id)
    {
        bookService.deletebook(id);
    }



}
