// nb-og-fit.js — the two assertions redline sheet 3 requires of the
// renderer, checked against the actual laid-out headline rather than
// trusted from the character-count bucket alone:
//   Fill: the headline block must occupy at least 30% of the 630px card
//     (189px). Too small — the title took too small a rung — go up one.
//   Three lines maximum: if the chosen rung wraps to a fourth line, go
//     down one rung (smaller, wider measure) instead.
//
// Three-line is the hard cap. Fill never wins a fight with it: escalating
// into a four-line headline overflows the 630px card (flex then stacks the
// description on top of the title — the collision on
// /og/the-product-is-also-the-research-instrument.png). When the two
// assertions conflict, stay on the ≤3-line rung.
//
// Must wait for Source Serif 4 (400 + 600) before measuring. A synchronous
// run at parse time measures system-ui fallback metrics, then the serif
// loads and the screenshot captures a different wrap than the one that
// picked the rung — non-deterministic, and exactly failure mode B.
(() => {
  const RUNGS = ['rung-0', 'rung-1', 'rung-2', 'rung-3', 'rung-4', 'rung-5'];
  const CARD_HEIGHT = 630;
  const MIN_FILL = CARD_HEIGHT * 0.3;
  const el = document.querySelector('.og-headline');

  const done = () => {
    document.documentElement.dataset.ogFit = 'done';
    if (el) el.dataset.ogFit = 'done';
  };

  if (!el) {
    done();
    return;
  }
  let idx = RUNGS.findIndex((r) => el.classList.contains(r));
  if (idx === -1) {
    done();
    return;
  }

  const setRung = (next) => {
    el.classList.remove(RUNGS[idx]);
    idx = next;
    el.classList.add(RUNGS[idx]);
  };
  const lineCount = () => {
    const cs = getComputedStyle(el);
    let lh = parseFloat(cs.lineHeight);
    // Unitless line-height or "normal" must not count as 1px (which would
    // report hundreds of lines and slam the ladder to the floor).
    if (!Number.isFinite(lh) || lh < 2) lh = parseFloat(cs.fontSize) || 1;
    return Math.max(1, Math.round(el.getBoundingClientRect().height / lh));
  };

  const fit = () => {
    // First: never more than three lines.
    while (lineCount() > 3 && idx < RUNGS.length - 1) setRung(idx + 1);
    // Then: fill, but only if going up still fits in three lines.
    while (el.getBoundingClientRect().height < MIN_FILL && idx > 0) {
      const prev = idx;
      setRung(idx - 1);
      if (lineCount() > 3) {
        setRung(prev);
        break;
      }
    }
    done();
  };

  const run = async () => {
    try {
      // Force the 600 face to load — @font-face 600 was previously pointed
      // at the regular file and nothing on the card requested weight 600, so
      // the face stayed unloaded and the ladder was measured at 400.
      await document.fonts.load('600 96px "Source Serif 4"');
      await document.fonts.ready;
    } catch (_) { /* still fit against whatever face is live */ }
    fit();
  };

  run();
})();
