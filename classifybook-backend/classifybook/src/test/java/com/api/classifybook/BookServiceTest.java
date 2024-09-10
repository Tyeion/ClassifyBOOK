package com.api.classifybook;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import com.api.classifybook.model.ABook;
import com.api.classifybook.repository.BookRepository;
import com.api.classifybook.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    @BeforeEach
    void start() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveBook() {
        ABook aBook = new ABook();
        aBook.setId("10");
        aBook.setName("The Art of Discipline");
        aBook.setDescription("Teaches about discipline");
        aBook.setPrice(329L);

        when(bookRepository.save(aBook)).thenReturn(aBook);

        ABook savedBook = bookService.saveBook(aBook);

        assertNotNull(savedBook);
        assertEquals(aBook, savedBook);
        verify(bookRepository, times(1)).save(aBook);
    }

    @Test
    void testGetAllBooks() {
        ABook aBook = new ABook();
        aBook.setId("21");
        aBook.setName("My Life Sucks");
        aBook.setDescription("Story of an average guy");
        aBook.setPrice(300L);

        ABook aBook1 = new ABook();
        aBook1.setId("22");
        aBook1.setName("Being Lucky or Unlucky");
        aBook1.setDescription("Story revolves around being lucky or unlucky in life");
        aBook1.setPrice(240L);

        List<ABook> books = Arrays.asList(aBook, aBook1);

        when(bookRepository.findAll()).thenReturn(books);

        List<ABook> allBooks = bookService.getAllBook();

        assertNotNull(allBooks);
        assertEquals(2, allBooks.size());
        verify(bookRepository, times(1)).findAll();
    }

    @Test
    void testGetBookById() {
        ABook aBook = new ABook();
        aBook.setId("23");
        aBook.setName("TestBook");
        aBook.setPrice(200L);
        aBook.setDescription(null);

        when(bookRepository.findById("23")).thenReturn(Optional.of(aBook));

        ABook foundBook = bookService.getBookbyId("23");

        assertNotNull(foundBook);
        assertEquals(aBook, foundBook);
        verify(bookRepository, times(1)).findById("23");
    }

    @Test
    void testDeleteBook() {
        String id = "23";

        doNothing().when(bookRepository).deleteById(id);

        bookService.deletebook(id);

        verify(bookRepository, times(1)).deleteById(id);
    }
}
