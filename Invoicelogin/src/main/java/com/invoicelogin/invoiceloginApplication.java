package com.invoicelogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.invoicelogin.model")
public class invoiceloginApplication {

	public static void main(String[] args) {
		SpringApplication.run(invoiceloginApplication.class, args);
	}

}
