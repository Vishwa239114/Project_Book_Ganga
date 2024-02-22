package com.gyansagar.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="category")
public class Category 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int category_id;
	
	@Column
	String categoryname;
	
	//@JsonIgnoreProperties("category")
	//@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	//@Column - not associated
	//Set<Book> book; //bookid,ISBN,......category object

	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category( int category_id, String categoryname) {
		super();
		this.category_id = category_id;
		this.categoryname = categoryname;
	}
	public Category( String categoryname) {
		super();
		//this.category_id = category_id;
		this.categoryname = categoryname;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getCategoryname() {
		return categoryname;
	}

	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}

	

	
	
}
