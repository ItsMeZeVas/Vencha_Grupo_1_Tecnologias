<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Registro - VENCHA</title>
  <link rel="stylesheet" href="stylesPrincipal.css" />
  <link rel="stylesheet" href="registro.css" />
</head>
<body>
  <!-- HEADER -->
  <header class="Header" id="sticky-header">
    <div class="headerPart-1">
      <h1 class="Logo">VENCHA</h1>
    </div>
    <div class="headerLine-1"></div>
  </header>

  <!-- FORMULARIO REGISTRO -->
  <main class="registro-main">
    <section class="registro-container">
      <h2>Registro de Usuario</h2>
      <form id="registroForm">
        <label>Nombre:</label><br />
        <input type="text" name="nombre" required /><br />
        <label>Email:</label><br />
        <input type="email" name="email" required /><br />
        <label>Contraseña:</label><br />
        <input type="password" name="password" required /><br /><br />
        <button type="submit">Registrarse</button>
      </form>
      <p id="mensaje"></p>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">VENCHA</div>
      <div class="footer-links">
        <div class="footer-section">
          <p class="negrilla">Acerca de VENCHA</p>
          <ul>
            <li><p>Aviso de Privacidad</p></li>
            <li><p>Términos y condiciones</p></li>
            <li><p>Formas de pago</p></li>
          </ul>
        </div>
        <div class="footer-section">
          <p class="negrilla">Información adicional</p>
          <ul>
            <li><p>Registro</p></li>
            <li><p>Contáctanos</p></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('registroForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const data = {
        nombre: this.nombre.value,
        email: this.email.value,
        password: this.password.value
      };

      fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.mensaje) {
          document.getElementById('mensaje').textContent = resp.mensaje;
        } else {
          document.getElementById('mensaje').textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').textContent = "Error en la conexión, intenta más tarde.";
      });
    });
  </script>
</body>
</html>
