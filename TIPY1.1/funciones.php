<?php 

function nombreDj(){
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
    $registros = mysqli_query($conexion, "SELECT CI FROM usuarios ") or die("Problemas en el select:" . mysqli_error($conexion));
    if (mysqli_num_rows($registros)) {
        return true;
    } else if ($registros = null) {
        return false;
    }
    mysqli_close($conexion);
}





?>