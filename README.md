# Microserviço de Gerenciamento de Máquinas

Este projeto é um microserviço que permite a criação, visualização, atualização e exclusão de máquinas e períodos de produção. Além disso, ele integra com RabbitMQ para enviar notificações de alteração ao microserviço Node.js.

## Funcionalidades
 *	CRUD de Máquinas: Criação, leitura, atualização e exclusão de máquinas.
 *	Persistência em MongoDB: Todas as máquinas e períodos de produção são armazenados em um banco de dados MongoDB.
 *	Integração com RabbitMQ: Notificações de alterações de máquinas e períodos são enviadas para um microserviço Node.js via RabbitMQ.
 *	WebSocket: O microserviço Node.js utiliza WebSocket para enviar atualizações em tempo real sobre o status das máquinas.

## Tecnologias Utilizadas

**Backend Java**
*	Java 17
*	Spring Boot 3.3.4
*	MongoDB (Spring Data MongoDB)
*	RabbitMQ (Spring AMQP)
**Backend Node.js**
*	Node.js 18
*	Express.js
*	Mongoose (MongoDB ODM)
*	amqplib (Integração com RabbitMQ)
*	WebSocket (Atualizações em tempo real)
**Pré-requisitos**
1.	Docker: Para rodar o ambiente de containers do projeto.
2.	Docker Compose: Para gerenciar os containers do MongoDB, RabbitMQ e os microserviços.
3.	Java 17: Para rodar o microserviço Java.
4.	Node.js: Para rodar o microserviço Node.js.

## Configuração e Execução

### Passo 1: Clone o repositório

```
git clone https://github.com/r-1c4rd0/TesteViewSoftware.git
```

### Passo 2: Subir os containers com Docker Compose


### Para o Java
 ```
  docker run -d -p 8080:8080 --name java-microservice java-microservice 
 ```
 ### Para o nodejs
 ```
  docker run -d -p 3000:3000 --name nodejs-microservice nodejs-microservice 
 ```

 Execute o seguinte comando para inicializar o MongoDB, RabbitMQ, e os microserviços:

```
docker-compose up --build
```
O comando irá inicializar:
*	MongoDB (porta 27017)
*	RabbitMQ (porta 5672 e 15672 para o painel de administração)
*	Microserviço Java (porta 8080)
*	Microserviço Node.js (porta 3000)

### Passo 3: Configuração do Microserviço Java

O arquivo de configuração está localizado em src/main/resources/application.properties e contém as configurações para conexão ao MongoDB e RabbitMQ:

```
# Configuração do MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/test

# Configuração do RabbitMQ
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest

# Configuração da porta do microserviço Java (Spring Boot)
server.port=8080

# Logging (opcional, para debug)
logging.level.org.springframework=INFO
logging.level.com.fabrica.monitoramento=DEBUG

```
### Passo 4: Executar o Microserviço Java

1.	Navegue até a pasta do projeto.
2.	Compile e rode o projeto usando Maven:

```
mvn spring-boot:run
``` 

### Passo 5: Executar o Microserviço Node.js

Se preferir rodar o microserviço Node.js localmente fora do Docker:
 1.	Navegue até a pasta nodejs-microservice.
 2.	Instale as dependências e inicie o servidor:

 ```
 npm install
 ```
 ```
 npm start
 ```
### Passo 6: Testando os Endpoints via Postman

 ## 1. Criar Máquina (POST)
  ### URL: 
  ```
  http://localhost:8080/api/machines
  ```
  ### BODY:
  ```
  {
    "name": "Máquina teste 5",
    "status": "Produzindo",
    "periodos": [
        {
            "dataInicio": "2024-10-15T00:00:00",
            "dataFim": "2024-10-15T23:59:59"
        },
        {
            "dataInicio": "2024-10-15T00:00:00",
            "dataFim": "2024-10-15T23:59:59"
        }
    ]
}
  ```
### response: 
```
{
    "maquinaId": "670eadc848d7020e2328614e",
    "name": "Máquina teste 5",
    "status": "Produzindo",
    "periodos": [
        {
            "dataInicio": "2024-10-15T00:00:00.000+00:00",
            "dataFim": "2024-10-15T23:59:59.000+00:00"
        },
        {
            "dataInicio": "2024-10-15T00:00:00.000+00:00",
            "dataFim": "2024-10-15T23:59:59.000+00:00"
        }
    ]
}
```

