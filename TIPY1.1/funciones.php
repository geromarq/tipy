<?php

function getNombreFiesta()
{
    var $paseValido = true;
    if (isset($_GET['idfiesta'])) {
        $idFiesta = htmlspecialchars($_GET['idfiesta']); 
        $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
        $registros = mysqli_query($conexion, "SELECT nombre_fiesta FROM fiestas WHERE FiestaID = '$idFiesta' ") or die("no se encontro fiesta" . mysqli_error($conexion));
        if (mysqli_num_rows($registros)) {
            return true;
        } else if ($registros = null) {
            return false;
        }
        mysqli_close($conexion);
        echo "<h3>Hello, $idFiesta!</h3>";
    } else {
        echo "<p>No se encontro la fiesta.</p>"; 
        var $paseValido = false;
    }
    return $paseValido
}
function cargarSugerencia(){
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
    $registros = mysqli_query($conexion, "INSERT INTO Solicitudes (UsuarioID, TipoSolicitud, TextoSolicitud, MontoPropina, Estado, FiestaID) VALUES 
(1, 'Solicitud de Canción', 'Reproducir "Shape of You" de Ed Sheeran', 10.00, 'Pendiente', 1),
(2, 'Solicitud de Género', 'Más música Hip-Hop', 5.00, 'Pendiente', 1);
") or die("no se encontro fiesta" . mysqli_error($conexion));
}


//Verificar que el qr es valido si devuelve valido
//el qr te dirige a una pagina que solo corre php para ejecutar esta funcion. Luego te redirige a una pagina 404 
//