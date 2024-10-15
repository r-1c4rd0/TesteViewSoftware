const mongoose = require('mongoose');

// Definindo o esquema da máquina
const MachineSchema = new mongoose.Schema({
  maquinaId: { type: String, required: true }, // Mudado de 'id' para 'maquinaId' para consistência
  name: { type: String, required: true }, // Nome da máquina
  status: { type: String, required: true }, // Status da máquina
  periodos: [{  // Lista de períodos de operação da máquina (opcional)
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true }
  }]
}, { collection: 'maquinas' });

// Criando e exportando o modelo
const Machine = mongoose.model('Machine', MachineSchema);
module.exports = Machine;

