package com.gyansagar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gyansagar.entities.Feedback;
import com.gyansagar.repository.FeedbackRepository;

@Service
public class FeedbackService {

	@Autowired
	FeedbackRepository feedbackrepository;
	
	public List<Feedback> getFeedbackByBookid(int id){
		return feedbackrepository.getFeedbackByBookid(id);
	}
	
	public List<Feedback> getAllFeedbacks(){
		return feedbackrepository.findAll();
	}
	
	public Feedback giveFeedback(Feedback feedback) {
		return feedbackrepository.save(feedback);
	}
	
}
