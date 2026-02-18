---
title: "Creating a Facebook Application using MVC"
date: 2008-04-11T06:06:44-05:00
slug: "create-facebook-application-mvc"
draft: false
tags:
  - "C#"
  - "Facebook"
  - "FacebookToolkit"
  - "MVC"
  - "Web"
description: "Facebook has been growing in popularity ever since it was released on February 4th 2004 at an almost unstoppable pace. Up until May 24th, 2007, it wasn't..."
---

Facebook has been growing in popularity ever since it was released on February 4th 2004 at an almost unstoppable pace. Up until May 24th, 2007, it wasn't much different than MySpace (or insert your favorite social network here), however on that day they rolled out a SDK that turned Facebook from a destination website to a platform that let any developer interact with their almost 71 million users. You can read more about the history of [Facebook at Wikipedia](http://en.wikipedia.org/wiki/Facebook).

My focus today isn't on how to develop your first Facebook application in ASP.NET, because there are already [many great articles on that](http://www.stevetrefethen.com/blog/DevelopingFacebookApplicationsInCWithASPNET.aspx), and even some [starter kits](http://www.stevetrefethen.com/wiki/Facebook%20application%20development%20in%20ASP.NET.ashx). My focus is going to be on developing your first Facebook application with ASP.NET MVC, however this article will assume that you have the basic understand [FBML](http://wiki.developers.facebook.com/index.php/FBML) (Facebook Meta Language) and [MVC](http://www.asp.net/mvc). If you do not have one or the other don't worry, both are very easy to pick up on, and both have a very active developer community to answer questions.

- [Facebook Developers](http://developers.facebook.com/)
- [Facebook Developers Wiki](http://wiki.developers.facebook.com/)
- [And Also My Getting Started With MVC Guide](http://www.coderjournal.com/2008/02/microsoft-mvc-day-one/)

So now that, that is out of the way lets start looking at what we need to make your MVC application in to a Facebook compatible application. The first thing you will need is the [Facebook Developers Toolkit](http://www.codeplex.com/FacebookToolkit) which is free on CodePlex. The second thing you will need is my [Facebook MVC Web Controls](/images/2008/04/facebookmvcwebcontrols1.zip) which is a modification of the tookit's Facebook.WebControls.dll made specifically for MVC. The third thing you need is [ASP.NET MVC Preview 2](http://www.codeplex.com/aspnet) which is also available for free on CodePlex.

My tookit extension consists of the following classes, that mimic the current classes already in Facebook Developers Toolkit:

- CanvasFbmlViewPage
- CanvasFbmlViewPage<TViewData>
- CanvasFbmlViewMasterPage
- CanvasFbmlViewMasterPage<TViewData>
- CanvasIFrameViewPage
- CanvasIFrameViewPage<TViewData>
- CanvasIFrameViewMasterPage
- CanvasIFrameViewMasterPage<TViewData>

### Facebook IFrame Application

I will start with the IFrame stuff since that is very easy and doesn't require FBML knowledge. To create a Facebook IFrame application just follow the directions at [Facebooks Getting Started Website](http://developers.facebook.com/get_started.php) for an IFrame. Then create an MVC Preview 2 application in Visual Studio. Then change the following in the CodeBehind for each of your pages.

```
public partial class Index : ViewPage
```

to

```
public partial class Index : CanvasIFrameViewPage
```

That is all you have to do to get Facebook working with your MVC application through IFrames. You don't need to change your HTML because you site is going to render through an IFrame so there is no processing that is done in regards to UI rendering for Facebook. This has some drawbacks including not having the familiar Facebook interface, however this is the easiest way to get running on a Facebook app.

### Facebook FBML Application

Creating the C# part of an FBML application for MVC is just as easy creating creating the IFrame application.

```
public partial class Index : ViewPage
```

to

```
public partial class Index : CanvasFbmlViewPage
```

Nothing spectacular there. Before we get started with the FBML application there is a tool that shows you [what your FBML will look like when rendered out to HTML](http://developers.facebook.com/tools.php?fbml). However the real power of MVC is about to shine when we create a simple Facebook application using FBML and the ASP.NET MVC framework. Basically I took the default MVC application and modified the Index.aspx page to look like this.

```
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="MvcFootprints.Views.Home.Index" %>  
<div style="padding: 10px">
    <h2>Hi <fb:name firstnameonly="true" uid="<%= this.FBService.UserId %>" useyou="false" />!</h2>
    <form method="post" action="http://apps.facebook.com/coderjournal/">
        Get friend:
        <fb:friend-selector idname="friend" />
        <input value="find" type="submit" />
    </form>
    <hr />
    <fb:if-can-see uid="<%= Request.Forms["friend"] %>">
    <div style="clear: both; padding: 3px;">
        <fb:profile-pic style="float: left;" uid="<%= Request.Forms["friend"] %>" size="square" />
        <fb:name uid="<%= Request.Forms["friend"] %>" capitalize="true" />
    </div>
    </fb:if-can-see>
</div>
```

This isn't very spectacular, all that it does it provide a friend list drop down, and submit it back to get their picture and name. But it gives the basic idea how to inner-mix FBML markup like `<fb:name /%gl;` and HTML with MVC. So basically that is your first Facebook application with MVC, nothing to it right?

That is really the beautiful thing about MVC, it makes writing simple applications that much simpler than ASP.NET Web Forms because you don't have to deal with controls and it is encouraged to do processing inline with your markup. Happy coding. As always you can find [the source code to this](http://code.google.com/p/coderjournal/source/browse/trunk/Facebook.MvcWebControls/) and my other projects in [Coder Journals Source Control Repository](http://code.google.com/p/coderjournal/source/browse/trunk/).