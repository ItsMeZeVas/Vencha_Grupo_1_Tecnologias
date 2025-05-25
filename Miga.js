document.addEventListener("DOMContentLoaded", () => {
  const breadcrumb = document.getElementById("breadcrumb");

  const nombresPaginas = {
    '/indexprincipal.html': 'Inicio',
    '/': 'Inicio',
    '/pagproductoshombre.html': 'Hombres',
    '/product.html': 'Producto',
    '/pagproductosmujer.html': 'Mujeres',
    '/pagproductos.html': 'Nuevo',
  };

  function normalizarRuta(ruta) {
    if (!ruta) return '';
    const nombreArchivo = ruta.substring(ruta.lastIndexOf('/'));
    return nombreArchivo.toLowerCase();
  }

  function obtenerNombre(path) {
    if (!path) return '';
    if (nombresPaginas[path]) return nombresPaginas[path];

    let nombre = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  const pathActualNorm = normalizarRuta(window.location.pathname);
  const pathAnteriorNorm = normalizarRuta(localStorage.getItem('paginaAnterior'));

  const paginaActual = obtenerNombre(pathActualNorm);
  const paginaAnterior = (pathAnteriorNorm && pathAnteriorNorm !== pathActualNorm) ? obtenerNombre(pathAnteriorNorm) : '';

  if (paginaAnterior) {
    breadcrumb.innerHTML = `<p>${paginaAnterior}</p>><p>${paginaActual}</p>`;
  } else {
    breadcrumb.textContent = paginaActual;
  }

  localStorage.setItem('paginaAnterior', window.location.pathname);
});
