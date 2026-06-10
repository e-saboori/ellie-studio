const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav__links");

function closeMenu() {
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open menu");
  navLinks?.classList.remove("is-open");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navLinks?.classList.toggle("is-open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const siteHeader = document.querySelector(".site-header");

function updateHeaderScrollState() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeaderScrollState();
window.addEventListener("scroll", updateHeaderScrollState, { passive: true });

function scrollToSection(target, behavior = "smooth") {
  const headerHeight = siteHeader?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    scrollToSection(target);
  });
});

window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target) window.requestAnimationFrame(() => scrollToSection(target, "auto"));
});

const sectionLinks = [...document.querySelectorAll(".nav__links [data-section]")];
const observedSections = sectionLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

function setActiveSection(sectionId) {
  sectionLinks.forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]) setActiveSection(visible[0].target.id);
    },
    { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.25] }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveSection(link.dataset.section));
});

const revealTargets = [
  ...document.querySelectorAll(
    ".audience-panel > *, .page-intro > *, .services .section-title, .services__row article, .process-step, .pricing__intro, .pricing-card, .pricing-note, .faq__inner > *, .contact__grid > *"
  )
];

if (revealTargets.length && "IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");

  revealTargets.forEach((target, index) => {
    target.classList.add("scroll-reveal");
    target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}
