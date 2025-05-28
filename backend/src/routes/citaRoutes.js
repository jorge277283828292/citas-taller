const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

// Obtener todas las citas
router.get('/', citaController.getAllCitas);
// Obtener una cita por ID
router.get('/:id', citaController.getCitaById);
// Crear una nueva cita
router.post('/', citaController.createCita);
// Actualizar una cita
router.put('/:id', citaController.updateCita);
// Eliminar una cita
router.delete('/:id', citaController.deleteCita);

module.exports = router; 