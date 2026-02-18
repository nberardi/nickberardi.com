---
title: "Sitemap Auto Discovery And You"
date: 2007-04-17T13:15:15-05:00
slug: "sitemap-auto-discovery-and-you"
draft: false
tags:
  - "Ask"
  - "Google"
  - "Microsoft Live"
  - "Search Engine"
  - "SEO"
  - "Yahoo"
description: "Last week all the major search engine providers, announced that they were going to support a new specification at sitemap.org that allows them to auto..."
---

Last week all the major search engine providers, announced that they were going to support a new specification at sitemap.org that allows them to auto discover your sitemap without you having to submit it:

- [Ask](http://blog.ask.com/2007/04/sitemaps_autodi.html "Sitemaps Autodiscovery")
- [Google](http://googlewebmastercentral.blogspot.com/2007/04/whats-new-with-sitemapsorg.html "What's new with Sitemaps.org?")
- [Yahoo](http://www.ysearchblog.com/archives/000437.html "Webmasters Can Now Auto-Discover With Sitemaps")
- [Live](http://blogs.msdn.com/livesearch/archive/2007/04/11/discovering-sitemaps.aspx "Discovering Sitemaps")

Yahoo did a good job at summing up the advantages to putting your sitemap location in the robots.txt file.

> All search crawlers recognize [robots.txt](http://www.robotstxt.org/), so it seemed like a good idea to use that mechanism to allow webmasters to share their Sitemaps. You agreed and encouraged us to allow [robots.txt discovery of Sitemaps](http://suggestions.yahoo.com/detail/?prop=SiteExplorer&fid=2854) on our suggestion board. We took the idea to Google and Microsoft and are happy to announce today that you can now find your sitemaps in a uniform way across all participating engines.

If you want to see my implementation of this for my [sitemap](http://www.coderjournal.com/sitemap.xml "Coder Journal sitemap.xml") go to [http://www.coderjournal.com/robots.txt](http://coderjournal.com/uploads/2007/04/robots.txt "Coder Journal robots.txt"). Further details about this can be found at [http://sitemaps.org/protocol.htm](http://sitemaps.org/protocol.html "Sitemaps Protocol") or for your convenience I have included them below.

### Specifying the Sitemap location in your robots.txt file

You can specify the location of the Sitemap using a robots.txt file. To do this, simply add the following line:

```
Sitemap: <sitemap_location>
```

The <sitemap\_location> should be the complete URL to the Sitemap, such as: <http://www.example.com/sitemap.xml>

This directive is independent of the user-agent line, so it doesn't matter where you place it in your file. If you have a Sitemap index file, you can include the location of just that file. You don't need to list each individual Sitemap listed in the index file.