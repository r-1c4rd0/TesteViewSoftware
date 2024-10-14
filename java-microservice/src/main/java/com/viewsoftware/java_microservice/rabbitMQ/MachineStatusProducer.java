package com.viewsoftware.java_microservice.rabbitMQ;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viewsoftware.java_microservice.model.Machine;

@Service
public class MachineStatusProducer {
	 private final RabbitTemplate rabbitTemplate;
	    private final ObjectMapper objectMapper;

	    public MachineStatusProducer(RabbitTemplate rabbitTemplate, ObjectMapper objectMapper) {
	        this.rabbitTemplate = rabbitTemplate;
	        this.objectMapper = objectMapper;
	    }

	    public void sendStatusUpdate(Machine update) {
	        try {
	            String message = objectMapper.writeValueAsString(update);
	            rabbitTemplate.convertAndSend("atualizacoes", message);
	            System.out.println("Atualização de status enviada: " + message);
	        } catch (Exception e) {
	            System.err.println("Erro ao enviar a mensagem: " + e.getMessage());
	        }
	    }
}