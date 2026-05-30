// Rotating hero role text
(() => {
  const el = document.querySelector(".hero-role .role-text");
  if (!el) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const roles = ["FLUTTER DEVELOPER", "GRAPHIC DESIGNER"];
  let idx = roles.indexOf(el.textContent?.trim() || "");
  if (idx < 0) idx = 0;

  // If reduced motion, just swap text without fades.
  const intervalMs = prefersReducedMotion ? 2500 : 2800;
  const fadeMs = 220;

  window.setInterval(() => {
    idx = (idx + 1) % roles.length;

    if (prefersReducedMotion) {
      el.textContent = roles[idx];
      return;
    }

    el.classList.remove("fade-in");
    el.classList.add("fade-out");

    window.setTimeout(() => {
      el.textContent = roles[idx];
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
    }, fadeMs);
  }, intervalMs);
})();

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  const mainContent = document.getElementById('main-content');

  // Fade out the loader
  loader.classList.add('fade-out');

  // Make the main content visible smoothly
  if (mainContent) {
    mainContent.style.opacity = '1';
  }

  // Completely remove loader from DOM after transition finishes
  loader.addEventListener('transitionend', () => {
    loader.remove();
  });
});
