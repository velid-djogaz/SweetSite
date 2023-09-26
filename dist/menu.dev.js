"use strict";

// Function to show the menu
function showMenu() {
  var menu = document.querySelector('ul');
  menu.classList.add('menu-visible');
} // Function to hide the menu


function hideMenu() {
  var menu = document.querySelector('ul');
  menu.classList.remove('menu-visible');
} // Add click event listeners to the icons


document.querySelector('.fa-bars').addEventListener('click', showMenu);
document.querySelector('.fa-xmark').addEventListener('click', hideMenu);
//# sourceMappingURL=menu.dev.js.map
