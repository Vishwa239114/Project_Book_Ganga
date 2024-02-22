package com.gyansagar.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="feedback")
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int feedbackid;
	
	@Column
	String subject;
	
	@Column
	String feedback_desc;
	
	@Column
	int userid;
	
	@Column
	int bookid;

	public Feedback() {
		super();

	}

	public Feedback(String subject, String feedback_desc, int userid, int bookid) {
		super();
		this.subject = subject;
		this.feedback_desc = feedback_desc;
		this.userid = userid;
		this.bookid = bookid;
	}

	public int getFeedbackid() {
		return feedbackid;
	}

	public void setFeedbackid(int feedbackid) {
		this.feedbackid = feedbackid;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getFeedback_desc() {
		return feedback_desc;
	}

	public void setFeedback_desc(String feedback_desc) {
		this.feedback_desc = feedback_desc;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public int getBookid() {
		return bookid;
	}

	public void setBookid(int bookid) {
		this.bookid = bookid;
	}

	@Override
	public String toString() {
		return "Feedback [feedbackid=" + feedbackid + ", subject=" + subject + ", feedback_desc=" + feedback_desc
				+ ", userid=" + userid + ", bookid=" + bookid + "]";
	}
	
	
}
