const revealSelectors = [
  ".section:not(.hero-section) .section-heading",
  ".about-bio",
  ".about-details > *",
  ".about-timeline > .timeline-entry",
  ".skills-grid > *",
  ".projects-grid > *",
  ".experience-list > *",
  ".contact-info-col > *",
  ".contact-form-col",
  ".footer",
];

const staggerContainers = [
  ".about-details",
  ".skills-grid",
  ".projects-grid",
  ".experience-list",
  ".contact-social-list",
];

function setRevealDelays() {
  staggerContainers.forEach(selector => {
    const container = document.querySelector(selector);
    if (!container) return;

    [...container.children].forEach((child, index) => {
      const delay = Math.min(index * 70, 420);
      child.style.setProperty("--reveal-delay", `${delay}ms`);
    });
  });
}

function getRevealElements() {
  return [...document.querySelectorAll(revealSelectors.join(","))];
}

function initScrollReveal() {
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setRevealDelays();

  const revealElements = getRevealElements();
  if (!revealElements.length) return;

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    }
  );

  revealElements.forEach(element => observer.observe(element));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollReveal, { once: true });
} else {
  initScrollReveal();
}
