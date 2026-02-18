---
title: "Uninstalling Windows Phone Developer Tools CTP"
date: 2010-07-12T08:05:20-05:00
slug: "uninstalling-windows-phone-developer-tools-ctp"
draft: false
tags:
  - "Windows Phone 7"
  - "Beta"
description: "Today I decided to upgrade to the Beta of the Windows Phone Developer Toolkit, however the uninstall process wasn’t working.&#160; It kept asking me what..."
---

Today I decided to upgrade to the [Beta of the Windows Phone Developer Toolkit](http://www.microsoft.com/downloads/details.aspx?FamilyID=c8496c2a-54d9-4b11-9491-a1bfaf32f2e3&displaylang=en#filelist), however the uninstall process wasn’t working.  It kept asking me what I wanted to install every time I choose the uninstall radio button.

So after a couple failed attempts at uninstalling in different ways, I decided to go to the source, in my case that was:

> C:\Program Files (x86)\Microsoft Visual Studio 10.0\Microsoft Visual Studio 2010 Express for Windows Phone  CTP – ENU

After in the folder, I just had to right click on the *vs\_setup.msi* file and select **Uninstall**, after that the process worked like a charm and I could then install the beta.  Hope this helps someone besides me.