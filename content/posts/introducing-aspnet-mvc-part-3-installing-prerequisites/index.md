---
title: "Introducing the ASP.NET MVC (Part 3) - Installing the Prerequisites"
date: 2009-01-05T14:50:02-05:00
slug: "introducing-aspnet-mvc-part-3-installing-prerequisites"
draft: false
tags:
  - ".NET"
  - "C#"
  - "Chapter 2"
  - "Web"
  - "Wrox"
  - "asp.net mvc"
  - "Book"
description: "This is a continuation of my Introduction to ASP.NET MVC series. As I outlined before this is in an effort to write the book and keep blogging, I decided..."
cover:
  image: "/images/2009/01/410950-f02031.png"
  alt: "Figure 2-3"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

This is a continuation of my Introduction to ASP.NET MVC series.  As I outlined before this is in an effort to write [the book](http://www.amazon.com/dp/0470410957/?tag=coderjournal-20 "ASP.NET MVC Website Programming Problem Design Solution (Paperback)") and keep blogging, [I decided to write/blog the last chapter](http://twitter.com/nberardi/status/1052827985), Chapter 2.  I am doing this so I can receive feedback on this chapter as early as possible.  Because this chapter, in my opinion, is probably the most critical of the book, it defines the context around ASP.NET MVC and how it differs from ASP.NET Web Forms, as well as giving a historical perspective of the MVC pattern.

In the next several posts we will cover the following parts of Chapter 2 from [the book](http://www.amazon.com/dp/0470410957/?tag=coderjournal-20 "ASP.NET MVC Website Programming Problem Design Solution (Paperback)"):

- [The Model-View-Controller Pattern](http://www.coderjournal.com/2008/12/introducing-aspnet-mvc-part-1-model-view-controller/)
- [ASP.NET MVC vs. ASP.NET Web Forms](http://www.coderjournal.com/2008/12/introducing-aspnet-mvc-part-2-aspnet-mvc-vs-webforms/)
- [Installing the Prerequisites](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-3-installing-prerequisites/)
- [Your First ASP.NET MVC Project](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-4-first-aspnet-mvc-project/)
- [The Model](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-5-the-model/)
- [The View](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-6-the-view/)
- [The Controller](http://www.coderjournal.com/2009/02/introducing-aspnet-mvc-part-7-the-controller/)

|  |  |
| --- | --- |
|  | [ASP.NET MVC 1.0 Website Programming: Problem - Design - Solution](http://www.amazon.com/dp/0470410957?tag=omniportal-20&camp=15041&creative=373501&link_code=as3)  by Nick Berardi New: $31.49  This item has not yet been released. You may order it now and we will ship it to you when it arrives. |

### Installing the Prerequisites

To start developing ASP.NET MVC and to run the code in this book, you will need the following prerequisites installed on your system:

1. Visual Web Developer 2008 Express Edition SP1
   <http://www.microsoft.com/express/download/>
2. SQL Server 2005 Express Edition
   <http://www.microsoft.com/express/sql/download/>
3. Micorosft.NET Framework 3.5 SP1
   <http://msdn.microsoft.com/en-us/netframework/>
4. Microsoft ASP.NET MVC
   <http://www.asp.net/mvc/>

You can cover prerequisites 1-3 by downloading just the Visual Web Developer 2008 Express Edition installation file, which includes .NET 3.5 SP1 by default and SQL Server 2008 Express Edition as an optional add-on during the install process.

If you have already installed all of the software above, or have an edition of the software that is better you may skip to the *Your First ASP.NET MVC Project* section.

#### Installing the Software

Now that all the prerequisites have been downloaded, we can install them to get your development machine ready for the ASP.NET MVC development we will be doing over the course of this book.

The first thing we will want to do is double-click the Visual Web Developer 2008 Express Edition installation file.  Figure 2-3 is the first window you will see of the installation process:

[caption id="attachment\_435" align="alignnone" width="506" caption="Figure 2-3"]![Figure 2-3](/images/2009/01/410950-f02031.png "Install VS Step 1")[/caption]

Now, click on **Next**, and you will see the screen shown in Figure 2-4.

[caption id="attachment\_436" align="alignnone" width="506" caption="Figure 2-4"]![Figure 2-4](/images/2009/01/410950-f02041.png "Install VS Step 2")[/caption]

Now, read the license and accept the agreement and click on **Next**, and you will see the screen shown in Figure 2-5.

[caption id="attachment\_437" align="alignnone" width="506" caption="Figure 2-5"]![Figure 2-5](/images/2009/01/410950-f02051.png "Install VS Step 3")[/caption]

With this screen if you don't already have *SQL Server 2008 Express Edition* installed you will want to check the appropriate options.  Then click **Next**, and you will see the screen shown in Figure 2-6.

[caption id="attachment\_438" align="alignnone" width="506" caption="Figure 2-6"]![Figure 2-6](/images/2009/01/410950-f02061.png "Install VS Step 4")[/caption]

Next, click on **Install**, and you will see the screen shown in Figure 2-7.

[caption id="attachment\_439" align="alignnone" width="506" caption="Figure 2-7"]![Figure 2-7](/images/2009/01/410950-f02071.png "Install VS Step 5")[/caption]

Next the installer will download the required installation files to properly configure your machine, it may take anywhere between 10 minutes to an unspecified amount of time, depending on your internet connection, to complete the download.  After the download completes you will see a installation screen that looks like Figure 2-8.

[caption id="attachment\_440" align="alignnone" width="506" caption="Figure 2-8"]![Figure 2-8](/images/2009/01/410950-f02081.png "Install VS Step 6")[/caption]

The last step is the installation of the software.  Your machine may need to be rebooted, so make sure to reboot your machine right away, because Microsoft SQL Server 2008 Express Edition still needs to install.  The installation will be automatically started after Windows restarts.  Figure 2-9 shows what the installation screen looks like after the reboot.

If your machine automatically reboots during the installation process it is because there was a required update that needed to occur before the installation of Visual Web Developer.  If this happens you will need to start the installation process over, and follow the same steps from the beginning of this section.  Don't worry the download process will be much quicker because the downloads have already been cached in Windows temporary directory.

[caption id="attachment\_441" align="alignnone" width="506" caption="Figure 2-9"]![Figure 2-9](/images/2009/01/410950-f02091.png "Install VS Step 7")[/caption]

When everything has completed successfully you will see the final screen that looks like Figure 2-10.

[caption id="attachment\_442" align="alignnone" width="506" caption="Figure 2-10"]![Figure 2-10](/images/2009/01/410950-f02101.png "Install VS Step 8")[/caption]

The next thing we want to install is ASP.NET MVC, you can do this by double-clicking the installation file that we downloaded earlier.  Figure 2-11 is what the screen will look like.

[caption id="attachment\_443" align="alignnone" width="499" caption="Figure 2-11"]![Figure 2-11](/images/2009/01/410950-f02111.png "Install MVC Step 1")[/caption]

Now, click on **Next**, and you will see the screen shown in 2-12.

[caption id="attachment\_444" align="alignnone" width="499" caption="Figure 2-12"]![Figure 2-12](/images/2009/01/410950-f02121.png "Install MVC Step 2")[/caption]

Now, read the license and accept the agreement and click on **Next**, and you will see the screen shown in Figure 2-13.

[caption id="attachment\_445" align="alignnone" width="499" caption="Figure 2-13"]![Figure 2-13](/images/2009/01/410950-f02131.png "Install MVC Step 3")[/caption]

Next, click on **Install**, and you will see the screen shown in Figure 2-14.

[caption id="attachment\_446" align="alignnone" width="499" caption="Figure 2-14"]![Figure 2-14](/images/2009/01/410950-f02141.png "Install MVC Step 4")[/caption]

When everything has completed successfully you will see the final screen that looks like Figure 2-15.

[caption id="attachment\_447" align="alignnone" width="499" caption="Figure 2-15"]![Figure 2-15](/images/2009/01/410950-f02151.png "Install MVC Step 5")[/caption]

We are now ready to start developing our first ASP.NET MVC application project.  So let's get started.

This post is licensed under a different license than the rest of my site. Copyright © Wiley Publishing Inc 2009