const showcaseProjects = [
  {
    tag: "ARCHITECTURE STUDIO",
    title: "Architecture website",
    image: "assets/collage/econset.png",
    alt: "Architecture studio website screenshot"
  },
  {
    tag: "BEAUTY STUDIO",
    title: "Beauty website",
    image: "assets/collage/sepid.png",
    alt: "Beauty studio website screenshot"
  }
];

const showcaseStack = document.querySelector("#showcase-stack");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (showcaseStack && showcaseProjects.length) {
  showcaseProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "showcase-card";
    card.dataset.index = String(index);
    card.innerHTML = `
      <div class="showcase-browser-bar" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <img src="${project.image}" alt="${project.alt}">
      <div class="showcase-tag">${project.tag}</div>
      <span class="sr-only">${project.title}</span>
    `;
    showcaseStack.append(card);
  });

  const cards = [...showcaseStack.querySelectorAll(".showcase-card")];
  let activeIndex = 0;
  let rotationTimer;

  function updateStack() {
    cards.forEach((card, index) => {
      const position = (index - activeIndex + cards.length) % cards.length;
      card.dataset.position = String(Math.min(position, 3));
      card.setAttribute("aria-hidden", position > 0 ? "true" : "false");
    });
  }

  function startRotation() {
    if (reduceMotion || cards.length < 2) return;
    window.clearInterval(rotationTimer);
    rotationTimer = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateStack();
    }, 3600);
  }

  updateStack();
  startRotation();
  showcaseStack.addEventListener("mouseenter", () => window.clearInterval(rotationTimer));
  showcaseStack.addEventListener("mouseleave", startRotation);
}
