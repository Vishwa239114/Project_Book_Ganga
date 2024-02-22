package com.gyansagar.controllers;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.websocket.server.PathParam;

import com.gyansagar.exceptions.DatabaseException;
import com.gyansagar.exceptions.DuplicateEntryException;
import com.gyansagar.exceptions.InternalServerError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.dto.BookDto;
import com.gyansagar.dto.ErrorDto;
import com.gyansagar.entities.Book;
import com.gyansagar.entities.Category;
import com.gyansagar.entities.Seller;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.repository.BookRepository;
import com.gyansagar.repository.CategoryRepository;
import com.gyansagar.repository.SellerRepository;
import com.gyansagar.services.BookService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BookController
{
	@Autowired
	BookService bookservice;
	
	@Autowired
	SellerRepository sellerrepository;
	
	@Autowired
	CategoryRepository categoryrepository;
	
	@GetMapping("/getallbooks")
	public List<Book> getAllBooks()
	{
		return bookservice.getAllBooks();
	}
	
	@PostMapping("/addbook")
	public ResponseEntity<Book> addBook(@RequestBody Book book) throws Exception {
		return new ResponseEntity(bookservice.addBook(book),HttpStatus.OK) ;
	}
	
	@GetMapping("/getbook/{bookid}") // get by bookid
	public Object getBookById(@PathVariable("bookid") int id) throws NotFoundException
	{
		
		try
		{
			
			return bookservice.getBookById(id);
		
		}
		catch(Exception n)
		{			
			ErrorDto err=new ErrorDto(n.getMessage());
			return err;
		}
	}
	

	@PutMapping("/updatebook")
	public int updatebook(@RequestBody Book book)
	{
		//return bookservice.updateBook(book.getBookid(), book.getIsbn(), book.getSellerid(),book.getCategory_id(),book.getAuthor(), book.getBookname(), book.getDescription(), book.getPrice(), book.getQuantity(), book.getBook_img_url());
		return bookservice.updateBook(book);
	
	}
	
	@DeleteMapping("/deletebook/{bookid}")
	public void deleteBook(@PathVariable("bookid") int id) throws Exception
	{
		
		bookservice.deleteBook(id);
		
	}
	@GetMapping("/getbookbysellerid/{sellerid}")
	public List<Book> getBySellerid(@PathVariable("sellerid") int sellerid)
	{
		
		return bookservice.getBySellerid(sellerid);
       
	}
	
	@GetMapping("/getbookbycategory/{categoryid}")
	public List<Book> getByCategory_id(@PathVariable("categoryid") int categoryid)
	{
		
		return bookservice.getByCategory_id(categoryid);
       
	}
	
	
	
	

}
