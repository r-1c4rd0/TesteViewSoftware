package com.viewsoftware.java_microservice.rabbitMQ;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {
    @Bean
    Queue machineStatusQueue() {
	        return new Queue("atualizacoes");
	    }
}
