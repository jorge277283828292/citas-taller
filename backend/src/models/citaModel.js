const db = require('../config/db');

// Obtener todas las citas
async function getAllCitas() {
  const [rows] = await db.query('SELECT * FROM cita');
  return rows;
}

// Obtener una cita por ID
async function getCitaById(id) {
  const [rows] = await db.query('SELECT * FROM cita WHERE id = ?', [id]);
  return rows[0];
}

// Crear una nueva cita
async function createCita(cita) {
  const { id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas } = cita;
  const [result] = await db.query(
    'INSERT INTO cita (id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas]
  );
  return { id: result.insertId, ...cita };
}

// Actualizar una cita
async function updateCita(id, cita) {
  const { id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas } = cita;
  await db.query(
    'UPDATE cita SET id_cliente = ?, id_vehiculo = ?, fecha = ?, hora = ?, tipo_servicio = ?, estado = ?, notas = ? WHERE id = ?',
    [id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas, id]
  );
  return { id, ...cita };
}

// Eliminar una cita
async function deleteCita(id) {
  await db.query('DELETE FROM cita WHERE id = ?', [id]);
  return { id };
}

module.exports = {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita
}; 