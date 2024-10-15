package com.viewsoftware.java_microservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viewsoftware.java_microservice.model.Machine;
import com.viewsoftware.java_microservice.repository.MachineRepository;

@Service
public class MachineService {
	
	 @Autowired
	    private MachineRepository machineRepository;

	    public Machine saveMachine(Machine machine) {
	        return machineRepository.save(machine);
	    }

	    public List<Machine> findAllMachines() {
	        return machineRepository.findAll();
	    }

	    public Machine findMachineById(String id) {
	        return machineRepository.findById(id).orElse(null);
	    }

	    public Machine updateMachine(String id, Machine machine) {
	        Machine existingMachine = machineRepository.findById(id).orElse(null);
	        if (existingMachine != null) {
	            existingMachine.setName(machine.getName());
	            existingMachine.setStatus(machine.getStatus());
	            existingMachine.setPeriodos(machine.getPeriodos());
	            return machineRepository.save(existingMachine);
	        }
	        return null;
	    }

	    public void deleteMachine(String id) {
	        machineRepository.deleteById(id);
	    }
}



