package com.gyansagar.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Order;
import com.gyansagar.entities.OrderDetails;

@Repository
@Transactional
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

	//public List<OrderDetails> findByBuyerid(int bid);

}
