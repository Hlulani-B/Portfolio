/* ============================================
   project-cards/frames.js
   Parent-page controller for the project-card iframes.
     - Listens for height reports from card-frame.js inside each iframe
       and resizes the iframe so the card fits without a scrollbar.
     - Observes each iframe and posts a reveal message when it enters
       the viewport. This preserves the same fade-in / slide-up the
       inline cards had via script.js.

   Does not touch chatbot code or any other page behaviour.
   ============================================ */
(function () {
  var frames = Array.prototype.slice.call(
    document.querySelectorAll('iframe.project-card-frame')
  );
  if (!frames.length) return;

  function reveal(iframe) {
    try {
      iframe.contentWindow.postMessage({ type: 'hb-reveal' }, '*');
    } catch (e) {
      /* iframe not ready yet */
    }
  }

  /* Auto-size each iframe to the height its card reports. */
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.type !== 'hb-card-height' || typeof d.height !== 'number') return;
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) {
        frames[i].style.height = d.height + 'px';
        break;
      }
    }
  });

  /* Trigger the reveal animation once each iframe scrolls into view. */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.01 });

    frames.forEach(function (f) { io.observe(f); });
  } else {
    /* Very old browsers: just show everything. */
    frames.forEach(reveal);
  }
})();
