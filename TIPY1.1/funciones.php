<?php
/*
Funcionalidades CLIENTE 
*/
function getNombreFiesta()
{
    $paseValido = true;
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
        echo "<p>Parameters 'name' and 'age' are not set in the URL.</p>";
    }
}
function getNombreDJ()
{
    if (isset($_GET['idfiesta'])) {
        $idFiesta = htmlspecialchars($_GET['idfiesta']); // htmlspecialchars() is used to avoid XSS attacks
        $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
        $registros = mysqli_query($conexion, "SELECT nombre_Dj FROM djs WHERE id_fiesta = '$idFiesta' ") or die("Problemas en el select:" . mysqli_error($conexion));
        if (mysqli_num_rows($registros)) {
            return true;
        } else if ($registros = null) {
            return false;
        }
        mysqli_close($conexion);
        echo "<h3>Hello, $idFiesta!</h3>";
    } else {
        echo "<p>No conec</p>";
    }
}
function getNombreLocal()
{
    if (isset($_GET['idfiesta'])) {
        $idFiesta = htmlspecialchars($_GET['idfiesta']); // htmlspecialchars() is used to avoid XSS attacks
        $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
        $registros = mysqli_query($conexion, "SELECT nombre_local FROM djs WHERE id_fiesta = '$idFiesta' ") or die("Problemas en el select:" . mysqli_error($conexion));
        if (mysqli_num_rows($registros)) {
            return true;
        } else if ($registros = null) {
            return false;
        }
        mysqli_close($conexion);
        echo "<h3>Hello, $idFiesta!</h3>";
    } else {
        echo "<p>Parameters 'name' and 'age' are not set in the URL.</p>";
    }
}
function sugerir($numeroTelef, $tipSol, $textoSug, $montoPropina, $monto)
{
    $idFiesta = htmlspecialchars($_GET['idfiesta']);
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");
    $usuario = mysqli_query($conexion, "SELECT UsuarioID FROM usuarios WHERE NumeroTelefono = '$numeroTelef' ") or die("Problemas en el select:" . mysqli_error($conexion));
    mysqli_query($conexion, "INSERT INTO solicitudes(UsuarioID, TipoSolicitud, TextoSolicitud, MontoPropina, Estado, FiestaID) VALUES ('$usuario','$tipSol','$textoSug','$monto','Pendiente','$idFiesta')") or die("Problemas en la alta de salon." . mysqli_error($conexion));
    mysqli_close($conexion);
}
function numSugerencias()
{
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");
    $resultado = mysqli_query($conexion, "SELECT HoraPedido FROM sugerencias") or die("Problemas en el select:" . mysqli_error($conexion));
    $intervalos = [];
    while ($row = mysqli_fetch_assoc($resultado)) {
        $horaPedido = new DateTime($row['HoraPedido']);
        // Redondear la hora al intervalo más cercano de 30 minutos
        $minutes = $horaPedido->format('i');
        $roundedMinutes = $minutes < 30 ? '00' : '30';
        $intervaloKey = $horaPedido->format('Y-m-d H:') . $roundedMinutes;

        if (!isset($intervalos[$intervaloKey])) {
            $intervalos[$intervaloKey] = 0;
        }

        $intervalos[$intervaloKey]++;
    }
    
    foreach ($intervalos as $count) {
        if ($count > 10) {
            mysqli_close($conexion);
            return false;
        }
    }
    mysqli_close($conexion);
    return true;
}
function numUserSugerencia($telefono){
    $current_time = new DateTime();
    $current_minutes = $current_time->format('i');


    if ($current_minutes < 30) {
        $intervalo_inicio = $current_time->format('Y-m-d H:') . '00:00';
        $intervalo_fin = $current_time->format('Y-m-d H:') . '29:59';
    } else {
        $intervalo_inicio = $current_time->format('Y-m-d H:') . '30:00';
        $intervalo_fin = $current_time->format('Y-m-d H:') . '59:59';
    }

    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");

    $query = "SELECT COUNT(*) as cuenta FROM sugerencias WHERE ID_usuario = '$id_usuario' AND HoraPedido BETWEEN '$intervalo_inicio' AND '$intervalo_fin'";
    $resultado = mysqli_query($conexion, $query) or die("Problemas en el select:" . mysqli_error($conexion));


    $row = mysqli_fetch_assoc($resultado);
    $cuenta = $row['cuenta']; 

    mysqli_close($conexion); 

    return $cuenta <= 3; 

}


/*
Funcionalidades DJ
*/

/*
Funcionalidades ADMINISTRADOR
*/