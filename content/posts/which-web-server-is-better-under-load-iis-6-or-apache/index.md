---
title: "Which web server is better under load, IIS 6 or Apache?"
date: 2007-06-30T14:42:10-05:00
slug: "which-web-server-is-better-under-load-iis-6-or-apache"
draft: false
tags:
  - "Apache"
  - "IIS"
  - "Performance"
  - "Web Servers"
description: "One of the many techno-geek religious arguments that comes up a lot is which web server has a faster response time under load, IIS 6 or Apache? I am happy..."
cover:
  image: "/images/2007/06/iis-vs-apache1.png"
  alt: "IIS 6 vs Apache Graph"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

One of the many techno-geek religious arguments that comes up a lot is which web server has a faster response time under load, IIS 6 or Apache? I am happy to say somebody actually put this to a test using what is known as the Digg-effect, basically a constant hammering of the server to keep it under load. The results may surprise some of the zealots out there and the test might be buried because of an unpopular fact. Here is the [setup from the site](http://www.racegroups.com/reddittest.php?Source=Reddit&Phase=2 "IIS 6 vs Apache"):

> This is a page to test the effect of high reddit and digg hits on two different servers one running IIS6 and the other Apache. The purpose is to see how each handles high hit loads and is the most reliable.
> By using one server to load this page (not being tested) then calling a page from a dedicated IIS6 server into an iframe and a second page from a dedicated Apache server into a second iframe. The entire process is using PHP scripting and mysql data to store the results. To eliminate cache hits on both test servers, the page being returned to the iframe is dynamically created each time from a php script.
> After the pages are completely loaded, an ajax call is made to the primary server to record the times back into the sql database for statistics. All three servers are the same physically and in the same rack and network. Bandwidth is not a measurement issue, since only the execution of the php script is being measured.

I have taken the liberty of making a [screen shot of the following site](http://209.20.129.8/testgraph.php "Graph of IIS 6 vs Apache Results") just in case it is taken down. The screen show is dated **2007-06-30**.[![IIS 6 vs Apache Graph](/images/2007/06/iis-vs-apache1.png)](/images/2007/06/iis-vs-apache1.png "IIS 6 vs Apache Graph")

I have included the results below for the same reason.

|  |  |
| --- | --- |
| Reddit hits | 27653 |
| Digg hits | 874 |
| Seconds to call the iframes from main page this run | 0.0528259277344 |
| Total seconds to load all pages this run | 4.02603888512 |
| Average seconds to load the iframes (both) | 2.60272280153 |
| Average seconds to load IIS | 2.2937795829352 |
| Average seconds to load APACHE | 2.9116660201344 |

This is a very interesting study, and I am going to keep following this site for updates.