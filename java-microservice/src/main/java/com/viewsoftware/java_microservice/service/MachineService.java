package com.viewsoftware.java_microservice.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.viewsoftware.java_microservice.model.Machine;
import com.viewsoftware.java_microservice.rabbitMQ.MachineStatusProducer;

@Service
public class MachineService {
	
	private final MachineStatusProducer machineStatusProducer;

	public MachineService(MachineStatusProducer machineStatusProducer) {
		this.machineStatusProducer = machineStatusProducer;
	}

	public void simulateStatusChange() {
		
		Machine update1 = new Machine("123", "Produzindo", new ArrayList<>());
		Machine update2 = new Machine("456", "Parada", new ArrayList<>());
		
		machineStatusProducer.sendStatusUpdate(update1);
		machineStatusProducer.sendStatusUpdate(update2);
	}
}



