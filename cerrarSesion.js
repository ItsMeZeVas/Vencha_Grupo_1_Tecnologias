document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Para que no haga el comportamiento por defecto del enlace

    // Limpiar localStorage (o solo remover el usuario)
    localStorage.clear();

    // Redirigir a la página de login
    window.location.href = 'login.php';
  });
});
