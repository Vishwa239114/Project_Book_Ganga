package com.gyansagar.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="payment")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int transactionid;
	
	@Column
	private int orderid;
	
	@Column
	private int buyerid;
	
	@Column
	private long transaction_number  ;
	
	@Column
	private String paymentmode;
	
	
	
	public Payment(int orderid, int buyerid, String paymentmode) {
		super();
		
		this.orderid = orderid;
		this.buyerid = buyerid;
		this.paymentmode = paymentmode;
	}

	public void setTransaction_number(long transaction_number) {
		this.transaction_number = transaction_number;
	}

	public Payment() {
		super();
		
	}

	public long getTransaction_number() {
		return transaction_number;
	}

	public int getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(int transactionid) {
		this.transactionid = transactionid;
	}

	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public int getBuyerid() {
		return buyerid;
	}

	public void setBuyerid(int buyerid) {
		this.buyerid = buyerid;
	}

	public String getPaymentmode() {
		return paymentmode;
	}

	public void setPaymentmode(String paymentmode) {
		this.paymentmode = paymentmode;
	}

	@Override
	public String toString() {
		return "Payment [transactionid=" + transactionid + ", orderid=" + orderid + ", buyerid=" + buyerid
				+ ", paymentmode=" + paymentmode + "]";
	}
	
	
	
}
