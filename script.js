const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelector(".navigation-links");

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
  if (window.innerWidth > 720) closeMenu();
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