## 2. Atualizar Máquina (PUT)
  ### URL: 
  ```
  http://localhost:8080/api/machines/{id} 
 ```
### BODY:
```
{
  "name": "Máquina Atualizada",
  "status": "Produzindo",
  "periodos": [
        {
            "dataInicio": "2024-10-15T00:00:00",
            "dataFim": "2024-10-15T23:59:59"
        },
        {
            "dataInicio": "2024-10-15T00:00:00",
            "dataFim": "2024-10-15T23:59:59"
        }
    ]
}
```

## 3. Deletar Máquina (DEL)
  ### URL: 
  ```
  http://localhost:8080/api/machines/{id} 
 ```
## 4. Listar por ID Máquina (GET)
  ### URL: 
  ```
  http://localhost:8080/api/machines/{id} 
 ```
 ### response:

 ```
 {
    "maquinaId": "670ea9e148d7020e23286147",
    "name": "Máquina Atualizada",
    "status": "Produzindo",
    "periodos": [
        {
            "dataInicio": "2024-10-15T00:00:00.000+00:00",
            "dataFim": "2024-10-15T23:59:59.000+00:00"
        },
        {
            "dataInicio": "2024-10-15T00:00:00.000+00:00",
            "dataFim": "2024-10-15T23:59:59.000+00:00"
        }
    ]
}
 ```

 ## 4. Listar todas Máquina (GET)
  ### URL: 
  ```
  http://localhost:8080/api/machines/ 
 ```
 ### response:
 ```
  {
        "maquinaId": "670ea9e148d7020e23286147",
        "name": "Máquina Atualizada",
        "status": "Produzindo",
        "periodos": [
            {
                "dataInicio": "2024-10-15T00:00:00.000+00:00",
                "dataFim": "2024-10-15T23:59:59.000+00:00"
            },
            {
                "dataInicio": "2024-10-15T00:00:00.000+00:00",
                "dataFim": "2024-10-15T23:59:59.000+00:00"
            }
        ]
    },
    {
        "maquinaId": "670eaabd48d7020e23286148",
        "name": "Máquina teste",
        "status": "Produzindo",
        "periodos": [
            {
                "dataInicio": "2024-10-10T08:00:00.000+00:00",
                "dataFim": "2024-10-10T12:00:00.000+00:00"
            },
            {
                "dataInicio": "2024-10-11T08:00:00.000+00:00",
                "dataFim": "2024-10-11T12:00:00.000+00:00"
            }
        ]
    }, 
    ...
 ```
### Passo 7: Testando WebSocket via Postman
 Crie uma nova requisição, selecione a opção **WebSocket** 

 Conecte na seguinte rota e depois clique em connect: 

 ```
 ws://localhost:3000
 ```

 ### response: 

 ```
 [
    {
        "id": "670ea9e148d7020e23286147",
        "status": "Produzindo"
    },
    {
        "id": "670eaabd48d7020e23286148",
        "status": "Parada"
    },
    {
        "id": "670eaac148d7020e23286149",
        "status": "Parada"
    },
    {
        "id": "670eaaca48d7020e2328614a",
        "status": "Parada"
    },
    {
        "id": "670eaace48d7020e2328614b",
        "status": "Parada"
    },
    {
        "id": "670eaad248d7020e2328614c",
        "status": "Parada"
    },
    {
        "id": "670eabd448d7020e2328614d",
        "status": "Produzindo"
    },
    {
        "id": "670eadc848d7020e2328614e",
        "status": "Produzindo"
    }
]
 ```
* Obs.
 O status das máquinas será modificado para produzido de acordo com o período, na lógica do código quando a data for até a data atual o status é produzido, caso contrário o status é parado.

 ```
 const producaoAtiva = maquina.periodos.some(periodo => periodo.dataInicio <= agora && periodo.dataFim >= agora);
  return producaoAtiva ? 'Produzindo' : 'Parada';
 ```

