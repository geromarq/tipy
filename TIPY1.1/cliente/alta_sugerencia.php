<?php
include '../funciones.php';
$numeroSugerencias = numSugerencias();
$sugerenciasPorUsuario = numUserSugerencia($_GET['numTelefono']);
//$primerUsuario = cookieYtelefono();

if($numeroSugerencias == false||$sugerenciasPorUsuario==false){
    echo("<script>alert('Se llego al numero maximo de sugerencias en este periodo de tiempo, intentelo mas tarde");
}else if($numeroSugerencias){
    sugerir($_GET['numTelefono'], $_GET['comboTipo'], $_GET['textoSug'],0.0,$_GET['Telefono']); 

}


?>
