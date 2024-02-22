package com.gyansagar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.gyansagar.*")
public class GyansagarBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(GyansagarBackendApplication.class, args);
	}

}
