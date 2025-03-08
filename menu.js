function menuToggle() {
  const menu = document.getElementById('menu');
  const ulMenu = document.getElementById('ulMenu');
  
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