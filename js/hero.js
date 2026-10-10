/* Homepage scroll effects.
   The hero stays pinned while the race car crossfades into the Blue Ridge valley,
   then "Humility is the key to speed." rises in under the headline.
   The pier photo eases in further down. Without JavaScript, or with
   reduced motion turned on, the page shows the settled view instead. */
(function () {
  var hero = document.getElementById('top');
  var pin = document.getElementById('hero-pin');
  var car = document.getElementById('hero-car');
  var valley = document.getElementById('hero-valley');
  var tag = document.getElementById('hero-tag');
  var pier = document.getElementById('pier-photo');
  if (!hero || !pin || !car || !valley || !tag) return;

  var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var pinned = false;
  var vh = window.innerHeight;
  var lastWidth = window.innerWidth;
  var raf = 0;

  function clamp(x) { return Math.min(1, Math.max(0, x)); }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); }

  function layout() {
    vh = window.innerHeight;
    pinned = !reduce.matches;
    if (pinned) {
      hero.style.height = Math.round(vh * 2.6) + 'px';
      pin.style.position = 'sticky';
      pin.style.height = vh + 'px';
    } else {
      hero.style.height = 'auto';
      pin.style.position = 'relative';
      pin.style.height = '860px';
    }
  }

  function apply() {
    raf = 0;
    var p1 = 1, p2 = 1;
    if (pinned) {
      var r = hero.getBoundingClientRect();
      p1 = clamp(-r.top / Math.max(1, r.height - vh));
      if (pier) {
        var pr = pier.getBoundingClientRect();
        p2 = clamp((vh - pr.top) / (vh * 0.9));
      }
    }
    var c = smooth(0.06, 0.55, p1);
    var t = smooth(0.6, 0.85, p1);
    var e2 = p2 * p2 * (3 - 2 * p2);

    car.style.opacity = (1 - c).toFixed(3);
    car.style.transform = 'scale(' + (1 + 0.06 * c).toFixed(4) + ')';
    valley.style.opacity = c.toFixed(3);
    valley.style.transform = 'scale(' + (1.1 - 0.1 * c).toFixed(4) + ')';
    tag.style.opacity = t.toFixed(3);
    tag.style.transform = 'translateY(' + ((1 - t) * 28).toFixed(1) + 'px)';
    if (pier) {
      pier.style.opacity = (0.15 + 0.85 * e2).toFixed(3);
      pier.style.transform = 'scale(' + (1.06 - 0.06 * e2).toFixed(4) + ')';
    }
  }

  function request() { if (!raf) raf = requestAnimationFrame(apply); }

  layout();
  apply();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', function () {
    // Phones resize the viewport as the address bar hides; only re-layout on real width changes.
    if (window.innerWidth !== lastWidth) { lastWidth = window.innerWidth; layout(); }
    request();
  });
  if (reduce.addEventListener) reduce.addEventListener('change', function () { layout(); request(); });
})();
