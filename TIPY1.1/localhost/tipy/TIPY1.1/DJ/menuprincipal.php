<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tipy</title>
    <link rel="stylesheet" href="estilos/estilos.css" />
  </head>

  <body>
    <div class="main-container">
      <div class="container">
        <h1 class="title">Tipy</h1>

        <div class="profile">
          <span class="profile-name">John Doe</span>
        </div>
      </div>

      <div class="separation-line"></div>

      <!-- Notificaciones de Propinas -->

      <div id="inicio" class="notifications-container centered-content">
        <h2 class="section-title">Notificaciones</h2>

        <div class="notification">¡Nueva propina recibida de 50 $!</div>

        <!-- Más notificaciones aquí -->
      </div>

      <div class="separation-line"></div>

      <!-- Gestión de Propinas -->

      <div class="tips-management-container">
        <h2 class="section-title">Gestión de Propinas</h2>

        <table>
          <thead>
            <tr>
              <th>Solicitud</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <?php getSugerenciaID()?>  
              <td class="actions">
                <button class="btn accept-btn">Aceptar</button>
                <button class="btn reject-btn">Rechazar</button>
              </td>
            </tr>

            <tr>
              <td>Solicitud 3</td>

              <td>150 $</td>

              <td>Pendiente</td>

              <td class="actions">
                <button class="btn accept-btn">Aceptar</button>

                <button class="btn reject-btn">Rechazar</button>
              </td>
            </tr>

            <tr>
              <td>Solicitud 2</td>

              <td>50 $</td>

              <td>Completado</td>
            </tr>

            <!-- Más filas aquí -->
          </tbody>
        </table>
      </div>

      <div class="separation-line"></div>

      <!-- Configuración de Perfil -->

      <div id="configuracion" class="profile-settings-container">
        <h2 class="section-title">Configuración de Perfil</h2>

        <form>
          <label for="contact-info">Información de Contacto:</label>

          <input
            type="text"
            id="contact-info"
            name="contact-info"
            placeholder="Actualizar información de contacto"
            class="form-input"
          />

          <label for="music-preferences">Preferencias Musicales:</label>

          <input
            type="text"
            id="music-preferences"
            name="music-preferences"
            placeholder="Actualizar preferencias musicales"
            class="form-input"
          />

          <button type="submit" class="btn update-btn">Actualizar</button>
        </form>
      </div>

      <div class="separation-line"></div>

      <!-- Tarifas de Propinas -->

      <div id="tarifas" class="tip-rates-container">
        <h2 class="section-title">Tarifas de Propinas</h2>

        <form>
          <label for="min-tip-amount">Monto Mínimo de Propina:</label>

          <input
            type="number"
            id="min-tip-amount"
            name="min-tip-amount"
            placeholder="Actualizar monto mínimo"
            class="form-input"
          />

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
