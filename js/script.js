document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: "ease-out-cubic"
    });
  }

  const hamburger = document.querySelector(".hamburger");

  // Ensure overlay exists
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
  }

  if (!hamburger) {
    console.warn('No .hamburger element found ,sidebar toggle will not be available');
    return;
  }

  const sidebar = document.createElement("nav");
  sidebar.className = "sidebar";
  sidebar.innerHTML = `
    <div class="close-btn">&times;</div>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Events</a>
    <a href="#">Teams</a>
    <a href="#">Contact</a>
  `;
  document.body.appendChild(sidebar);

  const closeBtn = sidebar.querySelector(".close-btn");

  function toggleSidebar(open) {
    sidebar.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
  }

  hamburger.addEventListener("click", () => toggleSidebar(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleSidebar(false));
  overlay.addEventListener("click", () => toggleSidebar(false));

  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => toggleSidebar(false));
  });
});
