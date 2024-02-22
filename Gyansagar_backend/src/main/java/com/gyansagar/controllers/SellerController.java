package com.gyansagar.controllers;

import com.gyansagar.exceptions.DuplicateEntryException;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.entities.Book;
import com.gyansagar.entities.Login;
import com.gyansagar.entities.Seller;
import com.gyansagar.entities.SellerRegistration;
import com.gyansagar.services.LoginService;
import com.gyansagar.services.SellerService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SellerController 
{

	@Autowired
	SellerService sservice;
	
	@Autowired
	LoginService lservice;
	
	
	@GetMapping("/getallsellers")
	public List<Seller> getAllSellers()
	{
		return sservice.getAllSellers();
	}
	
	@PostMapping("/registerseller")
	public Seller registerSeller(@RequestBody SellerRegistration sr) throws Exception {

		Seller seller= new Seller(sr.getPublication_name(),sr.getEmail(),sr.getSeller_contact(),sr.getAddress());
		//Validate Seller request attributes
		sservice.validateCreate(seller);
		Login l= new Login(sr.getUsername(),sr.getPassword(),"seller");
		//Save login to DB
		Login loginObject= lservice.add(l);

		//Add login object to seller
		seller.setUserid(loginObject);
		return sservice.add(seller);
	}
	
	
	@PutMapping("/updateseller")
	public int updateSeller(@RequestBody Seller seller)
	{
		System.out.println("In updateSeller");
		//return bookservice.updateBook(book.getBookid(), book.getIsbn(), book.getSellerid(),book.getCategory_id(),book.getAuthor(), book.getBookname(), book.getDescription(), book.getPrice(), book.getQuantity(), book.getBook_img_url());
		return sservice.updateSeller(seller);
	
	}
	
	
	
	@DeleteMapping("/deleteseller/{sellerid}")
	public void deleteSeller(@PathVariable("sellerid") int id) throws Exception
	{
		 sservice.deleteSeller(id);
		
	}

}
