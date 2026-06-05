/* Home page enhancement helpers. Cards are rendered in index.html, not injected here. */
(function () {
  function focusSearch(event) {
    var input = document.getElementById("site-search") || document.querySelector(".search-input");
    if (!input) return;

    event.preventDefault();
    input.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(function () {
      input.focus({ preventScroll: true });
    }, 260);
  }

  function revealCards() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".home-entry-card"));
    if (!cards.length) return;

    document.documentElement.classList.add("home-enhance-ready");

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    cards.forEach(function (card, index) {
      card.style.transitionDelay = Math.min(index * 35, 240) + "ms";
      observer.observe(card);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-home-search]").forEach(function (link) {
      link.addEventListener("click", focusSearch);
    });
    revealCards();
  });
})();
