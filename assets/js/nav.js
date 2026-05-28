// ── Navigation Elements ─────────────────────────────
const hamburger = document.querySelector(".nav-hamburger");
const drawer = document.querySelector(".nav-drawer");

const navLinks = document.querySelectorAll(".nav-link, .drawer-link");
const homeLinks = document.querySelectorAll(
  '.nav-link[href="#home"], .drawer-link[href="#home"], .nav-logo[href="#home"]'
);

const HOME_HASH = "#home";

function getScrollOffset() {
  const styles = getComputedStyle(document.documentElement);
  const navHeight = parseFloat(styles.getPropertyValue("--nav-height")) || 68;
  return navHeight;
}

function isHomeHref(href) {
  return href === HOME_HASH || href === "#" || href === "";
}

function setActive(targetHash) {
  if (!targetHash) return;

  navLinks.forEach(item => item.classList.remove("active"));

  navLinks.forEach(item => {
    if (item.getAttribute("href") === targetHash) {
      item.classList.add("active");
    }
  });
}

function scrollToTop({ smooth = true } = {}) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? "smooth" : "auto",
  });
}

function scrollToSection(section, { smooth = true, updateHash = true } = {}) {
  if (!section?.id) return;

  const offset = getScrollOffset();
  const top = section.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior: smooth ? "smooth" : "auto",
  });

  setActive(`#${section.id}`);

  if (updateHash) {
    const base = window.location.pathname + window.location.search;
    history.replaceState(null, "", `${base}#${section.id}`);
  }
}

function goHome({ smooth = true, updateHash = true } = {}) {
  scrollToTop({ smooth });
  setActive(HOME_HASH);

  if (updateHash) {
    const base = window.location.pathname + window.location.search;
    history.replaceState(null, "", `${base}${HOME_HASH}`);
  }
}

function closeDrawer() {
  if (!hamburger || !drawer) return;
  hamburger.classList.remove("open");
  drawer.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
}

// ── Hamburger Toggle ───────────────────────────────
if (hamburger && drawer) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    drawer.classList.toggle("open");

    const expanded = hamburger.classList.contains("open");
    hamburger.setAttribute("aria-expanded", expanded);
  });
}

// ── Home: always scroll to very top ───────────────
homeLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    closeDrawer();
    window.requestAnimationFrame(() => goHome());
  });
});

// ── Section links: offset scroll for sticky nav ────
navLinks.forEach(link => {
  if (isHomeHref(link.getAttribute("href"))) return;

  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const section = document.getElementById(href.slice(1));
    if (!section) return;

    e.preventDefault();
    closeDrawer();
    window.requestAnimationFrame(() => scrollToSection(section));
  });
});

// ── Scrollspy ─────────────────────────────────────
const sectionIds = Array.from(
  new Set(
    Array.from(navLinks)
      .map(a => a.getAttribute("href"))
      .filter(href => href && href.startsWith("#"))
      .map(href => href.slice(1))
  )
);

const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

function getActiveSectionId() {
  const offset = getScrollOffset();
  const doc = document.documentElement;
  const maxScrollY = Math.max(0, doc.scrollHeight - window.innerHeight);
  const isNearPageBottom = window.scrollY >= maxScrollY - 2;

  // Ensure the last section becomes active near the page end,
  // even if it cannot reach the top threshold due to document height.
  if (isNearPageBottom && sections.length) {
    return sections[sections.length - 1].id;
  }

  if (window.scrollY < offset * 0.5) {
    return "home";
  }

  let active = sections[0]?.id ?? "home";

  for (const sec of sections) {
    const sectionTop = sec.offsetTop - offset;
    if (window.scrollY >= sectionTop - 1) {
      active = sec.id;
    }
  }

  return active;
}

function syncActiveFromScroll() {
  const id = getActiveSectionId();
  setActive(`#${id}`);
  return id === "home";
}

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  const offset = getScrollOffset();

  if (isHomeHref(hash)) {
    if (window.scrollY > offset * 0.5) {
      scrollToTop({ smooth: false });
    }
    setActive(HOME_HASH);
    return;
  }

  if (hash) {
    const section = document.getElementById(hash.slice(1));
    if (section) {
      scrollToSection(section, { smooth: false, updateHash: false });
      return;
    }
    setActive(hash);
    return;
  }

  setActive(HOME_HASH);
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash;

  if (isHomeHref(hash)) {
    goHome({ smooth: false, updateHash: false });
    return;
  }

  const section = document.getElementById(hash.slice(1));
  if (section) {
    scrollToSection(section, { smooth: false, updateHash: false });
  }
});

if ("IntersectionObserver" in window && sections.length) {
  let currentId = null;
  const offset = getScrollOffset();

  const observer = new IntersectionObserver(
    entries => {
      if (syncActiveFromScroll()) {
        currentId = "home";
        return;
      }

      const visible = entries
        .filter(e => e.isIntersecting)
        .sort(
          (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
        )[0];

      if (!visible?.target?.id) return;
      if (visible.target.id === currentId) return;

      currentId = visible.target.id;
      setActive(`#${currentId}`);
    },
    {
      root: null,
      rootMargin: `-${offset}px 0px -55% 0px`,
      threshold: [0, 0.1, 0.25],
    }
  );

  sections.forEach(sec => observer.observe(sec));

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      syncActiveFromScroll();
    });
  });
} else if (sections.length) {
  let ticking = false;
  const update = () => {
    ticking = false;
    syncActiveFromScroll();
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  });
}
