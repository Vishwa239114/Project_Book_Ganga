package com.gyansagar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.dto.ErrorDto;
import com.gyansagar.dto.OrderHistoryProjectionInterface;
import com.gyansagar.entities.Order;
import com.gyansagar.entities.OrderDetails;
import com.gyansagar.exceptions.BadRequestException;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	OrderRepository orderrepository;
	
	
	
	public Order getOrder(int orderid) 
	{
		return orderrepository.findById(orderid).get();
	}
	
	public List<Order> getAllOrders()
	{
		return orderrepository.findAll();
	}
	
	public Order placeOrder(Order order) throws Exception {
		try {
		return orderrepository.save(order);
		}
		catch(Exception ex){
			throw new BadRequestException(ex.getMessage());
		}
	}
	
	public List<Order> findByBuyerid(int bid){
		return orderrepository.findByBuyerid(bid);
	}

	public List<OrderHistoryProjectionInterface> getOrderDetailsByBuyerId(int bid) {
		
		return orderrepository.getOrderDetailsByBuyerId(bid);
	}

}
