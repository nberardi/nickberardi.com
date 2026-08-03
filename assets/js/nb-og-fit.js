// nb-og-fit.js — the two assertions redline sheet 3 requires of the
// renderer, checked against the actual laid-out headline rather than
// trusted from the character-count bucket alone:
//   Fill: the headline block must occupy at least 30% of the 630px card
//     (189px). Too small — the title took too small a rung — go up one.
//   Three lines maximum: if the chosen rung wraps to a fourth line, go
//     down one rung (smaller, wider measure) instead.
// Runs synchronously during page load, before the render script's
// networkidle wait, so the correction is already applied when the
// screenshot fires.
(() => {
  const RUNGS = ['rung-0', 'rung-1', 'rung-2', 'rung-3', 'rung-4', 'rung-5'];
  const el = document.querySelector('.og-headline');
  if (!el) return;
  let idx = RUNGS.findIndex((r) => el.classList.contains(r));
  if (idx === -1) return;

  const CARD_HEIGHT = 630;
  const MIN_FILL = CARD_HEIGHT * 0.3;

  const setRung = (next) => {
    el.classList.remove(RUNGS[idx]);
    idx = next;
    el.classList.add(RUNGS[idx]);
  };
  const lineCount = () => {
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    return Math.round(el.getBoundingClientRect().height / lh);
  };

  // Bounded by the ladder's own length — each pass moves exactly one rung.
  for (let i = 0; i < RUNGS.length; i++) {
    if (lineCount() > 3 && idx < RUNGS.length - 1) {
      setRung(idx + 1);
      continue;
    }
    if (el.getBoundingClientRect().height < MIN_FILL && idx > 0) {
      setRung(idx - 1);
      continue;
    }
    break;
  }
})();
