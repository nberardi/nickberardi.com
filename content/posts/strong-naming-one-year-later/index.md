---
title: "Strong Naming: One Year Later"
date: 2013-04-02T09:04:22-05:00
slug: "strong-naming-one-year-later"
draft: false
tags:
  - "ASP.NET"
  - "CodePlex"
  - "JSON.NET"
  - "NuGet"
  - "asp.net mvc"
  - "ASP.NET WebAPI"
description: "It is almost 1 year to the date of when I first posted JSON.NET Strong Naming And NuGet Woes and the NuGet compatibility issues have stabilized This..."
---

It is almost 1 year to the date of when I first posted [JSON.NET Strong Naming And NuGet Woes](http://coderjournal.com/2012/04/json-net-strong-naming-and-nuget-woes/) and the NuGet compatibility issues have stabilized  This stabilization hasn't happened through a change from Microsoft, but a change in how publishers of NuGet packages version their libraries.

I am writing this post, because even after one year I am getting very passionate comments on one side of the issue or not, people don't seem to take a middle road on the strong naming issue. If you don't believe me [take a look at the comments](http://coderjournal.com/2012/04/json-net-strong-naming-and-nuget-woes/#comments).

Lucky for us, most developers who choose to strongly name their assemblies now are using a versioning mechanism that reduces the chances of breaking referencing assemblies in NuGet.  This "new" versioning technique is actually a non-technique.  Let me explain, instead of changing the version of the assembly with each release, you leave the version of the assembly set, until it is necessary to communicate a major release.

Lets look at JSON.NET again as our standard bearer.  Mostly do to the fact that it is the most widely used strongly named assembly in NuGet.  Since I last wrote my post almost a year ago, 11 releases have been made, however none of those releases caused breaking changes for any of the NuGet packages that referenced a 4.5.x version when built.  You may ask, "So what changed?"  As I alluded to previously the answer is "Nothing."  NuGet still functions as it did a year ago.  Strong naming still functions as it did a year ago.  .NET assemblies still function the same as they did a year ago.  The strongly named version of Newtonsoft.Json.dll did change either across those 11 releases, it has remained constant at 4.5.0.0.  And that last thing is exactly what was needed to settle down all the referencing problems in NuGet.

![Screen Shot 2013-04-02 at 8.46.28 AM](http://coderjournal.com/uploads/2013/04/Screen-Shot-2013-04-02-at-8.46.28-AM.png)

As I talked about in my previous post the main difference between strongly named assemblies and plain assemblies is that when you strongly name an assembly the versions have to match for any referencing assembly, for plain assemblies there is no requirement.  If you put out a new release of a strongly named assembly and don't change the version, the assemblies that reference it don't know the difference and are happy to keep using it.

At the time when I posted my previous post, I hadn't realized that James Newton-King had changed the policy to what I had described above, which is commonly referred to as SemVer.  He pointed this [out to me in the comments](http://coderjournal.com/2012/04/json-net-strong-naming-and-nuget-woes/comment-page-1/#comment-67222).

> ![](http://0.gravatar.com/avatar/e43cefbb045bbe6e800589876dc5677b?s=60&d=http%3A%2F%2F0.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D60&r=PG) FYI I discussed strong naming a couple of weeks ago –<http://james.newtonking.com/archive/2012/03/20/json-net-4-5-release-1-iso-dates-async-metro-build.aspx>
> No one seems to have read it.

He was right I didn't read it and that was a failure on my part.  The only reason I bring this up and mention him in this post, is because while I don't owe him an apology for speaking my opinion, I do have to apologize for using his project as an example of a wider spread problem in the industry at that time.  Projects like JSON.NET are often surrogate children to their owners, and to call out another person's child in such a public way isn't fair, so I apologize for that.

My stance on Strong Naming assemblies has softened a little over the past year, mostly due to the fact that it isn't causing me as much greif as it use to.  I still think it is a plague on .NET developers, unwittingly forced down on high from a VP who read a white paper from 2001.  However, I typically take the stance of, if it doesn't effect or slow down me, I am going to stay hands off on what other people do.  And right now that is the case.