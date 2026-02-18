---
title: "Managed Fusion URL Rewriter & Reverse Proxy Release 2.5"
date: 2009-02-01T13:30:43-05:00
slug: "managed-fusion-url-rewriter-reverse-proxy-release-25"
draft: false
tags:
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "SEO"
description: "Download: Binary Release Download: Source Code Release Notes If you would like to find out more about the past releases please visit us at..."
---

**Download:** [Binary Release](http://www.codeplex.com/urlrewriter/Release/ProjectReleases.aspx)   
**Download:** [Source Code](http://www.codeplex.com/urlrewriter/SourceControl/ListDownloadableCommits.aspx)

### Release Notes

If you would like to find out more about the past releases please visit us at <http://www.managedfusion.com/products/url-rewriter/release-notes.aspx>

### Version 2.5

- Major update to the proxy handler, it is not much faster, and provides an exact duplication of headers from the proxied server.
- Added full support for $N and %N support in conditions and rules now.
- Added contexts for condition, rule, and ruleset to make transfer of common data easier for implementations of the API.
- Added split between async and sync proxy handler, this can now be controlled through the web.config using useAsyncProxy.
- Fixed issue with transfer-encoding: chuncked