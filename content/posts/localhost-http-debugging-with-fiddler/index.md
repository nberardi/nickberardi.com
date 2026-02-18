---
title: "Localhost HTTP debugging with Fiddler"
date: 2008-03-10T08:23:52-05:00
slug: "localhost-http-debugging-with-fiddler"
draft: false
tags:
  - "Fiddler"
  - "How To"
  - "localhost"
  - "Ping"
  - "somesite.com"
  - "127.0.0.1"
description: "I have been a huge fan of Fiddler the HTTP Debugging Proxy for a couple years now. However one thing that always bugged me about any network debugging..."
---

I have been a huge fan of [Fiddler the HTTP Debugging Proxy](http://www.fiddlertool.com/fiddler/) for a couple years now. However one thing that always bugged me about any network debugging tool was the fact that it could not debug *localhost* or *127.0.0.1*. However I just found a solution while racking my brain for a way to debug one of my local projects.

I don't know if many of you are aware but the website <http://localhostproxy.com> points to *127.0.0.1* as a standard for URL examples.

> ping localhostproxy.com
> Pinging localhostproxy.com [127.0.0.1] with 32 bytes of data:
> Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
> Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
> Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
> Reply from 127.0.0.1: bytes=32 time<1ms TTL=128
> Ping statistics for 127.0.0.1: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
> Approximate round trip times in milli-seconds: Minimum = 0ms, Maximum = 0ms, Average = 0ms

So if *localhostproxy.com* points to the same local IP address as *localhost*, I figured that I could just use *localhostproxy.com* instead of *localhost* in my projects. I used the following setup:

[![Visual Studio localhostproxy.com Setup](/nickberardi.com/images/2008/03/visual-studio-somesitecom-setup1.png)](/nickberardi.com/images/2008/03/visual-studio-somesitecom-setup1.png "Visual Studio localhostproxy.com Setup")

With the above setup I was able to get Fiddler to monitor my *localhost* traffic my tricking the network card to go external for the *localhostproxy.com* reference.

[![Fiddler localhostproxy.com](/nickberardi.com/images/2008/03/fiddler-somesitecom1.png)](/nickberardi.com/images/2008/03/fiddler-somesitecom1.png "Fiddler localhostproxy.com")

So basically that is all that I needed to do and it make pretty quick work of getting around the localhost problem.

**Updated:** Updated domain to **localhostproxy.com** instead of **somesite.com**, because *somesite.com* was swallowed up by a squatter.