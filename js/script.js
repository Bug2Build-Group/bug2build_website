AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: "ease-out-cubic"
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".overlay");

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
  closeBtn.addEventListener("click", () => toggleSidebar(false));
  overlay.addEventListener("click", () => toggleSidebar(false));

  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => toggleSidebar(false));
  });
});
