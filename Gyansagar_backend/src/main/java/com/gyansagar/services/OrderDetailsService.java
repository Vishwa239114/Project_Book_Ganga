package com.gyansagar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Order;
import com.gyansagar.entities.OrderDetails;
import com.gyansagar.exceptions.BadRequestException;
import com.gyansagar.repository.OrderDetailsRepository;


@Service
public class OrderDetailsService {

	
	
	@Autowired
	OrderDetailsRepository orderdetailsrepository;
	
	public OrderDetails getOrderdetails(int odid) 
	{
		return orderdetailsrepository.findById(odid).get();
	}
	
	public List<OrderDetails> getAllOrderDetails()
	{
		return orderdetailsrepository.findAll();
	}
	
	public OrderDetails placeOrderDetails(OrderDetails orderdetails) throws Exception {
		
		try{
			return orderdetailsrepository.save(orderdetails);
		}
		catch(Exception ex){
			throw new BadRequestException(ex.getMessage());
		}
		}
//	public List<OrderDetails> findByBuyerid(int bid){
	//	return orderdetailsrepository.findByBuyerid(bid);
	//}

}
