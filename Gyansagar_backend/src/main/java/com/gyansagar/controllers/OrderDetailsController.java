package com.gyansagar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.dto.ErrorDto;
import com.gyansagar.entities.Order;
import com.gyansagar.entities.OrderDetails;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.services.OrderDetailsService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderDetailsController {
	
	
	
	@Autowired
	OrderDetailsService orderdetailsservice;
	
	@GetMapping("/getorderdetailsbyid/{odid}")
	public Object getOrderDetails(@PathVariable("odid") int odid) throws NotFoundException {
		try
		{
			
			return orderdetailsservice.getOrderdetails(odid);
		
		}
		catch(Exception n)
		{			
			ErrorDto err=new ErrorDto(n.getMessage());
			return err;
		}
	}
	
	@GetMapping("/getallorderdetails")
	public List<OrderDetails> getOrder()  {		
			return orderdetailsservice.getAllOrderDetails();
	}
	
	@PostMapping("/addorderdetails")
	public ResponseEntity<OrderDetails> placeOrderDetails(@RequestBody OrderDetails orderdetails) throws Exception {
		return new ResponseEntity(orderdetailsservice.placeOrderDetails(orderdetails),HttpStatus.OK) ;
	}
	
//	@GetMapping("/getorderdetailsbybuyerid/{buyerid}")
//	public List<OrderDetails> getOrderDetailsByBuyerId(@PathVariable("buyerid") int bid)  {		
//			return orderdetailsservice.findByBuyerid(bid);
//	}
}
