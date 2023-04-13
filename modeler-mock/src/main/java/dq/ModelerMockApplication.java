package dq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class ModelerMockApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModelerMockApplication.class, args);
		System.out.println("### MODELER MOCK STARTED ###");
	}
}