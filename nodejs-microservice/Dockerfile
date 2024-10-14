# Usar a imagem oficial do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do Node.js
RUN npm install

# Copiar o código da aplicação para o container
COPY . .

# Expor a porta 3000 para o WebSocket
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
