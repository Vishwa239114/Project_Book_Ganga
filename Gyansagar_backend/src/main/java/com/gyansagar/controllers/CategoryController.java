package com.gyansagar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.dto.ErrorDto;
import com.gyansagar.entities.Category;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.services.CategoryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController()
public class CategoryController {

	@Autowired
	CategoryService categoryservice;
	
	@GetMapping("getbycategoryid/{categoryid}")
	public Object getById(@PathVariable("categoryid")Integer categoryid) throws NotFoundException
	{
		try {
		return categoryservice.getById(categoryid);
		}
		catch(Exception e) {
			ErrorDto err=new ErrorDto(e.getMessage());
			return err;
		}
	}
	
	@GetMapping("/getallcategories")
    public List<Category> getAllCategories() {
    	
    	return categoryservice.getAllCategories();
    }
}
