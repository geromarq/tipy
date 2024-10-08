<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Fiestas - Tipy</title>
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
        <h2 class="section-title">Administración de Fiestas</h2>
        
        <section class="card">
            <h3>Alta de Fiesta</h3>
            <form id="form-alta-fiesta">
                <label for="nombre-fiesta">Nombre de la Fiesta:</label>
                <input type="text" id="nombre-fiesta" name="nombre-fiesta" required>
                
                <label for="fecha-fiesta">Fecha:</label>
                <input type="date" id="fecha-fiesta" name="fecha-fiesta" required>
                
                <label for="lugar-fiesta">Lugar:</label>
                <input type="text" id="lugar-fiesta" name="lugar-fiesta" required>
                
                <button type="submit" class="btn">Agregar Fiesta</button>
            </form>
        </section>

        <section class="card">
            <h3>Baja de Fiesta</h3>
            <form id="form-baja-fiesta">
                <label for="nombre-fiesta-baja">Nombre de la Fiesta:</label>
                <input type="text" id="nombre-fiesta-baja" name="nombre-fiesta-baja" required>
                <button type="submit" class="btn delete-btn">Eliminar Fiesta</button>
            </form>
        </section>

        <section class="card">
            <h3>Modificación de Fiesta</h3>
            <form id="form-modificar-fiesta">
                <label for="buscar-nombre-fiesta">Buscar Nombre de la Fiesta:</label>
                <input type="text" id="buscar-nombre-fiesta" name="buscar-nombre-fiesta" required>
                <button type="submit" class="btn">Buscar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID Fiesta</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Lugar</th>
                    </tr>
                </thead>
                <tbody id="fiestas-lista">
                    <!-- Datos de Fiesta -->
                </tbody>
            </table>
        </section>

        <section class="card">
            <h3>Consulta de Fiesta</h3>
            <form id="form-consulta-fiesta">
                <label for="consulta-nombre-fiesta">Buscar Nombre de la Fiesta:</label>
                <input type="text" id="consulta-nombre-fiesta" name="consulta-nombre-fiesta" required>
                <button type="submit" class="btn">Buscar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID Fiesta</th>
                        <th>Nombre Fiesta</th>
                        <th>Fecha</th>
                        <th>Lugar</th>
                    </tr>
                </thead>
                <tbody id="consulta-lista">
                    <!-- Datos de la Fiesta -->
                </tbody>
            </table>
        </section>
    </main>

    <script src="fiestas_ajax.js"></script>
</body>
</html>