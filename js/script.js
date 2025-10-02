AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: "ease-out-cubic"
});

const menuBtn = document.getElementById("menu");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});