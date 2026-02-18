---
title: "Adobe what where you thinking?"
date: 2007-01-02T05:56:40-05:00
slug: "adobe-what-where-you-thinking"
draft: false
tags:
  - "User Experience"
  - "Acrobat"
  - "Adobe"
description: "Recently I upgraded Adobe Acrobat Reader 8.0. I would first like to say that I found the new updated user interface a very nice experience. However there..."
---

[![](/images/2007/02/adobe.PNG)](/images/2007/02/adobe.PNG)Recently I upgraded **Adobe Acrobat Reader 8.0**. I would first like to say that I found the new updated user interface a very nice experience. However there was one problem with the experience and it had nothing to do with the Adobe Acrobat Reader 8.0, it had to do with the Adobe Update Manager.

For some reason the Update Manager puts a folder called **Updater5** in the **My Documents** folder. From what I can tell this folder is always empty at least it has been always empty on my laptop. You are all probably saying why not just delete the folder and stop whining about it. However it is not that easy, I delete the Updater5 folder and as soon as I open Adobe Acrobat Reader up, the folder reappears. This makes me furious because not only is this a bad experience for users, such as my self, that like to keep their document folders organized, but the folder isn't called Adobe's Documents or Adobe's Temporary Directory it is called My Documents as in Nick's Personal Documents.

This is all speculation on my part but I can only assume that the reason the folder is in the My Documents folder, assuming that this just isn't a mistake, is because that the updater may be run differently for each logged in user on the system and Adobe needs a space on the hard drive that is different for each user. There are so many other places Adobe could have chosen to put this folder such as *C:\Program Files\Adobe* or how about this mysterious folder *C:\Documents and Settings[my user name]\Application Data\AdobeUM* with UM only meaning Update Manager or how about *C:\Documents and Settings[my user name]\Application Data\Adobe*. The point is that Adobe has gone out of it's way to create all these folders, some global system folders, and some user only folders, but why did their developers scratch their head and say the My Documents folder is the most logical place for this?

[![](/images/2007/02/mydocuments.PNG)](/images/2007/02/mydocuments.PNG)At this point you are probably wondering why I am posting this to Coder Journal, well it is basically to illustrate a point about user experience, and how as a developer you should do everything to make your application as painless as possible to the user of your application. After all you have made your application to make the life of the user a little simpler, not a little simpler with a thorn in their side.

So I will leave you with this basic rule, don't invade the user's personal space. It will make them uneasy and they will go out and find another application that may or may not work as well as yours, but they will find one that doesn't invade their personal space.

**Update:** (2007-1-4) Adobe [sent me an e-mail](http://www.coderjournal.com/2007/01/update-from-adobe/) saying this shouldn't be there, but it wasn't a mistake.

**Update:** (2007-2-20) I have found a way to [change the temp folder](http://www.coderjournal.com/2007/02/remove-updater5-from-my-documents-folder/) that Adobe updates to.