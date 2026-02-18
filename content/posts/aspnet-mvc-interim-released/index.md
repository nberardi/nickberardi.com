---
title: "ASP.NET MVC Interim Released"
date: 2008-04-16T11:25:49-05:00
slug: "aspnet-mvc-interim-released"
draft: false
tags:
  - "MVC"
  - "Web"
description: "The ASP.NET MVC Team has released an refresh of MVC. To all those that are interested the new Interim Release is posted at:..."
---

The ASP.NET MVC Team has released an refresh of MVC. To all those that are interested the new Interim Release is posted at:

<http://www.codeplex.com/aspnet/Release/ProjectReleases.aspx?ReleaseId=12640>

The new release seems to rely on a non-CodePlex open source project.  Is this the first sign of Microsoft's commitment to open source?

- <http://code.google.com/p/moq/>

The [Release Notes](http://www.codeplex.com/aspnet/Wiki/View.aspx?title=ReadMe) have a lot of good information about new features and bug fixed included in this release:

This CodePlex refresh of the ASP.NET MVC source code includes a number of key changes and refactorings.   
To see a full list of API changes, take a look at the [attached zip file](http://www.codeplex.com/Project/Download/FileDownload.aspx?ProjectName=aspnet&DownloadId=32506) produced using   
[Framework Design Studio](http://code.msdn.microsoft.com/fds).

**MVC Changes Since Preview 2**

- Action methods on Controllers now by default return an *ActionResult* instance, instead of void.
  - This *ActionResult* object indicates the result from an action (a view to render, a URL to redirect to, another action/route to execute, etc).
  - Each "result" is a type that inherits from *ActionResult*. To render a view, return a *RenderViewResult* instance.
  
- The *RenderView()*, *RedirectToAction()*, and *Redirect()* helper methods on the *Controller* base class now return typed *ActionResult* objects (which you can further manipulate or return back from action methods).
- The *RenderView()* helper method can now be called without having to explicitly pass in the name of the view template you want to render.
  - When you omit the template name the *RenderView()* method will by default use the name of the action method to determine the view template to render.
  - So calling *RenderView()* with no parameters inside the *About()* action method is now the same as explicitly writing *RenderView('About')*.
  
- Introduced a new *IActionFilter* interface for action filters. *ActionFilterAttribute* implements *IActionFilter*.
- Action Filters now have four methods they can implement representing four possible interception points.
  - *OnActionExecuting* which occurs just before the action method is called.
  - *OnActionExecuted* which occurs after the action method is called, but before the result is executed (aka before the view is rendered in common scenarios).
  - *OnResultExecuting* which occurs just before the result is executed (aka before the view is rendered in common scenarios).
  - *OnResultExecuted* which occurs after the result is executed (aka after the view is rendered in common scenarios).
  - NOTE: The OnResult\* methods will not be called if an exception is not handled during the invoking of the OnAction\* methods or the action method itself.
  
- Added a MapRoute extension method (extension on RouteCollection) for use in declaring MVC routes in a simpler fashion.

  
**NOTE:** It is pretty easy to update existing Controller classes built with Preview 2 to use this new pattern (just change void to ActionResult and add a return statement in front of any RenderView or RedirectToAction helper method calls).

**Routing changes since Preview 2**

- URLs may contain any literal (except for /) as a separator between URL parameters. For example, instead of {action}.{format} you can now have {action}-{format}. For more details on changes, see [this post](http://haacked.com/archive/2008/04/10/upcoming-changes-in-routing.aspx).
- Routing is ignored for files that exist on disk by default. This can be overriden by setting the *RouteTable.Routes.RouteExistingFiles* property to *true* (it is *false* by default).