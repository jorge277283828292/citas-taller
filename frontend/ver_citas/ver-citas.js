// URL base de la API
const API_URL = 'http://localhost:3000/api';

// Función para cargar las citas
async function cargarCitas() {
    try {
        console.log('Intentando cargar citas desde:', `${API_URL}/citas`);
        const response = await fetch(`${API_URL}/citas`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',   
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        
        console.log('Status de la respuesta:', response.status);
        console.log('Headers de la respuesta:', response.headers);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const citas = await response.json();
        console.log('Citas recibidas:', citas);
        
        if (!Array.isArray(citas)) {
            throw new Error('La respuesta no es un array de citas');
        }
        
        mostrarCitas(citas);
    } catch (error) {
        console.error('Error detallado al cargar las citas:', error);
        mostrarMensaje(`Error al cargar las citas: ${error.message}`, 'error');
        
        // Mostrar un mensaje más descriptivo en la tabla
        const tbody = document.querySelector('.tabla-citas tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; color: red;">
                        Error al cargar las citas. Por favor, verifica que el servidor esté corriendo.
                    </td>
                </tr>
            `;
        }
    }
}

// Función para mostrar las citas en la tabla
function mostrarCitas(citas) {
    const tbody = document.querySelector('.tabla-citas tbody');
    if (!tbody) {
        console.error('No se encontró el elemento tbody');
        return;
    }
    
    tbody.innerHTML = '';

    if (citas.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="7" style="text-align: center;">
                No hay citas registradas
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    citas.forEach(cita => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cita._id || ''}</td>
            <td>${cita.cliente || ''}</td>
            <td>${formatearFecha(cita.fecha) || ''}</td>
            <td>${cita.hora || ''}</td>
            <td>${cita.servicio || ''}</td>
            <td>${cita.estado || 'Pendiente'}</td>
            <td>
                <button class="btn-editar" onclick="editarCita('${cita._id}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarCita('${cita._id}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para formatear la fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES');
}

// Función para editar una cita
async function editarCita(id) {
    try {
        const response = await fetch(`${API_URL}/citas/${id}`);
        const cita = await response.json();
        
        // Aquí podrías abrir un modal o redirigir a una página de edición
        console.log('Editando cita:', cita);
        // Por ahora solo mostraremos un mensaje
        mostrarMensaje('Funcionalidad de edición en desarrollo', 'info');
    } catch (error) {
        console.error('Error al cargar la cita:', error);
        mostrarMensaje('Error al cargar la cita', 'error');
    }
}

// Función para eliminar una cita
async function eliminarCita(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        try {
            const response = await fetch(`${API_URL}/citas/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                mostrarMensaje('Cita eliminada exitosamente', 'success');
                cargarCitas(); // Recargar la lista de citas
            } else {
                throw new Error('Error al eliminar la cita');
            }
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            mostrarMensaje('Error al eliminar la cita', 'error');
        }
    }
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje mensaje-${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    document.body.appendChild(mensajeDiv);
    
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// Cargar las citas cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarCitas);
