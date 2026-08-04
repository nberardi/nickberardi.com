---
title: "Editable MVC Routes (Apache Style)"
date: 2010-03-21T06:54:36-05:00
slug: "editable-mvc-routes-apache-style"
draft: false
tags:
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "URL Rewriter"
  - "URL Routing"
  - "Web"
description: "Since writing yesterday’s post about what annoys me regarding the limited insight most web developers have in regards to Routing vs Rewriting. It occurred..."
---

Since [writing yesterday’s post](/posts/difference-between-routing-rewriting/) about what annoys me regarding the limited insight most web developers have in regards to Routing vs Rewriting.  It occurred to me that I might be able to make the difference and benefits between the two more clear, after remembering a post [Phil Haack](http://haacked.com) wrote about [Editable MVC Routes](http://haacked.com/archive/2010/01/17/editable-routes.aspx).

By taking my companies already production ready [URL Rewriter](http://urlrewriter.codeplex.com) that supports runtime-editing of rewriter rules and adding support for routes.  I would essentially be merging together Routing and Rewriting in the same configuration, and making the routes just as editable as the rewriter rules.  By doing this, my hope is that it should **illustrate the benefits of having both a Rewriter as well as a Router in your web arsenal**, because you can play with both in real time and start to connect in your mind when one is more useful than the other.

I started with the latest release of my companies [URL Rewriter](http://urlrewriter.codeplex.com/releases/view/36792) and created a [contrib project](http://github.com/managedfusion/managedfusion-rewriter-contrib) on GitHub that extended the Apache support to also include System.Web.Routing configuration.  The syntax looks similar to the [Apache mod\_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) but specific for routes.  Here is an example of what the config, with both routes and rewriting rules in it, might look like:

```
RewriteEngine On

#
# Start Rewrite
#

# force to HTTPS
RewriteCond %{HTTPS} (off) [NC]  
RewriteRule ^(.*)$ https://www.somesite.com$1 [QSA,L]

# force non-www
RewriteCond %{HTTP_HOST} !^somesite.com$ [NC]  
RewriteRule ^(.*)$ http://somesite.com$1 [R=301,L]

# add a trailing slash
RewriteRule ^([^.?]+[^.?/])$ $1/ [R=301,L]

#
# Start Routes
#

RouteDefault controller Home  
RouteDefault action Index  
RouteUrl {controller}/{action}/{id} "Default"
```

Notice the standard Route that comes default with an ASP.NET MVC project at the bottom of the traditional rewriter config.  As a planned side-effect of using the Managed Fusion URL Rewriter the routes are completely editable, so they can be changed with out a recompile and with out a restart of the application pool.  So I see those as two huge benefits of using a method like this, on top of illuminating the differences and advantages of using both System.Web.Routing and a URL Rewriter in your application.

The [code that I have provided via GitHub](http://github.com/managedfusion/managedfusion-rewriter-contrib) provides the following commands that you can use to control your routes:

- **RouteUrl** <url>  “<name>”
- **RouteDefault** <url-part>  <default>
- **RouteConstraint** <url-part>  <regex-constraint>
- **RouteNamespace** <namespace>
- **RouteIgnoreUrl** <url>

So I encourage you to check this code out and provide feedback, as I aim to continue to grow this code base where I can to make it easier to have your rewriter and your routes in the same place.  **Because even though I created it for demonstration reasons, I realize that it may have more of a use for others out there that need to support runtime-editable routes in their application.**

**Note to readers that have just read** [**my last post**](/posts/difference-between-routing-rewriting/)**:** You maybe wondering why I compared routes to unchangeable roads in my last post, and then in this one give people the ability to edit them in real time.  Well I did state in the beginning of this post that the main goal of this project above was to illustrate the differences in real-time of routing and rewriting with out the need to recompile.  Also Phil [did concede](http://haacked.com/archive/2010/01/17/editable-routes.aspx) there are times when routes would be better as dynamic code that can be changed without a recompile:

> Having said that, there are many situations in which the ability to change an application’s routes without having to recompile the application comes in very handy. This is the situation I find myself in as I build a [blog engine](http://subtextproject.com/) where the folks who will install may want to tweak the routes without having to recompile the blog’s source code.

**Update:** Here is what you put in your *Web.config* file to get this working. I have included the whole snippet but the important part is the *engineType* attribute in the XML below:

```
<managedFusion.rewriter xmlns="http://managedfusion.com/xsd/managedFusion/rewriter">  
    <rules engine="Other" engineType="ManagedFusion.Rewriter.Contrib.RoutingApacheEngine, ManagedFusion.Rewriter.Contrib">
        <apache defaultFileName="rewriter.txt"/>
    </rules>
</managedFusion.rewriter>
```