---
title: "Metro on Windows 8 - Illegal characters in path"
date: 2012-05-15T05:27:58-05:00
slug: "metro-on-windows-8-illegal-characters-in-path"
draft: false
tags:
  - "Metro"
  - "Windows 8"
  - "WinJS"
description: "As I was developing my first Metro App today I came upon this weird error. Error 1 Error : DEP0600 : The following unexpected error occurred during..."
---

As I was developing my first Metro App today I came upon this weird error.

```
Error    1   Error : DEP0600 : The following unexpected error occurred during deployment:  
Illegal characters in path.  
   at System.IO.Path.CheckInvalidPathChars(String path, Boolean checkAdditional)
   at System.IO.Path.Combine(String path1, String path2)
   at Microsoft.VisualStudio.ImmersiveProjectServices.Shared.AppxLayoutManager.CheckPackageLayoutState(DeployPackageName deployPackageName, String location)
   at Microsoft.VisualStudio.ImmersiveProjectServices.Shared.LocalDeployJob.GetLayoutState(DeployPackageName deployName, Boolean hasFrameworkDependencies)
   at Microsoft.VisualStudio.ImmersiveProjectServices.Shared.RegisterAppxLayout.Start(Boolean forceNewLayout, Boolean forceRegistration, NetworkLoopbackState desiredNetworkLoopbackState, Boolean refreshLayoutOnly, String& packageMoniker, String& firstUserAppID, Exception& deployException)
```

Not knowing what to do, because the error is vague and cryptic. I decided to throw a hail mary pass and remove the application I was developing from the start menu. And lo and behold this was the problem. I know this is still a beta framework and everything, but can the Windows team please throw us a bone and put in exceptions that actually mean something.

### tl;dr

Just uninstall the application you are developing from the start menu.