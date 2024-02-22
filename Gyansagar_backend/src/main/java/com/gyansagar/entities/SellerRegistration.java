package com.gyansagar.entities;

import javax.persistence.Column;

public class SellerRegistration {
	String username;	
	String password;	
	//String role;
	String publication_name;
	String email;	
	String seller_contact;	
	//String book_img_url;	
	String address;
	public SellerRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SellerRegistration(String username, String password, String publication_name, String email,
			String seller_contact, String address) {
		super();
		this.username = username;
		this.password = password;
		this.publication_name = publication_name;
		this.email = email;
		this.seller_contact = seller_contact;
		//this.book_img_url = book_img_url;
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
	public String getPublication_name() {
		return publication_name;
	}
	public void setPublication_name(String publication_name) {
		this.publication_name = publication_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSeller_contact() {
		return seller_contact;
	}
	public void setSeller_contact(String seller_contact) {
		this.seller_contact = seller_contact;
	}
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Override
	public String toString() {
		return "SellerRegistration [username=" + username + ", password=" + password + ", publication_name="
				+ publication_name + ", email=" + email + ", seller_contact=" + seller_contact +  ", address=" + address + "]";
	}
	
	
	
	
}
