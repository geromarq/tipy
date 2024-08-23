<?php
/*
Funcionalidades CLIENTE 
*/
function sugerir($numeroTelef, $comboSugerencia, $Texto, $montoPropina, $idFiesta)
{
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");
    $tipoSolicitudMap = [
        'Genero' => '1',
        'Cancion' => '2',
        'Otro' => '3'
    ];
    if (!array_key_exists($comboSugerencia, $tipoSolicitudMap)) {
        die("Tipo de solicitud inválido.");
    }
    $TipoSolicitud = $tipoSolicitudMap[$comboSugerencia];
    $result = mysqli_query($conexion, "SELECT IDUsuario FROM usuarios WHERE NumeroTelefono = '$numeroTelef'") or die("Problemas en el select: " . mysqli_error($conexion));
    $usuario = mysqli_fetch_assoc($result);
    if ($usuario) {
        $UsuarioID = $usuario['IDUsuario'];
    } else {
        mysqli_query($conexion, "INSERT INTO usuarios (NumeroTelefono) 
        VALUES ('$numeroTelef')") or die("Problemas en la inserción de usuario: " . mysqli_error($conexion));
        $UsuarioID = mysqli_insert_id($conexion);
    }
    // Preparar la consulta para evitar inyecciones SQL
    $query = "INSERT INTO solicitudes (UsuarioID, TipoSolicitud, TextoSolicitud, MontoPropina, FiestaID) 
              VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conexion, $query);
    mysqli_stmt_bind_param($stmt, 'isssi', $UsuarioID, $TipoSolicitud, $Texto, $montoPropina, $idFiesta);
    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Sugerencia registrada correctamente.";
    } else {
        die("No se pudo sugerir: " . mysqli_stmt_error($stmt));
    }

    // Cerrar la conexión
    mysqli_stmt_close($stmt);
    mysqli_close($conexion);
}


function obtenerDjActual($fiestaId)
{
    // Conectar a la base de datos
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");

    // Obtener la hora actual
    $horaActual = date('Y-m-d H:i:s');

    // Consultar los horarios de los DJs para la fiesta especificada
    $sql = "SELECT d.NombreDj 
            FROM horariosdedjs h 
            JOIN djs d ON h.DJID = d.IDDj 
            WHERE h.FiestaID = ? 
            AND h.HoraEntrada <= ? 
            AND h.HoraSalida >= ?";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iss", $fiestaId, $horaActual, $horaActual);
    $stmt->execute();
    $stmt->bind_result($nombreDj);

    $djActual = null;
    if ($stmt->fetch()) {
        $djActual = $nombreDj;
    }

    $stmt->close();
    $conexion->close();

    return $djActual ? $djActual : "No hay DJ tocando actualmente.";
}
function getNombreFiesta()
{
    if (isset($_GET['idfiesta'])) {
        $idFiesta = htmlspecialchars($_GET['idfiesta']);
        $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
        $registros = @mysqli_query($conexion, "SELECT NombreFiesta FROM fiestas WHERE FiestaID = '$idFiesta' ");
        if (mysqli_num_rows($registros) > 0) {
            $row = mysqli_fetch_assoc($registros);
            $nombreFiesta = $row['NombreFiesta'];
            echo '<h3>' . htmlspecialchars($nombreFiesta) . '</h3>';
        } else {
            echo '<p>No se encontró ninguna fiesta con el ID especificado.</p>';
        }
        mysqli_close($conexion);        
    } else {
        echo "<p>Redirigir a pantalla 404(Fiesta no encontrada)</p>"; //REDIRIGIR A PANTALLA ERROR 
        error_reporting(0); //borrar una vez que se reditige
    }
}

function getNombreLocal()
{
}
/* 

FUNCIONES DJ 
VVVVVVVVVVVV

*/

function getSugerenciaID($idFiesta)
{
        $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
        $registros = @mysqli_query($conexion, "SELECT * FROM usuarios WHERE FiestaID = '$idFiesta' ");
        if (mysqli_num_rows($registros) > 0) {
            $row = mysqli_fetch_assoc($registros);
            $nombreFiesta = $row['NombreFiesta'];
            echo '<h3>' . htmlspecialchars($nombreFiesta) . '</h3>';
        } else {
            echo '<p>No se encontró ninguna fiesta con el ID especificado.</p>';
        }
        mysqli_close($conexion);
    



            /* <td></td>
              <td> 0 </td>
              <td>Pendiente</td>*/
}















//Temporal vvvv Esto es para limitar el numero de sugerencias cada 30 minutos a 10 
function numSugerencias()
{
    $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");
    $resultado = mysqli_query($conexion, "SELECT HoraPedido FROM solicitudes") or die("Problemas en el select:" . mysqli_error($conexion));
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
        if ($count > 10) {                      //Modificar este numero para limitar el numero de sugerencias
            mysqli_close($conexion);
            return false;
        }
    }
    mysqli_close($conexion);
    return true;
}
function numUserSugerencia($telefono)
{
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

    $query = "SELECT COUNT(*) as cuenta FROM sugerencias WHERE ID_usuario = '$telefono' AND HoraPedido BETWEEN '$intervalo_inicio' AND '$intervalo_fin'";
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


function login($username, $password) {
    // Conectar a la base de datos
    $conexion = @mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la conexión");

    // Cifrar la contraseña usando SHA256
    $passwordHashed = hash('sha256', $password);

    // Consulta SQL para verificar las credenciales
    $sql = "SELECT * FROM administradores WHERE Username = ? AND Password = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $username, $passwordHashed);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verificar si se encontró un administrador con esas credenciales
    if ($resultado->num_rows > 0) {
        $stmt->close();
        $conexion->close();
        return true; // Login exitoso
    } else {
        $stmt->close();
        $conexion->close();
        return false; // Credenciales incorrectas
    }
}