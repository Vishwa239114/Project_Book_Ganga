package com.gyansagar.services;

import com.gyansagar.entities.Category;
import com.gyansagar.entities.Seller;
import com.gyansagar.exceptions.NotFoundException;
import com.gyansagar.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Category getById(Integer categoryid) throws NotFoundException {
        Optional<Category> category= categoryRepository.findById(categoryid);

        if(category.isEmpty())
            throw new NotFoundException(String.format("Category with category_id=%d does not exist", categoryid));

        return category.get();
    }
    
    public List<Category> getAllCategories() {
        List<Category> category= categoryRepository.findAll();

       // if(category.isEmpty())
            //throw new NotFoundException(String.format(""));

        return category;
    }
    
}
