<?php

function getNombreFiesta()
{
    if (isset($_GET['idfiesta'])) {
        $idFiesta = htmlspecialchars($_GET['idfiesta']); 
        $conexion = mysqli_connect("localhost", "root", "", "tipy") or die("Problemas con la base de datos");
        $registros = mysqli_query($conexion, "SELECT nombre_fiesta FROM fiestas WHERE id_fiesta = '$idFiesta' ") or die("Problemas en el select:" . mysqli_error($conexion));
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
