#!/usr/bin/env bash
# Idempotent Cloud Agent bootstrap for the nickberardi.com Hugo site.
# Mirrors the toolchain the deploy workflow uses (.github/workflows/hugo.yml):
# Hugo extended, Dart Sass, Node deps, and Playwright's Chromium (for OG cards).
set -euo pipefail

HUGO_VERSION=0.164.0
DART_SASS_VERSION=1.94.0

cd "$(dirname "$0")/.."

# PaperMod theme lives in a git submodule; a build fails without it.
git submodule update --init --recursive

# Hugo extended — pinned to the version CI builds with.
if ! command -v hugo >/dev/null 2>&1 || ! hugo version | grep -q "v${HUGO_VERSION}.*extended"; then
  tmpdeb="$(mktemp --suffix=.deb)"
  wget -q -O "$tmpdeb" "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb"
  sudo dpkg -i "$tmpdeb"
  rm -f "$tmpdeb"
fi

# Dart Sass — CI installs it via snap; use the standalone release for parity
# without depending on snapd (unavailable in the Cloud Agent VM).
if ! command -v sass >/dev/null 2>&1 || [ "$(sass --version 2>/dev/null)" != "${DART_SASS_VERSION}" ]; then
  tmptar="$(mktemp --suffix=.tar.gz)"
  wget -q -O "$tmptar" "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
  sudo rm -rf /opt/dart-sass
  sudo tar -xzf "$tmptar" -C /opt
  sudo ln -sf /opt/dart-sass/sass /usr/local/bin/sass
  rm -f "$tmptar"
fi

# Node build tooling (Playwright + sharp) for the Open Graph card pipeline.
npm ci

# Chromium plus its system libraries — used by scripts/render-og-cards.mjs.
npx playwright install --with-deps chromium
