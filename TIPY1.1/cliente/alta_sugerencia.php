<?php
include '../funciones.php';
$numeroSugerencias = numSugerencias();
$sugerenciasPorUsuario = numUserSugerencia();

if($numeroSugerencias == false||$sugerenciasPorUsuario==false){
    echo("<script>alert('Se llego al numero maximo de sugerencias en este periodo de tiempo, intentelo mas tarde");
}else if(){
    sugerir($_GET['comboSugerencia'])
}



?>