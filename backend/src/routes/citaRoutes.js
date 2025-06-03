const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Rutas para las citas
router.post('/', citaController.createCita);
router.get('/', citaController.getAllCitas);
router.get('/:id', citaController.getCitaById);
router.put('/:id', citaController.updateCita);
router.delete('/:id', citaController.deleteCita);

module.exports = router; 