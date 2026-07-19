/*
  Replace only githubUsername before publishing.
  LinkedIn, email and CV are already configured.
*/
const profile = {
  githubUsername: "GuilhermeSa37",
  linkedinUrl: "https://www.linkedin.com/in/guilherme-s%C3%A1-6a38b1335/",
  email: "guilhermesa.pro@gmail.com"
};

function configureLinks() {
  const githubBase = `https://github.com/${profile.githubUsername}`;

  document.querySelectorAll(".github-link").forEach((link) => {
    link.href = githubBase;
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  document.querySelectorAll(".linkedin-link").forEach((link) => {
    link.href = profile.linkedinUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  document.querySelectorAll(".email-link").forEach((link) => {
    link.href = `mailto:${profile.email}`;
  });

  document.querySelectorAll(".repository-link").forEach((link) => {
    link.href = `${githubBase}/${link.dataset.repository}`;
    link.target = "_blank";
    link.rel = "noreferrer";
  });

  document.querySelectorAll(".live-link").forEach((link) => {
    link.href = `https://${profile.githubUsername}.github.io/${link.dataset.livePath}/`;
    link.target = "_blank";
    link.rel = "noreferrer";
  });
}

function configureTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const saved = localStorage.getItem("portfolio-theme");

  if (saved === "light" || saved === "dark") {
    root.dataset.theme = saved;
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    root.dataset.theme = "light";
  }

  toggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  });
}

function configureNavigation() {
  const button = document.querySelector(".menu-button");
  const links = document.querySelector(".nav-links");
  if (!button || !links) return;

  const close = () => {
    links.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  button.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) close();
  });
}

function configureReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

document.querySelector("#year").textContent = new Date().getFullYear();
configureLinks();
configureTheme();
configureNavigation();
configureReveal();
