package za.co.ca.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class CollectorAcademyApiApplication {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("Africa/Johannesburg"));
		SpringApplication.run(za.co.ca.api.CollectorAcademyApiApplication.class, args);
	}

}
