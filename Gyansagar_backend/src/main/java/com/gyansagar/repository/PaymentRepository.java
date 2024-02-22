package com.gyansagar.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Payment;

@Transactional
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

	@Query("select max(transaction_number) from Payment")
	long getMaxTransactionNumber();

}
