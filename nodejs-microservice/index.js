const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const amqp = require('amqplib');
const machineRoutes = require('./routes/machineRoutes'); // Se quiser manter as rotas HTTP

const app = express();
const PORT = 3000;

app.use(express.json()); // Para permitir o envio de JSON no corpo das requisições

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/monitoramento', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
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
  const maquinas = await Maquina.find();
  const statusMaquinas = maquinas.map(maquina => ({
    id: maquina._id,
    nome: maquina.nome,
    status: determinarStatus(maquina)
  }));
  ws.send(JSON.stringify(statusMaquinas));
});

// Conectar ao RabbitMQ
const conectarRabbitMQ = async () => {
  try {
    const conn = await amqp.connect('amqp://localhost'); // Troque 'localhost' por 'rabbitmq' se estiver no Docker
    const channel = await conn.createChannel();
    await channel.assertQueue('atualizacoes');

    console.log('Conectado ao RabbitMQ');

    // Consumir mensagens de atualização do serviço Java
    channel.consume('atualizacoes', async (msg) => {
      if (msg !== null) {
        const mensagem = JSON.parse(msg.content.toString());
        console.log('Recebida atualização:', mensagem);

        // Atualizar status da máquina e enviar via WebSocket
        const maquina = await Maquina.findOne({ maquinaId: mensagem.maquinaId });
        if (maquina) {
          maquina.status = mensagem.status;
          await maquina.save();

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
