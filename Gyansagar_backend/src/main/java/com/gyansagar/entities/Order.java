package com.gyansagar.entities;

import java.sql.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;          

@Entity
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderid;
		
	@JsonIgnoreProperties("order")
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	//@Column - not associated
	private Set<OrderDetails> items;  //oiid,qty,price,order
	
	@Column
	private int buyerid;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column
	private Date order_date;
	
	@Column
	private float total_price;
	
	@Column(name="discounted_price")
	private float discounted_price;
	
	@Column
	private String deli_address;

	
	public Order(Set<OrderDetails> items, int buyerid, Date order_date, float total_price,
			String deli_address) {
		super();
		this.items = items;
		this.buyerid = buyerid;
		this.order_date = order_date;
		this.total_price = total_price;
		this.discounted_price  = discountedPrice();
		this.deli_address = deli_address;
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public Set<OrderDetails> getItems() {
		return items;
	}

	public void setItems(Set<OrderDetails> items) {
		for(OrderDetails od : items) {
			od.setOrder(this);
		}
		this.items = items;
	}

	public int getBuyerid() {
		return buyerid;
	}

	public void setBuyerid(int buyerid) {
		this.buyerid = buyerid;
	}

	public Date getOrder_date() {
		return order_date;
	}

	public void setOrder_date(Date order_date) {
		
		this.order_date = order_date;
	}

	public float getTotal_price() {
		return total_price;
	}

	public void setTotal_price(float total_price) {
		this.total_price = total_price;
	}

	public float getDiscounted_price() {
		return discounted_price;
	}

	public void setDiscounted_price(float discounted_price) {
		this.discounted_price = discounted_price;
	}

	public String getDeli_address() {
		return deli_address;
	}

	public void setDeli_address(String deli_address) {
		this.deli_address = deli_address;
	}

	@Override
	public String toString() {
		return "Order [orderid=" + orderid + ", items=" + items + ", buyerid=" + buyerid + ", order_date=" + order_date
				+ ", total_price=" + total_price + ", discounted_price=" + discounted_price + ", deli_address="
				+ deli_address + "]";
	}

	public float discountedPrice() {
		OrderDetails od = new OrderDetails();
		
		if(od.getOrder_qty()>=5 && od.getOrder_qty()<10)
		{
			discounted_price = (float)(total_price - (total_price*0.1));
		}
		else if(od.getOrder_qty()>=10 && od.getOrder_qty()<20)
		{
			discounted_price = (float)(total_price - (total_price*0.2));

		}
		else if(od.getOrder_qty()>=20 && od.getOrder_qty()<50)
		{
			discounted_price = (float)(total_price - (total_price*0.3));

		}
		else if(od.getOrder_qty()>=50)
		{
			discounted_price = (float)(total_price - (total_price*0.4));

		}
		return discounted_price;
		
	}
	
}
