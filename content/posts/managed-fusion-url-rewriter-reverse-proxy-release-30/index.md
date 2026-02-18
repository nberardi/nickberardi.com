---
title: "Managed Fusion URL Rewriter & Reverse Proxy - Release 3.0"
date: 2009-06-07T12:15:41-05:00
slug: "managed-fusion-url-rewriter-reverse-proxy-release-30"
draft: false
tags:
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "SEO"
  - "URL Rewriter"
description: "I am happy to announce the 3.0 release of the Managed Fusion URL Rewriter &amp; Reverse Proxy. Since my previous release in February I have been working..."
---

I am happy to announce the 3.0 release of the *Managed Fusion URL Rewriter & Reverse Proxy*. Since my [previous release in February](http://www.coderjournal.com/2009/02/managed-fusion-url-rewriter-reverse-proxy-release-25/) I have been working hard on a significant rewrite of the core, that to be honest really needed refactoring if I hoped to extend the rewriter is some interesting ways in the future.

**Download:** [Binary Release](http://urlrewriter.codeplex.com/Release/ProjectReleases.aspx)   
**View:** [Source Code](http://urlrewriter.codeplex.com/SourceControl/ListDownloadableCommits.aspx)   
**Discuss:** [Forum](http://urlrewriter.codeplex.com/Thread/List.aspx)   
**Issues:** [Report](http://urlrewriter.codeplex.com/WorkItem/List.aspx)

### Release Notes

If you would like to find out more about the past releases please visit us at <http://www.managedfusion.com/products/url-rewriter/release-notes.aspx>

### Version 3.0

- **Breaking Change** Configuration in the web.config has been reorganized.
- Major rewrite to the URL Rewriter to provide better performance and more reliable logging.
- Major update to the proxy handler, it is much faster, and provides an exact duplication of headers from the proxied server.
- Fixed many issues with the chunked encoding, so you are now able to proxy web based services, such as SVN.
- Full rewrite of the rule, condition, and flag handling system to provide better performance and more flexibility for developers.
- More extensibility points have been created for developers interested in creating their own handlers for rules, conditions, and flags.
- More extensive testing of internal mechanics of the rewriter.
- Added thread safety to the Apache rule set refresh.
- Added initial support for Microsoft UrlRewriter IIS 7 module, this will provided a starting point for extension of the Microsoft configuration to support proxying and other more advanced Apache features.

### Featured at PDC 2008