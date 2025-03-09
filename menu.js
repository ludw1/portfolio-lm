// Only define menu toggle functionality if the menu elements exist
if (document.getElementById('menu') && document.getElementById('ulMenu')) {
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
}

// Safe menuResize function that checks if element exists
function menuResize() {
  // First get the size from the window
  const window_size = window.innerWidth || document.body.clientWidth;
  const menu = document.getElementById('menu');
  
  if (menu && window_size > 640) {
    menu.classList.remove("h-32");
  }
}

// Add resize listener only if we're not already listening
if (window.menuResizeListenerAdded !== true) {
  window.addEventListener("resize", menuResize);
  window.menuResizeListenerAdded = true;
} 