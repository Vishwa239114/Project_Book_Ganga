package com.gyansagar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Payment;
import com.gyansagar.exceptions.BadRequestException;
import com.gyansagar.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	PaymentRepository paymentrepository;
	
	public long getMaxTransactionNumber() {
		return paymentrepository.getMaxTransactionNumber();
	}
	
	public Payment makePayment(Payment payment) throws Exception {
		try {
			long latesttransactionnumber = paymentrepository.getMaxTransactionNumber();
			payment.setTransaction_number(++latesttransactionnumber);
			return paymentrepository.save(payment);
			}
			catch(Exception ex){
				throw new BadRequestException(ex.getMessage());
			}
	}
}
