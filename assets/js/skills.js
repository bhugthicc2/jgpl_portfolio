import { skills } from "../../data/skills.js";

function svgUrl(slug) {
  if (!slug) return null;
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  grid.setAttribute("role", "list");

  grid.innerHTML = skills
    .map(skill => {
      const url = svgUrl(skill.slug);
      return `
        <div class="skill-card" role="listitem">
          <div class="skill-card-inner">
            <div class="skill-icon" aria-hidden="true">
              ${
                url
                  ? `<img class="skill-icon-img" src="${url}" alt="" loading="lazy" />`
                  : ""
              }
            </div>
            <div class="skill-name">${skill.name}</div>
          </div>
        </div>
      `;
    })
    .join("");
}

renderSkills();