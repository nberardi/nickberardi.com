// nb-cover.js — hands the post cover off from the full-width band to the
// sticky rail once the band scrolls out of view. Only ever loaded on posts
// that have a cover (see nb_cover.html); no-ops under prefers-reduced-motion.
(() => {
  const band = document.querySelector('[data-nb-cover-band]');
  const rail = document.querySelector('[data-nb-rail-cover]');
  const bandCaption = document.querySelector('[data-nb-band-caption]');
  if (!band || !rail) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const set = (shown) => {
    if (shown) {
      rail.setAttribute('data-shown', '');
    } else {
      rail.removeAttribute('data-shown');
    }
    if (bandCaption) bandCaption.style.opacity = shown ? '0' : '1';
  };

  if (reduceMotion) {
    rail.style.transition = 'none';
    if (bandCaption) bandCaption.style.transition = 'none';
  }

  const io = new IntersectionObserver(
    (entries) => set(!entries[0].isIntersecting),
    { threshold: 0 }
  );
  io.observe(band);
})();
