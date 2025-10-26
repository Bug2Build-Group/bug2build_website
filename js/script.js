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
    <a href="./index.html">Home</a>
            <a href="./about_us.html">About</a>
            <a href="./events.html">Events</a>
            <a href="./our_teams.html">Team</a>
            <a href="./index.html#contact">Contact</a>
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



// number increasing animation

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".big-number");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; 
    const frameRate = 30;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const countTo = () => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(target * progress);
      counter.innerText = current;
      if (frame < totalFrames) {
        setTimeout(countTo, frameRate);
      } else {
        counter.innerText = `${target}+`;
      }
    };
    countTo();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector(".big-number");
          animateCounter(counter);
          obs.unobserve(entry.target); // run once per box
        }
      });
    },
    { threshold: 0.6 } // trigger when 60% visible
  );

  document.querySelectorAll(".stat-box").forEach((box) => {
    observer.observe(box);
  });
});
