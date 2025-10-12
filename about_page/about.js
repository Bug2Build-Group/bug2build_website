// Initialize AOS
AOS.init({
  duration: 820,
  once: true,
  offset: 70,
  easing: "ease-out-cubic"
});

// Sidebar / hamburger behavior (keeps existing UX)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".overlay");
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = sidebar && sidebar.querySelector(".close-btn");

  function toggleSidebar(open) {
    sidebar && sidebar.classList.toggle("open", open);
    overlay && overlay.classList.toggle("show", open);
  }

  if (hamburger) hamburger.addEventListener("click", () => toggleSidebar(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleSidebar(false));
  if (overlay) overlay.addEventListener("click", () => toggleSidebar(false));
  if (sidebar) {
    sidebar.querySelectorAll("a").forEach(link => link.addEventListener("click", () => toggleSidebar(false)));
  }
});
