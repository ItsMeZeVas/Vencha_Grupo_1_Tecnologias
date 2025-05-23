document.addEventListener("DOMContentLoaded", () => {
  const breadcrumb = document.getElementById("breadcrumb");
  const path = window.location.pathname; // Ej: /categoria/subcategoria/producto.html
  const parts = path.split("/").filter(p => p); // Quita elementos vacíos
  
  // Si no hay partes, mostrar solo Inicio
  if(parts.length === 0){
    breadcrumb.innerHTML = `<ul><li>Inicio</li></ul>`;
    return;
  }
  
  let html = '<ul>';
  let acumPath = '/';
  
  // Agregamos Inicio siempre
  html += `<li><a href="/">Inicio</a></li>`;
  
  parts.forEach((part, index) => {
    acumPath += part + (index < parts.length -1 ? '/' : '');
    
    // Último elemento no es link
    if(index === parts.length -1){
      // Convertir nombre archivo o carpeta a texto legible
      let text = part.replace('.html','').replace(/-/g, ' ');
      text = text.charAt(0).toUpperCase() + text.slice(1);
      html += `<li>${text}</li>`;
    } else {
      // Carpeta o parte intermedia es link
      let text = part.replace(/-/g, ' ');
      text = text.charAt(0).toUpperCase() + text.slice(1);
      html += `<li><a href="${acumPath}">${text}</a></li>`;
    }
  });
  
  html += '</ul>';
  breadcrumb.innerHTML = html;
});
