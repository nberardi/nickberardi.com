---
title: "TF53002, TF30040, TF30059, TF30063 Team Foundation Server Errors"
date: 2009-08-16T14:07:00-05:00
slug: "tf53002-tf30040-tf30059-tf30063-team-foundation-servers-errors"
draft: false
tags:
  - "CNAME"
  - "TF30040"
  - "TF30059"
  - "TF30063"
  - "TF53002"
  - "TFS"
description: "Today I received the following error while getting ready to do some new development for my URL Rewriter. TF53002: Unable to obtain registration data for..."
---

Today I received the following error while getting ready to do some new development for my [URL Rewriter](http://urlrewriter.codeplex.com).

> TF53002: Unable to obtain registration data for application VersionControl.
> TF30040: The database is not correctly configured. Contact your Team Foundation Server administrator.
> TF30059: Fatal error while initializing web service
> TF30063: You are not authorized to access *myserver*.443. (type TeamFoundationServerUnauthorizedException)

This is very weird because I was just working on it earlier this week, without any issues.  So I go in to check the recent update history of Windows Update and to my surprise I see 13 new updates, mostly security related.  And since TF30063 is a security related exception, I think I found the culprit.  Here are the KB articles of the updates that were done for reference:

1. KB956744
2. KB973540
3. KB947319
4. KB971032
5. KB960859
6. KB971557
7. KB973869
8. KB973507
9. KB973354
10. KB961371
11. KB971657
12. KB890830
13. KB973815

So I started searching the web for each of those error messages, and I found a ton of old articles related to the SP1 release of Team Foundation Server.  However I upgraded about a year ago to SP1 so I doubt that is the issue.  But during my searching I found an obscure article referencing [KB926642](http://support.microsoft.com/kb/926642), which on first pass I just brushed off as not being the issue.  But as I started reading it I remembered that I do access my server through a CNAME address, and one of these security updates might have disabled Windows Authentication through CNAME's.  So I tried as the article suggested.
> \\myserver\c$ -- works
> \\myserver-cname\c$ -- tells me I am not authorized

So I followed Method 1 in KB926642:
> #### Method 1 (recommended): Create the Local Security Authority host names that can be referenced in an NTLM authentication request
>
> To do this, follow these steps for all the nodes on the client computer:
>
> 1. Click **Start**, click **Run**, type **regedit**, and then click **OK**.
> 2. Locate and then click the following registry subkey:**HKEY\_LOCAL\_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa\MSV1\_0**
> 3. Right-click **MSV1\_0**, point to **New**, and then click **Multi-String Value**.
> 4. In the **Name** column, type **BackConnectionHostNames**, and then press ENTER.
> 5. Right-click **BackConnectionHostNames**, and then click **Modify**.
> 6. In the **Value** data box, type the CNAME or the DNS alias, that is used for the local shares on the computer, and then click **OK**.**Note** Type each host name on a separate line.
>    **Note** If the BackConnectionHostNames registry entry exists as a REG\_DWORD type, you have to delete the BackConnectionHostNames registry entry.
> 7. Exit Registry Editor, and then restart the computer.

And everything is working great now.  So if you are using a CNAME with your TF server, you may want to consider adding the CNAME in to the BackConnectionHostNames.  It will not only help your TF server, but all your other connections to this server that use Windows Authentication and the CNAME.  Hope this helps somebody else besides me.