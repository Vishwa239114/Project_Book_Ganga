package com.gyansagar.services;

import com.gyansagar.exceptions.DuplicateEntryException;
import com.gyansagar.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Book;
import com.gyansagar.entities.Buyer;
import com.gyansagar.entities.Seller;
import com.gyansagar.repository.SellerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SellerService {
	@Autowired
	SellerRepository srepo;
	
	@Autowired
	EmailService sendmail;
	public Seller add(Seller s)
	{
		sendmail.sendEmailForNewRegistration(s.getEmail());
		return srepo.save(s);				
	}

	public Seller getById(Integer id) throws NotFoundException {
		Optional<Seller> seller= srepo.findById(id);

		if(seller.isEmpty())
				throw new NotFoundException(String.format("Seller with sellerid=%d does not exist", id));

		return seller.get();
	}
	
	public void deleteSeller(int id) throws Exception
	{
		Optional<Seller> bookOptional=srepo.findById(id);
		 if(bookOptional.isEmpty()) {
			throw new NotFoundException(String.format("Seller with id=%s does not exist", id));
		 }
		 Seller seller=bookOptional.get();
		 seller.getUserid().setDeleted(true); //flag set true for book deleted purpose , by default false
		 srepo.save(seller);
	}

	public void validateCreate(Seller s) throws DuplicateEntryException {
	if(srepo.findByEmail(s.getEmail()).isPresent()){
		throw new DuplicateEntryException("Email already exists.");

	}
	}
	
	
	public int updateSeller(Seller seller )   
	{  
		int res=0;
		if(seller.getSellerid()!=0)
		{ 
			srepo.save(seller);
			res=1;		
		}
		System.out.println("In seller service updateseller");
		return res;		
	}


	public List<Seller> getAllSellers() {

		return srepo.findAll();
	}
	
}
