(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".gallery-cat"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".gallery-panel"));
  var cats = document.querySelector(".gallery-cats");
  var hint = document.getElementById("gallery-hint");
  var gallery = document.getElementById("gallery");
  if (!tabs.length) return;

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
      gallery.scrollIntoView({ behavior: "smooth", block: "start" });
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
      var gallery = document.getElementById("gallery");
      if (gallery && typeof gallery.scrollIntoView === "function") {
        gallery.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  var hash = (location.hash || "").replace("#", "");
  if (hash.indexOf("gallery-") === 0) {
    openCategory(hash.slice("gallery-".length), false);
  }
})();
