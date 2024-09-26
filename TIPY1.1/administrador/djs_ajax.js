
document.addEventListener('DOMContentLoaded', function() {
    cargarFiestas();
    
    
    document.getElementById('form-alta-dj').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        formData.append('action', 'alta'); // Asegúrate de enviar 'alta' como acción
        enviarFormulario(formData);
    });

    document.getElementById('form-baja-dj').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        formData.append('action', 'baja');
        enviarFormulario(formData);
    });

    document.getElementById('form-modificar-dj').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        enviarFormulario('modificar', formData, 'djs-lista');
    });

    document.getElementById('form-consulta-dj').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        enviarFormulario('consulta', formData, 'consulta-djs-lista');
    });
});

function cargarFiestas() {
    fetch('funciones_djs.php?action=cargar_fiestas')  // Hacemos la petición GET a funciones_djs.php
        .then(response => response.json())            // Convertimos la respuesta a JSON
        .then(data => {
            if (data.success) {
                let selectFiestas = document.getElementById('fiestas-select'); // Asumimos que tienes un <select> con este ID
                selectFiestas.innerHTML = ''; // Limpiar el select antes de agregar opciones

                // Opción por defecto
                selectFiestas.appendChild(new Option('Seleccione una fiesta', ''));

                // Recorrer y agregar cada fiesta al select
                data.fiestas.forEach(function(fiesta) {
                    let option = document.createElement('option');
                    option.value = fiesta.FiestaID;  // Valor del option es el ID de la fiesta
                    option.textContent = fiesta.NombreFiesta + ' - ' + fiesta.FechaFiesta;  // Texto que muestra el nombre y fecha
                    selectFiestas.appendChild(option);  // Agregar el option al select
                });
            } else {
                console.error('Error al cargar fiestas: ' + data.error);  // En caso de error
            }
        })
        .catch(error => console.error('Error crítico al cargar fiestas: ' + error));  // Manejo de errores críticos
}

function enviarFormulario(formData) {
    fetch('funciones_djs.php',{method: 'POST',body: formData}).then(response => response.json()).then(data => {
        if (data.success) {
            alert('DJ agregado con éxito');
        } else {
            console.error('Error en el servidor: ' + data.error);
        }
    })
    .catch(error => console.error('Error crítico: ' + error));

    console.log(error);
    
    document.getElementById('nombre-dj').value = ''; 
    document.getElementById('contraseña-dj').value = '';
    alert('Se Genero Un Cambio!');
}


