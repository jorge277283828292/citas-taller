document.getElementById('registrar-btn').addEventListener('click', function() {
    const fecha = document.getElementById('fecha-cita').value;
    if (fecha) {
      alert('¡Cita registrada para el día ' + fecha + '!');
    } else {
      alert('Por favor selecciona una fecha.');
    }
  });