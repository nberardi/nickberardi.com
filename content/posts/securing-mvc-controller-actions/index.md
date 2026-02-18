---
title: "ASP.NET MVC: Securing Your Controller Actions (The .NET Framework Way)"
date: 2008-03-13T02:59:06-05:00
slug: "securing-mvc-controller-actions"
draft: false
tags:
  - ".NET"
  - "C#"
  - "CodeAccessSecurityAttribute"
  - "MVC"
  - "PrincipalPermissionAttribute"
  - "Security"
  - "SecurityException"
  - "Web"
description: "So I just read Rob Conery's blog post on Securing Your Controller Actions in MVC. I was a little perplexed about why guys at Microsoft love to reinvent..."
---

So I just read Rob Conery's blog post on [Securing Your Controller Actions in MVC](http://blog.wekeroad.com/2008/03/12/aspnet-mvc-securing-your-controller-actions/). I was a little perplexed about why guys at Microsoft love to reinvent stuff they have already done. I know Rob Conery is a really smart guy and has a wonderful grasp of the .NET framework, so I would have to assume he knows about what I have outlined below. My only guess is that he just wanted to re-invent something that is already built in to the framework using his own code.

Basically what Rob did was the following, created two attributes for attaching on the MVC Controller Action:

RequiresAuthenticationAttribute

```
[RequiresAuthentication]public void Index () {  
    RenderView("Index"); 
}
```

RequiresRoleAttribute

```
[RequiresRole(RoleToCheckFor = "Member")]public void Index () {  
    RenderView("Index"); 
}
```

I have accomplished the same thing using an attribute that has been apart of .NET since 1.0. The attribute is called [PrincipalPermissionAttribute](http://msdn2.microsoft.com/en-us/library/system.security.permissions.principalpermissionattribute.aspx) and is part of the [System.Security.Permission](http://msdn2.microsoft.com/en-us/library/system.security.permissions.aspx) namespace. The best thing about it is that it is integrated in to the run time, so there is no chance of unwanted people getting through. It also accomplishes both of Robs attributes up above, plus more. Using the examples up above I will demonstrate how to use *PrincipalPermissionAttribute* to secure and protect your Controller Actions.

RequiresAuthenticationAttribute

```
[PrincipalPermission(SecurityAction.Demand, Authenticated = true)]public void Index () {  
    RenderView("Index"); 
}
```

RequiresRoleAttribute

```
[PrincipalPermission(SecurityAction.Demand, Role = "Member")]public void Index () {  
    RenderView("Index"); 
}
```

In addition if you were inclined you can restrict things to just one user name with *PrincipalPermissionAttribute*. So for instance if you wanted to restrict adding and removing roles and their permissions to only the username "SiteAdmin", you would do the following.

```
[PrincipalPermission(SecurityAction.Demand, Name = "SiteAdmin")]public void RolesAdmin () {  
    RenderView("RolesAdmin"); 
}
```

As you can see this is very powerful. Built in to the run time, by extending the [CodeAccessSecurityAttribute](http://msdn2.microsoft.com/en-us/library/system.security.permissions.codeaccesssecurityattribute.aspx), so it operates at a lower level than Rob's solution. Only requires the use of one attribute, and throws only one exception called *SecurityException*.

I really hope that ASP.NET MVC doesn't turn in to a lets-redo-everything-that-already-works framework, because they still have many issues that they need to achieve before ASP.NET MVC is usable, and focusing on things that are already implemented in the .NET framework doesn't seem like the right course of action when developing a new offering.

**Note:** This post is not meant to poke fun or belittle all the wonderful work that the ASP.NET MVC team has accomplish. Just to point out something that is already part of the .NET framework that should be encouraged to be used.

**Update (2008-3-15):** Up above I wrote:

> My only guess is that he just wanted to re-invent something that is already built in to the framework using his own code

I appologize Rob, I was in rant mode, and I got carried away.