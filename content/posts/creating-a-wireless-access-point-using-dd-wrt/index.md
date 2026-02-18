---
title: "Creating a Wireless Access Point using DD-WRT"
date: 2008-12-27T22:15:48-05:00
slug: "creating-a-wireless-access-point-using-dd-wrt"
draft: false
tags:
  - "DD-WRT"
  - "How To"
  - "Linksys"
  - "Tomato"
  - "WRT150N"
  - "WRT54G"
description: "This post is a reminder to myself in case I ever need to troubleshoot this setup process again, but I thought I would post it just in case it is useful to..."
---

This post is a reminder to myself in case I ever need to troubleshoot this setup process again, but I thought I would post it just in case it is useful to somebody else.

A couple days ago I ordered myself a [Linksys WRT150N](http://www.newegg.com/Product/Product.aspx?Item=N82E16833124318) to replace my aging Linksys WRT54G wireless router. I wanted to update my wireless capabilities to the latest [802.11 Draft N](http://en.wikipedia.org/wiki/IEEE_802.11n) standard, so that I could take advantage of the speed boost when working wirelessly.  However I had one problem the WRT150N will not run the [Tomato Firmware](http://www.polarcloud.com/tomato).  And I didn't want to switch to [DD-WRT](http://www.dd-wrt.com) for a couple of reasons, the most important being that I really like the Tomato user experience and it would be a pain to setup the router with all my custom configurations again.  So I decided to try and have the best of both worlds and keep my WRT54G (old router running Tomato Firmware) as my gateway and turn the WRT150N (new router running DD-WRT) in to an access point on my network.

Before I started I made sure to disable the Wireless Radio on my WRT54G in preparation for the Wireless Access Point (WAP).  This is important so that the wireless signals and SID (Wireless Name) doesn't conflict when you are done.

### Step 1 - Upgrade to DD-WRT

The first step I had to do was get rid of the crappy Linksys Firmware and upgrade the WRT150N to the latest stable version of DD-WRT.  DD-WRT may not have the user experience that Tomato has, but it is still miles ahead of the Linksys Firmware.  So in the case where I cannot use Tomato, DD-WRT serves as a great alternative to me. The process of installing the DD-WRT firmware is pretty straight forward.  Download the [mini generic .bin](http://www.dd-wrt.com/dd-wrtv2/downloads/stable/dd-wrt.v24/Broadcom/Linksys/WRT150N_v1.1/dd-wrt.v24_mini_generic.bin) file and browse to the firmware upgrade page for the router and install.  You can find more indepth information at [this blog post](http://www.coderetard.com/2008/05/30/installing-dd-wrt-firmware-on-a-linksys-wrt150n-wireless-router/).

### Step 2 - Turn DHCP Off

I turned off the DHCP on the router for my WAP.

> If you do not turn off DHCP, when you plug your router into the network (after configuration), your WAP may provide IP addresses to clients on the wired network, and this may be inappropriate. Tracking down problems caused by multiple DHCP servers can be time-consuming and difficult.

### Step 3 - Add A Start Up Script

This part took me the better part of a day to perfect, because like many UNIX commands it is a convoluted syntax of piped commands flowing over each other in order to massage the data for the desired results.

```
ln -s /sbin/rc /tmp/udhcpc  
udhcpc -i br0 -p /var/run/udhcpc.pid -s /tmp/udhcpc -H `nvram get router_name`  
if test `ifconfig br0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'` != `nvram get lan_ipaddr`; then  
    nvram set lan_ipaddr=`ifconfig br0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'`;
    nvram commit;
fi
```

This startup script runs whenever the router is booted or rebooted, and the purpose of it is to request an IP Address from the DHCP server and set the Local IP Address (or LAN IP Address). There is no option available through the interface for this type of request because normally the LAN IP Address is the routers static local address (most cases 192.168.1.1) that acts as the constant in your network. The 192.168.1.1 acts as the main gateway to the internet, and if that wasn't static, the LAN traffic wouldn't be able to get out to the internet. This behavior is, however, undesirable for a Wireless Access Point, the WAP needs to pass through the wireless connections to the real router and needs to act as a client of the LAN instead of the master of the LAN.

### Step 4 - Connect LAN to LAN

To complete the link between the two routers, I connected a LAN port on my main router, to a LAN port on the WRT150N (to be used as my WAP).

> You may need a crossover cable to do this, although many modern routers have an automatic polarity sensing. To test this, connect a standard Ethernet cable between the two routers. If the LAN light comes on, the router has automatically switched the polarity and a crossover cable is not required.

### Step 5 - Power On & Test

The last step required is to power on (or reboot) the router acting as the WAP.  After I powered on the WRT150N I was able to connect to my network through my new WAP.

So that is the process, it took a lot of hunting around on the internet.  But I think I finally got my setup to a state that I can deal with, until Tomato starts supporting the Linksys WRT 150N.