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
public interface LoginRepository extends JpaRepository<Login, Integer> {
	
	//@Query(value = "select l.role, l.userid from login l where username= :uname and password= :pwd",nativeQuery = true)
	//public List<Object[]>  checkLogin(String uname,String pwd);
	
	//@Query(value = "select l.* from login l where username= :uname and password= :pwd",nativeQuery = true)
	//public List<Login>  checkLogin(String uname,String pwd);
	
	
	public Optional<Login> findByUsernameAndPassword(String uname,String pwd);

	public Optional<Login> findByUsername(String uname);




}
