(function () {
  "use strict";

  const data = window.portfolioData;
  if (!data) return;

  const iconMap = {
    spark: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M18.5 16l.6 2.4 2.4.6-2.4.6-.6 2.4-.6-2.4-2.4-.6 2.4-.6.6-2.4Z" fill="currentColor"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m5 12 7 4 7-4M5 16.5l7 4 7-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    orbit: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M20.2 7.2c1.1 1.9-1.7 5.5-6.2 8.1-4.5 2.6-9 3.1-10.2 1.2-1.1-1.9 1.7-5.5 6.2-8.1 4.5-2.6 9-3.1 10.2-1.2Z" stroke="currentColor" stroke-width="1.5"/><path d="M15.8 20.3c-2.2 0-4-4.2-4-9.3s1.8-9.3 4-9.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function hydrateProfile() {
    const { profile, apps } = data;
    document.querySelectorAll("[data-profile-name]").forEach((element) => {
      element.textContent = profile.name;
    });
    document.querySelectorAll("[data-brand-mark]").forEach((element) => {
      element.textContent = profile.initials;
    });
    document.querySelectorAll("[data-profile-intro]").forEach((element) => {
      element.textContent = profile.intro;
    });
    document.querySelectorAll("[data-profile-about]").forEach((element) => {
      element.textContent = profile.about;
    });
    document.querySelectorAll("[data-email-link]").forEach((element) => {
      element.href = `mailto:${profile.email}`;
    });
    document.querySelectorAll("[data-email-text]").forEach((element) => {
      element.textContent = profile.email;
    });

    const counter = document.querySelector("[data-app-count]");
    if (counter) counter.textContent = String(apps.length).padStart(2, "0");

    document.title = `${profile.name} — Mobile App Developer`;
  }

  function createAppCard(app, index) {
    const tags = app.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const icon = iconMap[app.icon] || iconMap.spark;
    const hasGallery = Array.isArray(app.screenshots) && app.screenshots.length > 0;
    const interactiveAttributes = hasGallery
      ? `role="button" tabindex="0" aria-haspopup="dialog" aria-label="Xem ảnh chụp màn hình ${escapeHtml(app.name)}" data-gallery-index="${index}"`
      : "";

    return `
      <article
        class="app-card reveal${hasGallery ? " app-card--clickable" : ""}"
        style="--card-bg:${escapeHtml(app.background)};--card-accent:${escapeHtml(app.accent)};--screen-bg:${escapeHtml(app.screenBackground)};--status-color:${escapeHtml(app.statusColor)}"
        ${interactiveAttributes}
      >
        <div class="app-card-content">
          <div class="app-card-top">
            <span class="app-icon">${icon}</span>
            <span class="status-badge">${escapeHtml(app.status)}</span>
          </div>
          <h3>${escapeHtml(app.name)}</h3>
          <p>${escapeHtml(app.description)}</p>
          <div class="app-meta">${tags}</div>
          ${hasGallery ? '<span class="app-card-action">Xem screenshots <i aria-hidden="true">↗</i></span>' : ""}
        </div>
        <div class="app-mockup" aria-hidden="true">
          <div class="mockup-screen">
            <strong class="mock-title">${escapeHtml(app.name)}</strong>
            <div class="mock-highlight"></div>
            <div class="mock-row"></div>
            <div class="mock-row"></div>
          </div>
        </div>
        <span class="sr-only">Sản phẩm số ${index + 1}</span>
      </article>`;
  }

  function renderApps() {
    const grid = document.getElementById("app-grid");
    if (!grid) return;
    grid.innerHTML = data.apps.map(createAppCard).join("");
  }

  function createGalleryModal() {
    const modal = document.createElement("div");
    modal.className = "app-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="app-modal-backdrop" data-modal-close></div>
      <section
        class="app-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-modal-title"
        aria-describedby="app-modal-description"
        tabindex="-1"
      >
        <header class="app-modal-header">
          <div>
            <span class="app-modal-kicker">App showcase</span>
            <h2 id="app-modal-title"></h2>
            <p id="app-modal-description">Khám phá các màn hình nổi bật của ứng dụng.</p>
          </div>
          <button class="app-modal-close" type="button" aria-label="Đóng cửa sổ" data-modal-close>
            <span aria-hidden="true"></span><span aria-hidden="true"></span>
          </button>
        </header>
        <div class="gallery-toolbar">
          <span class="gallery-count" aria-live="polite"></span>
          <div class="gallery-controls">
            <button type="button" aria-label="Xem ảnh trước" data-gallery-prev>←</button>
            <button type="button" aria-label="Xem ảnh tiếp theo" data-gallery-next>→</button>
          </div>
        </div>
        <div class="screenshot-track" tabindex="0" aria-label="Danh sách ảnh chụp màn hình"></div>
      </section>`;
    document.body.append(modal);

    const closeButton = modal.querySelector(".app-modal-close");
    const title = modal.querySelector("#app-modal-title");
    const track = modal.querySelector(".screenshot-track");
    const count = modal.querySelector(".gallery-count");
    const previousButton = modal.querySelector("[data-gallery-prev]");
    const nextButton = modal.querySelector("[data-gallery-next]");
    let lastTrigger = null;
    let closeTimer = null;

    const createScreenshot = (screenshot, index) => {
      const alt = screenshot.alt || `Ảnh chụp màn hình ${index + 1}`;
      const content = screenshot.src
        ? `<img src="${escapeHtml(screenshot.src)}" alt="${escapeHtml(alt)}" loading="lazy" />`
        : '<div class="screenshot-placeholder" role="img" aria-label="Khung ảnh đang chờ cập nhật"><span aria-hidden="true"></span></div>';

      return `
        <figure class="screenshot-item">
          <div class="screenshot-frame">${content}</div>
          <figcaption>${String(index + 1).padStart(2, "0")} · ${escapeHtml(alt)}</figcaption>
        </figure>`;
    };

    const updateControls = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      previousButton.disabled = track.scrollLeft <= 4;
      nextButton.disabled = track.scrollLeft >= maxScroll - 4;
    };

    const open = (app, trigger) => {
      clearTimeout(closeTimer);
      lastTrigger = trigger;
      title.textContent = app.name;
      track.innerHTML = app.screenshots.map(createScreenshot).join("");
      count.textContent = `${String(app.screenshots.length).padStart(2, "0")} screenshots`;
      track.scrollLeft = 0;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        closeButton.focus();
        updateControls();
      });
    };

    const close = () => {
      modal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      closeTimer = window.setTimeout(() => {
        modal.hidden = true;
        lastTrigger?.focus();
      }, 220);
    };

    const scrollGallery = (direction) => {
      const item = track.querySelector(".screenshot-item");
      const distance = item ? item.getBoundingClientRect().width + 22 : 280;
      track.scrollBy({ left: distance * direction, behavior: "smooth" });
    };

    document.getElementById("app-grid")?.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-gallery-index]");
      if (!trigger) return;
      const app = data.apps[Number(trigger.dataset.galleryIndex)];
      if (app?.screenshots?.length) open(app, trigger);
    });

    document.getElementById("app-grid")?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const trigger = event.target.closest("[data-gallery-index]");
      if (!trigger) return;
      event.preventDefault();
      trigger.click();
    });

    modal.querySelectorAll("[data-modal-close]").forEach((element) => {
      element.addEventListener("click", close);
    });
    previousButton.addEventListener("click", () => scrollGallery(-1));
    nextButton.addEventListener("click", () => scrollGallery(1));
    track.addEventListener("scroll", updateControls, { passive: true });

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...modal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function renderSocials() {
    const container = document.getElementById("social-links");
    if (!container) return;
    container.innerHTML = data.profile.socials
      .map(
        (social) =>
          `<a href="${escapeHtml(social.url)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(social.label)}">${escapeHtml(social.shortLabel)}</a>`,
      )
      .join("");
  }

  function setupNavigation() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".primary-nav");

    const closeMenu = () => {
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Mở menu");
      nav?.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    toggle?.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.setAttribute("aria-label", willOpen ? "Đóng menu" : "Mở menu");
      nav?.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("menu-open", willOpen);
    });

    nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 16), {
      passive: true,
    });
  }

  function setupRevealAnimation() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
  }

  hydrateProfile();
  renderApps();
  createGalleryModal();
  renderSocials();
  setupNavigation();
  setupRevealAnimation();
  document.getElementById("current-year").textContent = new Date().getFullYear();
})();
