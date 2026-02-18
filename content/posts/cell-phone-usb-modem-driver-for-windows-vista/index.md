---
title: "Cell Phone USB Modem Driver for Windows Vista"
date: 2007-02-25T06:28:15-05:00
slug: "cell-phone-usb-modem-driver-for-windows-vista"
draft: false
tags:
  - "Microsoft"
  - "Verizon"
  - "Windows Vista"
description: "When Windows Vista first came out nearly 3 months ago, I had a difficult time getting my XV-6700 PDA Phone from Verizon to connect to my laptop as a CDMA..."
---

When Windows Vista first came out nearly 3 months ago, I had a difficult time getting my XV-6700 PDA Phone from Verizon to connect to my laptop as a CDMA Modem. After much searching and reading of Microsoft KB articles I realized this driver had been floating around the Smartphone world since 2002. However Microsoft had changed the way they wanted winmodem drivers written around the time of Windows XP SP1, however Windows XP was still backwards compatible. However when Windows Vista was released they made the new driver format the rule, and thus the reason the 7 year old driver will not work.

So after I understood the problem I set out to change the driver based on this [KB837637](http://support.microsoft.com/kb/837637) article from Microsoft. And the follow picture shows how easy in the changes were to make the driver fully Windows Vista complaint.   
[![Winmodem Smartphone Driver Diff](http://coderjournal.com/uploads/2007/02/driverdiff1.png)](http://coderjournal.com/uploads/2007/02/driverdiff1.png "Winmodem Smartphone Driver Diff")

So after the work I have done, which you can imagine it was mostly reading and understanding of the problem, I am giving this driver way free to my readers and anybody else who would like it. I provide no warranty or support for the above driver.   
**[Download Smartphone USB Modem Driver](http://coderjournal.com/uploads/2007/02/smartphone_usb_modem1.zip "Smartphone USB Modem Driver")**

If you need help getting this driver to work with your Cell Phone, please check out the great articles from Engadget. They are Verizon and Sprint (CDMA) specific but should easily translate to Cingular and other GSM providers.

- [How To: Use your EV-DO Pocket PC Phone for Internet Access](http://www.engadget.com/2006/10/03/how-to-use-your-ev-do-pocket-pc-phone-for-internet-access/)
- [How To: Use your CDMA cellphone as a USB Modem](http://www.engadget.com/2005/01/18/how-to-use-your-cdma-cellphone-as-a-usb-modem/4)

**Update:** This driver was originally made by HTC, however there should be nothing preventing your from using it with other PDA devices that use the Pocket PC winmodem program.