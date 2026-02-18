---
title: "How to resolve relative url's without ResolveUrl"
date: 2007-10-15T17:01:39-05:00
slug: "how-to-resolve-relative-urls-without-resolveurl"
draft: false
tags:
  - ".NET"
  - "Test-Tagging"
  - "Web"
description: "Sometimes you need to resolve relative url's without ResolveUrl. If the code is executing outside a Control, for example in an IHttpHandler or business..."
---

Sometimes you need to resolve relative url's without ResolveUrl. If the code is executing outside a Control, for example in an IHttpHandler or business layer code somewhere that has no reference to a Control, you can't call Control.ResolveUrl.

The [System.Web.VirtualPathUtility](http://msdn2.microsoft.com/en-us/library/system.web.virtualpathutility.aspx) class has some very useful method for converting from an app relative path to an absolute path:

```
string absoluteUrl = VirtualPathUtility.ToAbsolute(relativeUrl);
```