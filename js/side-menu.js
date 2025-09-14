const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.getElementById('sidebar-menu');
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
document.body.appendChild(menuOverlay);

if (menuToggle && sideMenu) {
  menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
  });

  menuOverlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
  });
}
