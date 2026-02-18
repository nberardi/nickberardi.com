---
title: "The difference between Routing and Rewriting"
date: 2010-03-20T06:00:12-05:00
slug: "difference-between-routing-rewriting"
draft: false
tags:
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "SEO"
  - "URL Rewriter"
  - "URL Routing"
description: "As most of you are probably aware, if you read my blog enough, I am the sole developer of a URL Rewriter that I have tried to keep extensible and relevant..."
---

As most of you are probably aware, if you read my blog enough, I am the sole developer of a [URL Rewriter](http://urlrewriter.codeplex.com) that I have tried to keep extensible and relevant to the problems that modern web developers face when exposing their applications to the web, by allowing them to have more control over the only interface that matters on the web … **THE URL**.  The benefits of a URL Rewriter have been [explained many times](http://www.hanselman.com/blog/GooglePageRanksConsideredSubtle.aspx), [by many people](http://www.codinghorror.com/blog/2007/02/url-rewriting-to-prevent-duplicate-urls.html), so I am not going to add just another rant to the web about keeping your URL’s clean for the search engines.  I will just leave you with [Jeff’s explanation](http://www.codinghorror.com/blog/2007/02/url-rewriting-to-prevent-duplicate-urls.html) of why you shouldn’t ignore the URL.

> **Having multiple URLs reference the same content is undesirable not only from a sanity check DRY perspective, but also because it lowers your PageRank**. [PageRank](http://en.wikipedia.org/wiki/PageRank) is calculated per-URL. If 50% of your incoming backlinks use one URL, and 50% use a different URL, you aren't getting the full PageRank benefit of those backlinks. The link juice is watered down and divvied up between the two different URLs instead of being concentrated into *one* of them.

While Jeff only focuses on the reasons related to SEO, there are many other reasons to make your URL’s “look-and-feel” a high priority.  One that is often touted as a wonderful reason to use a URL Rewriter is to produce pretty looking URL’s, and even though this one of many reasons to use a rewriter, it is really a small part of why you want to have a URL Rewriter in your arsenal as a web developer.  Other reasons include forcing your domain to a constant www vs non-www address, having helper URL’s such as <http://www.microsoft.com/sql> that redirect to their actual location, and [many others](http://www.addedbytes.com/for-beginners/url-rewriting-for-beginners/).

[![routing_engine](/nickberardi.com/images/2010/03/routing_engine_thumb1.jpg "routing_engine")](/nickberardi.com/images/2010/03/routing_engine1.jpg)

However, since Microsoft released the [System.Web.Routing](http://msdn.microsoft.com/en-us/library/system.web.routing.aspx) framework the benefits for using a URL Rewriter have been blurred, because the routing framework gives developers more of an ability to control the URL and thus create prettier URL’s than have traditionally been possible.  Because of this overlap of efforts, in the router and rewriter, in making a more readable URL a misunderstand has been created about the functions and benefits that each provide to the modern web developer.

**The first thing to understanding the difference between routes and a rewriter.** Phil Haack [explains on his blog](http://haacked.com/archive/2010/01/17/editable-routes.aspx) the reasons routes were not designed to be changeable without a recompile:

> This is **partly by design as routes are generally considered application *code***, and **should have associated unit tests to verify that the routes** are correct. A misconfigured route could seriously tank your application.

In other words the route which is compiled “application code” is like a road, and like the properties of a road it provides a way to get between the starting point and the destination, or in the case of the web the client browser requesting a URL as the start point and your action method as the destination.  If this road could be changed with out much thought, it would be possible to create a circumstance where your destination is no longer accessible by the road. The rewriter on the other hand can be looked at as the rules of the road used to detour traffic, govern the speed, give direction, and really just provide flexibility on top of the rigid start and end points of the road.

When I try to explain this to fellow developers I often have a conversation that goes something like this:

---

**[ME]** Why are you not using a rewriter in your ASP.NET MVC application to give you better control over your URL routes.  So that you provide a consistent domain, helper URL’s, and more flexibility to the running of your web application?   
**[THEM]** I don’t need a rewriter, I use ASP.NET MVC for creating pretty URL’s and Routing rocks.   
**[ME]** Sigh, I never said anything about pretty URL’s. The benefits of a URL Rewriter go way beyond making your URL pretty.   
**[THEM]** I don’t see how. The interweb always talks about pretty URL’s and rewriters.   
**[ME]** Well, Routing is like namespaces for your actions they just provide a web accessible name to get directly to your action method, they don’t act as a rule engine on what types of requests to let through, what type to redirect, and where the request should go.  That is why you need a URL Rewriter in addition to Routing.  Think of a route as a road, and the rewriter the rules you use to drive on that road.   
**[THEM]** I like driving fast in my Prius.   
**[ME]** Double Sigh. Lets focus here for a minute.  Lets get back on topic.   
**[THEM]** Yeah but so what I don’t need any of that mumbo jumbo, I just want pretty URL’s because that is all that people talk about on the interweb, and that is how you get to #1 on Google.   
**[ME]** Fine Good Luck with your PageRank, come back to me in a year when you are still at the exact same rank in Google and ready to listen.

---

It has gotten really to the point where I start picking the people I want to have this conversation with based on if they are actually willing to listen and understand enough of the basics of SEO and HTTP so that my conversation is not lost on them.

If you have gotten this far in to my rant on the differences of routing and rewriters, you are probably somebody who generally cares and already understands the difference or wants to know more.  If you are that person, [I would love to talk to you](http://www.managedfusion.com/info/contact-us.aspx) about what kind of enhancements to my companies [URL Rewriter](http://urlrewriter.codeplex.com) that would make your life easier as a web developer.  As I start to line up the features for the 4.0 release.