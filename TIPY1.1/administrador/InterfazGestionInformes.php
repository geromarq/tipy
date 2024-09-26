<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Informes - Tipy</title>
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
        <h2 class="section-title">Administración de Informes</h2>
        
        <section class="card">
            <h3>Generar Informe</h3>
            <form>
                <label for="fecha-informe">Fecha del Informe:</label>
                <input type="date" id="fecha-informe" name="fecha-informe" required>
                <button type="submit" class="btn">Generar Informe</button>
            </form>
        </section>

        <section class="card">
            <h3>Consulta de Informe</h3>
            <form>
                <label for="consulta-fecha-informe">Buscar Fecha del Informe:</label>
                <input type="date" id="consulta-fecha-informe" name="consulta-fecha-informe" required>
                <button type="submit" class="btn">Buscar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID Informe</th>
                        <th>Fecha</th>
                        <th>Contenido</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Datos del Informe -->
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>
