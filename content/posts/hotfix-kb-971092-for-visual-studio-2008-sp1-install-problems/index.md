---
title: "Hotfix KB 971092 for Visual Studio 2008 SP1 Install Problems"
date: 2009-08-01T11:10:42-05:00
slug: "hotfix-kb-971092-for-visual-studio-2008-sp1-install-problems"
draft: false
description: "I was bitten by a weird Windows Update problem where update KB971092 would continually install and then keep trying to install even though it successfully..."
---

I was bitten by a weird Windows Update problem where update KB971092 would continually install and then keep trying to install even though it successfully completes.  Some or most of you that have Visual Studio 2008 SP1 installed will probably have a similar problem.  So I though I would pass on this information from [Neno Loje](http://msmvps.com/blogs/vstsblog/archive/2009/07/29/hotfix-kb-971092-for-visual-studio-2008-sp1-install-problems.aspx) about how to fix it.

![WindowsUpdate](/nickberardi.com/nickberardi.com/images/2009/08/WindowsUpdate1.jpg "WindowsUpdate")**Applies to**:

> Security Update for Microsoft Visual Studio 2008 Service Pack 1 (KB971092)

**Symptoms**:

> The update installs successfully and but will be offered again by Windows Update as a new update. This can be repeated indefinitely.
> or
> the standalone installer tells you that this update "does not apply, or is blocked by another condition on your system".

**Workaround** (found [here](https://connect.microsoft.com/VisualStudio/feedback/Workaround.aspx?FeedbackID=478117)):

1. Download the stand-alone version of [VS90SP1-KB971092-x86.exe](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=294de390-3c94-49fb-a014-9a38580e64cb).
2. Start the installation VS90SP1-KB971092-x86.exe
3. Wait for the error message to come up – **do not close the window**
4. Copy the temp. folder where the patch has been unpacked to a new folder, for example onto your desktop.
5. Close VS90SP1-KB971092-x86.exe that you started in step 2.
6. Navigate to {Program Files}Microsoft Visual Studio 9.0Common7Tools and find vsvars32.bat.
7. Change the permissions on the file to allow everyone to edit it.
8. Start VS90SP1-KB971092-x86.msp from within the saved folder and the process should complete.
9. You may want to reset permissions that you gave in step 7.