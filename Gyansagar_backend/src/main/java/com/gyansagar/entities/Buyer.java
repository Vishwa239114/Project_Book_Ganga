package com.gyansagar.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="buyer")
public class Buyer 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int buyerid;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid")
	Login userid;
	
	@Column
	String buyername;
	
	@Column
	String email;
	
	@Column(name = "buyer_contact")
	String buyer_contact;
	
	@Column
	String aadharno;
	
	@Column
	String address;

	public Buyer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Buyer( String buyername, String email, String buyer_contact, String aadharno, String address) {
		super();
		this.userid = null;
		this.buyername = buyername;
		this.email = email;
		this.buyer_contact = buyer_contact;
		this.aadharno = aadharno;
		this.address = address;
	}
	public Buyer( String buyername, String email, String buyer_contact, String aadharno, String address,Login userid) {
		super();
		this.userid = userid;
		this.buyername = buyername;
		this.email = email;
		this.buyer_contact = buyer_contact;
		this.aadharno = aadharno;
		this.address = address;
	}

	public int getBuyerid() {
		return buyerid;
	}

	public void setBuyerid(int buyerid) {
		this.buyerid = buyerid;
	}

	public Login getUserid() {
		return userid;
	}

	public void setUserid(Login userid) {
		this.userid = userid;
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
		return "Buyer [buyerid=" + buyerid + ", userid=" + userid + ", buyername=" + buyername + ", email=" + email
				+ ", buyer_contact=" + buyer_contact + ", aadharno=" + aadharno + ", address=" + address + "]";
	}

	
	
	

}
