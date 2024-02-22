package com.gyansagar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.dto.ErrorDto;
import com.gyansagar.entities.Login;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.services.LoginService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController 
{
	
	
	@Autowired
	LoginService lservice;
	
	@PostMapping("/logincheck")
	public Object checkLogin(@RequestBody Login l)
	{
		try
		{
			
			return lservice.checkLogin(l.getUsername(), l.getPassword());
		
		}
		catch(Exception n)
		{			
			ErrorDto err=new ErrorDto(n.getMessage());
			return err;
		}
		
	}

}
