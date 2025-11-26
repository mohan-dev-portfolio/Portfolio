        // Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Disable right-click
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const message = document.querySelector(".right-click-message");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
});

// Add hover effect to links and buttons
document.querySelectorAll("a, button, .project-card").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Add text hover effect to navigation links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.classList.add("text-hover");
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("text-hover");
  });
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Change icon based on theme
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("light-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = document.querySelector(".close-menu");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  nav.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close menu when clicking on a link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Three.js Scene

function initThreeScene() {
  const canvas = document.getElementById("hero-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  
  // Set renderer to cover the entire window
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 5000;

  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;

    // Color
    colorArray[i] = Math.random();
    colorArray[i + 1] = Math.random();
    colorArray[i + 2] = Math.random();
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
  );

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  // Points
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Torus geometry
  const torusGeometry = new THREE.TorusGeometry(4, 1, 16, 100);
  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  scene.add(torus);

  // Camera position
  camera.position.z = 10;

  // Mouse movement
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate torus
    torus.rotation.x = elapsedTime * 0.2;
    torus.rotation.y = elapsedTime * 0.2;

    // Move particles
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] += Math.sin(elapsedTime + i) * 0.01;
      positions[i + 1] += Math.cos(elapsedTime + i) * 0.01;
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Move camera with mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

// Initialize Three.js scene
initThreeScene();

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // In a real application, you would send this data to a server
  // For this demo, we'll just show a success message
  alert(`Thank you, ${name}! Your message has been sent successfully.`);
  contactForm.reset();
});

// Add active class to navigation links on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

