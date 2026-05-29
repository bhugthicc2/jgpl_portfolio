
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { contactData as firebaseContactData } from "../../data/contact.js";


//hehe ayg saba dawg
  const firebaseConfig = {
    apiKey: "AIzaSyB8jyKWD7UQMHut3dC6hhn4Zyscao1SrKI",
    authDomain: "jgpl-portfolio.firebaseapp.com",
    projectId: "jgpl-portfolio",
    storageBucket: "jgpl-portfolio.firebasestorage.app",
    messagingSenderId: "909600723116",
    appId: "1:909600723116:web:9267ab12f50f5f2161cf09"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ICONS = {
  phone: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.62 10.79a15.1 15.1 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.3.56 3.58.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.28.19 2.47.56 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.01c-3.34.73-4.04-1.41-4.04-1.41-.54-1.37-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.77-1.61-2.67-.3-5.47-1.33-5.47-5.94 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23A11.4 11.4 0 0 1 12 6.3c1.01 0 2.03.13 2.98.38 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.23v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12"/></svg>`,
};

function renderContactSocials() {
  const heading = document.getElementById("contact-heading");
  const desc = document.getElementById("contact-description");
  const list = document.getElementById("contact-social-list");
  if (!heading || !desc || !list) return;

  // Swap out contactData for firebaseContactData here:
  heading.textContent = firebaseContactData.heading;
  desc.textContent = firebaseContactData.description;

  list.innerHTML = firebaseContactData.socials
    .map(
      social => `
      <a
        class="contact-social-card"
        href="${social.href}"
        target="${social.href.startsWith("http") ? "_blank" : "_self"}"
        rel="${social.href.startsWith("http") ? "noopener noreferrer" : ""}"
      >
        <span class="contact-social-icon icon-box icon-box-md">${ICONS[social.icon] || ""}</span>
        <span class="contact-social-text">
          <span class="contact-social-label">${social.label}</span>
          <span class="contact-social-value">${social.value}</span>
        </span>
      </a>
    `
    )
    .join("");
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  if (!form || !nameInput || !emailInput || !messageInput) return;

  // Find or create a status container for visual validation messages
  let statusText = document.getElementById("form-status");
  if (!statusText) {
    statusText = document.createElement("p");
    statusText.id = "form-status";
    statusText.style.marginTop = "14px";
    statusText.style.fontSize = "14px";
    statusText.style.fontWeight = "500";
    form.appendChild(statusText);
  }

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name || !email || !message) return;

    // Toggle submitting processing state
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    statusText.textContent = "Processing message...";
    statusText.style.color = "var(--muted)";
    statusText.removeAttribute("hidden");

    try {
      // Send the content directly to your Firebase collection
      await addDoc(collection(db, "messages"), {
        name: name,
        email: email,
        message: message,
        createdAt: serverTimestamp() // Safe remote system time marker
      });

      // Clear layout and provide success affirmation
      statusText.textContent = "Message sent successfully! I will reach out soon.";
      statusText.style.color = "#10b981"; // Success Green
      form.reset();

    } catch (error) {
      console.error("Firebase submit runtime error: ", error);
      statusText.textContent = "Unable to connect. Please try again later.";
      statusText.style.color = "#ef4444"; // Error Red
    } finally {
      // Re-enable interactive elements
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

renderContactSocials();
setupContactForm();

