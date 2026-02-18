---
title: "Best Practices for Production ASP.NET Applications"
date: 2008-02-13T12:21:41-05:00
slug: "best-practices-for-production-aspnet-applications"
draft: false
tags:
  - "Deployment"
  - "Production"
  - "Web"
  - "Best Practices"
description: "I would like to thank Kyle Beyer of Daptivate for putting this post together. This is a great resource for developers as well as server administrators...."
---

I would like to thank Kyle Beyer of Daptivate for putting [this post](http://daptivate.com/archive/2008/02/12/top-10-best-practices-for-production-asp-net-applications.aspx) together. This is a great resource for developers as well as server administrators. Some of what I think are the most critical steps for any production server I have pulled out below for your browsing pleasure.

### 1. Generate new encryption keys

When moving an application to production for the first time it is a good idea to generate new encryption keys. This includes the machine validation key and decryption key as well as any other custom keys your application may be using. There is [an article on CodeProject](http://www.codeproject.com/KB/aspnet/machineKey.aspx "ASP.NET machineKey Generator") that talks about generating machineKeys specifically that should be helpful with this.

**My Take:**This is very important, which is why I think it is number 1, especially if you have a standard image that you burn on all your new servers. This is important because this is the base encryption key that .NET uses when securing any of its data/communications.

### 4. Set retail="true" in your machine.config

```
<configuration>  
    <system.web>
        <deployment retail="true"/>
    </system.web>
</configuration>
```

This will kill three birds with one stone. It will force the 'debug' flag in the web.config to be false, it will disable page output tracing, and it will force the custom error page to be shown to remote users rather than the actual exception or error message. For more information you can read [Scott Guthrie's post](http://weblogs.asp.net/scottgu/archive/2006/04/11/442448.aspx "Don't run production ASP.NET Applications with debug=") or the [MSDN reference](http://msdn2.microsoft.com/en-us/library/ms228298%28VS.80%29.aspx "maching.config deployment element (ASP.NET Settings Schema)").

### 6. Set the memory limit for your application pool

When creating the application pool, specifically set the memory limit rather than the time limit which is set by default. [Asp.net](http://www.asp.net/) has a [good whitepaper](http://www.asp.net/learn/whitepapers/aspnet-and-iis6/ "Running ASP.NET 1.1 with IIS 6.0") which explains the value of this:

> By default IIS 6.0 does not set a limit on the amount of memory that IIS is allowed to use. ASP.NET’s Cache feature relies on a limitation of memory so the Cache can proactively remove unused items from memory. It is recommended that you configure the memory recycling feature of IIS 6.0.

### 7. Create and appropriately use an app\_Offline.htm file

There are many benefits to using this file. It provides an easy way to take your application offline in a somewhat user friendly way (you can at least have a pretty explanation) while fixing critical issues or pushing a major update. It also forces an application restart in case you forget to do this for a deployment. Once again, ScottGu is the [best source](http://weblogs.asp.net/scottgu/archive/2006/04/09/442332.aspx "App_Offline.htm and working around the ") for more information on this. This actually returns an HTTP Response Code of "503 Service Unavailable" which is the Google friendly way of saying we are down for an update.

And my own addition to this great list would be. These are some of my own personal best practices that I try to keep.

### \* Don't use the Default Website instance

I don't like using the Default Website instance in IIS, it is created by default and much like the Automatic "First Post" which is part of any blog software, it is usually the first to be deleted on my servers. I prefer naming my web site instances after my domain that is going to be hosted, so for example in IIS for Coder Journal the web site instance is called *coderjournal.com*.

### \*\* Don't use the wwwroot folder to host your websites

Much like how I don't like using the standard Default Website instance in IIS I also don't like using the *c:\inetpub\wwwroot\* folder. I usually try to put all my websites on a separate partition. If I don't have a separate partition I create a folder on the *c:\* driver where all my websites will be stored.