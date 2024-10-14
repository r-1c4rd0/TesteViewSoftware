const express = require('express');
const router = express.Router();
const { findAllMachines, saveMachine } = require('../service/machineService');


router.get('/', async (req, res) => {
  try {
    const machines = await findAllMachines();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar máquinas', error: err });
  }
});

// Rota para salvar uma nova máquina
router.post('/', async (req, res) => {
  
  const { maquinaId, name, status } = req.body; 
  try {
    
    const savedMachine = await saveMachine({ maquinaId, name, status });
    res.status(201).json(savedMachine);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar máquina', error: err });
  }
});

module.exports = router;
