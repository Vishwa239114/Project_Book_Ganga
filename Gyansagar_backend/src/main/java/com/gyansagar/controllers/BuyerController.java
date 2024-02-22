package com.gyansagar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.entities.Buyer;
import com.gyansagar.entities.BuyerRegistration;
import com.gyansagar.entities.Login;
import com.gyansagar.entities.Seller;
import com.gyansagar.services.BuyerService;
import com.gyansagar.services.LoginService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController(value = "/buyer")
public class BuyerController
{
	@Autowired
	BuyerService bservice;
	
	@Autowired
	LoginService lservice;
	
	
	@PostMapping("/registerbuyer")
	public Buyer registerBuyer(@RequestBody BuyerRegistration br) throws Exception
	{

		//Login userid, String buyername, String email, String buyer_contact, String aadharno, String address
		Buyer b= new Buyer(br.getBuyername(),br.getEmail(),br.getBuyer_contact(),br.getAadharno(),br.getAddress());
		bservice.validateCreate(b);
		Login l= new Login(br.getUsername(),br.getPassword(),"buyer");
		Login loginObject= lservice.add(l);
		b.setUserid(loginObject);
		return bservice.add(b);
	}
	
	@PutMapping("/updatebuyer")
	public int updateSeller(@RequestBody Buyer buyer)
	{
		return bservice.updateBuyer(buyer);
	
	}

}
