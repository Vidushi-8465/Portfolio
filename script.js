
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

/* ===== Hero Role Typewriter Effect ===== */
const roleElement = document.querySelector(".text-role");

if (roleElement) {
  const roles = [
    "Oracle Certified Generative AI Professional", 
    "AI/ML Intern",
    "Frontend Developer",
    "Building AI Agents",
    "RAG learner",
    "LLM Enthusiast"  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const baseTypeSpeed = 70;
  const baseDeleteSpeed = 60;
  const holdTime = 1400;

  function typeRole() {
    const current = roles[roleIndex];
    const length = current.length;

    if (!deleting) {
      charIndex++;
      roleElement.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, holdTime);
        return;
      }
    } else {
      charIndex--;
      roleElement.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    // Ease-in / ease-out timing for typing & deleting
    const progress = Math.max(0, Math.min(1, charIndex / length || 0.001));
    const easeInOut = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    const typedDelay = baseTypeSpeed + (1 - easeInOut) * 80;   // slower at start & end
    const deleteDelay = baseDeleteSpeed + (1 - easeInOut) * 60;

    setTimeout(typeRole, deleting ? deleteDelay : typedDelay);
  }

  typeRole();
}

/* ===== Project Card Flip Effect ===== */
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // Don't flip if clicking on a link
    if (e.target.closest("a")) {
      return;
    }
    this.classList.toggle("flipped");
  });
});

/* ===== About Card Flip Effect ===== */
const aboutCards = document.querySelectorAll("#about .card");

aboutCards.forEach((card) => {
  card.addEventListener("click", function () {
    this.classList.toggle("flip");
  });
});