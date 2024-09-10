package com.api.classifybook.CustomException;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(String id){
        super("Book was not found with id :" + id);
    }
}
