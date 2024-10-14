# Usar a imagem do OpenJDK 17
FROM openjdk:17-jdk-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo JAR para o container
COPY target/monitoramento-maquinas-1.0-SNAPSHOT.jar /app/monitoramento-maquinas.jar

# Expor a porta 8080 para a aplicação Java
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "monitoramento-maquinas.jar"]
