// Getting hamburguer menu in small screens
const menu = document.getElementById("menu");
const ulMenu = document.getElementById("ulMenu");

function menuToggle() {
  if (menu.classList.contains('h-0')) {
    menu.classList.remove('h-0');
    menu.classList.add('h-64');
    ulMenu.classList.remove('opacity-0');
    ulMenu.classList.add('opacity-100');
  } else {
    menu.classList.remove('h-64');
    menu.classList.add('h-0');
    ulMenu.classList.remove('opacity-100');
    ulMenu.classList.add('opacity-0');
  }
}

// Browser resize listener
window.addEventListener("resize", menuResize);

// Resize menu if user changing the width with responsive menu opened
function menuResize() {
  // First get the size from the window
  const window_size = window.innerWidth || document.body.clientWidth;
  if (window_size > 640) {
    menu.classList.remove("h-32");
  }
}
