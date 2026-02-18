---
title: "ASP.NET MVC 1.0 Release Candidate 2"
date: 2009-03-03T18:04:46-05:00
slug: "aspnet-mvc-10-release-candidate-2"
draft: false
tags:
  - "database"
  - "Web"
  - "Wrox"
  - "asp.net mvc"
  - "Book"
description: "Phil Haack has announced the availability of ASP.NET MVC 1.0 Release Candidate 2. You can download the new version from Microsoft. Source code and samples..."
---

[![Final Cover Photo](http://coderjournal.com/uploads/2009/03/final-book-cover11.jpg "Final Cover Photo")](http://www.amazon.com/gp/product/0470410957?tag=coderjournal-20 "ASP.NET MVC 1.0 Website Design: Problem - Design - Solution")Phil Haack has [announced](http://haacked.com/archive/2009/03/03/aspnetmvc-changes-for-rc2.aspx) the availability of ASP.NET MVC 1.0 Release Candidate 2.

You can [download the new version](http://go.microsoft.com/fwlink/?LinkId=144443) from Microsoft. Source code and samples are also available on [the ASP.NET CodePlex workspace](http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=24142#ReleaseFiles).

Overall, this new version doesn’t have many changes in the area of development and tooling, but there has been improvement for deploying ASP.NET MVC applications.  The setup process now requires .NET 3.5 SP1 to be installed, where in the past it was optional because the additional assemblies where included with the install.

Don't worry though /bin deployment is still supported, they are not taking a runtime dependency on SP1 other than our existing dependency on `System.Web.Routing.dll` and `System.Web.Abstractions.dll`. Thus you can still bin deploy your application to a hosting provider who has .NET 3.5 installed without SP1 by following [these instructions](http://haacked.com/archive/2008/11/03/bin-deploy-aspnetmvc.aspx "Bin Deploy ASP.NET MVC").

They are also adding an option to the installer that enables installing on a server that does not have Visual Studio at all on the machine, which is useful for production servers and hosting providers.  To do a server install you just need to run the following command to install MVC on your server.

> `msiexec /i AspNetMvc-setup.msi /q /l*v .mvc.log MVC_SERVER_INSTALL="YES"`

Also because of the latest breaking changes from Beta to RC 1 & 2, we are taking the time between now and the final release of the MVC Framework to work on the book and make sure all the loose ends are tied up.

I also got noticed today that our final cover design is done.  So we are in the final stretch of this book.  The cover hasn't been uploaded to Amazon yet, but if you are [interested in pre-ordering a copy](http://www.amazon.com/gp/product/0470410957?tag=coderjournal-20) just click on the cover image to your right and it will take you to [the Amazon page where you can place your order](http://www.amazon.com/gp/product/0470410957?tag=coderjournal-20).