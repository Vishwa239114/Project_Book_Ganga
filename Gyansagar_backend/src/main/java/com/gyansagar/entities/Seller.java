package com.gyansagar.entities;

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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Table(name="seller")
public class Seller 
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int sellerid;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid")
	Login userid;
	

	@JsonIgnoreProperties("sellerid")
	@OneToMany(mappedBy = "sellerid", cascade = CascadeType.ALL)
	//@Column - not associated
	Set<Book> books; //bookid,ISBN,......category object
	
	@Column
	String publication_name;
	
	@Column
	String email;
	
	@Column
	String seller_contact;
	
	
	@Column
	String address;
	

	public Seller() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Seller( String publication_name, String email, String seller_contact,
			 String address,Login userid) {
		super();	
		this.userid=userid;
		this.publication_name = publication_name;
		this.email = email;
		this.seller_contact = seller_contact;		
		this.address = address;
	}
	public Seller( String publication_name, String email, String seller_contact,
				   String address) {
		super();
		this.userid=null;
		this.publication_name = publication_name;
		this.email = email;
		this.seller_contact = seller_contact;
		this.address = address;
	}


	public Seller(String publication_name, String email, String seller_contact,
			String address,Login userid, Set<Book> books ) {
		super();
		this.userid = userid;
		this.books = books;
		this.publication_name = publication_name;
		this.email = email;
		this.seller_contact = seller_contact;
		this.address = address;
	}
	
	
	
	public int getSellerid() {
		return sellerid;
	}

	public void setSellerid(int sellerid) {
		this.sellerid = sellerid;
	}

	public Login getUserid() {
		return userid;
	}

	public void setUserid(Login userid) {
		this.userid = userid;
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
	
	public Set<Book> getBooks() {
		return books;
	}

	

	@Override
	public String toString() {
		return "Seller [sellerid=" + sellerid + ", userid=" + userid + ", book=" + books + ", publication_name="
				+ publication_name + ", email=" + email + ", seller_contact=" + seller_contact + ", address=" + address
				+ "]";
	}

	

	
	
	

}
