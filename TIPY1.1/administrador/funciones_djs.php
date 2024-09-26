<?php
header('Content-Type: application/json'); // Asegura que la respuesta sea JSON
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "tipy");

if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'error' => "Error de conexión: "
            . $conn->connect_error
    ]);
    exit;
}

//=================================== Cargar el select =============================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'cargar_fiestas') {
    $sql = "SELECT FiestaID, NombreFiesta, FechaFiesta FROM fiestas"; // Consulta para obtener fiestas
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $fiestas = [];
        while ($row = $result->fetch_assoc()) {
            $fiestas[] = $row; // Guardar cada fiesta en el array
        }
        echo json_encode(['success' => true, 'fiestas' => $fiestas]); // Devolver fiestas en formato JSON
    } else {
        echo json_encode(['success' => false, 'error' => 'No se encontraron fiestas']); // Error si no hay fiestas
    }
    exit; // Termina el script después de devolver la respuesta
}
//
//=================================================================================================



if (/* $_SERVER['REQUEST_METHOD'] === 'POST' */$_GET['action'] === 'test') {
    /* $action = $_POST['action'] ?? ''; */

    $action = 'alta';

    switch ($action) {
        case 'alta':
            $nombreDJ = $conn->real_escape_string($_POST['nombre-dj']);
            $contraseñaDJ = $_POST['contraseña-dj'];
            $contraseñaCifrada = hash('sha256', $contraseñaDJ);
            $fiestaID = $conn->real_escape_string($_POST['fiesta-id']);
            $horaEntrada = $conn->real_escape_string($_POST['hora-entrada']);
            $horaSalida = $conn->real_escape_string($_POST['hora-salida']);
 
            $stmt = $conn->prepare("INSERT INTO djs (NombreDj, Contraseña) VALUES ( ? , ? )");
            $stmt->bind_param("ss", $nombreDJ, $contraseñaCifrada);

            if($stmt->execute()){
                echo json_encode([])
            }


           /*  $sqlDJ = "INSERT INTO djs (NombreDj, Contraseña) VALUES ('$nombreDJ', '$contraseñaCifrada')";
            $result = $conn->query($sqlDJ);
            if ($result) {                
                $djID = $conn->insert_id;
                $sqlHorario = "INSERT INTO horariosdedjs (DJID, FiestaID, HoraEntrada, HoraSalida) VALUES ('$djID', '$fiestaID', '$horaEntrada', '$horaSalida')";
                if ($conn->query($sqlHorario)) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Error al agregar el horario del DJ: ' . $conn->error]);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al agregar el DJ: ' . $conn->error]);
            }
                 */



            exit; // Aca termino la alta, revisar esto


        case 'baja':
            $idDJ = $conn->real_escape_string($_POST['id-dj']);
            $sqlHorarios = "DELETE FROM horariosdedjs WHERE DJID = '$idDJ'";
            if ($conn->query($sqlHorarios)) {
                $sql = "DELETE FROM djs WHERE IDDj = '$idDJ'";
                if ($conn->query($sql)) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Error al eliminar el DJ: ' . $conn->error]);
                }
            }
            exit; // Termina el script después de dar de baja 

        case 'modificar':
            $nombreDJ = $conn->real_escape_string($_POST['buscar-nombre-dj']);
            echo json_encode(['success' => true, 'html' => listarDJs($conn)]);
            exit; // Termina modificación

        case 'consulta':
            $nombreDJ = $conn->real_escape_string($_POST['consulta-nombre-dj']);
            $sql = "SELECT IDDj, NombreDj, HorarioTrabajo FROM djs WHERE NombreDj LIKE '%$nombreDJ%'";
            $resultado = $conn->query($sql);
            if ($resultado->num_rows > 0) {
                $html = '';
                while ($fila = $resultado->fetch_assoc()) {
                    $html .= "<tr><td>{$fila['IDDj']}</td><td>{$fila['NombreDj']}</td><td>{$fila['HorarioTrabajo']}</td></tr>";
                }
                echo json_encode(['success' => true, 'html' => $html]);
            } else {
                echo json_encode(['success' => false, 'error' => 'No se encontraron DJs']);
            }
            exit; // Termina el script tras la consulta

            // Manejo de acción no válida
        default:
            echo json_encode(['success' => false, 'error' => 'Accion no valida']);
            exit; // Termina si la acción no es reconocida
    }
}

function listarDJs($conn)
{
    $sql = "SELECT IDDj, NombreDj, HorarioTrabajo FROM djs";
    $resultado = $conn->query($sql);
    $html = '';
    if ($resultado) {
        while ($fila = $resultado->fetch_assoc()) {
            $html .= "<tr><td>{$fila['IDDj']}</td><td>{$fila['NombreDj']}</td><td>{$fila['HorarioTrabajo']}</td></tr>";
        }
    }
    return $html;
}

// Cierra la conexión
$conn->close();
