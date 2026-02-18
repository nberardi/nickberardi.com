---
title: "How to create a Reverse Proxy using Url Rewriter"
date: 2009-08-18T08:01:07-05:00
slug: "how-to-create-a-reverse-proxy-using-url-rewriter"
draft: false
tags:
  - "Managed Fusion"
  - "Reverse Proxy"
  - "URL Rewriter"
description: "I just wanted to share a really well written article on how to setup a Reverse Proxy, by John Gully, using the Url Rewriter that I have been working on..."
---

I just wanted to share a [really well written article on how to setup a Reverse Proxy](http://www.johngully.com/blog/2009/08/reverse-proxy-using-url-rewriter.html), by [John Gully](http://www.johngully.com), using the [Url Rewriter](http://urlrewriter.codeplex.com) that I have been working on for the past 2 years. Here is an excerpt from [his article](http://www.johngully.com/blog/2009/08/reverse-proxy-using-url-rewriter.html).

> I recently came to realize that our website situation was growing out of hand. We had a corporate website, an intranet site, and even a site for web access to email. All of these sites were scattered across multiple servers and each was on a unique port. While this worked, it was not simple. Each new site had to have a new rule configured in the firewall, and who wants the hassle of putting port number at the end of a url?
> The solution to this mess turned out to be adding a [reverse proxy](http://en.wikipedia.org/wiki/Reverse_proxy) to our network. By simply providing different urls (www.example.com, mail.example.com) the incomming traffic can be anlayzed by the proxy server and routed to the appropriate internal web server. All the incomming traffic is sent over the default port 80 so the end user never sees any difference. That's exactly what I wanted, great!
> Since our sites are all built upon ASP.NET and hosted on IIS6 the natural option for this was [Microsoft ISA Server](http://www.microsoft.com/isa). Unfortunately, the $1500 cost was way beyond our small company's internal IT budget. So it was off to Google for me, and after some searching, it appeared that the open source project [Url Rewriter](http://www.managedfusion.com/products/url-rewriter/) by [ManagedFusion](http://www.managedfusion.com/) *[sic]* seemed to fit the bill.

Thanks for the great write up John.  I hope to be including John's article in an up coming FAQ wiki on my CodePlex project site in the near future.