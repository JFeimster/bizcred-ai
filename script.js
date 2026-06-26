const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const copyButtons = document.querySelectorAll("[data-copy-target]");
const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
  scrollTopButton?.classList.toggle("is-visible", window.scrollY > 700);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const text = target?.innerText.trim();

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      const oldText = button.innerText;
      button.innerText = "Copied";

      setTimeout(() => {
        button.innerText = oldText;
      }, 1400);
    } catch (error) {
      button.innerText = "Select text";
      setTimeout(() => {
        button.innerText = "Copy";
      }, 1400);
    }
  });
});

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -30px 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    if (prefersReducedMotion.matches) return;

    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.04}px, ${y * 0.05}px) translate(-4px, -4px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

const tiltCards = document.querySelectorAll(
  ".bento-card, .problem-card, .step-card, .case-card, .offer-card, .dash-card, .prompt-card, .os-panel"
);

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion.matches || window.innerWidth < 800) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--tilt-x", `${y * -3}deg`);
    card.style.setProperty("--tilt-y", `${x * 3}deg`);
    card.style.transform = `translate(-5px, -6px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    card.style.transform = "";
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-current",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => navObserver.observe(section));

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});
