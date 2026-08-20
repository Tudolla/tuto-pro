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
    const hasStoreLink = Boolean(app.storeUrl);
    const galleryAction = hasGallery
      ? `<button class="app-card-action" type="button" aria-haspopup="dialog" aria-label="Xem ảnh chụp màn hình ${escapeHtml(app.name)}" data-gallery-index="${index}">
          Screenshots <i aria-hidden="true">↗</i>
        </button>`
      : "";
    const storeAction = hasStoreLink
      ? `<a class="app-store-link" href="${escapeHtml(app.storeUrl)}" target="_blank" rel="noreferrer" aria-label="Xem ${escapeHtml(app.name)} trên Google Play">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4.7 3.5 10.7 8.3a.25.25 0 0 1 0 .4L4.7 20.5a1 1 0 0 1-1.6-.8V4.3a1 1 0 0 1 1.6-.8Z" fill="currentColor"/><path d="m15.4 11.8 2.8-2.2a1 1 0 0 1 1.1-.08l1.28.72a2 2 0 0 1 0 3.5l-1.28.72a1 1 0 0 1-1.1-.08l-2.8-2.2a.25.25 0 0 1 0-.4Z" fill="currentColor" opacity=".72"/></svg>
          Google Play
        </a>`
      : "";

    return `
      <article
        class="app-card reveal"
        style="--card-bg:${escapeHtml(app.background)};--card-accent:${escapeHtml(app.accent)};--screen-bg:${escapeHtml(app.screenBackground)};--status-color:${escapeHtml(app.statusColor)}"
      >
        <div class="app-card-content">
          <div class="app-card-top">
            <span class="app-icon">${icon}</span>
            <span class="status-badge">${escapeHtml(app.status)}</span>
          </div>
          <h3>${escapeHtml(app.name)}</h3>
          <p>${escapeHtml(app.description)}</p>
          <div class="app-meta">${tags}</div>
          ${galleryAction || storeAction ? `<div class="app-card-actions">${galleryAction}${storeAction}</div>` : ""}
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
          <div class="gallery-toolbar-actions">
            <a class="app-modal-store" target="_blank" rel="noreferrer" hidden>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4.7 3.5 10.7 8.3a.25.25 0 0 1 0 .4L4.7 20.5a1 1 0 0 1-1.6-.8V4.3a1 1 0 0 1 1.6-.8Z" fill="currentColor"/><path d="m15.4 11.8 2.8-2.2a1 1 0 0 1 1.1-.08l1.28.72a2 2 0 0 1 0 3.5l-1.28.72a1 1 0 0 1-1.1-.08l-2.8-2.2a.25.25 0 0 1 0-.4Z" fill="currentColor" opacity=".72"/></svg>
              Xem trên Google Play
            </a>
            <div class="gallery-controls">
              <button type="button" aria-label="Xem ảnh trước" data-gallery-prev>←</button>
              <button type="button" aria-label="Xem ảnh tiếp theo" data-gallery-next>→</button>
            </div>
          </div>
        </div>
        <div class="screenshot-track" tabindex="0" aria-label="Danh sách ảnh chụp màn hình"></div>
      </section>
      <div class="app-image-viewer" role="dialog" aria-modal="true" aria-label="Ảnh chụp màn hình kích thước lớn" hidden>
        <div class="app-image-viewer-backdrop" data-image-viewer-close></div>
        <div class="app-image-viewer-content">
          <button class="app-image-viewer-close" type="button" aria-label="Đóng ảnh kích thước lớn" data-image-viewer-close>
            <span aria-hidden="true"></span><span aria-hidden="true"></span>
          </button>
          <img alt="" />
          <p></p>
        </div>
      </div>`;
    document.body.append(modal);

    const dialog = modal.querySelector(".app-modal-dialog");
    const closeButton = modal.querySelector(".app-modal-close");
    const title = modal.querySelector("#app-modal-title");
    const track = modal.querySelector(".screenshot-track");
    const count = modal.querySelector(".gallery-count");
    const storeLink = modal.querySelector(".app-modal-store");
    const previousButton = modal.querySelector("[data-gallery-prev]");
    const nextButton = modal.querySelector("[data-gallery-next]");
    const imageViewer = modal.querySelector(".app-image-viewer");
    const imageViewerContent = imageViewer.querySelector(".app-image-viewer-content");
    const imageViewerClose = imageViewer.querySelector(".app-image-viewer-close");
    const imageViewerImage = imageViewer.querySelector("img");
    const imageViewerCaption = imageViewer.querySelector("p");
    let lastTrigger = null;
    let lastImageTrigger = null;
    let closeTimer = null;
    let imageViewerTimer = null;

    const createScreenshot = (screenshot, index) => {
      const alt = screenshot.alt || `Ảnh chụp màn hình ${index + 1}`;
      const content = screenshot.src
        ? `<button class="screenshot-zoom" type="button" data-screenshot-zoom data-src="${escapeHtml(screenshot.src)}" data-alt="${escapeHtml(alt)}" aria-label="Phóng to ${escapeHtml(alt)}">
            <img src="${escapeHtml(screenshot.src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />
            <span aria-hidden="true">Phóng to</span>
          </button>`
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

    const openImageViewer = (trigger) => {
      window.clearTimeout(imageViewerTimer);
      lastImageTrigger = trigger;
      imageViewerImage.src = trigger.dataset.src;
      imageViewerImage.alt = trigger.dataset.alt;
      imageViewerCaption.textContent = trigger.dataset.alt;
      imageViewer.hidden = false;
      requestAnimationFrame(() => {
        imageViewer.classList.add("is-open");
        imageViewerClose.focus();
      });
    };

    const closeImageViewer = ({ restoreFocus = true, immediately = false } = {}) => {
      window.clearTimeout(imageViewerTimer);
      imageViewer.classList.remove("is-open");

      const finish = () => {
        imageViewer.hidden = true;
        imageViewerImage.removeAttribute("src");
        if (restoreFocus) lastImageTrigger?.focus();
      };

      if (immediately) finish();
      else imageViewerTimer = window.setTimeout(finish, 180);
    };

    const open = (app, trigger) => {
      clearTimeout(closeTimer);
      lastTrigger = trigger;
      title.textContent = app.name;
      track.innerHTML = app.screenshots.map(createScreenshot).join("");
      count.textContent = `${String(app.screenshots.length).padStart(2, "0")} screenshots`;
      storeLink.hidden = !app.storeUrl;
      if (app.storeUrl) {
        storeLink.href = app.storeUrl;
        storeLink.setAttribute("aria-label", `Xem ${app.name} trên Google Play`);
      } else {
        storeLink.removeAttribute("href");
        storeLink.removeAttribute("aria-label");
      }
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
      if (!imageViewer.hidden) closeImageViewer({ restoreFocus: false, immediately: true });
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

    track.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-screenshot-zoom]");
      if (trigger) openImageViewer(trigger);
    });

    modal.querySelectorAll("[data-modal-close]").forEach((element) => {
      element.addEventListener("click", close);
    });
    imageViewer.querySelectorAll("[data-image-viewer-close]").forEach((element) => {
      element.addEventListener("click", () => closeImageViewer());
    });
    previousButton.addEventListener("click", () => scrollGallery(-1));
    nextButton.addEventListener("click", () => scrollGallery(1));
    track.addEventListener("scroll", updateControls, { passive: true });

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!imageViewer.hidden) closeImageViewer();
        else close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusScope = imageViewer.hidden ? dialog : imageViewerContent;
      const focusable = [...focusScope.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')];
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

  function copyTextFallback(text) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }

  function setupEmailCopy() {
    const button = document.querySelector("[data-copy-email]");
    const status = document.querySelector("[data-copy-email-status]");
    if (!button) return;

    let resetTimer;
    button.addEventListener("click", async () => {
      window.clearTimeout(resetTimer);
      button.classList.remove("is-copied", "has-error");

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(data.profile.email);
        } else if (!copyTextFallback(data.profile.email)) {
          throw new Error("Copy command failed");
        }

        button.classList.add("is-copied");
        button.dataset.tooltip = "Đã sao chép";
        button.setAttribute("aria-label", "Đã sao chép địa chỉ email");
        if (status) status.textContent = `Đã sao chép ${data.profile.email}`;
      } catch (_error) {
        button.classList.add("has-error");
        button.dataset.tooltip = "Không thể sao chép";
        if (status) status.textContent = "Không thể sao chép địa chỉ email";
      }

      resetTimer = window.setTimeout(() => {
        button.classList.remove("is-copied", "has-error");
        button.dataset.tooltip = "Sao chép";
        button.setAttribute("aria-label", "Sao chép địa chỉ email");
      }, 2200);
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
  setupEmailCopy();
  setupRevealAnimation();
  document.getElementById("current-year").textContent = new Date().getFullYear();
})();
