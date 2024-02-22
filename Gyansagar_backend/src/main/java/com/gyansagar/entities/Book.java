package com.gyansagar.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="book")
public class Book 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int bookid;
	
	@Column(unique = true)
	String isbn;
	
	/*@JsonIgnoreProperties("books")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="sellerid")
	Seller sellerid;
	
	@JsonIgnoreProperties("books")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="category_id")
	Category category; //category_id,categoryname,book object
	*/
	@Column
	int sellerid;
	
	@Column
	int category_id;
	
	@Column
	String author;
	
	@Column
	String bookname;
	
	@Column
	String description;
	
	@Column
	float price;	
	
	
	@Column
	int quantity;
	
	@Column
	String book_img_url;

	@Column(columnDefinition = "boolean default false")
	boolean deleted;

	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public Book(int bookid, String isbn, int sellerid, int category_id, String author, String bookname, String description, float price, int quantity, String book_img_url, boolean deleted) {
		this.bookid = bookid;
		this.isbn = isbn;
		this.sellerid = sellerid;
		this.category_id = category_id;
		this.author = author;
		this.bookname = bookname;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.book_img_url = book_img_url;
		this.deleted = deleted;
	}

	public int getBookid() {
		return bookid;
	}

	public void setBookid(int bookid) {
		this.bookid = bookid;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public int getSellerid() {
		return sellerid;
	}

	public void setSellerid(int sellerid) {
		this.sellerid = sellerid;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getBook_img_url() {
		return book_img_url;
	}

	public void setBook_img_url(String book_img_url) {
		this.book_img_url = book_img_url;
	}

	@Override
	public String toString() {
		return "Book [bookid=" + bookid + ", isbn=" + isbn + ", sellerid=" + sellerid + ", category_id=" + category_id
				+ ", author=" + author + ", bookname=" + bookname + ", description=" + description + ", price=" + price
				+ ", quantity=" + quantity + ", book_img_url=" + book_img_url + "]";
	}


	
	

}
