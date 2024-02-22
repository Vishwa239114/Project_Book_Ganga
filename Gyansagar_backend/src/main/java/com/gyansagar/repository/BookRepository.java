package com.gyansagar.repository;


import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Book;
import com.gyansagar.entities.Login;
import com.gyansagar.entities.Seller;

@Repository
@Transactional
public interface BookRepository extends JpaRepository<Book, Integer> {
	
	/*
	@Modifying
	@Query(value="update Book set isbn=:isbn,sellerid=:sellerid,category_id=:category_id,author=:author,bookname=:bookname,description=:description,price=:price,book_img_url=:book_img_url where bookid =:bookid",nativeQuery = true)
	public int update(int bookid,String isbn, int sellerid, int category_id, String author, String bookname, String description,
			float price, int quantity, String book_img_url);
	*/
	
	@Query("select b from Book b where sellerid=:sellerid")
	public List<Book> findBySellerid(int sellerid);

	public Optional<Book> findByIsbn(String isbn);

	@Query("select b from Book b where category_id=:categoryid")
	public List<Book> findByCategory_id(int categoryid);
	
}
