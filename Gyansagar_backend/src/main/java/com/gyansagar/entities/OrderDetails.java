package com.gyansagar.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="order_details")
public class OrderDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int odid;
	
	@JsonIgnoreProperties("items")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="orderid")
	Order order;
	
	@Column
	int bookid;
	
	@Column
	int order_qty;
	
	@Column
	float itemprice;

	
	public OrderDetails() {
		super();
		// TODO Auto-generated constructor stub
	}


	public OrderDetails(Order order, int bookid, int order_qty, float price) {
		super();
		this.order = order;
		this.bookid = bookid;
		this.order_qty = order_qty;
		this.itemprice = price;
	}


	public int getOdid() {
		return odid;
	}


	public void setOdid(int odid) {
		this.odid = odid;
	}


	public Order getOrder() {
		return order;
	}


	public void setOrder(Order order) {
		this.order = order;
	}


	public int getBookid() {
		return bookid;
	}


	public void setBookid(int bookid) {
		this.bookid = bookid;
	}


	public int getOrder_qty() {
		return order_qty;
	}


	public void setOrder_qty(int order_qty) {
		this.order_qty = order_qty;
	}


	public float getItemPrice() {
		return itemprice;
	}


	public void setItemPrice(float price) {
		this.itemprice = price;
	}
	
	
	
}
