// Wait for DOM and Three.js to be ready
function waitForThreeJS(callback, maxAttempts = 100) {
  if (typeof THREE !== 'undefined' && THREE.Scene && typeof THREE.Sprite !== 'undefined') {
    callback();
  } else if (maxAttempts > 0) {
    setTimeout(() => waitForThreeJS(callback, maxAttempts - 1), 50);
  } else {
    console.error("Three.js failed to load after multiple attempts. Please check your internet connection and CDN availability.");
  }
}

// Initialize when everything is ready
function initializeSphere() {
  waitForThreeJS(() => {
    setTimeout(initSphere, 100);
  });
}

// Try to initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initializeSphere);
} else {
  // DOM already loaded, wait a bit for scripts to load
  setTimeout(initializeSphere, 200);
}

function initSphere() {
  const container = document.getElementById("skills-sphere-container");
  
  if (!container) {
    console.warn("skills-sphere-container not found");
    return;
  }

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error("Three.js is not loaded");
    return;
  }

  // Ensure container has dimensions
  const containerWidth = container.clientWidth || 500;
  const containerHeight = container.clientHeight || 500;

  // === Scene setup ===
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    containerWidth / containerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(containerWidth, containerHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

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
 //"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  
  // --- Backend / Frameworks ---
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
 // "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
 //"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
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
  //"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
  
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

    const texture = textureLoader.load(
      url,
      // onLoad callback
      function(loadedTexture) {
        const material = new THREE.SpriteMaterial({ map: loadedTexture, transparent: true });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.2, 1.2, 1.2);
        sprite.position.set(x, y, z);
        group.add(sprite);
      },
      // onProgress callback (optional)
      undefined,
      // onError callback
      function(err) {
        console.warn(`Failed to load texture: ${url}`, err);
      }
    );
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

  // === Hover slow-down effect (only on sphere container) ===
  container.addEventListener("mouseenter", () => {
    speedX = 0.002;
    speedY = 0.004;
  });

  container.addEventListener("mouseleave", () => {
    speedX = 0.007;
    speedY = 0.012;
  });

  // === Handle resize ===
  window.addEventListener("resize", () => {
    if (!container) return;
    const newWidth = container.clientWidth || 500;
    const newHeight = container.clientHeight || 500;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}
