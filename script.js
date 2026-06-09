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

const collageRoot = document.getElementById("collage-cards");
const collageSites = Array.isArray(window.ELLIE_COLLAGE_SITES)
  ? window.ELLIE_COLLAGE_SITES
  : [];

if (collageRoot && collageSites.length) {
  collageSites.forEach((site) => {
    const card = document.createElement("a");
    card.className = "collage-card";
    card.href = site.url;
    card.target = "_blank";
    card.rel = "noopener";
    card.setAttribute("aria-label", `Visit ${site.tag} website`);
    card.innerHTML = `
      <div class="collage-card__bar" aria-hidden="true"><span></span><span></span><span></span></div>
      <img src="${site.image}" alt="${site.alt || site.tag}">
      <span class="collage-card__tag">${site.tag}</span>
    `;
    collageRoot.append(card);
  });

  const cards = [...collageRoot.children];
  let activeIndex = cards.length > 1 ? 1 : 0;

  function updateCards() {
    cards.forEach((card, index) => {
      const distance = (index - activeIndex + cards.length) % cards.length;
      card.classList.toggle("is-front", distance === 0);
      card.classList.toggle("is-back", distance === 1);
      card.classList.toggle("is-hidden", distance > 1);
    });
  }

  updateCards();

  if (cards.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateCards();
    }, 4200);
  }
}

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
