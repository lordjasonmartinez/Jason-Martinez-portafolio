// script.js

// Agrega un evento de clic a la hamburguesa para alternar la clase active en el menú
document.querySelector('.hamburguesa').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
});

// Agrega un evento de clic a todos los enlaces dentro del menú
document.querySelectorAll('nav a').forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    // Oculta el menú al hacer clic en un enlace
    document.querySelector('nav').classList.remove('active');
  });
});
