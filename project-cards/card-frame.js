/* ============================================
   project-cards/card-frame.js
   Runs inside each project-card iframe.
     1. Reports natural content height to the parent so the parent can
        resize the iframe (iframes do not auto-size on their own).
     2. Applies the reveal animation once the parent says the iframe has
        scrolled into view. This mirrors what script.js used to do for
        inline .project-card elements but across the iframe boundary.
   ============================================ */
(function () {
  function report() {
    var d = document;
    var b = d.body;
    var e = d.documentElement;
    var height = Math.max(
      b.scrollHeight,
      e.scrollHeight,
      b.offsetHeight,
      e.offsetHeight
    );
    try {
      parent.postMessage({ type: 'hb-card-height', height: height }, '*');
    } catch (err) {
      /* ignore cross-origin guards; will not trigger on same-origin site */
    }
  }

  function reveal() {
    var card = document.querySelector('.project-card');
    if (card) card.classList.add('visible');
  }

  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'hb-reveal') reveal();
  });

  window.addEventListener('load', report);
  window.addEventListener('resize', report);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(report);
  }

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(report).observe(document.documentElement);
  }

  /* Fallback pulses in case fonts, images or CSS transitions settle late. */
  [0, 100, 400, 900, 1800].forEach(function (ms) {
    setTimeout(report, ms);
  });

  if (document.readyState === 'complete') report();
})();
