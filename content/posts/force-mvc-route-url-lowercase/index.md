---
title: "Force MVC Route URL to Lowercase"
date: 2008-03-31T10:45:06-05:00
slug: "force-mvc-route-url-lowercase"
draft: false
tags:
  - ".NET"
  - "C#"
  - "MVC"
  - "Web"
description: "So one of my pet peeves in web development is mixed case URL's. And I usually make sure that all my URL's in my personal projects follow this standard. I..."
---

So one of my pet peeves in web development is mixed case URL's. And I usually make sure that all my URL's in my personal projects follow this standard. I also believe, contrary to my URL case standard, that my code should follow standards .NET naming techniques, such as Pascal casing for my method names.

These two naming standards come in to conflict with MVC because the name of the action method in the controller is used in its native Pascal case. Which generates URL's that look like this:

/Home/Index
/Home/About

However I want them to be generated like this:

/home/index
/home/about

So I developed my own Route based off of the System.Web.Routing.Route to force everything to lowercase.

```
public class LowercaseRoute : System.Web.Routing.Route  
{
    public LowercaseRoute(string url, IRouteHandler routeHandler) 
        : base(url, routeHandler) { }
    public LowercaseRoute(string url, RouteValueDictionary defaults, IRouteHandler routeHandler) 
        : base(url, defaults, routeHandler) { }
    public LowercaseRoute(string url, RouteValueDictionary defaults, RouteValueDictionary constraints, IRouteHandler routeHandler) 
        : base(url, defaults, constraints, routeHandler) { }
    public LowercaseRoute(string url, RouteValueDictionary defaults, RouteValueDictionary constraints, RouteValueDictionary dataTokens, IRouteHandler routeHandler) 
        : base(url, defaults, constraints, dataTokens, routeHandler) { }

    public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
    {
        VirtualPathData path = base.GetVirtualPath(requestContext, values);

        if (path != null)
            path.VirtualPath = path.VirtualPath.ToLowerInvariant();

        return path;
    }
}
```

For anybody as anal as me about stupid stuff such as casing of URL's you should find this class up above a welcomed addition to your MVC projects.