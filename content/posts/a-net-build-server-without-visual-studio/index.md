---
title: "A .NET Build Server Without Visual Studio"
date: 2014-04-16T09:47:13-05:00
slug: "a-net-build-server-without-visual-studio"
draft: false
description: "Update: Phil Haack has started a petition to get the steps I outlined below into an easy installer. Please support it with your votes. Over the past week..."
cover:
  image: "/images/2014/Apr/copy_directories.png"
  alt: "Copy Directories"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

> **Update:** Phil Haack has started a [petition to get the steps I outlined below into an easy installer](http://visualstudio.uservoice.com/forums/121579-visual-studio/suggestions/5786689-support-net-builds-without-requiring-visual-studi). Please support it with your votes.

Over the past week I have read a couple articles about the pain of "headless" build servers in .NET. First from [Maarten Balliauw](http://blog.maartenballiauw.be/post/2014/04/11/Building-NET-projects-is-a-world-of-pain-and-heres-how-we-should-solve-it.aspx) and then from [Phil Haack](http://haacked.com/archive/2014/04/15/nuget-build-dependencies/) both of them had suggestions about how to accomplish setting up a build server without installing Visual Studio. But their suggestions were more of a long term problem that could be fixed with NuGet and required much work from Microsoft and the community.

I agree and fully support their long term goals, but I want to give you some short term solutions that I have found to work today if you don't like installing Visual Studio on your build server.

> **Note:** This won't solve all build problems, but it solves many of the build problems I had with building PCL (Portable Class Libraries) on a build server.

The **first step**, and this one you can't really get around is that you need to install the .NET frameworks you care about.

The **second step** is to install some "necessary" preliminary tools. (I don't know if these are actually required given the steps below, but if anybody wants to skip over this step when giving this method a shot, I would appreciate the thumbs up or down on this step.)

- [MSBuild Tools 2013](http://www.microsoft.com/en-us/download/details.aspx?id=40760)
- [Portable Class Library Tools 2](http://visualstudiogallery.msdn.microsoft.com/b0e0b5e9-e138-410b-ad10-00cb3caf4981/) *make sure to use the **/buildmachine** command when installing*
- **Update:** [.NET Framework Developer Pack](http://www.microsoft.com/en-us/download/details.aspx?id=40772) (thanks to (Eric Williams)[https://twitter.com/MotoWilliams] for this)

> One thing that I have seen recommended by others is the [Portal Class Library Reference Assemblies](http://www.microsoft.com/en-us/download/details.aspx?id=40727) don't bother with this. I can't tell you how pointless this installer is. It actually "installs", and I use that term loosely, a zip file in your programs directory. Yes you read that right, Microsoft makes you download an installer for a zip file that they don't even both unzipping. **Tip for Microsoft** just provide the zip file and save developers a bunch of steps.

The **third step** and the key to getting everything to build the same on the build server as your local machine is this very simple step. Copy the following directories from your *development* machine to your *build* server perserving the directory location:

- C:\Program Files (x86)\MSBuild
- C:\Program Files (x86)\Reference Assemblies

![Copy Directories](/images/2014/Apr/copy_directories.png)

> **Note:** I prefer to zip up the directories prior to copying them to the build server, because it makes the process faster and less error prone. Then when they are on my build server, I just unzip the directories into the correct path.

## Conclusion

Between those two directories **MSBuild** and **Reference Assemblies** you have most everything you need to complete any build that Visual Studio can do by it self. And the above steps while simple, but not obvious, provide a nice clean build server that doesn't require Visual Studio to opperate.

The only issue with this method is that, once and a while, usually after a new SDK version is released, you will have to re-do *step three* to make sure your build and development environments are in sync.

Hopefully the detailed explaination of a path forward that Phil provided will make the above steps unnessisary in the future.