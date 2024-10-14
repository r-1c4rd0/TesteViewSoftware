const Machine = require('../model/machine');

// Função para encontrar todas as máquinas
const findAllMachines = async () => {
  return await Machine.find();
};

// Função para salvar uma nova máquina
const saveMachine = async (machineData) => {
  const newMachine = new Machine(machineData);
  return await newMachine.save();
};

module.exports = { findAllMachines, saveMachine };
