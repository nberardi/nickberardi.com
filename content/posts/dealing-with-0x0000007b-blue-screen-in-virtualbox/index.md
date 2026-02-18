---
title: "Dealing With 0x0000007B Blue Screen in VirtualBox"
date: 2012-03-07T04:28:47-05:00
slug: "dealing-with-0x0000007b-blue-screen-in-virtualbox"
draft: false
tags:
  - "VirtualBox"
description: "One of the great things about VirtualBox is that it allows you to open up, mount, and run any hard drive from the other 3 major manufactures. VMWare,..."
---

One of the great things about VirtualBox is that it allows you to open up, mount, and run any hard drive from the other 3 major manufactures.  VMWare, Microsoft, and Parallels.  However one of the bad things is that there are no automated utilities that just make them work like some of the manufactures provide.  And a common issue that I have always run into, especially when converting from VMWare to VirtualBox is this error.

[caption id="attachment*1519" align="alignnone" width="642" caption="STOP 0x0000007B INACCESSABLE*BOOT\_DEVICE"]![STOP 0x0000007B INACCESSABLE_BOOT_DEVICE](http://coderjournal.com/uploads/2012/03/BlueScreen0x0000007B.png "Blue Screen STOP 0x0000007B INACCESSABLE_BOOT_DEVICE")[/caption]

This error above specifically relates to the fact that Windows really hates you just changing hard drive controllers all willy-nilly, which is essentially what is happening when you switch from one VM to another. Luckily I have found sort of a fail-safe that seems to work in most if not all cases for me when switching to VirtualBox.

### Solution

Your default configuration in VirtualBox probably looks something like the following:

![](http://coderjournal.com/uploads/2012/03/VirtualBox-SATA.png "VirtualBox-SATA")

However to get an existing hard drive to boot, that has been created with another Hypervisor, I have found you need to have this as your setup to get Windows to boot initially.

![](http://coderjournal.com/uploads/2012/03/VirtualBox-IDE.png "VirtualBox-IDE")

The choice of PIIX4 as the Type also seems to be important, but play with the Type first if you fail boot with PIIX4, before giving up.