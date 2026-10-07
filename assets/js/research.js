/* Shared navigation for research notes. Content remains readable without JS. */
(() => {
  "use strict";
  const filters = document.querySelectorAll("[data-note-filter]");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.noteFilter;
      filters.forEach((other) => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", String(active));
      });
      let count = 0;
      document.querySelectorAll(".note-card[data-topic]").forEach((card) => {
        card.hidden = topic !== "All" && card.dataset.topic !== topic;
        if (!card.hidden) count++;
      });
      const status = document.querySelector("[data-filter-status]");
      if (status) status.textContent = document.documentElement.lang === "zh-CN" ? `显示 ${count} 篇研究笔记。` : `${count} research notes shown.`;
    });
  });
  const content = document.querySelector("[data-note-content]");
  const toc = document.querySelector("[data-note-toc]");
  if (!content || !toc) return;
  const headings = [...content.querySelectorAll("h2, h3")].filter((heading) => !heading.closest(".interactive-demo"));
  const links = new Map();
  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `section-${index + 1}`;
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    toc.append(link);
    links.set(heading, link);
  });
  if (!headings.length) toc.parentElement.hidden = true;
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link, heading) => {
          const active = heading === entry.target;
          link.classList.toggle("is-current", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-90px 0px -65% 0px" }
  );
  headings.forEach((heading) => observer.observe(heading));
})();
