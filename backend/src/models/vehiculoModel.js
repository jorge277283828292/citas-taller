const db = require('../config/db');

class Vehiculo {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM vehiculo ORDER BY id_cliente, marca, modelo');
        return rows;
    }
}

module.exports = Vehiculo; 