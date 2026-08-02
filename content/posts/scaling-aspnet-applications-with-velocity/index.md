---
title: "Give Your ASP.NET Applications Velocity"
date: 2008-06-05T03:04:50-05:00
slug: "scaling-aspnet-applications-with-velocity"
draft: false
tags:
  - ".NET"
  - "C#"
  - "Distributed Cache"
  - "IdeaPipe"
  - "memcached"
  - "Velocity"
  - "Web"
description: "Scaling ASP.NET Application just got easier with a new technology that Microsoft has just released that they have dubbed codename \"Velocity\". This product..."
cover:
  image: "/images/2008/06/velocity.jpeg"
  alt: "Diagram of Velocity"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

Scaling ASP.NET Application just got easier with a new technology that Microsoft has just released that they have dubbed [codename "Velocity"](http://blogs.msdn.com/velocity/archive/2008/06/02/introducing-project-codename-velocity.aspx). This product is still in the early stages of development, but it is meant as a direct competitor against memcached. If you are not familiar with memcached, here is how it is described in Wikipedia:

> **memcached** (pronunciation: mem-cache-dee) is a general-purpose distributed memory caching system that was originally developed by Danga Interactive for LiveJournal, but is now used by many other sites. It is often used to speed up dynamic database-driven websites by caching data and objects in memory to reduce the number of times the database must be read. Memcached is distributed under a permissive free software license.

So basically it allows you to create a distributed memory cache across your server farm, that allows any computer in the server farm to access the data in the cache. So there is no more issues with storing session data on server farms, or worrying about setting up common SQL stores of temporary data. This is also very practical for reducing database stress on Web 2.0 sites, many of the top Web 2.0 sites use this to reduce reads on the database.   The biggest user of memcached to date is Facebook.  This diagram below gives a basic idea of how distributed caching works.

[![Diagram of Velocity](/images/2008/06/velocity.jpeg "Velocity Diagram")](/images/2008/06/velocity.jpeg)

There have been many Open Source projects for getting memcached working on C#, and most have been pretty successful, but because memcached was designed for the UNIX environment, porting memcached to a Windows Service has always lagged behind the actual releases of the required libraries to get memcached working. Enter Velocity, as the [Velocity team describes](http://blogs.msdn.com/velocity/archive/2008/06/03/microsoft-project-code-named-velocity-followup.aspx):

> Velocity is intended to provide distributed caching (in memory) for all .NET applications – from enterprise scale to web-scale. We believe that there are many applications that need a distributed caching mechanism, and that there is, therefore, a need for distributed caching as a core part of the .NET platform. We expect to have more integrated support for this functionality with other parts of the .NET platform in our upcoming releases.

There is also [a pretty nice Velocity writeup on MSDN](http://msdn.microsoft.com/en-us/library/cc645013.aspx) that goes in depth about how Velocity works as well as providing some basic code examples on how to get data into and out of your Velocity Cache. The current set of features looks pretty nice, and I can't wait for Velocity to become more stable so I can introduce it in to the [IdeaPipe](http://www.ideapipe.com) mix.

Here is a [breif overview](http://blogs.msdn.com/velocity/archive/2008/06/04/project-velocity-ctp1-features.aspx) of the **Current Features**:

1. Support for different cache types, partitioned and local
2. Support for different client types, simple and routing
3. Load Balancing & Dynamic Scaling
4. ASP.Net Integration, currently there is only a Session Provider
5. Key and Tag based Access

**And Beyond**

1. Availability - support for Failover when machines go down
2. Replicated Cache - another cache type
3. Embedded Topology - run the cache embedded within you application instead of as a cache service
4. Notifications - Get notified when a object in the cache is updated
5. Consistency Models - Support for both weak and strong consistency when doing reads/writes
6. Native client access to the cache service (E.g - PHP, C++ etc)
7. Manageability & Administration