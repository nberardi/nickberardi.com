---
title: "Apple iTunes 7.1 Released for Windows Vista"
date: 2007-03-12T03:31:58-05:00
slug: "apple-itunes-71-released-for-windows-vista"
draft: false
tags:
  - "Apple"
  - "iTunes"
  - "Microsoft"
  - "Windows Vista"
  - "Adobe"
description: "Well its offical Apple iTunes 7.1 was just recently released. This is the quote from the Apple Site on the release: About iTunes 7.1 for Windows iTunes is..."
---

Well its offical Apple iTunes 7.1 was just recently released. This is the quote from the [Apple Site](http://www.apple.com/support/downloads/itunes71forwindows.html) on the release:

> **About iTunes 7.1 for Windows**
> iTunes is the worldâ€™s best way to organize and enjoy your personal digital music and video collection with your Mac. iTunes is also the easiest way to sync music, videos, and more with your iPod.With iTunes, easily create a digital music and video collection by importing your personal music CDs or downloading your favorite songs and videos from the iTunes Store. Create your own playlists, perfect for any mood or occasion. Burn playlists to CDs and play them on your home stereo, or sync iPod with iTunes and enjoy your collection in your car or on the go.
> **Whatâ€™s New in this Version**
> Using iTunes 7.1, you can now enjoy your favorite iTunes movies, TV shows, music, and more from the comfort of your living room with Apple TV. iTunes 7.1 also supports a new full screen Cover Flow and improved sorting options to let you decide how iTunes should sort your favorite artists, albums, and songs.

You may remember my [previous article](http://www.coderjournal.com/2007/02/setting-up-itunes-on-windows-vista-64-bit/) talking about how to install iTunes 7.0.x on Windows Vista x64. Well I am getting ready to install iTunes 7.1 on my machine and will provide an update on the progress. Hopefully Apple has done a good job at getting iTunes to work with Windows Vista x64.

**Update:** (8:00 am) I have tried installing Apple iTunes 7.1 on my Windows Vista Ultimate x64 and it failed dismally. Gave me some error that said Apple iTunes installer could not run VBScript for the installer. I don't really understand why iTunes is using VBScript, because this is moving backwards from every other MSI installer, and this is actually the first program that I have had problems installing since upgrading to Windows Vista back at the end of November 2006. I really have a feeling this has to do with Apple programmers not understand Windows MSI Installer. Why can't Apple hire Windows Application developers like Microsoft hires Mac Application developers for its Office Suite. I will post another update as soon as I find a solution.

**Update:** (2:01 pm) Apparently Apple requires you to enabled VB Script which was disabled by Microsoft by default because of potential use by internet worms and trojan viruses. I have created a [step-by-step guide](http://www.coderjournal.com/2007/03/apple-wants-vista-to-run-un-secured-to-install-itunes/) to walk users through the process of enabled VB Script and then disabling it after the iTunes install is done. Apparently Apple is not the only vendor having problems with the disabling of the scripting languages in Vista, I have seen reports that Adobe Photoshop CS3 is having trouble installing because JScript is disabled. I am willing to put up with this for now, because it was a good move on Microsoft's part because of the harm the scripting languages have caused in the past.