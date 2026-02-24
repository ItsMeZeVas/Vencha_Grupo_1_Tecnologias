<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Login - VENCHA</title>
  <link rel="stylesheet" href="stylesPrincipal.css" />
  <link rel="stylesheet" href="login.css" />
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
  <!-- HEADER -->
  <header class="Header" id="sticky-header">
    <div class="headerPart-1">
      <h1 class="Logo">VENCHA</h1>
    </div>
    <div class="headerLine-1"></div>
    </div>
  </header>

  <!-- LOGIN FORM -->
  <main class="login-main">
    <section class="login-container">
      <h2>Iniciar Sesión</h2>
      <form id="loginForm">
        <label for="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br />

        <label for="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" required /><br />

        <button type="submit">Entrar</button>
      </form>
      <p class="login-register-link">
        ¿Aún no tienes cuenta? <a href="register.php">Regístrate aquí</a>
      </p>
      <p id="mensaje" class="mensaje-error"></p>
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
    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const data = {
        email: this.email.value,
        password: this.password.value
      };

      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.mensaje === "Login exitoso") {
            document.getElementById('mensaje').textContent = "Bienvenido, redireccionando...";
            localStorage.setItem("usuario_id", resp.usuario_id);

            const emailIngresado = data.email.toLowerCase();
            const admins = ["vera@vencha.com", "correo@vencha.com"];

            if (admins.includes(emailIngresado)) {
              window.location.href = "admin.html";
            } else {
              window.location.href = "IndexPrincipal.html";
            }
          } else {
            document.getElementById('mensaje').textContent = resp.mensaje;
          }
        })
        .catch(error => {
          console.error('Error:', error);
          document.getElementById('mensaje').textContent = "Error de conexión, intenta más tarde.";
        });
    });
  </script>
</body>
</html>
