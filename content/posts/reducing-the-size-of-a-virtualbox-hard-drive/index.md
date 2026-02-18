---
title: "Reducing the size of a VirtualBox hard drive"
date: 2011-07-07T08:39:09-05:00
slug: "reducing-the-size-of-a-virtualbox-hard-drive"
draft: false
tags:
  - "VirtualBox"
  - "VM"
description: "Often times I have run into the situation where I need to share a VM image with a co-worker or store as a base starting point. Case in point today I..."
---

Often times I have run into the situation where I need to share a VM image with a co-worker or store as a base starting point. Case in point today I needed to create a SharePoint 2010 on Windows 2008 R2 image for some classes and development I will be doing in the next few weeks.

After getting done with the base install I was left with a large footprint on my hard disk of the virtual hard drive that I know could be reduced in size. So here are the steps I took to reduce the size of the virtual hard drive.

### 1. Clean Up

The first thing that you need to do is clean up any places on the virtual machine that have temporary or unnecessary data. For instance:

1. Temp directories
2. Internet caches
3. Downloads

### 2. Defragmenting

The second thing you want to do is defragment you virtual hard drive. This will reorganize the space to be used in the most efficient manor. It is best to defrag you virtual hard drive at least 3 times.

### 3. Cleaning Free Space

Just because you have deleted a file, doesn’t mean that it is really gone from the hard drive. Or in our case the virtual hard drive, so the next thing we need to do is zero out all the free space on the virtual hard drive. I prefer to use a tool from SysInternals called SDelete. You can [find SDelete here](http://technet.microsoft.com/en-us/sysinternals/bb897443). After you have downloaded, extract to your C drive and run the following command:

```
sdelete -p 3 -c c:
```

### 4. Compacting Virtual Hard Drive

The next step requires you to shut down your VM and run one final command. Everything above has been pretty generic and can be used for any VM software, however the next part is VirtualBox specific, if you use another client please check the documentation.

We are now going to compact the virtual hard drive by removing all the free space. To do this in VirtualBox we need to open up the command prompt as an administrator and run the following:

```
cd C:\Program Files\Oracle\VirtualBox
```

This will bring us the VirtualBox tools directory where we want to run the following command:

```
vboxmanage modifyhd c:\path\to\vdi\image --compact
```

For me this command looked like this:

```
vboxmanage modifyhd "C:\Users\Nick\VirtualBox VMs\SharePoint 2010" --compact
```

### My Results

For me the above resulted in a 2.5 GB savings, yours will probably vary. From here you can copy the reduced size image to another drive or share it with a co-worker. Personally I reduce the size even farther by compressing the image using [7-zip](http://www.7-zip.org/) for easy transportation, but that is up to you.