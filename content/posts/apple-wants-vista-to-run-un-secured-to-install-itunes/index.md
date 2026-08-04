---
title: "5 Easy Steps To Get iTunes Working On Windows Vista x64"
date: 2007-03-12T10:01:14-05:00
slug: "apple-wants-vista-to-run-un-secured-to-install-itunes"
draft: false
tags:
  - "Apple"
  - "iPhone"
  - "iTunes"
description: "This morning I wrote about the problems I had installing the newly released iTunes for Windows Vista Ultimate x64. I just recently found a solution to the..."
---

This morning I [wrote about the problems](/posts/apple-itunes-71-released-for-windows-vista/) I had installing the newly released iTunes for Windows Vista Ultimate x64. I just recently found a solution to the problem error that iTunes was giving me when I tried to install it this morning. The error was:

> iTunes could not be installed because Visual Basic Script (VBScript) is not installed or has been disabled. Make sure VBScript is installed, turn off script blocking in anti-virus and personal firewall software, re-register VBScript, and then install iTunes.

And the solution is to simple register the `vbscript.dll`. To do this you just need to follow the next 3 steps:

1. Open up the *Command Prompt* as an Administrator (Go to All Programs > Accessories and Right Click on Command Prompt and then choose Run as administrator)
2. Type `cd C:\Windows\SysWOW64`
3. Type `regsvr32 vbscript.dll` *(This registers VB Script with your computer.)*
4. Now install iTunes as you normally would by double clicking on the install program and wait for iTunes to finish installing.
5. Type `regsvr32 /u vbscript.dll` *(This unregisters VB Script with your computer.)*

If the above didn't work for you, you may be using a 32-bit version of Windows. Please check out the [Apple Support #304405](http://docs.info.apple.com/article.html?artnum=304405 "iTunes and QuickTime for Windows cannot be installed without Visual Basic Script (VBScript)"), which will walk you through the process to enabled VBScript on Windows 32-bit.

Please read more if you would like to hear my rant against Apple and the security vulnerability this opens up in the Windows Operating System. On a side note Apple should be congratulated, I guess, for fixing [a bug I documented almost 3 months ago](/posts/setting-up-itunes-on-windows-vista-64-bit/) when trying to install iTunes on Vista x64.

**Rant**

On a personal note this is one of things that pisses me off about Apple.

According to this commercial Apple leads you to believe it is much more secure than Windows Vista. Forgetting all the points people normally bring up about Apple and security. Apple wants you the Windows Vista user, to **enabled**, [VB Script](http://en.wikipedia.org/wiki/Vbscript) a scripting language that has been responsible for more trojan and worms floating around the internet than any other on the face of this earth. All in order to install one of the earths most popular programs to get our daily audio fix. So we have to disable security measures built in to protect the operating system from malicious code and leave our selves wide open.This would be the equivalent to Microsoft telling Mac People to disable buffer overflow protection in order to install Microsoft Office for the Mac. Or VMWare telling its customers you must leave your network wide open in order to use their product. This is just bad programming on Apple's part. Maybe if they took 1/1000 of the time they spend on the UI and actually use that time to train their developers on effective programming concepts these problems wouldn't happen.So as an important note please, please, please follow the last step and un-register VB Script, if the developer of the scripting language, Microsoft, shipped it unregistered and acknowledges the potential for danger you should definitely heed that warning.Also Apple should hang it's head in shame for still using VB Script to install applications. It is not necessary if they effectively use the Microsoft Software Installation framework, which I know they know about because they did a half assed job at using it to install iTunes.

**Update:** I have been getting many thanks for these easy 5 steps to getting iTunes working on their Windows Vista machines. If you would really like to do something for me, please visit one of the sponsors to the right or the left. They are how I support this site and keep it running.

**Update (2007-07-24):** Many people have also found this [article helpful](/posts/setting-up-itunes-on-windows-vista-64-bit/ "Setting up iTunes on Windows Vista 64 bit") in installing iTunes on Windows Vista x64, it is an easy hack that allows you to fool QuickTime in to working correctly.

**Update (2007-09-19):** A couple people have reported being able to get the iPhone working on Windows Vista x64 with the steps listed up above. If you have luck with this please let me know, I personally do not own an iPhone to confirm this, however if this is actually true it would be major breaking news.