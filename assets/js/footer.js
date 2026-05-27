import { contactData } from "../../data/contact.js";

function renderFooterSocials() {
  const root = document.getElementById("footer-social");
  if (!root) return;

  root.innerHTML = contactData.socials
    .map(social => {
      const external = social.href.startsWith("http");
      return `
        <a
          href="${social.href}"
          ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}
          aria-label="${social.label}"
        >
          <span>${social.label}</span>
        </a>
      `;
    })
    .join("");
}

function setCopyrightYear() {
  const el = document.getElementById("footer-copyright");
  if (!el) return;
  const year = new Date().getFullYear();
  el.textContent = `© ${year} Jesie Gapol. All rights reserved.`;
}

function setupBackToTop() {
  const btn = document.getElementById("footer-top-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

renderFooterSocials();
setCopyrightYear();
setupBackToTop();

