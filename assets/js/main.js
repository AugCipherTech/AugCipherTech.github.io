/* =========================================================
   AugCipher Tech — site interactions
   ---------------------------------------------------------
   👉 Update your real contact details here (used across the site)
   ========================================================= */
const CONFIG = {
  email: "hello@augciphertech.com",
  phone: "+8801792021499",
  phoneDisplay: "+880 1792-021499",
  whatsapp: "8801792021499",        // digits only, no "+"
};

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---- Apply contact config ---- */
  $$(".js-email").forEach((a) => { a.href = `mailto:${CONFIG.email}`; a.textContent = CONFIG.email; });
  $$(".js-phone").forEach((a) => { a.href = `tel:${CONFIG.phone}`; a.textContent = CONFIG.phoneDisplay; });
  $$(".js-whatsapp").forEach((a) => { a.href = `https://wa.me/${CONFIG.whatsapp}`; });

  /* ---- Year ---- */
  $("#year").textContent = new Date().getFullYear();

  /* ---- Theme toggle ---- */
  const root = document.documentElement;
  const getStored = () => { try { return localStorage.getItem("ac-theme"); } catch { return null; } };
  const setStored = (v) => { try { localStorage.setItem("ac-theme", v); } catch { /* ignore */ } };
  const initial = getStored() || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  root.dataset.theme = initial;
  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    setStored(next);
  });

  /* ---- Mobile menu ---- */
  const burger = $("#burger");
  const links = $("#navLinks");
  const closeMenu = () => { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); };
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach((a) => a.addEventListener("click", closeMenu));

  /* ---- Navbar on scroll + back to top ---- */
  const nav = $("#nav");
  const toTop = $("#toTop");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 20);
    toTop.classList.toggle("is-visible", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---- Active nav link ---- */
  const navAnchors = $$('.nav__links a[href^="#"]:not(.btn)');
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navAnchors.forEach((a) => { const s = $(a.getAttribute("href")); if (s) sectionObs.observe(s); });

  /* ---- Reveal on scroll ---- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealObs.observe(el);
  });

  /* ---- Typing effect in hero ---- */
  const typed = $("#typed");
  const words = ["grows your business", "runs your ERP", "powers your POS", "sells online 24/7", "manages your pharmacy", "serves your restaurant"];
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let w = 0, c = words[0].length, deleting = true;
    const tick = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (deleting) {
        c--;
        if (c < 0) { deleting = false; w = (w + 1) % words.length; c = 0; }
      } else {
        c++;
        if (c > words[w].length) { deleting = true; setTimeout(tick, 1800); return; }
      }
      setTimeout(tick, deleting ? 40 : 75);
    };
    setTimeout(tick, 2600);
  }

  /* ---- Product filter tabs ---- */
  const tabs = $$(".tab");
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
    const f = tab.dataset.filter;
    $$(".product").forEach((p) => {
      const show = f === "all" || p.dataset.cat === f;
      p.classList.toggle("is-hidden", !show);
      if (show) p.classList.add("is-visible");
    });
  }));

  /* ---- Pre-select service in form from product/plan buttons ---- */
  const serviceSelect = $("#serviceSelect");
  $$("[data-interest]").forEach((btn) => btn.addEventListener("click", () => {
    const want = btn.dataset.interest.toLowerCase();
    const match = [...serviceSelect.options].find((o) => want.includes(o.value.toLowerCase()));
    serviceSelect.value = match ? match.value : (want.includes("website") ? "Website" : "Custom Software");
  }));

  /* ---- Contact form (no backend: opens email client with prefilled message) ---- */
  const form = $("#contactForm");
  const note = $("#formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    $$("[required]", form).forEach((f) => {
      const ok = f.value.trim() !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      note.className = "form__note err";
      note.textContent = "Please fill in your name, a valid email and project details.";
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const subject = `Project inquiry: ${d.service} — ${d.name}`;
    const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\nInterested in: ${d.service}\nBudget: ${d.budget}\n\n${d.message}`;
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.className = "form__note ok";
    note.textContent = "Thanks! Your email app is opening — just hit send and we'll get back to you soon.";
    form.reset();
  });
})();
