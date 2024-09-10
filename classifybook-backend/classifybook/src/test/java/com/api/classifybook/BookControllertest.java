package com.api.classifybook;

import com.api.classifybook.CustomException.BookNotFoundException;
import com.api.classifybook.controller.BookController;
import com.api.classifybook.model.ABook;
import com.api.classifybook.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@WebMvcTest(BookController.class)
public class BookControllertest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveBook() throws Exception {
        ABook book = new ABook();
        book.setId("1");
        book.setName("Book Title");
        book.setPrice(500L);
        book.setDescription("Book Description");

        when(bookService.saveBook(any(ABook.class))).thenReturn(book);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/books/create")
                        .contentType("application/json")
                        .content("{\"id\":\"1\",\"name\":\"Book Title\",\"price\":500,\"description\":\"Book Description\"}"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Book Title"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(500))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Book Description"));

        verify(bookService, times(1)).saveBook(any(ABook.class));
    }

    @Test
    public void testGetAllBooks() throws Exception {
        ABook aBook = new ABook();
        aBook.setId("1");
        aBook.setName("TestBook1");
        aBook.setPrice(200L);
        aBook.setDescription("This is test description");

        ABook aBook1 = new ABook();
        aBook1.setId("2");
        aBook1.setName("TestBook2");
        aBook1.setPrice(560L);
        aBook1.setDescription("This test book 2");

        when(bookService.getAllBook()).thenReturn(Arrays.asList(aBook, aBook1));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/getAll"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("TestBook1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value("2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("TestBook2"));

        verify(bookService, times(1)).getAllBook();
    }

    @Test
    public void testGetBookById() throws Exception {
        ABook aBook = new ABook();
        aBook.setId("1");
        aBook.setName("TESTBOOK1");
        aBook.setDescription("This is the testbook description");
        aBook.setPrice(123L);

        when(bookService.getBookbyId(anyString())).thenReturn(aBook);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/getOne/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("TESTBOOK1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is the testbook description"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(123));

        verify(bookService, times(1)).getBookbyId(anyString());
    }

    @Test
    public void testDeleteBook() throws Exception {
        doNothing().when(bookService).deletebook(anyString());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/delete/1"))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        verify(bookService, times(1)).deletebook(anyString());
    }

    @Test
    public void testGetBookById_NotFound() throws Exception {
        when(bookService.getBookbyId(anyString())).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/getOne/999"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        verify(bookService, times(1)).getBookbyId(anyString());
    }

    @Test
    public void testDeleteBookNotFound() throws Exception {
        doThrow(new BookNotFoundException("999")).when(bookService).deletebook(anyString());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/delete/999"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        verify(bookService, times(1)).deletebook(anyString());
    }

    @Test
    public void testGetAllBooksEmpty() throws Exception {
        when(bookService.getAllBook()).thenReturn(Arrays.asList());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/getAll"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty());

        verify(bookService, times(1)).getAllBook();
    }
}
