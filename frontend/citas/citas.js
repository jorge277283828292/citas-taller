document.getElementById('registrar-btn').addEventListener('click', async function() {
  const fecha = document.getElementById('fecha-cita').value;

  const nuevaCita = {
      id_cliente: 1, // ID real del cliente
      id_vehiculo: 1, // ID real del vehículo
      fecha: fecha,
      hora: "10:00",
      tipo_servicio: "Mantenimiento",
      estado: "pendiente",
      notas: ""
  };

  if (fecha) {
      try {
          const response = await fetch('http://localhost:3000/api/citas', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(nuevaCita)
          });
          if (response.ok) {
              alert('¡Cita registrada para el día ' + fecha + '!');
          } else {
              alert('Error al registrar la cita');
          }
      } catch (error) {
          alert('Error de conexión al registrar la cita');
      }
  } else {
      alert('Por favor selecciona una fecha.');
  }
});