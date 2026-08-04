---
title: "ASP.NET MVC Preview 3 Released"
date: 2008-05-27T06:40:20-05:00
slug: "aspnet-mvc-preview-3-released"
draft: false
tags:
  - ".NET"
  - "IdeaPipe"
  - "MVC"
  - "Web"
description: "The ASP.NET MVC Team has released an refresh of MVC. To all those that are interested the new Preview Release is posted at:..."
---

The ASP.NET MVC Team has released an refresh of MVC. To all those that are interested the new Preview Release is posted at:   
 [<http://www.codeplex.com/aspnet/Release/ProjectReleases.aspx?ReleaseId=13792>](http://www.codeplex.com/aspnet/Release/ProjectReleases.aspx?ReleaseId=13792)

The new release contains many new features over the 2nd Preview Release and the [Interim Release](/posts/aspnet-mvc-interim-released/) from a month a half ago. In this post I am going to outline the features that are new from the Interim Release to Preview Release 3.

### Action Method and Result Changes

As you remember from the previous release, you are now required to return an ActionResult. Many of the ActionResults were renamed to the following types:

- **ViewResult:** Renders the specified view to the response.
- **EmptyResult:** Does nothing. Returned if the action method must return a null result.
- **RedirectResult:** Performs an HTTP redirect to the specified URL.
- **RedirectToRouteResult:** Given some routing values, uses the routing API to determine the URL and then redirects to that URL.
- **JsonResult:** Serializes the specified ViewData object to JSON format.
- **ContentResult:** Writes the specified text content to the response.

There were also new helper methods added to the Controller class for these new ActionResult types.

- **View:** Returns a ViewResult instance.
- **Redirect:** Redirects to the specified URL. Returns a RedirectResult instance.
- **RedirectToAction:** Accepts an action (and optionally a controller) and redirects to another controller action. Returns a RedirectToRouteResult instance.
- **RedirectToRoute:** Redirects to a URL that is determined by the routing API. For example, this method lets you specify a named route. Returns a RedirectToRouteResult instance.
- **Json:** Returns a JsonResult instance.
- **Content:** Sends text content to the response. Returns a ContentResult instance.

One of the more interesting ActionResults is the JsonResult which returns a serialized form of your ViewData object using the JavaScriptSerializer class. I don't know why they didn't use the DataContractJsonSerializer, but the team probably had their reasons.

### View Data Changes

There is also the addition of implicit conversion for Action methods that return anything other than an ActionResult.

> If an action method returns **null** (or has a return type of **void**), the action invoker implicitly provides an **EmptyResult** instance, which does nothing. If an action method returns anything other than an **ActionResult** instance, the action invoker calls *ToString(CultureInfo.InvariantCulture)* on the instance and then wraps the return value with a ContentResult object, which writes the content to the response.

A Model property was added to **ViewDataDictionary**. For **ViewDataDictionary**, the type of this property is **System.Object**. For **ViewDataDictionary<T>**, the type of this property is **T**.

The **ViewData** property of **ViewPage<T>** is no longer replaced by **T**. In Preview 2, the MVC framework replaced the **ViewData** property with the specified strongly typed view data (that is, the **T** in **ViewPage<T>**). In Preview 3, the **Model** property of **ViewData** is set to the instance of type **T**.

### Route Changes

An **IRouteConstraint** interface was added.

If a constraint value is specified as a string, the string is interpreted as a regular expression. If the constraint value is specified as an instance of **IRouteConstraint**, route processing calls the **Match** method of **IRouteConstraint**.

A new **HttpMethodConstraint** type was added, which changes the way you constrain routes on the HTTP method. Unlike previous versions of ASP.NET routing, in this release, the constraint name "httpMethod" is no longer special. Instead, use the **HttpMethodConstraint** to add a constraint based on HTTP verbs. The following example shows how to use the **HttpMethodConstraint** type.

```
routes.MapRoute(  
    "route-name",
    "{controller}/update",
    new {action = "update"},
    new {httpMethod = new HttpMethodConstraint("PUT", "POST")}
);
```

### Other Changes

The versions of the **System.Web.Abstractions** and **System.Web.Routing** assemblies that are included with the MVC project template have been changed to *version 0.0.0.0*. The versions that are included in the Preview 3 release are newer than those that ship in the .NET Framework version 3.5 Service Pack 1 Beta. Therefore, they were assigned a private version number so that no conflict occurs between the assemblies in this release and the assemblies installed by the .NET Framework 3.5 SP1 Beta release.

And a ton of bug fixes

So in conclusion the ASP.NET MVC team has released another great release. Many of the new features have been on the request list of many of the active MVC developers. I still have to try out a couple of my requests to see if they are included, but I will make sure to provide a new post with those details.

**Update:** [ScottGu has just released his notes on the MVC Preview Release 3](http://weblogs.asp.net/scottgu/archive/2008/05/27/asp-net-mvc-preview-3-release.aspx), which I must admit are more in depth than my own.

**Update 2:** I have also updated [IdeaPipe](http://www.ideapipe.com) to reflect the latest PR3 changes. It took me about an hour to go through all my code and then test it. I am pleased to report the default page is now working, so that you don't need the Default.aspx page anymore.