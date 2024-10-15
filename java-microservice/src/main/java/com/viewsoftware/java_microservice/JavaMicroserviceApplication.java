package com.viewsoftware.java_microservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.viewsoftware.java_microservice.service.MachineService;

@SpringBootApplication
public class JavaMicroserviceApplication implements CommandLineRunner {

	private final MachineService machineService;  

	public JavaMicroserviceApplication(MachineService machineService) {
		this.machineService = machineService;
	}

	public static void main(String[] args) {
		SpringApplication.run(JavaMicroserviceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {        
		System.out.println("Microserviço Java iniciado com sucesso!");       

	}
}
