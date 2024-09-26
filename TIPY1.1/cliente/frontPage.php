<?php
include '../funciones.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
    <link rel="StyleSheet" href="estilos/estilos.css" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="../img/FHD.png">
    <title>Tipy</title>
</head>
<main>
    <nav>
        <ul>
            <li>
                <button onclick="showBienvenida()" class="botonLogo">
                    <img src='../img/logo_violeta.png'>
                </button>
            </li>
            <li class="partyName">
               <button onclick="window.location.href = '../loginAdministrativo.html'"><?php getNombreFiesta(); ?></button>
            </li>
        </ul>
    </nav>
    <article class="bienvenida" id="bienvenida">
        <section class="cuadroBienvenida">
            <h3>Bienvenido esto es Tipy</h3>
            <h5>
                Queres recomendar una cancion o decirle algo al dj, es facil. Decile
                por aca
            </h5>
            <br>
            <form method="post" action="alta_sugerencia.php">
                <input type="hidden" name="idFiesta" value="<?php echo htmlspecialchars($_GET['idfiesta']); ?>">
                <h5>Ingrese su numero de telefono!</h5>
                <input required type="tel" id="phone-number" name="phone-number" pattern="[0-9]{9}" placeholder="e.g. 091234567" title="Please enter phone">
                <button type="button" class="botonIngreso" onclick="validateAndShowPrincipal()">Dale</button>
        </section>
    </article>
    <article class="principal" id="principal">
        <h3>Informacion del evento</h3>
        <p>Local: <?php echo "Nombre local eventos"?></p>
        <p>DJ: <?php echo obtenerDjActual(intval($_GET['idfiesta']));?></p>
        <p id='fechaActual'></p>
        <!-- <p>Monto minimo: $100</p> -->
        <section class="sugerenciaCuadro">
            <form method="post" action="alta_sugerencia.php">
                <h3>Sugerencia al dj</h3>
                <select name="comboSugerencia" id="comboSugerencia">
                    <option value="Genero">Genero</option>
                    <option value="Cancion">Cancion</option>
                    <option value="otro">Otro</option>
                </select><br />
                <textarea name="textoSug"> </textarea>
                <button onclick="showConfirm()">TIP!</button>
            </form>
        </section>
    </article>
</main>
<script src="../scripts.js"></script>

</html>