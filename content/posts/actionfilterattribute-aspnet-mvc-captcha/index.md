---
title: "ASP.NET MVC Preview 2 CAPTCHA using ActionFilterAttribute"
date: 2008-03-09T08:33:17-05:00
slug: "actionfilterattribute-aspnet-mvc-captcha"
draft: false
tags:
  - ".NET"
  - "C#"
  - "CAPTCHA"
  - "Microsoft"
  - "MVC"
  - "Web"
description: "My last article on ASP.NET MVC CAPTCHA was very well received by many of my readers and it even caught the eye of the DotNetKicks crowd. Now that MVC..."
---

My last article on [ASP.NET MVC CAPTCHA](http://www.coderjournal.com/2008/03/aspnet-mvc-captcha/) was very well received by many of my readers and it [even caught the eye of the DotNetKicks crowd](http://www.dotnetkicks.com/aspnet/ASP_NET_MVC_CAPTCHA). Now that [MVC Preview 2](http://www.microsoft.com/downloads/details.aspx?FamilyId=38CC4CF1-773A-47E1-8125-BA3369BF54A3&displaylang=en) was released last week, many new features make encapsulating my CAPTCHA control even easier. Most notably is the *ActionFilterAttribute* which allows you to override the Pre and Post action events for any action the attribute is applied to.

Basically everything works the same as it did in the previous article. I just modified things for MVC Preview 2. To validate the CAPTCHA you add the attribute *CaptchaValidation* to the action.

```
[CaptchaValidation("captcha")]  
public void Register(string userName, string password, string email, string question, string answer, bool captchaValid){  
    // do stuff
}
```

You still need to register the CAPTCHA image handler.

```
<httpHandlers>  
    <add verb="GET" path="captcha.ashx" validate="false" type="ManagedFusion.Web.Handlers.CaptchaImageHandler, ManagedFusion" />
</httpHandlers>
```

I added an extension to *HtmlHelper* that generates a text box with *autocomplete="off"*.

```
<label for="captcha">Enter <%= Html.CaptchaImage(50, 180) %> Below</label><br />  
<%= Html.CaptchaTextBox("captcha") %>
```

Which generates the following.

[![Example of CAPTCHA](/nickberardi.com/images/2008/03/captcha2.png)](/nickberardi.com/images/2008/03/captcha2.png "Example of CAPTCHA")

You can view the source code for this on my [Google Code Project](http://code.google.com/p/coderjournal/), everything is available through SVN.

1. [CaptchaValidationAttribute.cs](http://coderjournal.googlecode.com/svn/trunk/ManagedFusion.Web.Captcha/ManagedFusion.Web.Captcha/CaptchaValidationAttribute.cs)
2. [CaptchaHelper.cs](http://coderjournal.googlecode.com/svn/trunk/ManagedFusion.Web.Captcha/ManagedFusion.Web.Captcha/CaptchaHelper.cs)
3. [CaptchaImage.cs](http://coderjournal.googlecode.com/svn/trunk/ManagedFusion.Web.Captcha/ManagedFusion.Web.Captcha/Controls/CaptchaImage.cs)
4. [CaptchaImageHandler.cs](http://coderjournal.googlecode.com/svn/trunk/ManagedFusion.Web.Captcha/ManagedFusion.Web.Captcha/Handlers/CaptchaImageHandler.cs)

Or you can download the project for you own personal use.

- [ASP.NET MVC CAPTCHA Project](/nickberardi.com/images/2008/03/mvc-preview-2-captcha1.zip)