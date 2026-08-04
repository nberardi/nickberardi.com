---
title: "ASP.NET MVC Route Validation and SEO"
date: 2008-02-27T05:50:35-05:00
slug: "aspnet-mvc-validation-and-seo"
draft: false
tags:
  - ".NET"
  - "C#"
  - "Managed Fusion"
  - "MVC"
  - "URL Rewriter and Reverse Proxy"
  - "Web"
description: "Recently I have been using the ASP.NET MVC framework for a project at work. And one of the requirements was that certain data inputed in to the URL be..."
---

Recently I have been [using the ASP.NET MVC framework](/posts/microsoft-mvc-day-one/) for a project at work. And one of the requirements was that certain data inputed in to the URL be tightly verified. I originally thought that data was verified by the type specified in the *ControllerAction*, however I came to find out that it wasn't. So if you have say a page number and the user enters a letter in the URL the application just proceeds on it's marry way. For example on the [Kigg](http://kigg.dotnetslackers.com) site:

1. <http://kigg.dotnetslackers.com/Story.mvc/Category/Lifestyle/1>
2. <http://kigg.dotnetslackers.com/Story.mvc/Category/Lifestyle/a>
3. <http://kigg.dotnetslackers.com/Story.mvc/Category/Lifestyle/>
4. <http://kigg.dotnetslackers.com/Default.aspx>

I am not sure yet if this is because Kigg is implemented with a *int?* and any failure of the parsing results in a null. But that wouldn't explain the 3rd result in which Kigg returns the category as if it was the 4th result. I would expect that the 3rd result should return the same results as the 1st result. This setup can results in many SEO issues where I can inject keywords in to the URL with malicious intent and still have it resolve correctly. For example:

1. [http://kigg.dotnetslackers.com/Story.mvc/Category/Lifestyle/**coderjournal**](http://kigg.dotnetslackers.com/Story.mvc/Category/Lifestyle/coderjournal)

So my recommendation to my readers is to also implement a URL Rewriter to force normalization on to the MVC URLs. I am personally using [my own URL Rewriter](http://www.managedfusion.com/products/url-rewriter/) on this project that I am creating to better control my inputs, by providing type validation, into my application. At the very least use the built in verification and don't put *null* in the defaults.

```
RouteTable.Routes.Add(new Route {  
    Url = "[controller]/[action]/[page]",
    Defaults = new { controller = "Home", action = "Index", page = 1 },
    RouteHandler = typeof(MvcRouteHandler),
    Validation = new { method = "GET", page = "[0-9]+" }
});
```

The *Validation* property that you see on the last line above allows the type of HTTP Method allowed POST or GET usually. And the other properties are similar to what you do with the *Default* only they are RegEx statements that validate the specific part of the URL.

Really what I would like to see from ScottGu and the rest from the MVC framework is a more extensible *Route* object or *RouteTable*. I was really surprised that I wasn't able to overload the handling of the URL in the MVC framework. Don't get me wrong the team has done a great job hitting 95% of the potential needs of the development community. However if you fall in that 5% you are either out of luck, or forced to create a new Module, Controller, RouteTable, Route, and a whole host of supporting objects. For instance if I wanted to give the users of my URL Rewriter and Reverse Proxy a common interface that they can both do their advanced URL Rewriting and Reverse Proxying and their MVC Action/Controller setup. I wouldn't be able to do it unless I basically reimplemented the URL handling of the MVC framework. I might end up doing that in the future, but I will probably wait until the Gold Version of MVC is released. If this was a perfect world I would probably implement some syntax in my URL Rewriter Rules file that looked like:

```
# if not feed burner requesting  
RewriteCond %{HTTP_USER_AGENT} !^FeedBurner.*$  
# rearrange old structure
RewriteRule ^/<?'controller'([a-z]+)>/index.html$  /$1/List/page$2.html [C]  
# in to new MVC model
RewriteRule ^/<?'controller'([a-z]+)>/<?'action'([a-z]+)>/page<?'page'([0-9]+)>.html$  {controller="Home",action="List",page=1} [MVC,NC,L]
```

But that is just me making a wish for the future of MVC extensibility. All that I would need to accomplish this task is a little more flexibility in the URL handling. If anybody from the MVC wants to talk to me more about my requirements please feel free to contact me.

Really the last thing, I imagine, that the MVC team would want to cause is more SEO problems than are already created by uneducated developers.