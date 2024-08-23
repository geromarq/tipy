<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
  <title>Tipy</title>
  <link rel="stylesheet" href="estilos/estilos.css" />
</head>

<body>
  <div class="main-container">
    <div class="container">
      <div>
        <img src="../img/logo_blanco.png">
        <h1>│</h1>
        <h1 class="title">Tipy</h1>
      </div>
      <div class="profile">
        <span class="profile-name">Tu nombre</span>
      </div>
    </div>

    <div class="separation-line"></div>

    <!-- Notificaciones de Propinas -->

    <div id="inicio" class="notifications-container centered-content">
      <h2 class="section-title">Notificaciones de Propinas</h2>

      <div class="notification">¡Nueva propina recibida de 50 $!</div>

      <!-- Más notificaciones aquí -->
    </div>

    <div class="separation-line"></div>

    <!-- Gestión de Propinas -->

    <div class="tips-management-container">
      <h2 class="section-title">Gestión de Propinas</h2>
      <table style="width: 100%;" border="2">
        <tbody>
          <tr>
            <th>Nro. de solicitud</th>
            <th>Telefono</th>
            <th>Tipo</th>
            <th>Texto</th>
            <th>Propina</th>
            <th>Hora del Pedido</th>
            <th></th>
          </tr>
          <tr>
            <td data-label="Nro. de solicitud">1</td>
            <td data-label="Telefono">091192192</td>
            <td data-label="Tipo">Cancion</td>
            <td data-label="Texto">Recomendacion de cancion</td>
            <td data-label="Propina">0</td>
            <td data-label="Hora del Pedido">03:04:56</td>
            <td class="actions">
              <button class="btn accept-btn">Aceptar</button>
              <button class="btn reject-btn">Rechazar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="separation-line"></div>

    <!-- Configuración de Perfil -->

    <div id="configuracion" class="profile-settings-container">
      <h2 class="section-title">Perfil</h2>
      <label for="contact-info">Horario:</label>
      <div class="form-input">Nombre DJ | 00:00:00 - 02:59:59 <br> Nombre DJ 2 | 03:00:00 - 05:59:59</div>
    </div>

    <div class="separation-line"></div>

    <!-- Tarifas de Propinas -->

    <div id="tarifas" class="tip-rates-container">
      <h2 class="section-title">Tarifas de Propinas</h2>

      <form>
        <label for="min-tip-amount">Monto Mínimo de Propina:</label>

        <input type="number" id="min-tip-amount" name="min-tip-amount" placeholder="Actualizar monto mínimo" class="form-input" />

        <button type="submit" class="btn update-btn">Actualizar</button>
      </form>
    </div>

    <div class="separation-line"></div>

    <!-- Soporte Técnico -->

    <div class="support-container centered-content">
      <h2 class="section-title bold-title">Soporte Técnico</h2>

      <button class="contact-support-btn">Contactar Soporte</button>
    </div>
  </div>
</body>

</html>