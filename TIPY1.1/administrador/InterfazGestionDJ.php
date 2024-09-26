<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de DJs - Tipy</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body>
    <header class="main-header">
        <div class="header-left">
            <h1>Tipy</h1>
        </div>
        <div class="header-right">
            <p>DJ: [Nombre del DJ]</p>
        </div>
    </header>

    <main>
        <a href="InterfazAdmin.html" class="back-button">← Menú Principal</a>
        <h2 class="section-title">Administración de DJs</h2>

        <section class="card">
            <h3>Alta de DJ</h3>
            <form id="form-alta-dj">
                <label for="fiesta-id">Fiesta:</label>
                
                <!-- ===================== -->
                <select id="fiestas-select">
                    <option value="">Cargando fiestas...</option> <!-- Este texto se reemplazará una vez se carguen las fiestas -->
                </select>
                <label for="nombre-dj">Nombre:</label>
                <input type="text" id="nombre-dj" name="nombre-dj" required>

                <label for="contraseña-dj">Contraseña:</label>
                <input type="password" id="contraseña-dj" name="contraseña-dj" required>                

                <label for="hora-entrada">Hora de Entrada:</label>
                <input type="datetime-local" id="hora-entrada" name="hora-entrada" required>

                <label for="hora-salida">Hora de Salida:</label>
                <input type="datetime-local" id="hora-salida" name="hora-salida" required>

                <button type="submit" class="btn">Agregar DJ</button>
            </form>
        </section>

        <section class="card">
            <h3>Baja de DJ</h3>
            <form id="form-baja-dj">
                <label for="id-dj">ID DJ:</label>
                <input type="text" id="id-dj" name="id-dj" required>
                <button type="submit" class="btn delete-btn">Eliminar DJ</button>
            </form>
        </section>

        <section class="card">
            <h3>Modificación de DJ</h3>
            <form id="form-modificar-dj">
                <label for="id-dj">ID DJ:</label>
                <input type="text" id="id-dj-mod" name="id-dj" required>
                <label for="nombre-dj-mod">Nuevo Nombre:</label>
                <input type="text" id="nombre-dj-mod" name="nombre-dj-mod" required>
                <button type="submit" class="btn">Modificar DJ</button>
            </form>
        </section>

        <section class="card">
            <h3>Consulta de DJ</h3>
            <form id="form-consulta-dj">
                <label for="consulta-nombre-dj">Buscar Nombre:</label>
                <input type="text" id="consulta-nombre-dj" name="consulta-nombre-dj" required>
                <button type="submit" class="btn">Buscar</button>
            </form>
        </section>
    </main>

    <script src="djs_ajax.js"></script>
</body>

</html>