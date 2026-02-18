---
title: "Review of NDepend"
date: 2008-07-16T15:47:44-05:00
slug: "review-of-ndepend"
draft: false
tags:
  - "IdeaPipe"
  - "NDepend"
  - "Review"
description: "When I was asked to review NDepend I didn't want to do just another review. Because there are plenty of great reviews and I would just be adding to the..."
---

When I was asked to review [NDepend](http://www.ndepend.com) I didn't want to do just another review.  Because there are plenty of [great reviews](http://blog.andreloker.de/post/2008/07/08/NDepend-code-metrics-at-your-service.aspx) and I would just be adding to the noise.  So I am going to use this time to give a personal story of how NDepend has helped me restructure some code I have been working on.

As you are probably aware I have been working on a start up, called [IdeaPipe](http://www.ideapipe.com), we have been going full steam ahead since January 2008 to get IdeaPipe to the point where it is today.  Going at that break neck speed for almost 6+ months has left some raw spots in the code, that I have been putting off.  Because lets face it even though they are not optimal, they are returning the correct results.  Just like a rough draft for a book it is better to get all the way through it and get a good picture of the entire story as a whole, and go back and rework the spots that were created inorder to advance the storeline.  The same is true for software.

In large software projects you sometimes forget where these rough spots were and why you actually implimented something in a certain way.  Luckily for us we have tools like NDepend that provide base metrics telling you were you need to focus your work.

One of the features that I loved the most in NDepend was this CQL (Code Query Lanauge) that allows you to run SQL like queries against your assemblies.  So if you wanted to find all the private variables that didn't follow the rule of starting with "\_" that is as easy as running a SELECT query in the command window.  The CQL is by far the coolest software feature that I have seen in a while.

Overall I give NDepend a thumbs up.  I do have one request for the good folks at NDepend and that is to intigrate all the windows in to Visual Studio to provide a seemless experience for us developers.