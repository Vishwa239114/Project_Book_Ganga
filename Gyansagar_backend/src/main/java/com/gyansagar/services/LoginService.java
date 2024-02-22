package com.gyansagar.services;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import com.gyansagar.exceptions.DuplicateEntryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Buyer;
import com.gyansagar.entities.Login;
import com.gyansagar.entities.Seller;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.repository.BuyerRepository;
import com.gyansagar.repository.LoginRepository;
import com.gyansagar.repository.SellerRepository;
import com.gyansagar.utils.Constants;

@Service
public class LoginService {
	@Autowired
	LoginRepository lrepo;
	
	@Autowired
	BuyerRepository brepo;
	
	@Autowired
	SellerRepository srepo;
	
	
	public Login add(Login l) throws DuplicateEntryException {
		if(lrepo.findByUsername(l.getUsername()).isPresent()){
            throw new DuplicateEntryException(String.format("Username=%s already exists.", l.getUsername()));
        }
		String encodePassword = Base64.getEncoder().encodeToString(l.getPassword().getBytes());
		l.setPassword(encodePassword);
		return lrepo.save(l); //save object in database
	}
	
	
	
	public Object checkLogin(String uname, String pwd) throws NotFoundException
	{  
//		String encodePassword = Base64.getEncoder().encodeToString(pwd.getBytes());
		String encodePassword = pwd;
		Optional<Login> l = lrepo.findByUsernameAndPassword(uname, encodePassword);
		if(l.get().isDeleted()== false) 
		{
        	if (l.isPresent() && l.get().getRole().equals("buyer")) 
        	{
            Login loginObject = l.get();
            Optional<Buyer> ob = brepo.findByUserid(loginObject);
            if (ob.isPresent()) 
            {
            	//ob.get().getUserid().setPassword(null);
                return ob.get();
            } 
            else 
            {
            	throw new NotFoundException(Constants.INVALID_CREDENTIALS_ERROR);
            }
        }
        else if(l.isPresent() && l.get().getRole().equals("seller"))
        {
        	 Login loginObject = l.get();
             Optional<Seller> ob = srepo.findByUserid(loginObject);
             if (ob.isPresent()) {
             	//ob.get().getUserid().setPassword(null);
                 return ob.get();
             } else {
            	 throw new NotFoundException(Constants.INVALID_CREDENTIALS_ERROR);
             }
        }
        else if(l.isPresent() && l.get().getRole().equals("admin"))
        {
        	 //l.get().setPassword(null);
        	 return l.get();
        }
        else
        	throw new NotFoundException(Constants.INVALID_CREDENTIALS_ERROR);
        }
		else {
			throw new NotFoundException(Constants.INVALID_CREDENTIALS_ERROR);
		}
        
    }
	
	
}
