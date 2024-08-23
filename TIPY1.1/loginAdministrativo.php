<?php
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
    <link rel="StyleSheet" href="estilos/estilos.css" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="../img/FHD.png">
    <title>Tipy</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            flex-direction: column;
            background-image: linear-gradient(to bottom left, #71307d, #411448, #150213);
        }

        .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background-color: rgb(66, 66, 66);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .alert-banner {
            width: 100%;
            background-color: rgb(236, 110, 110);
            color: black;
            padding: 10px 0;
            text-align: center;
        }

        .alert-banner p {
            margin: 0;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
            text-decoration: none;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .logo {
            width: 80px;
            height: auto;
            object-fit: contain;
        }

        .content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex: 1;
            margin-top: 50px;
            /* Adjust this value as needed */
        }

        .auth-box {
            background-color: #8b2480;
            padding: 1.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .auth-box h3 {
            margin-bottom: 1rem;
            color: white;
            font-weight: bold;
        }

        .form-group {
            margin-bottom: 1rem;
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: white;
        }

        .input {
            width: 96%;
            padding: 0.5rem;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
        }

        .btn {
            width: 100%;
            padding: 0.5rem;
            background-color: #53154d;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #6c1d65;
        }

        .icon {
            width: 1.25rem;
            height: 1.25rem;
        }

        p {
            color: white;
        }
    </style>
</head>

<body>
    <div class="container">
        <header class="header">
            <a href="cliente/frontPage.php" class="back-link">
                <svg
                    class="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                </svg>
                Volver
            </a>
            <img src="img/logo_blanco.png" alt="Logo" class="logo" />
        </header>
        <div class="alert-banner">
            <p>Si estas aca por ERROR toca VOLVER arriba a la izquierda</p>
        </div>
        <div class="content">
            <div class="auth-box">
                <h3>Ingreso Administrativo</h3>
                <div class="form-group">
                    <label for="usuario">Usuario</label>
                    <input id="usuario" placeholder="Ingrese su nombre de usuario" class="input">
                    <br><br>
                    <label for="password">Constraseña</label>
                    <input id="password" type="password" placeholder="Ingrese su contraseña" class="input" />
                </div>
                <button class="btn">Ingresar</button>
                </form>
            </div>
        </div>
    </div>
</body>

</html>