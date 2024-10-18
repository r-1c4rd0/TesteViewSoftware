const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const amqp = require('amqplib');
const machineRoutes = require('./routes/machineRoutes'); // Importa as rotas de máquinas

const app = express();
const PORT = 3000;

app.use(express.json()); // Permite o envio de JSON no corpo das requisições

// Adicione esta linha para resolver a depreciação
mongoose.set('strictQuery', false);

// Conectar ao MongoDB
mongoose.connect('mongodb://mongodb:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo de Máquina
const maquinaSchema = new mongoose.Schema({
  maquinaId: { type: String, required: true },
  nome: String,
  status: String,
  periodos: [{
    dataInicio: Date,
    dataFim: Date
  }]
});

const Maquina = mongoose.model('Maquina', maquinaSchema);

// Usar rotas de máquinas (se precisar de rotas HTTP)
app.use('/api/machines', machineRoutes);

// Criar um servidor HTTP e configurar WebSocket
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Função para determinar o status da máquina
const determinarStatus = (maquina) => {
  const agora = new Date();
  const producaoAtiva = maquina.periodos.some(periodo => periodo.dataInicio <= agora && periodo.dataFim >= agora);
  return producaoAtiva ? 'Produzindo' : 'Parada';
};

// WebSocket: enviar status inicial para todos os clientes conectados
wss.on('connection', async (ws) => {
  try {
    const maquinas = await Maquina.find();  // Busca todas as máquinas no MongoDB
    const statusMaquinas = maquinas.map(maquina => ({
      id: maquina._id,
      nome: maquina.nome,
      status: determinarStatus(maquina)
    }));
    ws.send(JSON.stringify(statusMaquinas));
  } catch (err) {
    console.error("Erro ao buscar máquinas:", err);
    ws.send(JSON.stringify({ message: "Erro ao buscar máquinas" }));
  }
});

// Conectar ao RabbitMQ
const conectarRabbitMQ = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const conn = await amqp.connect('amqp://rabbitmq'); 
    const channel = await conn.createChannel();
    await channel.assertQueue('atualizacoes');
    console.log('Conectado ao RabbitMQ');

    // Consumir mensagens de atualização do serviço Java
    channel.consume('atualizacoes', async (msg) => {
      if (msg !== null) {
        const mensagem = JSON.parse(msg.content.toString());
        console.log('Recebida atualização:', mensagem);

        // Verificar se a máquina existe no banco de dados
        const maquina = await Maquina.findOne({ maquinaId: mensagem.maquinaId });
        if (maquina) {
          maquina.status = mensagem.status;
          await maquina.save();
          console.log(`Máquina ${maquina.maquinaId} atualizada para o status: ${maquina.status}`);

          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                id: maquina._id,
                nome: maquina.nome,
                status: maquina.status
              }));
            }
          });
        } 
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
  }
};
// Iniciar a conexão RabbitMQ e o servidor
conectarRabbitMQ();
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
