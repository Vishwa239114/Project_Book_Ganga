package com.gyansagar.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Category;
@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
