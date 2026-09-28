(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var reduceMotion = false;
  if (window.matchMedia) {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* Existing job photos only. Order matches the first set in index.html. */
  var pools = {
    kitchen: [
      { src: "images/photo-14.jpg", alt: "Luxury kitchen with pendant lights and under-cabinet LED lighting", caption: "Kitchen lighting remodel", w: 360, h: 480 },
      { src: "images/photo-11.jpg", alt: "Kitchen under-cabinet and shelf LED lighting on marble counters", caption: "Under-cabinet LEDs", w: 480, h: 640 },
      { src: "images/job-outlet.jpg", alt: "Kitchen outlet and under-cabinet lighting from a remodel job", caption: "Kitchen outlet and lighting", w: 310, h: 370 }
    ],
    heat: [
      { src: "images/photo-15.jpg", alt: "Radiant snow-melt cable mats being installed on a residential driveway", caption: "Driveway snow-melt", w: 480, h: 640 },
      { src: "images/photo-16.jpg", alt: "Roof heat tape, switch, panel, and contactor for winter ice control", caption: "Roof heat tape", w: 480, h: 640 }
    ],
    panels: [
      { src: "images/panel-install.jpg", alt: "SPAN panel upgrade install — open panel and wiring", caption: "SPAN smart panel install", w: 250, h: 537 },
      { src: "images/photo-07.jpg", alt: "AJ's Electric Inc. panel upgrade on a Tahoe job site", caption: "Panel upgrade", w: 480, h: 640 }
    ],
    exterior: [
      { src: "images/photo-08.jpg", alt: "LED step lighting and modern sconces at a snowy Tahoe home entry", caption: "Exterior step lighting", w: 480, h: 640 },
      { src: "images/photo-04.jpg", alt: "Outdoor deck with hidden LED strip lighting under railings at night", caption: "Deck LED lighting", w: 361, h: 640 },
      { src: "images/photo-06.jpg", alt: "Warm outdoor entryway lighting fixture next to a wood front door", caption: "Entryway lighting", w: 360, h: 640 }
    ],
    builds: [
      { src: "images/photo-02.jpg", alt: "Recessed lighting in exposed timber beams of a mountain modern living room", caption: "Timber-beam lighting", w: 361, h: 640 },
      { src: "images/photo-01.jpg", alt: "Custom linear LED accent lighting in a Tahoe home renovation", caption: "Custom linear LEDs", w: 640, h: 640 },
      { src: "images/photo-13.jpg", alt: "Recessed can lights along a vaulted hallway with wood arches", caption: "Recessed hallway lighting", w: 480, h: 640 },
      { src: "images/photo-03.jpg", alt: "Linear LED strip along the peak of an A-frame loft ceiling", caption: "A-frame peak lighting", w: 361, h: 640 },
      { src: "images/framing-exterior.jpg", alt: "Outdoor wood framing on a new Tahoe home under construction", caption: "New construction framing", w: 540, h: 720 },
      { src: "images/photo-17.jpg", alt: "Chandelier installed during a fixture lighting job", caption: "Chandelier install", w: 480, h: 640 }
    ]
  };

  var offsets = {};
  Object.keys(pools).forEach(function (key) {
    offsets[key] = 0;
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".gallery-cat"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".gallery-panel"));
  var cats = document.querySelector(".gallery-cats");
  var hint = document.getElementById("gallery-hint");
  var gallery = document.getElementById("gallery");
  if (!tabs.length) return;

  function scrollBehavior() {
    return reduceMotion ? "auto" : "smooth";
  }

  function panelId(category) {
    return "gallery-" + category;
  }

  function closeAll() {
    tabs.forEach(function (tab) {
      tab.classList.remove("is-active");
      tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function (panel) {
      panel.hidden = true;
    });
    if (cats) cats.classList.remove("is-open");
    if (hint) hint.hidden = false;
  }

  function openCategory(category, scroll) {
    var match = false;
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-category") === category;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      if (on) match = true;
    });
    if (!match) {
      closeAll();
      return;
    }
    panels.forEach(function (panel) {
      var on = panel.id === panelId(category);
      panel.hidden = !on;
    });
    if (cats) cats.classList.add("is-open");
    if (hint) hint.hidden = true;
    if (scroll && gallery && typeof gallery.scrollIntoView === "function") {
      gallery.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var category = tab.getAttribute("data-category");
      if (tab.classList.contains("is-active")) {
        closeAll();
        if (history.replaceState) history.replaceState(null, "", "#gallery");
        return;
      }
      openCategory(category, true);
      if (history.replaceState) history.replaceState(null, "", "#" + panelId(category));
    });
  });

  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeAll();
      if (history.replaceState) history.replaceState(null, "", "#gallery");
      if (gallery && typeof gallery.scrollIntoView === "function") {
        gallery.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      }
    });
  });

  var hash = (location.hash || "").replace("#", "");
  if (hash.indexOf("gallery-") === 0) {
    openCategory(hash.slice("gallery-".length), false);
  }

  function applyPhoto(img, captionEl, photo, decorative) {
    if (!img || !photo) return;
    if (img.getAttribute("src") !== photo.src) img.src = photo.src;
    img.alt = decorative ? "" : photo.alt;
    if (photo.w) img.width = photo.w;
    if (photo.h) img.height = photo.h;
    if (captionEl) captionEl.textContent = photo.caption;
  }

  function sliceFor(category, offset) {
    var pool = pools[category];
    var grid = document.querySelector("#" + panelId(category) + " .gallery-grid");
    var count = grid ? grid.querySelectorAll(".gallery-card").length : 0;
    var photos = [];
    var i;
    for (i = 0; i < count; i++) photos.push(pool[(offset + i) % pool.length]);
    return photos;
  }

  function renderCategory(category) {
    var photos = sliceFor(category, offsets[category]);
    var grid = document.querySelector("#" + panelId(category) + " .gallery-grid");
    if (grid) {
      var cards = grid.querySelectorAll(".gallery-card");
      for (var i = 0; i < cards.length; i++) {
        applyPhoto(cards[i].querySelector("img"), cards[i].querySelector("figcaption"), photos[i], false);
      }
    }
    var cover = document.querySelector('.gallery-cat[data-category="' + category + '"] .gallery-cat-media img');
    if (cover && photos.length) applyPhoto(cover, null, photos[0], true);
  }

  function nextPhotos() {
    var list = [];
    Object.keys(pools).forEach(function (category) {
      var next = (offsets[category] + 1) % pools[category].length;
      sliceFor(category, next).forEach(function (photo) {
        list.push(photo);
      });
    });
    return list;
  }

  function whenReady(photos, done) {
    var pending = photos.length;
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      done();
    }
    if (!pending) {
      finish();
      return;
    }
    var timer = window.setTimeout(finish, 800);
    photos.forEach(function (photo) {
      var img = new Image();
      function one() {
        pending -= 1;
        if (pending <= 0) {
          window.clearTimeout(timer);
          finish();
        }
      }
      img.onload = img.onerror = one;
      img.src = photo.src;
    });
  }

  var rotating = false;
  var ROTATE_MS = 8000;
  var FADE_MS = 280;

  function advance() {
    if (rotating) return;
    rotating = true;
    var openPanel = document.querySelector(".gallery-panel:not([hidden])");
    var upcoming = nextPhotos();

    function swap() {
      Object.keys(pools).forEach(function (category) {
        offsets[category] = (offsets[category] + 1) % pools[category].length;
        renderCategory(category);
      });
    }

    function reveal() {
      if (cats) cats.classList.remove("is-fading");
      if (openPanel) openPanel.classList.remove("is-fading");
      rotating = false;
    }

    /* Reduced motion still changes the set; it only skips the fade. */
    if (reduceMotion) {
      swap();
      rotating = false;
      return;
    }

    if (cats) cats.classList.add("is-fading");
    if (openPanel) openPanel.classList.add("is-fading");
    window.setTimeout(function () {
      whenReady(upcoming, function () {
        swap();
        window.requestAnimationFrame(reveal);
      });
    }, FADE_MS);
  }

  var timer = null;
  function startRotation() {
    if (timer) return;
    timer = window.setInterval(advance, ROTATE_MS);
  }
  function stopRotation() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = null;
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopRotation();
    else startRotation();
  });

  startRotation();
})();
