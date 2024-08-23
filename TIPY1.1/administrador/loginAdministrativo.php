<?php 
require_once 'funciones.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (login($username, $password)) {
        echo "Bienvenido, $username";
        // Aquí puedes redirigir a otra página o realizar otras acciones
    } else {
        echo "Usuario o contraseña incorrectos.";
    }
}`
?>