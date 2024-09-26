document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-alta-fiesta').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        enviarFormulario('alta', formData, 'fiestas-lista');
    });

    document.getElementById('form-baja-fiesta').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        enviarFormulario('baja', formData);
    });

    document.getElementById('form-modificar-fiesta').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        enviarFormulario('modificar', formData, 'fiestas-lista');
    });

    document.getElementById('form-consulta-fiesta').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(this);
        enviarFormulario('consulta', formData, 'consulta-lista');
    });
});

function enviarFormulario(accion, formData, resultadoId = null) {
    formData.append('action', accion);

    fetch('funciones.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            if (resultadoId) {
                document.getElementById(resultadoId).innerHTML = data.html;
            }
        } else {
            console.error('Error: ' + data.error);
        }
    })
    .catch(error => console.error('Error crítico: ' + error));
}
