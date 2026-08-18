// Fremhever aktivt punkt i case-sidebaren basert på scrollposisjon.
(function () {
  var toc = document.querySelector('.case-toc');
  if (!toc) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  var map = {};
  links.forEach(function (l) {
    map[l.getAttribute('href').slice(1)] = l;
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll('.case-section[id]'))
    .filter(function (s) { return map[s.id]; });
  if (!sections.length) return;

  var visible = {};

  function setActive() {
    var best = null, bestTop = Infinity;
    sections.forEach(function (s) {
      if (visible[s.id]) {
        var t = s.getBoundingClientRect().top;
        if (t < bestTop) { bestTop = t; best = s.id; }
      }
    });
    if (best) {
      links.forEach(function (l) { l.classList.toggle('active', map[best] === l); });
    }
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) visible[e.target.id] = true;
      else delete visible[e.target.id];
    });
    setActive();
  }, { rootMargin: '-84px 0px -70% 0px', threshold: 0 });

  sections.forEach(function (s) { obs.observe(s); });
})();
