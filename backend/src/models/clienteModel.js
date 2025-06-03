const db = require('../config/db');

class Cliente {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM cliente ORDER BY nombre');
        return rows;
    }
}

module.exports = Cliente; 