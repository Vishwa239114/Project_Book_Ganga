package com.gyansagar.entities;

import javax.persistence.Column;

public class BuyerRegistration
{
	String username;	
	String password;	
	//String role;
	String buyername;	
	String email;	
	String buyer_contact;	
	String aadharno;	
	String address;
	public BuyerRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}
	public BuyerRegistration(String username, String password, String buyername, String email, String buyer_contact,
			String aadharno, String address) {
		super();
		this.username = username;
		this.password = password;
		this.buyername = buyername;
		this.email = email;
		this.buyer_contact = buyer_contact;
		this.aadharno = aadharno;
		this.address = address;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBuyername() {
		return buyername;
	}
	public void setBuyername(String buyername) {
		this.buyername = buyername;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBuyer_contact() {
		return buyer_contact;
	}
	public void setBuyer_contact(String buyer_contact) {
		this.buyer_contact = buyer_contact;
	}
	public String getAadharno() {
		return aadharno;
	}
	public void setAadharno(String aadharno) {
		this.aadharno = aadharno;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Override
	public String toString() {
		return "BuyerRegistration [username=" + username + ", password=" + password + ", buyername=" + buyername
				+ ", email=" + email + ", buyer_contact=" + buyer_contact + ", aadharno=" + aadharno + ", address="
				+ address + "]";
	}
	
	
}
