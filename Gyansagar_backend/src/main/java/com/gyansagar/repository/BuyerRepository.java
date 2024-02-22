package com.gyansagar.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Buyer;
import com.gyansagar.entities.Login;

@Repository
@Transactional
public interface BuyerRepository extends JpaRepository<Buyer, Integer> {
	//@Query(value="select b.* forom buyer b where userid=:uid ",nativeQuery = true)
		//public List<Buyer> getUser(int uid);
		public Optional<Buyer> findByUserid(Login login);

		@Query(value = "select b from Buyer b where b.aadharno=:aadharno OR b.email=:email OR b.buyer_contact=:buyerContact")
		public List<Buyer> findByAadharnoOrEmailOrBuyer_contact(String aadharno, String email, String buyerContact);

}
