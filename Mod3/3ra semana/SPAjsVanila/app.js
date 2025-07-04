const app = document.getElementById('app');

// Definimos las rutas
const routes = {
  '/': `<h1>Inicio</h1><p>Bienvenido a nuestra SPA hecha con JavaScript puro.</p>`,
  '/about': `<h1>Acerca de</h1><p>Somos una empresa que ama la web.</p>`,
  '/contact': `<h1>Contacto</h1><p>Puedes contactarnos en contacto@example.com.</p>`
};

// Función para renderizar la ruta
function router() {
  const hash = location.hash || '#/';
  const route = hash.slice(1); // Quitar el "#"
  app.innerHTML = routes[route] || `<h1>404</h1><p>Página no encontrada</p>`;
}

// Detectar cambios en el hash
window.addEventListener('hashchange', router);
window.addEventListener('load', router); // Render inicial
