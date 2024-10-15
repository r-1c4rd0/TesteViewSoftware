package com.viewsoftware.java_microservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.viewsoftware.java_microservice.service.MachineService;

@SpringBootApplication
public class JavaMicroserviceApplication implements CommandLineRunner {

    public JavaMicroserviceApplication(MachineService machineService) {
    }

    public static void main(String[] args) {
        SpringApplication.run(JavaMicroserviceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {        
    	 System.out.println("Microserviço Java iniciado com sucesso!");
    }
}
