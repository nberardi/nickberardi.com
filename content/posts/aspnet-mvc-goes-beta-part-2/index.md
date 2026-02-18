---
title: "ASP.NET MVC Goes Beta (Part 2)"
date: 2008-10-16T06:02:29-05:00
slug: "aspnet-mvc-goes-beta-part-2"
draft: false
tags:
  - "MVC"
  - "Web"
description: "From what I can tell ASP.NET MVC Beta is just ASP.NET MVC PR5 with a couple bug fixes. So the good news is that the interface has finally solidified and..."
---

From what I can tell ASP.NET MVC Beta is just ASP.NET MVC PR5 with a couple bug fixes.  So the good news is that the interface has finally solidified and we shouldn't see anymore breaking changes before the final release.

**New features:**

- MvcFutures.dll is not included in the beta (as it wouldn't be included in the final release)
- The Beta installer installs the ASP.NET MVC assemblies (System.Web.Mvc.dll, System.Web.Routing.dll, and System.Web.Abstractions.dll) into the GAC.
- New Simple Membership Features in the Default Project Template
- New Filter Types for Authorization and Exception Handling
- New Output Cache Filter
- Changes for ASP.NET AJAX
- Namespaces in Routes
- New Interface for Enhanced Testability of TempData
- ActionInvoker Extensibility Improvements
- ViewDataDictionary (minor change)
- ViewEngine Improvements
- Helper Improvements
- Controller and Filter Improvements

**Bug fixes:**

- Fixed a bug in which the ignore-routes setting (created by using the IgnoreRoute extension method) affected URL generation.
- Fixed a view engine caching bug when the application is not in debug mode (that is, when debug="false" is set in the Web.config file). This bug occurred if different action methods in different controllers had the same name. In that case, an action method could render the view for the wrong controller.
- Fixed a bug in OutputCacheAttribute in which cached authenticated content did not require authentication. Even though the content is cached, if it requires authentication, the user should be required to authenticate first before seeing the cached content.
- Fixed a bug in which RenderPartial does not work when tracing is turned on.
- Fixed a bug in the Html.TextArea helper method in which an overload was not looking in ViewData for its value when the provided value is null.
- Fixed the OutputCacheAttribute.CacheProfile property so that it works in Medium Trust.

**Update:** Derik at Dimecast.net [has found some things I overlooked](http://devlicio.us/blogs/derik_whittaker/archive/2008/10/16/upgrading-dimecasts-net-to-the-mvc-beta.aspx).  Nothing life changing, just some house cleaning on the teams part.