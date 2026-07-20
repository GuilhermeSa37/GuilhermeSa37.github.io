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
