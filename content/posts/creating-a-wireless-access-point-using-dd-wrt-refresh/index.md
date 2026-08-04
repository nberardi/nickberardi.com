---
title: "Creating a Wireless Access Point using DD-WRT - Refresh"
date: 2009-01-19T14:03:39-05:00
slug: "creating-a-wireless-access-point-using-dd-wrt-refresh"
draft: false
tags:
  - "DD-WRT"
  - "How To"
  - "Linksys"
  - "Tomato"
  - "WRT150N"
  - "WRT54G"
description: "I found a setup that I like even better than my previous one. I have highlighted the main differences, in red, below. To set it up as repeater do the..."
---

I found [a setup](http://airfart.blogspot.com/2008/04/how-to-set-repeater-mode-on-dd-wrt.html) that I like even better than [my previous one](/posts/creating-a-wireless-access-point-using-dd-wrt/).  I have highlighted the main differences, in red, below.

To set it up as repeater do the following:

- Do a 30 second reset

**Under wireless->basic settings:**

- Wireless mode: AP
- Wireless Network Name (SSID): Your prefer SSID
- Wireless Channel: Your prefer channel ( Use channel with less interference from other access point)
- Save Settings

**Under Wireless > Wireless Security**

- Set your wireless authentication

**Under Setup->Basic Setup:**

- Under WAN Connection Type:
  - Connection Type : Disabled
  - STP : Disable
  
- Under Router IP:
  - Local IP address :Set your IP your address to a same subnet of your main router (if your main router IP is 192.168.1.1, set it to same subnet like 192.168.1.2)
  - Subnet Mask : same as your main router subnet
  - Gateaway : Your main router IP
  - DNS : Your main router IP
  
- Under Network address Server Setting (DHCP)
   
  - DHCP Type : DHCP Forwarder
  - DHCP Server : Your main router IP
  - Time settings : disable
  
- Save Settings

  
**Under Security Tab** 

- Un-check all items in the "Block WAN Request" section
- Then disable the SPI firewall
- Save Settings

**Under Administration Tab**

- Enter all other necessary information, remember to change your password
- Click the Save button
- Then click Reboot button