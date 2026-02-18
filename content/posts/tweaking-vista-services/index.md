---
title: "Tweaking Vista Services"
date: 2008-12-07T14:11:11-05:00
slug: "tweaking-vista-services"
draft: false
tags:
  - "SpeedyVista"
  - "Tweaks"
  - "Windows Vista"
description: "Recently I have been trying to squeak more speed out of my laptop by shutting down unnecessary services that seem to come with most every software and..."
---

Recently I have been trying to squeak more speed out of my laptop by shutting down unnecessary services that seem to come with most every software and device driver.  To do this I started with a clean install of Windows Vista and installed the driver only option for my hardware and then got rid of many of the useless services that come with software like iTunes, VMware, and [other stuff I find useful](http://www.coderjournal.com/tools).

However with all that tweaking it still doesn't create an optimal installation of Windows Vista, because Windows by default still runs a ton of unnessisary services.  For example, Microsoft thought it was nessisary to enabled Tablet PC Pen Input by default which I venture to say is useless to a vast majority of Windows Vista users.

Coincidentally while checking out the new HD feature available on YouTube I [stubled across an interesting video](http://uk.youtube.com/watch?v=SnMYjYU0caU&fmt=18) describing a website called [Speedy Vista](http://www.speedyvista.com/).

> Windows Vista has around 130 services. According many reports, Vista is very computer intensive, so it may take a couple tweaks to lighten it up a bit to suit your needs. The names are rather vague like 'ReadyBoost' and 'SuperFetch'. How will you know which are safe to disable? Hopefully we can help. We have a full list of all Vista services and recommended settings for them. This site contains registry files for easily resetting your services settings back to factory in case you mess it up or just wish to have a good way to go back to factory.

The website offers a [cheat sheet of services](http://www.speedyvista.com/services5min.php) you can safely shut off, and if you are unsure what the service does, and don't want to make a mistake, it has a description of what the services does.  But my favorite part of this website is that it provides a batch file and or a registry file that will shut off the unnessisary services automatically.

> **Windows Vista 'Safe' Settings** [reg](http://www.speedyvista.com/reg/VistaSafe.reg) [bat](http://www.speedyvista.com/reg/VistaSafe.bat) - Use at your own risk. I've tried to weed out services that are obviously unnecessary to give you a good starting point to tweaking for your own needs/preference. Please e-mail me any problems, etc.
> **Windows Vista Tweaked Settings** [reg](http://www.speedyvista.com/reg/VistaTweaked.reg) [bat](http://www.speedyvista.com/reg/VistaTweaked.bat)- Use at your own risk. Works for me for internet, Windows Update, DVD playing, most other things I want to do. May cause some software, etc. to stop working, but I would like to hope not. Please send me feedback on this file as well as safe if you have any issues running them. It assumes that you have your own Firewall software and Spyware software.
> **Windows Vista Minimal Settings** [reg](http://www.speedyvista.com/reg/VistaMinimal.reg) [bat](http://www.speedyvista.com/reg/VistaMinimal.bat) - Use at your own risk. Works for me for internet, Windows Update, DVD playing, most other things I want to do. May cause some software, etc. to stop working, but I would like to hope not. Please send me feedback on this file as well as safe if you have any issues running them. It assumes that you have your own Firewall software and Spyware software.
> Disclaimer: Use this site at your own risk. I am not responsible for damage to your computer, or anything else.

If none of these above options work for you, you can even [use their wizard](http://www.speedyvista.com/regGen.php) to turn on and off the services that you don't want to use.  This allows you to create your own custom registry file to your own specifications.

I just wanted to post this interesting website since I haven't posted in the past month, because of my book writing.  Which I am happy to say that I am starting my last chapter and I should be done by the end of the year so I can resume my normal posting schedule.