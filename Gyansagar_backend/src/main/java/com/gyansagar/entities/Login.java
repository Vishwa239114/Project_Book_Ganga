package com.gyansagar.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="login")
public class Login
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int userid;
	
	@Column
	String username;
	
	@Column
	String password;
	
	@Column
	String role;
	
	@Column(columnDefinition = "boolean default false")
	boolean deleted;

	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Login( String username, String password, String role) {
		super();
		
		this.username = username;
		this.password = password;
		this.role = role;
		this.deleted = false;
	}

	public int getUserid() {
		return userid;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public void setUserid(int userid) {
		this.userid = userid;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Login [userid=" + userid + ", username=" + username + ", password=" + password + ", role=" + role + "]";
	}
	
	

}
