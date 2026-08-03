---
title: "Anything For Sale By Owner"
date: 2007-10-01T13:46:04-05:00
slug: "anything-for-sale-by-owner"
draft: false
tags:
  - ".NET"
  - "Database"
  - "Framework 2.0"
  - "Google"
  - "IIS"
  - "Linux"
  - "MySQL"
  - "Performance"
  - "Search Engine"
  - "SEO"
  - "User Experience"
  - "Voveo"
  - "Web"
  - "Web 2.0"
  - "Web Servers"
description: "As I alluded in a post a couple of weeks ago, I have been a bad blogger. And I have neglected my community of readers. However I would like to tell you..."
---

[![Anything For Sale By Owner Logo](/images/2007/10/logoafsbo1.png)](/images/2007/10/logoafsbo1.png "Anything For Sale By Owner Logo")As I alluded in a post a couple of weeks ago, [I have been a bad blogger](http://www.coderjournal.com/2007/09/i-have-been-a-bad-blogger/ "I have Been A Bad Blogger"). And I have neglected my community of readers. However I would like to tell you what I have been doing in the last couple of months while I have been neglecting my blog.

I recently got involved in creating a startup as the lead developer for an online classifieds site called [Anything For Sale By Owner](http://anythingforsalebyowner.com). From the ground up this was conceived as a middle-ground between craigslist and ebay where every listing would be charged at a static rate of $1.00/month. The $1.00 is a way to week out the crap from craigslist and the death-by-fees from ebay.

The description is pretty straight forward but the more interesting tid-bits that I know my readers are interested in are as follows:

**.NET/C#**

We choose .NET mostly because it is what I knew and .NET for me has always been stable, predictable, and performed really well on server-side applications. The alternative was PHP and even through we wrote many of the processing layers by our self (i.e. REST Web Service Handler) the time to deployment was greatly accelerated because of all the work the Microsoft ASP.NET Team has put in to the product. The user of Master Pages and Web Services made for an easy separation between content and display.

**MySQL**

We choose MySQL for a whole host of reasons mostly based around the costs associated with a single Microsoft SQL Server Standard Edition license. Other reasons we choose MySQL was for scalability, because not only could we install 5 database servers (hardware included) for the same price we could purchase 1 MSSQL database server for but also because the master/slave replication of the databases seemed to be an easier process when we needed to scale horizontally.

**REST Web Services/AJAX**

We followed the Digg Model for exposing web services and each web service could be changed around to provide output through JSON, RSS, ATOM, KML (where applicable), and XML. I even did a write up about a month ago on the [JSON Serializer](http://www.coderjournal.com/2007/08/creating-a-more-accurate-json-net-serializer/) that I developed for this website. This was very important for the AJAX we needed to control many aspects of the user experience.

**Open Search**

[Open search](http://www.opensearch.org/) was one of the value add features that wasn't in the original spec but was an easy add-on because we already had the Web Services in place to leverage. You can view our open search XML definition file [here](http://anythingforsalebyowner.com/open-search.xml). If you are unfamiliar with Open Search this is how A9.com defines it:

> OpenSearch is a set of simple formats for the sharing of search results. Any website that has a search feature can make their results available in OpenSearch format. Other tools can then read those search results.

So that little search box in the upper right hand corner of your browser is an example of an Open Search client.

**SEO**

Search Engine Optimization is a very important part of any website today. Because for most new sites and even some of the older ones, Google is going to be the largest most ignored user of the site. Not only will Google look at every single page on your site every week, which I dare any human to try and accomplish, they will also be the largest organic promoter of your site.

One of the corner stones of SEO is easily readable URL's that contain descriptive keywords. This means you have to have a good URL Rewriter in place. We choose [Ionic's ISAPI Rewriter](http://www.codeplex.com/IIRF/) that integrated nicely with IIS 6.0. However that left a big gap between using Visual Studio's Intigrated Web Server (which doesn't support ISAPI) and a full blown IIS Server. The benifits are pretty obvious for running the Intigrated Web Server that comes with Visual Studio, for one you don't always have to have IIS that comes with Windows XP always running and the host of security problems that comes with it, two I was running Windows Vista and IIS 7.0 has some huge differences from IIS 6.0.

So I sat down one night and wrote my own [Apache mod\_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) compatible HttpModule for running the same rule-set that I defined for Ionic's ISAPI Rewriter, to fill in the gap and make developing on my local machine as close as running the live web site on IIS 6.0.

If anybody is interested I offer the [Url Rrewriter](http://managedfusion.com/products/url-rewriter/) as a free download:

- **[Download - Managed Fusion Url Rewriter](http://managedfusion.com/products/download.aspx#url-rewriter)**

**Front End Design**

I am a software developer and usually don't get invovled in the artsy end of the web site design. So I will let my co-worker [Tom Lauck](http://www.tomlauck.com) describe how he developed the front-end for Anything For Sale By Owner.

So all in all I believe that this website has a very good chance of making in the Wild Wild West that the Internet is, however that is probably just the ramblings of a proud father. Be on the look out for some major marketing campaigns in the NYC Times Square region.