package com.api.classifybook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
public class ClassifybookApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClassifybookApplication.class, args);
	}

}
