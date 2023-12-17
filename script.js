// Menú en forma de hamburguesa

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

// Scroll de proyectos

document.addEventListener('DOMContentLoaded', function () {
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const slider = document.querySelector(".slider");
  const items = slider.querySelectorAll('li');
  let currentItem = 0;

  function showItem(index) {
      items.forEach((item, i) => {
          if (window.innerWidth <= 768) {
              item.style.display = i === index ? 'block' : 'none';
          } else {
              item.style.display = (i >= index && i < index + 3) ? 'block' : 'none';
          }
      });
  }

  prev.addEventListener('click', () => {
      currentItem = (currentItem > 0) ? currentItem - 1 : items.length - 1;
      showItem(currentItem);
  });

  next.addEventListener('click', () => {
      currentItem = (currentItem < items.length - 1) ? currentItem + 1 : 0;
      showItem(currentItem);
  });

  showItem(currentItem);
});


