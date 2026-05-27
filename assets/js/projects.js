import { projects } from "../../data/projects.js";

function renderLinks(project) {
  const links = [];

  if (project.githubUrl) {
    links.push(
      `<a href="${project.githubUrl}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">GitHub</a>`
    );
  }
  if (project.liveUrl) {
    links.push(
      `<a href="${project.liveUrl}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">Live Demo</a>`
    );
  }

  if (!links.length) return "";

  return `<div class="project-actions btn-row">${links.join("")}</div>`;
}

function renderTags(techStack = []) {
  if (!techStack.length) return "";
  const tags = techStack.map(t => `<span class="tag">${t}</span>`).join("");
  return `<div class="tag-row project-tags">${tags}</div>`;
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.setAttribute("role", "list");

  grid.innerHTML = projects
    .map(
      (project, projectIndex) => `
      <article class="project-card" role="listitem">
        <div class="project-image-wrap">
          <button
            type="button"
            class="project-view-btn"
            data-project-index="${projectIndex}"
            aria-label="View ${project.title} full image"
          >
            <svg
  viewBox="0 0 24 24"
  width="18"
  height="18"
  aria-hidden="true"
  focusable="false"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <polyline points="15 3 21 3 21 9" />
  <line x1="14" y1="10" x2="21" y2="3" />
  
  <polyline points="9 21 3 21 3 15" />
  <line x1="10" y1="14" x2="3" y2="21" />
</svg>

          </button>
          <img
            src="./${project.image}"
            alt="${project.title}"
            loading="lazy"
          />
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          ${renderTags(project.techStack)}
          ${renderLinks(project)}
        </div>
      </article>
    `
    )
    .join("");
}

function setupProjectModal() {
  const modal = document.getElementById("project-modal");
  const modalImage = document.getElementById("project-modal-image");
  const modalTitle = document.getElementById("project-modal-title");
  const modalCounter = document.getElementById("project-modal-counter");
  const prevBtn = document.getElementById("project-modal-prev");
  const nextBtn = document.getElementById("project-modal-next");
  const closeBtn = document.getElementById("project-modal-close");
  const grid = document.getElementById("projects-grid");
  if (
    !modal ||
    !modalImage ||
    !modalTitle ||
    !modalCounter ||
    !prevBtn ||
    !nextBtn ||
    !closeBtn ||
    !grid
  ) {
    return;
  }

  let lastTrigger = null;
  let activeImages = [];
  let activeTitle = "";
  let activeIndex = 0;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");

  const getProjectImages = project => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length) return project.images;
    return project.image ? [project.image] : [];
  };

  const updateNavState = () => {
    const hasMultiple = activeImages.length > 1;
    prevBtn.disabled = !hasMultiple;
    nextBtn.disabled = !hasMultiple;
    modalCounter.textContent = activeImages.length
      ? `${activeIndex + 1} / ${activeImages.length}`
      : "0 / 0";
  };

  const animateImageChange = direction => {
    modalImage.classList.remove("is-animating", "from-next", "from-prev");
    void modalImage.offsetWidth;
    modalImage.classList.add(
      "is-animating",
      direction === "prev" ? "from-prev" : "from-next"
    );
  };

  const renderImage = ({ animate = false, direction = "next" } = {}) => {
    const src = activeImages[activeIndex];
    if (!src) return;
    modalImage.src = `./${src}`;
    modalImage.alt = activeTitle
      ? `${activeTitle} (${activeIndex + 1}/${activeImages.length})`
      : "Project full preview";
    if (animate) animateImageChange(direction);
    updateNavState();
  };

  const openModal = ({ projectIndex, trigger }) => {
    const project = projects[projectIndex];
    activeImages = getProjectImages(project);
    if (!activeImages.length) return;

    activeIndex = 0;
    activeTitle = project?.title || "Project Preview";
    lastTrigger = trigger || null;
    modalTitle.textContent = activeTitle;
    renderImage();

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
    modalImage.classList.remove("is-animating", "from-next", "from-prev");
    modalTitle.textContent = "";
    modalCounter.textContent = "0 / 0";
    activeImages = [];
    activeIndex = 0;
    activeTitle = "";
    document.body.classList.remove("modal-open");
    if (lastTrigger) lastTrigger.focus();
  };

  const goNext = () => {
    if (activeImages.length < 2) return;
    activeIndex = (activeIndex + 1) % activeImages.length;
    renderImage({ animate: true, direction: "next" });
  };

  const goPrev = () => {
    if (activeImages.length < 2) return;
    activeIndex = (activeIndex - 1 + activeImages.length) % activeImages.length;
    renderImage({ animate: true, direction: "prev" });
  };

  grid.addEventListener("click", e => {
    const btn = e.target.closest(".project-view-btn");
    if (!btn) return;
    const projectIndex = Number(btn.dataset.projectIndex);
    if (!Number.isInteger(projectIndex) || projectIndex < 0) return;
    openModal({
      projectIndex,
      trigger: btn,
    });
  });

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", e => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  });
}

renderProjects();
setupProjectModal();
