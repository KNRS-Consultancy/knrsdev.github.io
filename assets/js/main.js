/* ==========================================================================
   KNRS Consultancy — site behaviour

   Contact details are plain links in index.html, so there is nothing to
   configure here. This file only adds the index filters, the scroll reveal
   and the mobile menu.
   ========================================================================== */


/* --------------------------------------------------------------------------
   The A–Z index

   The 26 entries are written directly into index.html, so the section works
   even if this file never loads. To change one, edit the <li class="entry">
   markup in index.html — the data-group value decides which filter it
   belongs to: staffing, manpower, recruitment, company, referrals or web.

   This section only adds the filter buttons on top of that list.
   -------------------------------------------------------------------------- */

const grid = document.getElementById("indexGrid");
const note = document.getElementById("indexNote");
const filters = document.getElementById("indexFilters");
const total = grid ? grid.querySelectorAll(".entry").length : 0;

if (filters && total) filters.hidden = false;

/* ---------- Filter the index ---------- */

const chips = filters ? filters.querySelectorAll(".chip") : [];

function applyFilter(value) {
  if (!grid) return;
  let shown = 0;

  grid.querySelectorAll(".entry").forEach(entry => {
    const match = value === "all" || entry.dataset.group === value;
    entry.classList.toggle("is-hidden", !match);
    if (match) shown++;
  });

  if (note) {
    note.textContent = value === "all"
      ? `All ${shown} services`
      : `${shown} of ${total} services`;
  }
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => {
      c.classList.remove("is-active");
      c.setAttribute("aria-pressed", "false");
    });
    chip.classList.add("is-active");
    chip.setAttribute("aria-pressed", "true");
    applyFilter(chip.dataset.filter);
  });
});

if (grid) applyFilter("all");

/* ---------- Reveal sections on scroll ---------- */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(".reveal");

if (reduced || !("IntersectionObserver" in window)) {
  targets.forEach(el => el.classList.add("is-in"));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add("is-in"), i * 70);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  targets.forEach(el => observer.observe(el));
}

/* ---------- Mobile navigation ---------- */

const toggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

/* ---------- Footer year ---------- */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
