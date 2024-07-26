<?php
include '../funciones.php';
/* $numeroSugerencias = numSugerencias();
$sugerenciasPorUsuario = numUserSugerencia($_GET['phone-number']); */
//$primerUsuario = cookieYtelefono();

/* if($numeroSugerencias == false||$sugerenciasPorUsuario==false){
    echo("<script>alert('Se llego al numero maximo de sugerencias en este periodo de tiempo, intentelo mas tarde");
}else if($numeroSugerencias){ */
// Recibir datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numeroTelef = $_POST['phone-number'];
    $comboSugerencia = $_POST['comboSugerencia'];
    $Texto = $_POST['textoSug'];
    $montoPropina = 0.0; /* CAMBIAR UNA VEZ QUE SE COBRE */
    $idFiesta = $_POST['idFiesta'];
    sugerir($numeroTelef, $comboSugerencia, $Texto, $montoPropina, $idFiesta);
}
/* }
 */
