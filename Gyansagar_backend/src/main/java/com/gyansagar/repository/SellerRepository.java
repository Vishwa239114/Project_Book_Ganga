package com.gyansagar.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Buyer;
import com.gyansagar.entities.Login;
import com.gyansagar.entities.Seller;
@Repository
@Transactional
public interface SellerRepository extends JpaRepository<Seller, Integer> {
	
	public Optional<Seller> findByUserid(Login login);

	public Optional<Seller> findByEmail(String email);
}
