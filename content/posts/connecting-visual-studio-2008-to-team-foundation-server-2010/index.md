---
title: "Connecting Visual Studio 2008 to Team Foundation Server 2010"
date: 2010-02-16T14:27:22-05:00
slug: "connecting-visual-studio-2008-to-team-foundation-server-2010"
draft: false
tags:
  - "Team Foundation Server"
  - "Visual Studio"
description: "With the recent release of Visual Studio 2010 RC, I decided to take Team Foundation Server (TFS) 2010 RC for a spin also.&#160; I was really interested in..."
---

With the recent release of Visual Studio 2010 RC, I decided to take Team Foundation Server (TFS) 2010 RC for a spin also.  I was really interested in seeing what new and great features are being offered, because there has been a lot of buzz around this release of TFS.

After installing Visual Studio 2010 Ultimate on my laptop and setting up TFS 2010 as a new install, which was way easier than I remember 2005 being, I connected up VS 2010 and TFS 2010 with out a problem.

However I ran into a ton of problems trying to get Visual Studio 2008 connected to TFS 2010.  I eventually had to resort hacking the registry to get everything to work as it should.  Here are the steps I used:

1. Click Add Existing Team Project Button   
   [![step-1](http://coderjournal.com/uploads/2010/02/step1_thumb1.png "step-1")](http://coderjournal.com/uploads/2010/02/step11.png)
2. Click Servers Button
3. Click Add... Button
4. Type in full server name **with collection specified and trailing slash**, it complains if there is no trailing slash   
   [![step-4](http://coderjournal.com/uploads/2010/02/step4_thumb1.png "step-4")](http://coderjournal.com/uploads/2010/02/step41.png)    
   *If you actually try to use this to select projects to edit, everything will look like it went smooth.  However you will notice that no projects actually show up in the Team Explorer*
5. Close Visual Studio
6. Remove the trailing slash from the registry key of the server you just added here:   
   **HKEY\_CURRENT\_USER/Software/Microsoft/VisualStudio/9.0/TeamFoundation/Servers**
7. Open Visual Studio
8. Connect to your TFS 2010 server and select the projects that you want to use in 2008.

Hope this helps somebody else down the line as I am sure more and more people are going to run into this problem as they adopt TFS 2010.

*Note: You can do this in all one step by just adding the value into the registry, I just find this way a little more visually pleasing for explaining the concept in the blog.*