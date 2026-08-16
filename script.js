const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelector(".navigation-links");

function resolveInitialTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  root.dataset.theme = theme;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle?.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  themeToggle?.setAttribute("title", `Switch to ${nextTheme} mode`);
}

applyTheme(resolveInitialTheme());

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

function closeMenu() {
  navigationLinks?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigationLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navigationLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

const projectShowcase = document.querySelector("[data-project-showcase]");
const projectCards = projectShowcase
  ? Array.from(projectShowcase.querySelectorAll(".project-card"))
  : [];
const previousProjectButton = document.querySelector("[data-project-previous]");
const nextProjectButton = document.querySelector("[data-project-next]");
const currentProjectLabel = document.querySelector("[data-project-current]");
const totalProjectsLabel = document.querySelector("[data-project-total]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeProjectIndex = 0;
let projectScrollTimer;

function formatProjectNumber(value) {
  return String(value).padStart(2, "0");
}

function getProjectScrollPosition(card) {
  const firstCard = projectCards[0];
  return firstCard ? card.offsetLeft - firstCard.offsetLeft : 0;
}

function updateProjectControls(index) {
  activeProjectIndex = Math.max(0, Math.min(index, projectCards.length - 1));

  if (currentProjectLabel) {
    currentProjectLabel.textContent = formatProjectNumber(activeProjectIndex + 1);
  }

  previousProjectButton?.toggleAttribute("disabled", activeProjectIndex === 0);
  nextProjectButton?.toggleAttribute(
    "disabled",
    activeProjectIndex === projectCards.length - 1
  );

  projectCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeProjectIndex;
    card.toggleAttribute("inert", !isActive);
    card.setAttribute("aria-hidden", String(!isActive));
  });
}

function showProject(index, behavior = "smooth") {
  const nextIndex = Math.max(0, Math.min(index, projectCards.length - 1));
  const nextCard = projectCards[nextIndex];

  if (!projectShowcase || !nextCard) return;

  projectShowcase.scrollTo({
    left: getProjectScrollPosition(nextCard),
    behavior: reducedMotion.matches ? "auto" : behavior,
  });
  updateProjectControls(nextIndex);
}

if (projectShowcase && projectCards.length) {
  if (totalProjectsLabel) {
    totalProjectsLabel.textContent = formatProjectNumber(projectCards.length);
  }

  projectCards.forEach((card, index) => {
    const projectTitle = card.querySelector("h3")?.textContent?.trim();
    card.setAttribute("role", "group");
    card.setAttribute("aria-roledescription", "slide");
    card.setAttribute(
      "aria-label",
      `${index + 1} of ${projectCards.length}${projectTitle ? `: ${projectTitle}` : ""}`
    );
  });

  updateProjectControls(0);

  previousProjectButton?.addEventListener("click", () => {
    showProject(activeProjectIndex - 1);
  });

  nextProjectButton?.addEventListener("click", () => {
    showProject(activeProjectIndex + 1);
  });

  projectShowcase.addEventListener("keydown", (event) => {
    if (event.target !== projectShowcase) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showProject(activeProjectIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showProject(activeProjectIndex + 1);
    }
  });

  projectShowcase.addEventListener(
    "scroll",
    () => {
      clearTimeout(projectScrollTimer);
      projectScrollTimer = window.setTimeout(() => {
        const nearestProject = projectCards.reduce(
          (nearest, card, index) => {
            const distance = Math.abs(
              getProjectScrollPosition(card) - projectShowcase.scrollLeft
            );
            return distance < nearest.distance ? { index, distance } : nearest;
          },
          { index: 0, distance: Number.POSITIVE_INFINITY }
        );

        updateProjectControls(nearestProject.index);
      }, 90);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    showProject(activeProjectIndex, "auto");
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  !("IntersectionObserver" in window)
) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

document.querySelector("#year").textContent = new Date().getFullYear();
