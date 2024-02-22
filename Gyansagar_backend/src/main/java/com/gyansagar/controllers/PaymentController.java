package com.gyansagar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.entities.Order;
import com.gyansagar.entities.Payment;
import com.gyansagar.services.PaymentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PaymentController {

	@Autowired
	PaymentService paymentservice;
	
	@PostMapping("/makepayment")
	public ResponseEntity<Payment> makePayment(@RequestBody Payment payment) throws Exception{
		
		return new ResponseEntity(paymentservice.makePayment(payment),HttpStatus.OK) ;
	}
}
