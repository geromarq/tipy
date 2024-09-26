<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "tipy");

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => "Error de conexión: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'alta':
            $nombreFiesta = $_POST['nombre-fiesta'];
            $fechaFiesta = $_POST['fecha-fiesta'];
            $lugarFiesta = $_POST['lugar-fiesta'];
            $idLocalQuery = "SELECT IDLocal FROM locales WHERE NombreLocal = '$lugarFiesta'";
            $resultado = $conn->query($idLocalQuery);
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                $idLocal = $fila['IDLocal'];

                $sql = "INSERT INTO fiestas (NombreFiesta, FechaFiesta, IDLocal) VALUES ('$nombreFiesta', '$fechaFiesta', '$idLocal')";
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(['success' => true, 'html' => listarFiestas($conn)]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Error al agregar la fiesta: ' . $conn->error]);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Lugar no encontrado']);
            }
            break;

        case 'baja':
            $nombreFiesta = $_POST['nombre-fiesta-baja'];
            $sql = "DELETE FROM fiestas WHERE NombreFiesta = '$nombreFiesta'";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al eliminar la fiesta: ' . $conn->error]);
            }
            break;

        case 'modificar':
            $nombreFiesta = $_POST['buscar-nombre-fiesta'];
            // Aquí puedes agregar la lógica para modificar la fiesta.
            // Por ahora, solo listaremos las fiestas.
            echo json_encode(['success' => true, 'html' => listarFiestas($conn)]);
            break;

        case 'consulta':
            $nombreFiesta = $_POST['consulta-nombre-fiesta'];
            $sql = "SELECT FiestaID, NombreFiesta, FechaFiesta, NombreLocal FROM fiestas 
                    INNER JOIN locales ON fiestas.IDLocal = locales.IDLocal
                    WHERE NombreFiesta LIKE '%$nombreFiesta%'";
            $resultado = $conn->query($sql);
            $html = '';
            if ($resultado->num_rows > 0) {
                while($fila = $resultado->fetch_assoc()) {
                    $html .= "<tr>
                                <td>{$fila['FiestaID']}</td>
                                <td>{$fila['NombreFiesta']}</td>
                                <td>{$fila['FechaFiesta']}</td>
                                <td>{$fila['NombreLocal']}</td>
                              </tr>";
                }
            } else {
                $html = "<tr><td colspan='4'>No se encontraron resultados</td></tr>";
            }
            echo json_encode(['success' => true, 'html' => $html]);
            break;
    }
}

$conn->close();

function listarFiestas($conn) {
    $sql = "SELECT FiestaID, NombreFiesta, FechaFiesta, NombreLocal FROM fiestas 
            INNER JOIN locales ON fiestas.IDLocal = locales.IDLocal";
    $resultado = $conn->query($sql);
    $html = '';
    if ($resultado->num_rows > 0) {
        while($fila = $resultado->fetch_assoc()) {
            $html .= "<tr>
                        <td>{$fila['FiestaID']}</td>
                        <td>{$fila['NombreFiesta']}</td>
                        <td>{$fila['FechaFiesta']}</td>
                        <td>{$fila['NombreLocal']}</td>
                      </tr>";
        }
    } else {
        $html = "<tr><td colspan='4'>No se encontraron fiestas</td></tr>";
    }
    return $html;
}
?>
