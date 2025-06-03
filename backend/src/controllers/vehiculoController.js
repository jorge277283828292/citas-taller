const Vehiculo = require('../models/vehiculoModel');

exports.getAllVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.getAll();
        res.json(vehiculos);
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        res.status(500).json({ message: 'Error al obtener los vehículos' });
    }
}; 