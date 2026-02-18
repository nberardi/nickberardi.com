---
title: "Allow More Than One Remote Desktop Login Connection On GoDaddy's Virtual Dedicated Server's"
date: 2008-02-07T16:50:47-05:00
slug: "multiple-rdp-godaddy-server-connections"
draft: false
tags:
  - "GoDaddy"
  - "RDP"
  - "Remote Desktop"
  - "Session Timeout"
  - "Virtual Dedicated Server"
description: "Ever have one of those days where you are so eager to get home and watch Lost that you totally forget to log out of your Remote Desktop instance? Well I..."
---

Ever have one of those days where you are so eager to get home and watch Lost that you totally forget to log out of your Remote Desktop instance? Well I have, and usually it is not a big deal, because Windows Server Terminal Services allows you to have multiple logins with the same user account. Unless you are running on GoDaddy Virtual Dedicated server, where the default configuration only allows one connection.

So I called up GoDaddy and they said my only option was to power cycle the machine. Gasp... Yes you head me right, a power cycle of a live running website. My heart actually skipped a beat when this level one tech said this. I also wasn't allowed to talk to level two techs because they can only be graced with e-mail, talking to actual GoDaddy customers is beneath them I guess.

Well to make a long story short I found a way to increase my Maximum Connections to two, which is just enough to allow me to login with the Admin account and kill my other session. Here is what you have to do:

#### To Set Maximum Connections for Remote Desktop Connections

1. From your servers's **Start** menu, point to **Programs**, point to **Admin Tools**, and then click **Terminal Services Configuration**.
2. In the right pane of the window, click **RDP-Tcp**.
3. Click the **Network Adapters** tab.
4. Change the **Maximum Connections** to **2**.

Also while you are at it you may want to change the session log out time.

#### To Set Timeout Options for Remote Desktop Connections

1. From your computer's **Start** menu, point to **Programs**, point to **Admin Tools**, and then click **Terminal Services Configuration**.
2. In the right pane of the window, click **RDP-Tcp**.
3. Click the **Sessions** tab.
4. Specify the values you want to use.

I usually set **End Disconnected Sessions** to **10 minutes** and **Idle Session Limit** to **30 minutes**.

I don't know why the maximum connections for RDP isn't set to a reasonable value as the default, but many of the default settings at GoDaddy and puzzling and disturbing. So it really doesn't surprise me.