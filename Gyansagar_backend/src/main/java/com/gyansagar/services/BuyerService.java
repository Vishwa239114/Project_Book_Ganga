package com.gyansagar.services;

import com.gyansagar.entities.Login;
import com.gyansagar.entities.Seller;
import com.gyansagar.exceptions.DuplicateEntryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Buyer;
import com.gyansagar.repository.BuyerRepository;

@Service
public class BuyerService 
{
	@Autowired
	BuyerRepository brepo;
	
	@Autowired
	EmailService sendmail;
	public Buyer add(Buyer b)
	{
		sendmail.sendEmailForNewRegistration(b.getEmail());
		return brepo.save(b);
				
	}

	public void validateCreate(Buyer b) throws DuplicateEntryException{
		var result=brepo.findByAadharnoOrEmailOrBuyer_contact(b.getAadharno(), b.getEmail(), b.getBuyer_contact());
		if(result!=null && result.size()>0){
			throw new DuplicateEntryException("AadharNumber/Email/Contact number already exists.");
		}
	}
	
	
	public int updateBuyer(Buyer buyer)   
	{  
		int res=0;
		if(buyer.getBuyerid()!=0)
		{ 
			brepo.save(buyer);
			res=1;		
		}
		return res;		
	}


}
