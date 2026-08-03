// nb-code-copy.js — copy button for .nb-code blocks (render-codeblock.html).
// One delegated click listener for the whole page, not one per block.
(() => {
  const onClick = (e) => {
    const btn = e.target.closest('[data-nb-code-copy]');
    if (!btn) return;
    const fig = btn.closest('.nb-code');
    const code = fig && fig.querySelector('pre code');
    if (!code) return;
    const text = code.textContent.replace(/^\n+|\n+$/g, '');
    const flash = (label) => {
      btn.textContent = label;
      btn.setAttribute('data-done', '');
      clearTimeout(btn._nbCopyT);
      btn._nbCopyT = setTimeout(() => {
        btn.textContent = 'Copy';
        btn.removeAttribute('data-done');
      }, 1600);
    };
    const done = () => flash('Copied');
    // Third branch: clipboard API and execCommand both blocked (as inside
    // an iframe or a permissions-denied context). Select the code so the
    // reader can copy it themselves, and say so — never claim a copy that
    // didn't happen.
    const blocked = () => {
      try {
        const range = document.createRange();
        range.selectNodeContents(code);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (err) {}
      flash(/mac/i.test(navigator.platform) ? 'Press ⌘C' : 'Press Ctrl+C');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => {
        if (legacyCopy(text)) done(); else blocked();
      });
    } else if (legacyCopy(text)) {
      done();
    } else {
      blocked();
    }
  };
  const legacyCopy = (text) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (err) {
      return false;
    }
  };
  document.addEventListener('click', onClick);
})();
