package com.api.classifybook.service;

import com.api.classifybook.model.ABook;
import com.api.classifybook.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

@Autowired
 private BookRepository bookRepository;

    public ABook saveBook(ABook aBook)
    {
        bookRepository.save(aBook);
        return aBook;
    }


    public List<ABook> getAllBook(){
        return bookRepository.findAll();
    }

    public ABook getBookbyId(String id){
        return bookRepository.findById(id).orElse(null);
    }
    public void deletebook(String id)
    {
      bookRepository.deleteById(id);
    }
}
