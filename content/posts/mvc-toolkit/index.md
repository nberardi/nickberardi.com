---
title: "Coder Journal's MVC Toolkit"
date: 2008-04-13T08:04:54-05:00
slug: "mvc-toolkit"
draft: false
tags:
  - ".NET"
  - "IdeaPipe"
  - "MVC"
  - "Web"
description: "Today I decided to release a toolkit that I have been building over the past couple of months. Most of the code in the toolkit is related to MVC. Here is..."
---

Today I decided to release a toolkit that I have been building over the past couple of months. Most of the code in the toolkit is related to MVC. Here is a list of the features:

### ActionFilterAttribute's

- **HttpPostOnlyAttribute**
  Only allows `POST` to be made against the action.
- **CacheAttribute**
  Sets the action's response as cacheable.
- **CompressAttribute**
  Compresses the action's response using GZip or Deflate encoding.
- **ServiceAttribute**
  Marks an action as able to provide the ViewData as JSON, XML, or JSONP.
- **ServiceOnlyAttribute**
  Marks an action as only able to provide the ViewData as JSON, XML, or JSONP, that means no HTML.
- **ExceptionHandlerAttribute**
  Handles any exceptions thrown from an action, and redirects it to another page, or another action.
- **CaptchaAttribute**
  I did a whole post on [providing a CAPTCHA for your MVC action](/posts/actionfilterattribute-aspnet-mvc-captcha/ "ASP.NET MVC Preview 2 CAPTCHA using ActionFilterAttribute").
- **AllowedHttpMethodsAttribute**
  Only the HTTP methods entered in to this filter are allowed for your action. Available HTTP methods are `OPTIONS`, `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `TRACE`, and `CONNECT`.

### ViewEngines's

- **ServiceViewEngine**
  This view engine provides the serialization of the ViewData to JSON, XML, or JSONP. It is set when one of the following is requested from the **ServiceAttribute** above.

### Route's

- **LowercaseRoute**
  I did a [whole post on why I needed this](/posts/force-mvc-route-url-lowercase/ "/posts/force-mvc-route-url-lowercase/) in my toolkit. Mostly because of my obsessions to have all URL's in lowercase.

### Method Extensions

- **Redirect** extends **HttpResponse**
  I have had a long standing discontent with the Redirect method of the ASP.NET. I have talked about [good use of HTTP Status Codes](/posts/world-of-http11-status-codes/ "World Of HTTP/1.1 Status Codes") before. There are at least 3 status codes that you want to consider before choosing a response status code of 302. Just to reiterate my post on the subject use 303 to redirect from a form POST, use 307 when you want to redirect to a page that is going to change with each request, use 301 if you want to permanently redirect one URL to another.I created the, Redirect, extension method on HttpResponse so that the status code could be set for the redirect.

**View Source:** [Coder Journal MVC Toolkit Source](http://code.google.com/p/coderjournal/source/browse/trunk/ManagedFusion/Source/)   
**Download Binary:** [Coder Journal MVC Toolkit Binary](/images/2008/04/coder-journal-mvc-toolkit1.zip)

**Update:** I have updated one bug found.  Both links above contain the updated source and binaries.