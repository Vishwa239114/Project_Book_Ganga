package com.gyansagar.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gyansagar.entities.Feedback;

@Repository
@Transactional
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

	public List<Feedback> getFeedbackByBookid(int bookid);
}
