---
title: "Enabling Pinging in Windows 2008 R2"
date: 2010-12-12T07:58:11-05:00
slug: "enabling-pinging-in-windows-2008-r2"
draft: false
tags:
  - "Windows 2008 R2"
description: "For the life of me I couldn’t find an easy option to enable pinging, an ICMP Type 8 or Echo Request response, through my Windows 2008 R2 firewall.&#160;..."
---

For the life of me I couldn’t find an easy option to enable pinging, an ICMP Type 8 or Echo Request response, through my Windows 2008 R2 firewall.

Every hit on Google told me to follow some steps through the GUI that ended up not being in R2 anymore or execute the following command which doesn’t seem to work in R2 either.

```
netsh firewall set icmpsetting 8 enable
```

**netsh** would always respond back and tell me that *firewall* was depreciated, but not give me much more to go on.

So I am writing this post for selfish reasons of having an easy place to look up the solution when I need it, also to help anybody else who may need help.  To enable pinging in Windows 2008 R2 you need to execute the following *advfirewall firewall* command on *netsh.*

```
netsh advfirewall firewall add rule name=”ICMP Allow incoming V4 echo request” protocol=icmpv4:8,any dir=in action=allow
```

After you execute this command you will receive a response simply stating **Ok**.

In my opinion this command seems to be a step backwards in simplicity, however this feature isn’t really meant for your every-day user.  But I just wanted to share incase anybody else was caught in the same Google searching hell that I was.