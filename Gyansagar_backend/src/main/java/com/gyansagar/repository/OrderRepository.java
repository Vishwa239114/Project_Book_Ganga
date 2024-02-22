package com.gyansagar.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gyansagar.dto.OrderHistoryProjectionInterface;
import com.gyansagar.entities.Order;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	
	public List<Order> findByBuyerid(int bid);

	@Query(value = "select o.orderid orderid,b.bookid bookid,o.buyerid buyerid,b.bookname bookname,b.author author,od.itemprice itemprice,od.order_qty order_qty from orders o inner join order_details od on od.orderid = o.orderid inner join buyer br on br.buyerid = o.buyerid inner join Book b on od.bookid = b.bookid where o.buyerid = :bid order by o.orderid",nativeQuery = true)
	public List<OrderHistoryProjectionInterface> getOrderDetailsByBuyerId(int bid);
}
