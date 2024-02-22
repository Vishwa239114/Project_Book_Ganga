package com.gyansagar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender sendMail;
	
	public void sendEmailForNewRegistration(String email) 
	{
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("vishwjeetkukde@gmail.com");
		message.setTo(email);
		message.setSubject("Registration Mail.....Successfully Registered");
		message.setText("Thank You for Registering With Us! Welcome to Book-Ganga Portal"
				+ "Wishing You A Great Health From Book-Ganga Team");
		sendMail.send(message);
	}
	
	}