// script.js
(function () {
  const root = document.querySelector("#pillars-widget");
  if (!root) return;
  const pillars = Array.from(root.querySelectorAll(".pillar"));

  const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hoverCapable = window.matchMedia("(hover: hover)").matches && !prefersCoarsePointer;

  function getVideo(el) {
    return el.querySelector(".pillar-video");
  }

  function ensureSrc(el) {
    const v = getVideo(el);
    const src = el.getAttribute("data-src");
    if (!v.src) v.src = src;
    return v;
  }

  async function playVideo(el) {
    const v = ensureSrc(el);
    try {
      await v.play();
    } catch (e) {}
  }

  function pauseVideo(el) {
    const v = getVideo(el);
    v.pause();
    v.currentTime = 0;
  }

  function setActive(target) {
    pillars.forEach((p) => {
      const isTarget = p === target;
      p.classList.toggle("is-active", isTarget);
      p.setAttribute("aria-expanded", isTarget ? "true" : "false");
      if (isTarget) playVideo(p);
      else pauseVideo(p);
    });
  }

  function clearActive() {
    pillars.forEach((p) => {
      p.classList.remove("is-active");
      p.setAttribute("aria-expanded", "false");
      pauseVideo(p);
    });
  }

  function toggleActive(target) {
    if (target.classList.contains("is-active")) clearActive();
    else setActive(target);
  }

  if (hoverCapable) {
    pillars.forEach((p) => {
      p.addEventListener("mouseenter", () => setActive(p));
      p.addEventListener("mouseleave", () => clearActive());
      p.addEventListener("focus", () => setActive(p));
      p.addEventListener("blur", () => clearActive());
    });
  } else {
    pillars.forEach((p) => {
      p.addEventListener("click", () => toggleActive(p));
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".pillar")) clearActive();
    });
  }

  pillars.forEach((p) => p.setAttribute("aria-expanded", "false"));
})();
