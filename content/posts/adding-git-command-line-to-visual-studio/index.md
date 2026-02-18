---
title: "Adding Git Command Line To Visual Studio"
date: 2011-03-17T03:53:02-05:00
slug: "adding-git-command-line-to-visual-studio"
draft: false
tags:
  - "Git"
  - "Visual Studio"
description: "If you are an avid Git user like I am, but also happen to work in a Visual Studio environment, you know that getting to your Git Bash command prompt is..."
---

If you are an avid Git user like I am, but also happen to work in a Visual Studio environment, you know that getting to your Git Bash command prompt is anything but easy. My typical process looks probably something like yours:

1. Open Visual Studio
2. Open your project you are working on
3. Right click on a folder in the project and choose “Open Folder in Windows Explorer”
4. Back your way up through the folders in Windows Explorer till you get to the parent folder that is the root of your project.
5. Then right click on the root folder of your project and choose “Git Bash Here”
6. Start using Git Bash

To me this process got so annoying and tedious that I finally decided to explorer other options to get to my Git Bash prompt. The best one that I have come up with so far and works perfectly for me is adding the Git Bash as an “External Tool” in Visual Studio.  To get started you will need a couple of things:

- Visual Studio (I am doing this with VS 2010 Ultimate)
- msysgit (<http://code.google.com/p/msysgit/>)

### Adding Git Bash Prompt

The first thing we need to do is to add Git to our external tools in Visual Studio.  To do this we need to first open up the “External Tools” screen which is located under *Tools* > *External Tools…* in Visual Studio.

When the screen is open you are going to want to click the “Add” button and fill in the values to look like the screen shot below:

[![image](/images/2011/03/image_thumb.png "image")](/images/2011/03/image.png)

*note: that I am running this from a 64-bit install of Windows 7, if you are using a 32-bit install your Program Files directory will not have the “ (x86)” on the end.*

You will now find a new menu item under the *Tools* menu called *Git Bash*.  This will launch the Git Bash command prompt for your current solution when selected.

### Setting Up A Keyboard Shortcut

If you are anything like me you will prefer a keyboard shortcut for opening up the Git Bash command prompt. To setup the shortcut we need to first open up the “Options” screen which is located under *Tools* > Options*…* in Visual Studio. Then choose *Keyboard* from the *Environment* section.

In the *Show commands containing* text box enter the following in to the text box “**Tools.ExternalCommand2**” and then in the *Press shortcut keys* text box press the corresponding keyboard shortcut that you want assigned.  (I choose *CTRL+0*)  Then press the “Assign” button and then the “OK” button to exit the “Options” screen.

[![image](/images/2011/03/image_thumb1.png "image")](/images/2011/03/image1.png)

### tl;dr

Hopefully this will be helpful to everybody who has the same affection for Git and Visual Studio as I do.