/* ================================
   Portfolio Script – Vidushi Bhardwaj
   ================================ */

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

// === Scene setup ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Group for logos ===
const group = new THREE.Group();
scene.add(group);

// === Logo URLs (Expanded List) ===
const logoUrls = [

  // --- Frontend ---
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  
  // --- Backend / Frameworks ---
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  
  // --- Databases ---
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  
  // --- DevOps / Cloud ---
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  
  // --- Mobile / Cross-Platform ---
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  
  // --- Tools / Misc ---
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
  
];

// === Sphere distribution ===
const radius = 6; // balanced radius
const logoCount = logoUrls.length;
const textureLoader = new THREE.TextureLoader();

logoUrls.forEach((url, i) => {
  const phi = Math.acos(-1 + (2 * i) / logoCount);
  const theta = Math.sqrt(logoCount * Math.PI) * phi;

  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);

  const texture = textureLoader.load(url);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.2, 1.2, 1.2); // smaller logos for better spacing
  sprite.position.set(x, y, z);
  group.add(sprite);
});

camera.position.z = 14;

// === Animation variables ===
let speedX = 0.007;
let speedY = 0.012;
let time = 0;

// === Animate ===
function animate() {
  requestAnimationFrame(animate);

  time += 0.01;
  group.rotation.y += speedY + Math.sin(time) * 0.002;
  group.rotation.x += speedX + Math.cos(time * 0.5) * 0.001;

  renderer.render(scene, camera);
}
animate();

// === Hover slow-down effect ===
document.body.addEventListener("mouseenter", () => {
  speedX = 0.002;
  speedY = 0.004;
});

document.body.addEventListener("mouseleave", () => {
  speedX = 0.007;
  speedY = 0.012;
});

// === Handle resize ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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
