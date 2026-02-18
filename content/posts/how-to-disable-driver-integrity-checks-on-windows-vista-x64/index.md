---
title: "How To: Disable Driver Integrity Checks on Windows Vista x64"
date: 2007-07-22T03:39:24-05:00
slug: "how-to-disable-driver-integrity-checks-on-windows-vista-x64"
draft: false
tags:
  - "Microsoft"
  - "Windows Vista"
description: "One of the new features of Windows Vista was the Driver integrity Checks. In the x64 version of the product it is turned on by default, and is a great..."
---

One of the new features of Windows Vista was the Driver integrity Checks. In the x64 version of the product it is turned on by default, and is a great idea to prevent kernel level access to only drivers that have passed the Microsoft Testing for security and performance. However this feature can be rather annoying since Microsoft hasn't even released signed drivers for all their products. (i.e. Streets & Trips GPS Device) So I have included the following steps in order to disable the driver signing integrity checks, so that you can install unsigned drivers.

**Note:** You should only do this if you are experiencing driver installs getting blocked and you use this driver on a daily basis. Because there is an [F8 boot option](http://www.security-hacks.com/2007/05/07/vista-disable-driver-signing-verification-in-64-bit) that will temporarily disable driver signing for other needs and also this is a very good feature that helps prevent spyware and other nastys from gaining access to your OS.

1. Log in to Windows with a user name that has administrative access.
2. Right click on *Start > Accessories > Command Prompt*
3. Select *Run as administrator*
4. In the command prompt type `bcdedit /set nointegritychecks on`
5. Reboot.

To turn driver signing back on do the following:

1. Follow steps 1-4 from above.
2. In the command prompt type `bcdedit /set nointegritychecks off`
3. Reboot.

So it is that easy.