
/* ===== Navbar Scroll Effect ===== */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) header.classList.add("shrink");
  else header.classList.remove("shrink");
});

/* ===== Active Link Highlight ===== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

/* ===== Scroll Reveal Animation ===== */
const reveals = document.querySelectorAll(".reveal, .t-item");
window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("in", "reveal");
  });
});

/* ===== Smooth Scroll (Optional Enhancement) ===== */
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target)
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
  });
});
