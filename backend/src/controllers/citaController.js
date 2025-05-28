const citaModel = require('../models/citaModel');

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await citaModel.getAllCitas();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

exports.getCitaById = async (req, res) => {
  try {
    const cita = await citaModel.getCitaById(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
};

exports.createCita = async (req, res) => {
  try {
    const nuevaCita = await citaModel.createCita(req.body);
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

exports.updateCita = async (req, res) => {
  try {
    const citaActualizada = await citaModel.updateCita(req.params.id, req.body);
    res.json(citaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};

exports.deleteCita = async (req, res) => {
  try {
    await citaModel.deleteCita(req.params.id);
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
}; 