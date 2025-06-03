const Cita = require('../models/citaModel');

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.getAll();
    console.log('Citas obtenidas:', citas);
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener las citas (detalle):', error);
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

exports.getCitaById = async (req, res) => {
  try {
    const cita = await Cita.getById(req.params.id);
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json(cita);
  } catch (error) {
    console.error('Error al obtener la cita:', error);
    res.status(500).json({ message: 'Error al obtener la cita' });
  }
};

exports.createCita = async (req, res) => {
  try {
    const { id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas } = req.body;
    if (!id_cliente || !id_vehiculo || !fecha || !hora || !tipo_servicio) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    const result = await Cita.create({ id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado: estado || 'pendiente', notas });
    res.status(201).json({ message: 'Cita creada exitosamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ message: 'Error al crear la cita' });
  }
};

exports.updateCita = async (req, res) => {
  try {
    const { id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas } = req.body;
    if (!id_cliente || !id_vehiculo || !fecha || !hora || !tipo_servicio) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    const result = await Cita.update(req.params.id, { id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ message: 'Error al actualizar la cita' });
  }
};

exports.deleteCita = async (req, res) => {
  try {
    const result = await Cita.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    res.status(500).json({ message: 'Error al eliminar la cita' });
  }
}; 