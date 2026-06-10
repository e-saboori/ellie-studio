const navigationItems = [
  ["index.html", "Home"],
  ["services.html", "Services"],
  ["pricing.html", "Pricing"],
  ["faq.html", "FAQ"],
  ["contact.html", "Contact"]
];

const currentPage = window.location.pathname.split("/").pop() || "index.html";

function navigationMarkup() {
  return navigationItems
    .map(([href, label]) => {
      const active = currentPage === href;
      return `<a${active ? ' class="is-active" aria-current="page"' : ""} href="${href}">${label}</a>`;
    })
    .join("");
}

function headerComponent() {
  return `
    <header class="site-header">
      <nav class="nav chrome-shell" aria-label="Primary navigation">
        <a class="logo" href="index.html" aria-label="Ellie Studio home">
          <img src="assets/doodles/logo.png" alt="Ellie Studio">
        </a>
        <div class="nav__links" id="mobile-menu">
          ${navigationMarkup()}
        </div>
        <a class="btn btn--primary nav__cta" href="contact.html">Start Your Website</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  `;
}

function footerComponent() {
  return `
    <footer class="footer">
      <div class="chrome-shell footer__inner">
        <a class="logo footer__logo" href="index.html" aria-label="Ellie Studio home">
          <img src="assets/doodles/logo.png" alt="Ellie Studio">
        </a>
        <p>Design, development, and launch support for small business websites.</p>
        <img class="footer__heart" src="assets/icons/heart.svg" alt="" aria-hidden="true">
      </div>
    </footer>
  `;
}

document.querySelectorAll("[data-site-header]").forEach((mount) => {
  mount.outerHTML = headerComponent();
});

document.querySelectorAll("[data-site-footer]").forEach((mount) => {
  mount.outerHTML = footerComponent();
});
