/* Citation badges read a cached, verified Scholar snapshot. No client-side scraping. */
(() => {
  "use strict";
  const badges = document.querySelectorAll("[data-scholar-paper]");
  if (!badges.length) return;
  const zh = document.documentElement.lang === "zh-CN";
  const script = document.currentScript || document.querySelector('script[src*="/assets/js/scholar.js"]');
  const url = new URL("../json/scholar.json", script.src).href;
  const formatter = new Intl.NumberFormat(zh ? "zh-CN" : "en");
  let pending = false;
  async function refresh() {
    if (pending || document.hidden) return;
    pending = true;
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10000) });
      if (!response.ok) return;
      const data = await response.json();
      if (data.profile_id !== "maF2KooAAAAJ" || data.source !== "Google Scholar") return;
      const updated = new Date(data.updated_at);
      if (!Number.isFinite(updated.getTime())) return;
      badges.forEach((badge) => {
        const paper = data.publications?.[badge.dataset.scholarPaper];
        const count = badge.querySelector("[data-scholar-count]");
        if (!paper || !count || !Number.isInteger(paper.citation_count) || paper.citation_count < 0) return;
        const number = formatter.format(paper.citation_count) + (paper.estimated ? "*" : "");
        count.textContent = number;
        badge.setAttribute("aria-label", zh ? `Google Scholar 引用数：${number}` : `Google Scholar citations: ${number}`);
        badge.title = `Google Scholar · ${number} · ${data.updated_at}`;
      });
    } catch {
      // Preserve the last known count when a refresh fails.
    } finally {
      pending = false;
    }
  }
  refresh();
  document.addEventListener("visibilitychange", refresh);
  setInterval(refresh, 15 * 60 * 1000);
})();
