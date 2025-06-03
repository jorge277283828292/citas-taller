const db = require('../config/db');

class Cita {
    static async create(citaData) {
        const [result] = await db.execute(
            'INSERT INTO cita (id_cliente, id_vehiculo, fecha, hora, tipo_servicio, estado, notas) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                citaData.id_cliente,
                citaData.id_vehiculo,
                citaData.fecha,
                citaData.hora,
                citaData.tipo_servicio,
                citaData.estado,
                citaData.notas
            ]
        );
        return result;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM cita ORDER BY fecha, hora');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM cita WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, citaData) {
        const [result] = await db.execute(
            'UPDATE cita SET id_cliente = ?, id_vehiculo = ?, fecha = ?, hora = ?, tipo_servicio = ?, estado = ?, notas = ? WHERE id = ?',
            [
                citaData.id_cliente,
                citaData.id_vehiculo,
                citaData.fecha,
                citaData.hora,
                citaData.tipo_servicio,
                citaData.estado,
                citaData.notas,
                id
            ]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM cita WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Cita; 