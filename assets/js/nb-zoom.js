// nb-zoom.js — fit-to-window zoom overlay for body figures (render-image.html,
// post-images redline sheet 8). One delegated listener for the whole page,
// one reusable overlay node, not one per figure. Progressive enhancement:
// with JS off the trigger button is inert and the inline image is already
// complete.
//
// Two guardrails, re-checked on image load and on resize: a trigger only
// arms (data-zoomable="1", cursor:zoom-in) when its image is displayed
// smaller than its natural size, and never on a viewport under 768px —
// mobile already shows the image at full width, so the overlay would have
// nowhere bigger to go.
(() => {
  let overlay = null;
  let trigger = null;
  let prevOverflow = '';
  let prevPadRight = '';

  const isMobile = () => matchMedia('(max-width: 767px)').matches;

  const syncTrigger = (btn) => {
    const img = btn.querySelector('img');
    const bigger = !!img && !!img.naturalWidth && img.naturalWidth > img.clientWidth + 1;
    const on = bigger && !isMobile();
    btn.setAttribute('data-zoomable', on ? '1' : '0');
  };

  const syncAll = () => {
    document.querySelectorAll('[data-zoom]').forEach(syncTrigger);
  };

  const closeZoom = () => {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPadRight;
    if (trigger && trigger.focus) trigger.focus();
    trigger = null;
  };

  const openZoom = (src, alt) => {
    if (overlay) return;
    trigger = document.activeElement;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ov = document.createElement('div');
    ov.className = 'nb-zoom-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', alt || 'Full size image');
    if (reduceMotion) ov.setAttribute('data-reduce-motion', '');

    const fig = document.createElement('figure');
    fig.className = 'nb-zoom-figure';
    const img = document.createElement('img');
    img.className = 'nb-zoom-image';
    img.src = src;
    img.alt = alt;
    fig.appendChild(img);
    if (alt) {
      const cap = document.createElement('figcaption');
      cap.className = 'nb-zoom-caption';
      cap.textContent = alt;
      fig.appendChild(cap);
    }

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'nb-zoom-close';
    close.setAttribute('aria-label', 'Close');
    close.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6 18 18"></path><path d="M18 6 6 18"></path></svg>';

    ov.append(fig, close);
    ov.addEventListener('click', (e) => {
      if (e.target === ov || close.contains(e.target)) closeZoom();
    });
    document.body.appendChild(ov);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    prevOverflow = document.body.style.overflow;
    prevPadRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = scrollbarWidth + 'px';

    overlay = ov;
    if (reduceMotion) {
      ov.setAttribute('data-open', '');
    } else {
      requestAnimationFrame(() => ov.setAttribute('data-open', ''));
    }
    close.focus();
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-zoom]');
    if (!btn) return;
    e.preventDefault();
    if (btn.getAttribute('data-zoomable') !== '1') return;
    openZoom(btn.getAttribute('data-zoom'), btn.getAttribute('data-zoom-alt') || '');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZoom();
  });

  document.querySelectorAll('[data-zoom] img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', syncAll, { once: true });
  });
  window.addEventListener('resize', syncAll);
  syncAll();
})();
