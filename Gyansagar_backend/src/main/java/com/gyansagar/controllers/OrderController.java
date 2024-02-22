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
import com.gyansagar.dto.OrderHistoryProjectionInterface;
import com.gyansagar.entities.Book;
import com.gyansagar.entities.Order;
import com.gyansagar.entities.OrderDetails;
import com.gyansagar.exceptions.NotFoundException;

import com.gyansagar.repository.OrderRepository;
import com.gyansagar.services.OrderDetailsService;
import com.gyansagar.services.OrderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderController {
	
	@Autowired
	OrderService orderservice;
	
	
	
	@GetMapping("/getorderbyid/{orderid}")
	public Object getOrder(@PathVariable("orderid") int orderid) throws NotFoundException {
		try
		{
			
			return orderservice.getOrder(orderid);
		
		}
		catch(Exception n)
		{			
			ErrorDto err=new ErrorDto(n.getMessage());
			return err;
		}
	}
	
	@GetMapping("/getallorders")
	public List<Order> getOrder()  {		
			return orderservice.getAllOrders();
	}
	
	@PostMapping("/placeorder")
	public ResponseEntity<Order> placeOrder(@RequestBody Order order) throws Exception {
		return new ResponseEntity(orderservice.placeOrder(order),HttpStatus.OK) ;
	}
	
	@GetMapping("/getordersbybuyerid/{buyerid}")
	public List<Order> getOrderByBuyerId(@PathVariable("buyerid") int bid)  {		
			return orderservice.findByBuyerid(bid);
	}
	
	@GetMapping("/getorderdetailsbybuyerid/{buyerid}")
	public List<OrderHistoryProjectionInterface> getOrderDetailsByBuyerId(@PathVariable("buyerid") int bid)  {		
			return orderservice.getOrderDetailsByBuyerId(bid);
	}
}
