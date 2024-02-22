package com.gyansagar.dto;

public interface OrderHistoryProjectionInterface {

	int getorderid();
	int getbuyerid();
	int getbookid();
	String getbookname();
	String getauthor();
	float getitemprice();
	int getorder_qty();
	
	
}
