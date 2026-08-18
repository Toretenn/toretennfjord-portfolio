// Fremhever aktivt punkt i case-sidebaren basert på scrollposisjon (scroll-spy).
(function () {
  var toc = document.querySelector('.case-toc');
  if (!toc) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  var map = {};
  links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });

  var sections = Array.prototype.slice.call(document.querySelectorAll('.case-section[id]'))
    .filter(function (s) { return map[s.id]; });
  if (!sections.length) return;

  // Linjen (px fra toppen) som avgjør hvilken seksjon vi "er i".
  // Litt under den faste toppmenyen, slik at seksjonen man klikker seg til blir aktiv.
  var LINE = 92;
  var current = null;

  function update() {
    var active = sections[0].id;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= LINE) active = sections[i].id;
      else break;
    }
    if (active !== current) {
      current = active;
      links.forEach(function (l) { l.classList.toggle('active', map[active] === l); });
    }
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
