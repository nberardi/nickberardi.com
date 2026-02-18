---
title: "ASP.NET MVC Preview Release 5"
date: 2008-08-29T04:51:57-05:00
slug: "aspnet-mvc-preview-release-5"
draft: false
tags:
  - "MVC"
  - "Web"
description: "Looks like the MVC team has put out preview release 5 of the MVC Framework today. You can get the latest version from CodePlex. Here is what I can tell..."
---

Looks like the MVC team has put out preview release 5 of the MVC Framework today.  You can get the latest version from [CodePlex](http://www.codeplex.com/aspnet/Release/ProjectReleases.aspx?ReleaseId=16775).

Here is what I can tell has changed from the release notes.

### What's New

- Added global registration of view engines
- Changed the IViewEngine interface to add the RenderParial method
- Added support for rendering partial views
- Added a parameter to specify a default option label for DropDownList controls
- Moved ASP.NET AJAX extension methods to a separate namespace
- Added helpers for RadioButton and TextArea controls and made overall improvements to other helpers.
- Removed helper method overloads to avoid ambiguity
- Added array support for action method parameters
- Removed the ActionMethod property from action filter context objects
- Added support for custom model binders
- Added an IActionInvoker interface
- Added an UpdateMode method to the Controller class
- Changed HandleErrorAttribute so that it does not handle exceptions when HttpContext.IsCustomErrorEnabled is false
- Added a new AcceptVerbs attribute
- Added a new ActionName attribute

### Known Issues and Breaking Changes

- Controller class now is derived from ControllerBase class
- Controller.Execute as removed, it is not called ExecuteCore.
- Controller initialization steps should be done in Initialize method now.
- IViewEngine interface is now responsible for finding views, not rendering them.
- Some overloads to some helper methods have been removed.
- AJAX helper methods have been moved to a new namespace.
- This version is incompatible with Visual Studio 2008 SP1 Beta

### Upgrading from Preview 4 to Preview 5

- System.Web.Abstractions and System.Web.Routing have been changed to version 3.5.0.0
- Assemblies are located at %ProgramFiles%\Microsoft ASP.NET\ASP.NET MVC CodePlex Preview 5

[Derik also noticed that many of the classes are still sealed](http://devlicio.us/blogs/derik_whittaker/archive/2008/08/29/asp-net-mvc-drop-5-has-been-released.aspx), and is requesting that the team un-seals all classes, and I agree with him.

Breaking and mysterious changes that I have submitted a bug request for:

- [AcceptVerbAttribute Not Following HTTP Standards](http://www.codeplex.com/aspnet/WorkItem/View.aspx?WorkItemId=2201)
- [ActionMethod Missing From ActionExecutingContext](http://www.codeplex.com/aspnet/WorkItem/View.aspx?WorkItemId=2202)

**Update (2008-8-31):** Also [Derik found a replacement for RenderUserControl](http://devlicio.us/blogs/derik_whittaker/archive/2008/08/30/asp-net-renderpartial-exception-cs1502.aspx), very minor change, but it is the difference between a error and having the thing work.