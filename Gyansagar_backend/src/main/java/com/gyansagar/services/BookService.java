package com.gyansagar.services;

import java.util.List;
import java.util.Optional;

import com.gyansagar.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Book;
import com.gyansagar.entities.Seller;
import com.gyansagar.repository.BookRepository;
import com.gyansagar.utils.Constants;

@Service
public class BookService 
{
	@Autowired
	BookRepository bookrepository;

	@Autowired
	SellerService sellerService;

	@Autowired
	CategoryService categoryService;
	
	public List<Book> getAllBooks()
	{
		return bookrepository.findAll();
	}
	
	public Book addBook(Book book) throws Exception {
		if(bookrepository.findByIsbn(book.getIsbn()).isPresent()){
			throw  new DuplicateEntryException(String.format("Boot with ISBN=%s already exists.", book.getIsbn()));
		}
		try{
			Seller seller=sellerService.getById(book.getSellerid());
			categoryService.getById(book.getCategory_id());
		}catch(NotFoundException ex){
			throw new BadRequestException(ex.getMessage());
		}

		try{
			return bookrepository.save(book);
		}catch (Exception ex){
			throw  new DatabaseException(String.format("Error occurred while saving book. Reason: %s", ex.getMessage()));
		}
	}
	
	public Book getBookById(int id) throws NotFoundException
	{
		Book b=null;
		Optional<Book> book= bookrepository.findById(id);
		if (book.isPresent()){
			b=book.get();			
		}
		else {
        	throw new NotFoundException(Constants.BOOK_NOT_FOUND);
        }
		return b;
	}
	
	public int updateBook(Book books )   
	{  
		int res=0;
		if(books.getBookid()!=0)
		{ 
			bookrepository.save(books);
			res=1;		
		}
		return res;		
	}

	/*  Soft delete the book by setting the isDeleted flag*/
	public void deleteBook(int id) throws NotFoundException {
		Optional<Book> bookOptional=bookrepository.findById(id);
		 if(bookOptional.isEmpty()) {
			throw new NotFoundException(String.format("Book with id=%s does not exist", id));
		 }
		 Book book=bookOptional.get();
		 book.setDeleted(true); //flag set true for book deleted purpose , by default false
		 bookrepository.save(book);
	}
	
	public List<Book> getBySellerid(int sellerid)
	{		
		return bookrepository.findBySellerid(sellerid);    
	}

	public List<Book> getByCategory_id(int categoryid) {
		return bookrepository.findByCategory_id(categoryid);
	}
	
	
	
}
