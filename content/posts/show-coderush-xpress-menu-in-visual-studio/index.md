---
title: "Show CodeRush Xpress Menu in Visual Studio"
date: 2009-08-04T16:30:50-05:00
slug: "show-coderush-xpress-menu-in-visual-studio"
draft: false
tags:
  - "CodeRush"
  - "Xpress"
description: "Recently I have been going back and forth between R# and CodeRush. Right now I am in my CodeRush phase trying out the functionality with CodeRush Xpress,..."
---

Recently I have been going back and forth between R# and CodeRush. Right now I am in my CodeRush phase trying out the functionality with [CodeRush Xpress](http://devexpress.com/Products/Visual_Studio_Add-in/CodeRushX/), however I found it lacking in the way that you couldn't actually change the options that were setup for you by default. This happens in CodeRush Xpress probably out of an attempt to make the use of CodeRush more simplistic to the Xpress users, or maybe they don't want to give all the tweaking options in the free version.  Either way it was annoying because I like some of the features but others just slow me down when I am working through a Remote Desktop connection by constantly tiggering redraws of the Visual Studio interface code window.

Eventually [Rory Becker](http://rorybecker.blogspot.com/), who is a CodeRush fanatic, turned me on to two different way you can access the *Options* menu of CodeRush Xpress.

The Keyboard Command Way

> `Shift+Ctrl+Alt+O`

The Registry Hack Way

- [Show Menu for CodeRush Xpress (x86)](http://coderjournal.googlecode.com/svn/trunk/Posts/2009/08/ShowMenuCodeRushXpress_x32.reg)
- [Show Menu for CodeRush Xpress (x64)](http://coderjournal.googlecode.com/svn/trunk/Posts/2009/08/ShowMenuCodeRushXpress_x64.reg)

Hope this helps somebody besides me.

**Update:** Sorry about that had a server configuration mishap for delivering Windows Registry files, I have moved them to [my Google Code download](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2009/08) location.