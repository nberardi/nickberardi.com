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
    const done = () => {
      btn.textContent = 'Copied';
      btn.setAttribute('data-done', '');
      clearTimeout(btn._nbCopyT);
      btn._nbCopyT = setTimeout(() => {
        btn.textContent = 'Copy';
        btn.removeAttribute('data-done');
      }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => {
        if (legacyCopy(text)) done();
      });
    } else if (legacyCopy(text)) {
      done();
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
