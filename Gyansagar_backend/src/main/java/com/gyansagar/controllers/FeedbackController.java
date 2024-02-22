package com.gyansagar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gyansagar.entities.Feedback;
import com.gyansagar.services.FeedbackService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

	@Autowired
	FeedbackService feedbackservice;
	
	@GetMapping("/getfeedbackbybookid/{bookid}")
	public List<Feedback> getFeedbackByBookid(@PathVariable("bookid")int bookid){
		return feedbackservice.getFeedbackByBookid(bookid);
	}
	
	@GetMapping("/getallfeedbacks")
	public List<Feedback> getAllFeedbacks(){
		return feedbackservice.getAllFeedbacks();
	}
	
	@PostMapping("/givefeedback")
	public Feedback giveFeedback(@RequestBody Feedback feedback){
		return feedbackservice.giveFeedback(feedback);
	}
}
