(() => {
  "use strict";

  const home = document.querySelector("[data-challenger-home]");
  if (!home) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopTabs = window.matchMedia("(min-width: 901px)");
  const saveData = Boolean(navigator.connection?.saveData);
  const appStoreUrl = "https://apps.apple.com/us/app/courtsideview/id6766532771";
  const assetRoot = "/assets/home-20260714";

  const icons = {
    play: '<svg aria-hidden="true" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-24.32-13.52V39.87a16 16 0 0 1 24.32-13.52l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/></svg>',
    pause: '<svg aria-hidden="true" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M96 40V216a16 16 0 0 1-32 0V40a16 16 0 0 1 32 0Zm80-16a16 16 0 0 0-16 16V216a16 16 0 0 0 32 0V40a16 16 0 0 0-16-16Z"/></svg>',
    menu: '<svg aria-hidden="true" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z"/></svg>',
    close: '<svg aria-hidden="true" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/></svg>',
  };

  const setControlIcon = (button, playing) => {
    if (!button) return;
    button.innerHTML = playing ? icons.pause : icons.play;
  };

  const hydrateVideo = (video) => {
    if (!video || video.dataset.hydrated === "true") return;
    if (video.dataset.poster) video.poster = video.dataset.poster;
    if (video.dataset.src) video.src = video.dataset.src;
    video.dataset.hydrated = "true";
    video.load();
  };

  const menuButton = home.querySelector(".menu-button");
  const mobileNav = home.querySelector("#mobile-navigation");
  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !mobileNav) return;
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.innerHTML = icons.menu;
    if (restoreFocus) menuButton.focus();
  };

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const opening = mobileNav.hidden;
      mobileNav.hidden = !opening;
      menuButton.setAttribute("aria-expanded", String(opening));
      menuButton.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
      menuButton.innerHTML = opening ? icons.close : icons.menu;
      if (opening) window.requestAnimationFrame(() => mobileNav.querySelector("a")?.focus());
    });
    mobileNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu(false);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
    });
    desktopTabs.addEventListener("change", (event) => {
      if (event.matches) closeMenu(false);
    });
  }

  const heroVideo = home.querySelector(".hero-fanview-video");
  const heroControl = home.querySelector(".hero-broadcast-control");
  const syncHeroVideo = () => {
    if (!heroVideo || !heroControl) return;
    const playing = !heroVideo.paused;
    setControlIcon(heroControl, playing);
    heroControl.setAttribute("aria-label", playing ? "Pause FanView preview" : "Play FanView preview");
  };

  if (heroVideo && heroControl) {
    heroVideo.addEventListener("play", syncHeroVideo);
    heroVideo.addEventListener("pause", syncHeroVideo);
    heroControl.addEventListener("click", async () => {
      if (heroVideo.paused) {
        hydrateVideo(heroVideo);
        try { await heroVideo.play(); } catch { syncHeroVideo(); }
      } else {
        heroVideo.pause();
      }
    });
    const syncHeroAutoplay = () => {
      if (!reducedMotion.matches && !saveData && desktopTabs.matches) {
        hydrateVideo(heroVideo);
        heroVideo.play().catch(syncHeroVideo);
      } else {
        heroVideo.pause();
      }
    };
    syncHeroAutoplay();
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) heroVideo.pause();
      else syncHeroAutoplay();
    });
    desktopTabs.addEventListener("change", syncHeroAutoplay);
    syncHeroVideo();
  }

  const atmosphereCards = [...home.querySelectorAll(".atmosphere-card")];
  const atmosphereObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const video = entry.target.querySelector("video");
          if (!video) continue;
          if (entry.isIntersecting) {
            hydrateVideo(video);
            if (!reducedMotion.matches && !saveData) video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }
      }, { rootMargin: "240px 0px", threshold: 0.08 })
    : null;

  for (const card of atmosphereCards) {
    const video = card.querySelector("video");
    const control = card.querySelector(".atmosphere-control");
    const label = card.querySelector(".atmosphere-card__copy span")?.textContent?.trim() || "match-day";
    if (!video || !control) continue;
    const sync = () => {
      const playing = !video.paused;
      setControlIcon(control, playing);
      control.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${label} video`);
    };
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    control.addEventListener("click", async () => {
      if (video.paused) {
        hydrateVideo(video);
        try { await video.play(); } catch { sync(); }
      } else {
        video.pause();
      }
    });
    if (atmosphereObserver) atmosphereObserver.observe(card);
    sync();
  }

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) atmosphereCards.forEach((card) => card.querySelector("video")?.pause());
  });

  const demoData = [
    {
      id: "score",
      eyebrow: "1 · Score",
      title: "Run the point from the real scorekeeper.",
      body: "Fast controls, timeouts, end-set actions, and FanView access stay together while the rally moves.",
      image: `${assetRoot}/scorekeeper-main.webp`,
      alt: "CourtsideView scorekeeper screen with scores, timeouts, and end set controls",
    },
    {
      id: "rotate",
      eyebrow: "2 · Rotate",
      title: "See the six positions in context.",
      body: "Keep the on-court lineup, server, last action, and player stats together without rebuilding the rotation.",
      image: `${assetRoot}/stats-rotation.webp`,
      alt: "CourtsideView rotation and player statistics screen",
    },
    {
      id: "share",
      eyebrow: "3 · Share",
      title: "Publish the match to FanView.",
      body: "Create the live link, add a broadcast or saved video, and bring the cheering section into the match.",
      image: `${assetRoot}/share-fanview.webp`,
      alt: "CourtsideView FanView sharing screen with share and broadcast controls",
    },
  ];

  const demoTabs = [...home.querySelectorAll(".demo-campaign-tabs [role='tab']")];
  const demoPanel = home.querySelector("#demo-panel");
  const demoNext = home.querySelector(".demo-runner .button-primary");
  const demoStatus = home.querySelector(".demo-runner [aria-live]");
  const demoReset = home.querySelector(".demo-section .text-button");
  let demoIndex = 0;

  const renderDemo = (index, focusTab = false) => {
    if (!demoPanel || !demoData[index]) return;
    demoIndex = index;
    const data = demoData[index];
    demoTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    demoPanel.setAttribute("aria-labelledby", `demo-tab-${data.id}`);
    const image = demoPanel.querySelector("img");
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
    }
    const eyebrow = demoPanel.querySelector(".demo-campaign-copy > p");
    const title = demoPanel.querySelector(".demo-campaign-copy h3");
    const body = demoPanel.querySelector(".demo-campaign-copy > span");
    if (eyebrow) eyebrow.textContent = data.eyebrow;
    if (title) title.textContent = data.title;
    if (body) body.textContent = data.body;
    const nextLabel = demoNext?.querySelector("[data-demo-next-label]");
    if (nextLabel) nextLabel.textContent = index === demoData.length - 1 ? "Replay the match flow" : `Next: ${demoData[index + 1].id}`;
    if (demoStatus) demoStatus.textContent = `Now showing: ${data.title}`;
    if (!reducedMotion.matches) demoPanel.animate?.([{ opacity: 0.55 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    if (focusTab) demoTabs[index]?.focus();
  };

  const moveTab = (event, index, count, render) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % count;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + count) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    render(next, true);
  };

  demoTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => renderDemo(index));
    tab.addEventListener("keydown", (event) => moveTab(event, index, demoTabs.length, renderDemo));
  });
  demoNext?.addEventListener("click", () => renderDemo((demoIndex + 1) % demoData.length));
  demoReset?.addEventListener("click", () => renderDemo(0));
  const syncDemoOrientation = () => home.querySelector(".demo-campaign-tabs")?.setAttribute("aria-orientation", desktopTabs.matches ? "vertical" : "horizontal");
  desktopTabs.addEventListener("change", syncDemoOrientation);
  syncDemoOrientation();

  const storefrontData = [
    { image: `${assetRoot}/storefront/app-store-01.jpg`, title: "Start scoring fast", body: "Open the volleyball tools you need without walking through a multi-sport setup." },
    { image: `${assetRoot}/storefront/app-store-02.jpg`, title: "Run the match live", body: "Score, rotations, substitutions, and FanView stay connected while the rally moves." },
    { image: `${assetRoot}/storefront/app-store-03.jpg`, title: "Big match energy", body: "Turn an iPad into a bold, readable scoreboard for the bench and the far baseline." },
    { image: `${assetRoot}/storefront/app-store-04.jpg`, title: "Share it live", body: "FanView carries the score, match activity, and optional live video beyond the gym." },
    { image: `${assetRoot}/storefront/app-store-05.jpg`, title: "Track every rally", body: "Give athletes credit for the plays that shape the set, not only the final score." },
    { image: `${assetRoot}/storefront/app-store-06.jpg`, title: "Set up in seconds", body: "Save the team details once and arrive ready for the next first serve." },
  ];
  const storefront = home.querySelector(".storefront-spotlight");
  const storefrontTabs = [...home.querySelectorAll(".storefront-index button")];
  const storefrontControls = [...home.querySelectorAll(".storefront-controls button")];
  let storefrontIndex = 0;

  const renderStorefront = (index) => {
    if (!storefront) return;
    storefrontIndex = (index + storefrontData.length) % storefrontData.length;
    const data = storefrontData[storefrontIndex];
    const image = storefront.querySelector(".storefront-spotlight-image img");
    const position = storefront.querySelector(".storefront-position");
    const title = storefront.querySelector(".storefront-spotlight-copy h3");
    const body = storefront.querySelector(".storefront-spotlight-copy h3 + p");
    if (image) {
      image.src = data.image;
      image.alt = `${data.title}, current CourtsideView App Store screenshot`;
    }
    if (position) position.textContent = `${String(storefrontIndex + 1).padStart(2, "0")} / ${String(storefrontData.length).padStart(2, "0")}`;
    if (title) title.textContent = data.title;
    if (body) body.textContent = data.body;
    storefrontTabs.forEach((button, buttonIndex) => {
      const active = buttonIndex === storefrontIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (!reducedMotion.matches) storefront.querySelector(".storefront-spotlight-image")?.animate?.([{ opacity: 0.55 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
  };
  storefrontTabs.forEach((button, index) => button.addEventListener("click", () => renderStorefront(index)));
  storefrontControls[0]?.addEventListener("click", () => renderStorefront(storefrontIndex - 1));
  storefrontControls[1]?.addEventListener("click", () => renderStorefront(storefrontIndex + 1));

  const featureData = [
    { id: "rotations", eyebrow: "Six-position rotations", title: "Always know who’s in, who’s up next, and why.", body: "See the court in context while the match is moving—without rebuilding the lineup between rallies.", image: `${assetRoot}/stats-rotation.webp`, alt: "CourtsideView rotation and player statistics screen" },
    { id: "stats", eyebrow: "Player stats that matter", title: "Give every athlete credit for the work.", body: "Track the plays that shape the match, then carry that story beyond the final whistle.", image: `${assetRoot}/scorekeeper-main.webp`, alt: "CourtsideView scorekeeper and player statistics screen" },
    { id: "rosters", eyebrow: "Rosters ready to play", title: "Load the team once. Arrive ready next time.", body: "Keep player names, numbers, positions, and profiles ready before the gym gets loud.", image: `${assetRoot}/roster-hub.webp`, alt: "CourtsideView roster hub screen" },
    { id: "big-mode", eyebrow: "Big scoreboard mode", title: "Make the score visible across the whole gym.", body: "A focused, legible view for scorer tables, benches, and the parent at the far baseline.", image: `${assetRoot}/big-scoreboard.webp`, alt: "CourtsideView landscape scoreboard mode" },
  ];
  const featureTabs = [...home.querySelectorAll(".feature-tabs [role='tab']")];
  const featurePanel = home.querySelector("#feature-panel");

  const renderFeature = (index, focusTab = false) => {
    if (!featurePanel || !featureData[index]) return;
    const data = featureData[index];
    featureTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    featurePanel.setAttribute("aria-labelledby", `feature-tab-${data.id}`);
    const imageWrap = featurePanel.querySelector(".feature-image");
    imageWrap?.classList.toggle("feature-image--wide", data.id === "big-mode");
    const image = imageWrap?.querySelector("img");
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
    }
    const eyebrow = featurePanel.querySelector(".feature-caption > p");
    const title = featurePanel.querySelector(".feature-caption h3");
    const body = featurePanel.querySelector(".feature-caption > span");
    if (eyebrow) eyebrow.textContent = data.eyebrow;
    if (title) title.textContent = data.title;
    if (body) body.textContent = data.body;
    if (!reducedMotion.matches) featurePanel.animate?.([{ opacity: 0.55 }, { opacity: 1 }], { duration: 260, easing: "ease-out" });
    if (focusTab) featureTabs[index]?.focus();
  };
  featureTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => renderFeature(index));
    tab.addEventListener("keydown", (event) => moveTab(event, index, featureTabs.length, renderFeature));
  });

  const modal = document.querySelector("[data-fanview-modal]");
  const modalTrigger = home.querySelector("[data-fanview-open]");
  const modalClose = modal?.querySelector("[data-modal-close]");
  const modalDownload = modal?.querySelector("a[href='#download']");
  let modalReturnFocus = null;

  const closeModal = (restoreFocus = true) => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    home.removeAttribute("inert");
    document.body.style.overflow = "";
    if (restoreFocus && modalReturnFocus instanceof HTMLElement) modalReturnFocus.focus();
  };

  const openModal = () => {
    if (!modal) return;
    modalReturnFocus = document.activeElement;
    modal.hidden = false;
    home.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => modalClose?.focus());
  };

  modalTrigger?.addEventListener("click", openModal);
  modalClose?.addEventListener("click", () => closeModal(true));
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(true);
  });
  modalDownload?.addEventListener("click", () => {
    closeModal(false);
    window.setTimeout(() => document.querySelector("#download-title")?.focus(), 0);
  });
  window.addEventListener("keydown", (event) => {
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal(true);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
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

  document.querySelectorAll("a[target='_blank']").forEach((link) => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });

  document.documentElement.classList.add("challenger-ready");
  window.__COURTSIDEVIEW_HOME_READY__ = { appStoreUrl, version: "2026-07-14" };
})();
