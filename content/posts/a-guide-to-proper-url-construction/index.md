---
title: "A Guide To Proper URL Construction"
date: 2007-04-10T09:19:05-05:00
slug: "a-guide-to-proper-url-construction"
draft: false
tags:
  - "Google"
  - "Search Engine"
  - "SEO"
description: "For many developers the URL Address is just a means to an end, so very little time is actually spent on creating and planning a URL that is both..."
---

For many developers the URL Address is just a means to an end, so very little time is actually spent on creating and planning a URL that is both functional and user friendly. We have all seen the URLs that seem to go on forever, I am not going to dwell on those URLs because you can find them anywhere. I am going to go over what a good URL consists of, and some easy ways to increase your search engine ranking with your already developed application.

### Search Engines Crawlers are like People

One thing that a web developer has to understand is that Search Engine Crawlers are like people. Everybody understands that if your site content is not laid out in a way that is readable, people will not spend much time on your site. The same goes for Search Engine Crawlers, if your site doesn't conform to XHTML or at the very least HTML standards the search engine crawler isn't going to spend much time indexing your site.

Well the very same goes for the URL of your website, if it is ugly and looks like `http://somesite.com/default.aspx?a=0038383-838308380-8383&c=3&p=30203#page-2` it is very hard to determine what part of the URL changes the content displayed and what this content is actually suppose to be. I don't even think the developer of this application could tell you. But a more friendly version of the same URL might be written like `http://somesite.com/authorname/google/correct-use-of-the-url.html#page-2`. Just like the content example above, the Search Engine Crawler will have an easier time cataloging the nicer URL because it actually uses real words instead of magic numbers that don't mean anything except to the program.

### 3 Tips For Constructing a Proper URL

1. **Remove Duplicate URLs**
   Jeff Atwood recently wrote an [article](http://www.codinghorror.com/blog/archives/000797.html "URL Rewriting to Prevent Duplicate URLs") dealing with multiple URLs and the effects they have on your Search Engine Ranking:
   > As a software developer, you may be familiar with [the DRY principle](http://www.artima.com/intv/dry.html): don't repeat yourself. It's absolute bedrock in software engineering, and it's covered beautifully in [The Pragmatic Programmer](http://www.amazon.com/exec/obidos/ASIN/020161622X/codinghorror-20), and even more succinctly in [this brief IEEE software article](http://www.pragmaticprogrammer.com/articles/may_04_oo1.pdf) (pdf). If you haven't committed this to heart by now, go read these links first...

   With URLs there are many ways to get to a website:
   1. <http://coderjournal.com>
   2. <http://www.coderjournal.com>
   3. <http://coderjournal.com/index.html>
   4. <http://www.coderjournal.com/index.html>

   Having these multiple URLs reference the same content decreases your Search Engine Ranking, specifically [PageRank](http://en.wikipedia.org/wiki/PageRank) is calculated per-URL. So the best idea is to do a [301 Redirect](http://www.stevenhargrove.com/redirect-web-pages/ "How to redirect a web page, the smart way") for the different patterns I listed above. In my case of Coder Journal I have URLs 2,3,4 all redirecting to URL 1.
  
2. **Combine Domains**
   Most people don't know but this blog has multiple domains that get you to the same point. 
   - <http://www.coderjournal.com>
   - <http://coderjournal.net>
   - <http://coderjournal.org>

   Just like what we previously went over about Duplicate URLs the same applies to domain names. So it is wise to also do a 301 Redirect from the domains. In the case of this blog I have the .net and .org domains doing a 301 redirect to my .com domain name.
  
3. **Increasing Your Surface Area With Keywords in URLs**
   If you do most any [search on Google](http://www.google.com/search?hl=en&q=journal&btnG=Search), you will notice that Google also highlights the keywords that show up in the URL. So a URL that looks like this <http://www.coderjournal.com/2007/04/new-novell-ad-campaign-mac-vs-pc-vs-linux-continued/> is going to attract a lot more attention on keyword searches than a URL that looks like <http://www.coderjournal.com/2007/04/new-novell-ad-campaign-mac-vs-pc-vs-linux-continued/>
  

  
The 3 tips that I gave you above are just the tip of the SEO iceberg. However implementing one or all of these should increase your Search Engine Ranking, without effecting the functionality of your application. What more could you ask for?