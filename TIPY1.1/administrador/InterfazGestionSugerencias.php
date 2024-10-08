<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administración de Sugerencias - Tipy</title>
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
        <h2 class="section-title">Administración de Sugerencias</h2>
        
        <section class="card">
            <h3>Registrar Sugerencia</h3>
            <form>
                <label for="nombre-sugerencia">Nombre del Usuario:</label>
                <input type="text" id="nombre-sugerencia" name="nombre-sugerencia" required>
                <label for="contenido-sugerencia">Contenido de la Sugerencia:</label>
                <textarea id="contenido-sugerencia" name="contenido-sugerencia" rows="5" required></textarea>
                <button type="submit" class="btn">Agregar Sugerencia</button>
            </form>
        </section>

        <section class="card">
            <h3>Consulta de Sugerencias</h3>
            <form>
                <label for="consulta-nombre-sugerencia">Buscar por Nombre del Usuario:</label>
                <input type="text" id="consulta-nombre-sugerencia" name="consulta-nombre-sugerencia">
                <button type="submit" class="btn">Buscar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID Sugerencia</th>
                        <th>Nombre Usuario</th>
                        <th>Fecha</th>
                        <th>Contenido</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Datos de la Sugerencia -->
                </tbody>
            </table>
        </section>
    </main>
</body>
</html>
