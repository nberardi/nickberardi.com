# AGENTS.md — Publishing a New Blog Post

Instructions for publishing a new post to [nickberardi.com](https://nickberardi.com). Written for AI agents and humans alike.

## Site Overview

- **Generator:** [Hugo](https://gohugo.io) (extended), built in CI with Hugo 0.164.0
- **Theme:** [PaperMod](https://github.com/adityatelange/hugo-PaperMod), installed as a git submodule at `themes/PaperMod` — clone with `git clone --recurse-submodules` or run `git submodule update --init` after a plain clone
- **Hosting:** GitHub Pages, custom domain `nickberardi.com`
- **Deployment:** Automatic. `.github/workflows/hugo.yml` builds (`hugo --gc --minify`, `TZ=America/New_York`) and deploys on every push to `main`. The site is live a few minutes after merge.

## Repository Layout

```
content/posts/<slug>/index.md   # one folder (page bundle) per post
content/about.md                # standalone pages
static/images/YYYY/MM/          # legacy image location (Ghost migration, 2007–2014)
hugo.toml                       # site configuration
themes/PaperMod/                # theme (submodule — never edit)
.github/workflows/hugo.yml      # build + deploy pipeline
```

## Publishing a New Post

### 1. Create the page bundle

Each post is a **page bundle**: a folder under `content/posts/` named with the post's kebab-case slug, containing an `index.md`. The folder name becomes the URL — `content/posts/my-new-post/index.md` publishes at `https://nickberardi.com/posts/my-new-post/`.

```
content/posts/my-new-post/
├── index.md      # the post
├── hero.jpg      # optional hero/cover image
└── diagram.png   # optional content images
```

### 2. Write the front matter

Use YAML front matter matching the existing convention (see any post under `content/posts/` for reference):

```yaml
---
title: "My New Post"
date: 2026-07-30T09:00:00-04:00
slug: "my-new-post"
draft: false
tags:
  - "Tag One"
  - "Tag Two"
description: "One to two sentences summarizing the post. Shown in post listings, search results, and social/meta tags."
---
```

Notes:

- **date** — RFC 3339 with the US Eastern offset (`-04:00` during daylight saving, `-05:00` otherwise). Posts dated in the future are not published (`buildFuture = false`).
- **slug** — must match the bundle folder name.
- **draft** — must be `false` to go live; production builds exclude drafts (`buildDrafts = false` in `hugo.toml`). Use `draft: true` while writing, flip to `false` to publish.
- **description** — write it deliberately; it is the summary readers see before clicking through.

### 3. Write the body

Standard Markdown below the front matter. PaperMod renders a table of contents automatically (`showtoc`), plus reading time and word count — no extra front matter needed.

## Hero (Cover) Image

Place the image in the post's bundle folder and add a `cover` block to the front matter:

```yaml
cover:
  image: "hero.jpg"
  alt: "Short description for accessibility"
  caption: "Optional caption shown under the image"
  hiddenInSingle: false
  hiddenInList: false
```

**Important:** `hiddenInSingle: false` and `hiddenInList: false` are required, not optional. `hugo.toml` hides covers globally (`[params.cover]` sets `hidden`, `hiddenInList`, and `hiddenInSingle` to `true`, because the 327 legacy posts have no cover images). Page front matter overrides the site config, but you must override the two specific keys — setting only `hidden: false` is not enough, since the site-level `hiddenInSingle`/`hiddenInList` still apply.

Because the image lives in the page bundle, reference it by bare filename (`image: "hero.jpg"`); Hugo resolves it as a page resource and PaperMod generates responsive sizes.

## Content Images

**New posts (preferred):** co-locate images in the page bundle and reference them relatively:

```markdown
![Diagram of the pipeline](diagram.png "Optional title")
```

**Legacy convention:** the 2007–2014 posts reference images in `static/images/YYYY/MM/` via absolute paths (`![Alt](/images/2008/01/file.png)`). This still works and those files must not be moved (external links point at them), but don't add new images there — keep new assets in the post's own bundle.

## Preview Locally

```bash
hugo server -D        # -D includes drafts; serves at http://localhost:1313
```

Check:

1. The post page renders correctly (hero image, content images, ToC, code blocks).
2. The post appears on the home page listing with its description and cover thumbnail.
3. No build warnings about missing resources.

`hugo --minify` runs a full production-equivalent build if you want a final check.

## Deploy

1. Commit the post bundle (and nothing else unintended — check `git status`).
2. Push/merge to `main`.
3. The **Deploy Hugo site to Pages** workflow runs automatically; watch it under the repo's **Actions** tab.
4. Verify the live URL: `https://nickberardi.com/posts/<slug>/`.

There is no separate publish step — merging to `main` *is* publishing.
