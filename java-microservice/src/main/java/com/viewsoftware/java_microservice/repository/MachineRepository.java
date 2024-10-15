package com.viewsoftware.java_microservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.viewsoftware.java_microservice.model.Machine;

@Repository
public interface MachineRepository extends MongoRepository<Machine, String> {   
}