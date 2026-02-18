---
title: "Setting up iTunes on Windows Vista 64-bit"
date: 2007-02-08T06:37:24-05:00
slug: "setting-up-itunes-on-windows-vista-64-bit"
draft: false
tags:
  - "Apple"
  - "iTunes"
  - "Microsoft"
  - "Windows Vista"
  - "64-bit"
description: "Many of my co-workers and friends have been having trouble setting up iTunes on Windows Vista 64-bit. So I thought I would put together a quick reference..."
---

Many of my co-workers and friends have been having trouble setting up iTunes on Windows Vista 64-bit. So I thought I would put together a quick reference sheet that will make it easier, since Apple hasn't quite got their act together yet.

**Background on Windows 64-bit**   
In the 64-bit versions of Windows there are two locations for programs to be stored by default.

- **Program Files** - All the 64-bit applications that can run with out any assistance from the 32-bit emulator.
- **Program Files (x86)** - All the 32-bit applications that need the 32-bit emulator to help then run under the 64-bit versions Windows.

**Problem**   
When installing the latest version of iTunes (7.0.2) on Windows Vista 64-bit the install of the QuickTime software completes successfully, however when the iTunes software tries to install the application it produces an error message saying that it cannot find the QuickTime installation.

This is happening because QuickTime software is getting installed in the **Program Files (x86)** since it is not a 64-bit application. And the iTunes application specifically looks for it in the **Program Files** directory. I don't know why the Apple iTunes programmers thought hard coding a path was a good idea, because they definitely could have looked up the install directory in the Windows Registry. As every programmer knows and has been slapped on the wrist by a more experienced programmer you should never hard code possible variations to your program. Especially if it is a hard drive path, because a non-standard install of QuickTime would lead to the same problem.

**Solution**   
Basically the solution is very easy and involves a new feature in Windows Vista called a [symbolic link](http://www.howtogeek.com/howto/windows-vista/using-symlinks-in-windows-vista/).

1. Open up the *Command Prompt* as an Administrator (Go to All Programs > Accessories and Right Click on Command Prompt and then choose Run as administrator)
2. Create a QuickTime folder in both **Program Files (x86)**
   `mkdir "c:\Program Files (x86)\QuickTime"`
3. Now we create a symbolic link to the **Program Files** directory
   `mklink /d "c:\Program Files\QuickTime" "c:\Program Files (x86)\QuickTime"`
4. Now install iTunes as you normally would by double clicking on the install program.

If all the steps were followed from above you will have no problem getting iTunes to install correctly on Windows Vista 64-bit.

**Update:** If you are still having trouble you are probably experiencing the VB Script issue, where Apple wants you to run in an unsecured mode to install iTunes. I have outlined the steps to install iTunes in the [following article](http://www.coderjournal.com/2007/03/apple-wants-vista-to-run-un-secured-to-install-itunes/ "Apple wants Vista to run un-secured to install iTunes").

**Update (2007-7-12):** I have been getting many thanks for this article as well as my other iTunes articles relating to Vista. If you would really like to do something for me, please visit one of the sponsors to the right or the left. They are how I support this site and keep it running.

**Update (2008-1-21):** One of the [commenter's below](http://www.coderjournal.com/2007/02/setting-up-itunes-on-windows-vista-64-bit/#comment-832), found out that if you download iTunes from your Internet Explorer 64-bit version you get a version of iTunes that is 64-bit compatible. Now if Apple would only notify its users of this. Or fix their downloading software, or even the iTunes installer, to better detect Windows Vista 64-bit everybody would be in perfect shape. This is still a problem that could be easily avoided by Apple.