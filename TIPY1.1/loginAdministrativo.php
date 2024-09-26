<?php
// Incluir el archivo de funciones
include 'funciones.php';

// Verificar si los campos existen antes de procesarlos
if (isset($_POST['usuario']) && isset($_POST['password'])) {
    $username = $_POST['usuario'];
    $password = $_POST['password'];

    // Verificar el login
    if (verificarLogin($username, $password)) {
        echo "<script>window.location.href = 'administrador/interfazadmin.php';</script>";
    } else {
        echo "<script>alert('Usuario o contraseña incorrectos.'); window.location.href = 'loginAdministrativo.html';</script>";
    }
} else {
    echo "<script>alert('Por favor ingresa un nombre de usuario y una contraseña.')</script>";
}
?>
