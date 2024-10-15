package com.viewsoftware.java_microservice.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viewsoftware.java_microservice.model.Machine;
import com.viewsoftware.java_microservice.service.MachineService;

@RestController
@RequestMapping("/api/machines")
public class MachineController {

    @Autowired
    private MachineService machineService;

    @PostMapping
    public ResponseEntity<Machine> createMachine(@RequestBody Machine machine) {
        Machine savedMachine = machineService.saveMachine(machine);
        return new ResponseEntity<>(savedMachine, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Machine>> getAllMachines() {
        List<Machine> machines = machineService.findAllMachines();
        return new ResponseEntity<>(machines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Machine> getMachineById(@PathVariable String id) {
        Machine machine = machineService.findMachineById(id);
        return machine != null ? new ResponseEntity<>(machine, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Machine> updateMachine(@PathVariable String id, @RequestBody Machine machine) {
        Machine updatedMachine = machineService.updateMachine(id, machine);
        return new ResponseEntity<>(updatedMachine, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMachine(@PathVariable String id) {
        machineService.deleteMachine(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}
