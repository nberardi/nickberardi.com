---
title: "Gracefully Failing"
date: 2010-01-26T05:00:00-05:00
slug: "gracefully-failing"
draft: false
description: "Today I just noticed that my blog’s CDN (Google AppEngine) was failing to resolve. After a little research I realized that WebSense, a corporate web..."
---

Today I just noticed that [my blog’s CDN (Google AppEngine)](http://www.coderjournal.com/2008/06/turn-google-app-engine-into-a-content-delivery-network-cdn/) was failing to resolve.  After a little research I realized that [WebSense](http://www.websense.com/content/home.aspx), a corporate web filtering software and scourge of intranet users that need to be productive, had decided that the IP Address range that Google AppEngine uses should be completely blocked.  And because most corporate IT departments just blindly apply the WebSense rules that they are sent, with out first verifying that they make sense; my blog is completely without JavaScript and CSS on these corporate networks.

The good news however is that I now know that my blog gracefully downgrades and is still very readable without JavaScript or CSS running.

[![gracefully-failing](http://coderjournal.com/uploads/2010/01/gracefullyfailing_thumb1.png "gracefully-failing")](http://coderjournal.com/uploads/2010/01/gracefullyfailing1.png)

This is an important test you should run on your blog.  Because this is how search bots, screen readers, and blocked content users will see your blog.  A couple tips to keep in mind when designing your website, in order for it to be readable when under any of the circumstances that I previous listed are:

1. Make sure the main content of the page is the **first** element right below your header.
2. Make sure to use as many standard HTML elements as possible, such as *H1*, *H2*, *H3*, *EM*, *STRONG, B*, *I*, and *etc.* This will keep you website looking good when CSS fails.
3. Make sure that reading of content is not reliant on JavaScript, because if JavaScript is turned off or the client doesn’t support JavaScript (search bots, screen readers, etc), then your website will be unreadable.

**Does your site gracefully fail?**