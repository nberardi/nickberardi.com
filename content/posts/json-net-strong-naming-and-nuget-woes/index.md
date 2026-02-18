---
title: "JSON.NET Strong Naming And NuGet Woes"
date: 2012-04-03T15:33:23-05:00
slug: "json-net-strong-naming-and-nuget-woes"
draft: false
tags:
  - "ASP.NET"
  - "CodePlex"
  - "JSON.NET"
  - "NuGet"
  - "asp.net mvc"
  - "ASP.NET WebAPI"
description: "This post requires a little understanding about how strong naming works. It's complicated, but basically here is the jist: When you compile a library..."
---

This post requires a little understanding about how strong naming works. It's complicated, but basically here is the jist:

> When you compile a library against a strong named assembly, only that specific version of the assembly can be used with the assembly that you are compiling with out resorting to heroics. You may say what is the big deal that is how all libraries are compiled and linked. But that isn't true in .NET, if you don't have a strongly named assembly, you have for better terms a weakly named assembly.  And with weakly named assemblies there is no enforcement of the version, just the library name.  So this makes it possible for developers to update a referenced library without actually recompiling the original library that referenced it.  This is very powerful in the right hands, and pretty much what makes services like [NuGet](http://nuget.org) function with so many intermingling of references between projects.

So once you understand that and it has sort of sunk in.  Now consider what kind of monkey wrench would be thrown in to the NuGet references process if libraries were strongly signed.  Now consider the project that is strongly named is also the 5th most popular project on NuGet with over 125,000 downloads and is one of if not the most interreferenced library in NuGet.  That is a monkey wrench of epic proportions that can cause some real damage isn't it.
Well you have probably guessed that this isn't some hypothetical problem by the name of my post. **This is an actual problem in NuGet and is causing the community great pains** against the ever popular and wonderful library called [JSON.NET](http://json.codeplex.com/) by [James Newton-King](http://james.newtonking.com/). You all have probably heard of it and used it in the past, here is a brief description of it if you haven't:
> Json.NET is a popular high-performance JSON framework for .NET
>
> #### Features
>
> - Flexible JSON serializer for converting between .NET objects and JSON
> - LINQ to JSON for manually reading and writing JSON
> - High performance, faster than .NET's built-in JSON serializers
> - Write indented, easy to read JSON
> - Convert JSON to and from XML
> - Supports .NET 2, .NET 3.5, .NET 4, Silverlight, Windows Phone and Windows 8 Metro.

Now that you understand the scope of the problem and the library involved, consider the fact that the [ASP.NET Web Stack](http://aspnetwebstack.codeplex.com/) is also going to be using this library, so every developer that is going to be using ASP.NET MVC, Web API, or Web Pages is going to be taking on a reference to JSON.NET in the next release of the framework.

I hope you are starting to realize the boondoggle that is being created here.  Because there are some popular libraries that are slow to update because of their development cycles and the maintainers can't jump on every JSON.NET release every month, and sometimes daily as happened in January 2012.

[![](/nickberardi.com/images/2012/04/Untitled1.png "Untitled")](http://nuget.org/packages/Newtonsoft.Json)

These monthly releases create undue pressure on the community as a whole especially when this library is one of the most referenced libraries on NuGet. And with the ASP.NET and many other teams in Microsoft moving to NuGet as distribution model, **this problem is only going to get worse**. And what are the chances that Microsoft is going to want to update the ASP.NET framework monthly and sometimes daily, based on James continuous release cycles.

![](/nickberardi.com/images/2012/04/Support-a-cause-Its-all-in-the-wrist-P4LL587-x-large.jpg "Support-a-cause-Its-all-in-the-wrist-P4LL587-x-large")Don't get me wrong, I love it when developers are constantly updating their libraries, but because of **the scope of JSON.NET's use, it is creating a burden on the ecosystem as a whole**. I am not advocating that James stop updating JSON.NET monthly and daily if he sees fit, **what I am advocating is dropping the strong naming of libraries pushed to NuGet**. That is why I am writing this blog post and that is why I am hoping you will support me and my effort to get James to stop signing NuGet assemblies.

**Please support me and the community as a whole by voting up this request for JSON.NET to stop being signed on NuGet assemblies.**

[Work Item 22458 : Don't Strong Name NuGet Assemblies](http://json.codeplex.com/workitem/22458)

All that you have to do if you support this effort is to click the vote button on the work item. And leave a comment of support if you have anything to add to what I have said.

Thanks for the help and support.