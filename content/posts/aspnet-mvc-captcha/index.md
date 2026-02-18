---
title: "ASP.NET MVC CAPTCHA"
date: 2008-03-03T07:33:36-05:00
slug: "aspnet-mvc-captcha"
draft: false
tags:
  - ".NET"
  - "C#"
  - "CAPTCHA"
  - "MVC"
  - "Web"
description: "Note: Most recent update for MVC Release Candidate 3 is out. So my MVC application that I have been working on required a CAPTCHA today. The problem is..."
---

**Note:**  Most recent update for [MVC Release Candidate 3](http://www.coderjournal.com/2008/06/mvc-captcha-for-preview-release-3/) is out.

So my [MVC application that I have been working](http://www.coderjournal.com/2008/02/microsoft-mvc-day-one/ "Microsoft MVC Day One") on required a [CAPTCHA](http://en.wikipedia.org/wiki/Captcha) today. The problem is that all of the solutions out there, that I could find for ASP.NET, are control based and I wanted a more MVC approach. I know I could have easily implemented one of them using the *Html.RenderControl()*, however I want to use a MVC approach to the CAPTCHA authentication box. So I started out with [Jeff Atwood's CAPTCHA Control](http://www.codinghorror.com/blog/2004/10/an-aspnet-captcha-server-control.html "An ASP.NET CAPTCHA Server Control") made for ASP.NET 2.0 in VB.NET 2005. I then converted it to C# and modified and expanded on it for the MVC framework. The following is the result of my work.

The following creates the CAPTCHA image on the page, that looks like the image below the code:

```
<label for="captcha">Enter <%= Html.CaptchaImage(50, 180) %> Below</label><br />  
<%= Html.TextBox("captcha") %>
```

[![Example of CAPTCHA](http://coderjournal.com/uploads/2008/03/captcha1.png)](http://coderjournal.com/uploads/2008/03/captcha1.png "Example of CAPTCHA")

The following is how the CAPTCHA is validated:

```
[ControllerAction]  
[CaptchaValidation("captcha")]
public void Register(string userName, string password, string email, string question, string answer, bool captchaValid)  
{
    // do stuff
}
```

The input in the *CaptchaValidationAttribute* is the name of the form field that you want to check against the CAPTCHA. Also notice the last parameter of the method called *captchaValid* this is required, and the value contains information on if the CAPTCHA was validated or not. *captchaValid* is automatically inserted in to the route data. From there you can go on and redirect the user to another page or do whatever your application would require if the CAPTCHA failed validation.

So as you can see it is relatively simple to use the CAPTCHA validation that I have created to test and verify your input with a CAPTCHA. The setup just requires adding a *HttpHandler* to the *Web.config* and the inclusion of a couple files.

```
<httpHandlers>  
    <add verb="GET" path="captcha.ashx" validate="false" type="ManagedFusion.Web.Handlers.CaptchaImageHandler, ManagedFusion" />
</httpHandlers>
```

All the work is actually done in the *OnPreAction* method in the *Controller* like so:

```
protected override bool OnPreAction(string actionName, System.Reflection.MethodInfo methodInfo)  
{
    object[] attributes = methodInfo.GetCustomAttributes(typeof(CaptchaValidationAttribute), false);

    if (attributes != null && attributes.Length > 0)
        OnCaptchaValidation(actionName, methodInfo, (CaptchaValidationAttribute)attributes[0]);

    return base.OnPreAction(actionName, methodInfo);
}

protected virtual bool OnCaptchaValidation(string actionName, System.Reflection.MethodInfo methodInfo, CaptchaValidationAttribute attribute)  
{
    if (attribute == null)
        throw new ArgumentNullException("attribute");

    // make sure the captcha valid key is not contained in the route data
    if (this.RouteData.Values.ContainsKey("captchaValid"))
        this.RouteData.Values.Remove("captchaValid");

    // get the guid from the post back
    string guid = Request.Form["captcha-guid"];

    // check for the guid because it is required from the rest of the opperation
    if (String.IsNullOrEmpty(guid))
    {
        this.RouteData.Values.Add("captchaValid", false);
        return true;
    }

    // get values
    CaptchaImage image = CaptchaImage.GetCachedCaptcha(guid);
    string actualValue = Request.Form[attribute.Field];
    string expectedValue = image == null ? String.Empty : image.Text;

    // removes the captch from cache so it cannot be used again
    HttpContext.Cache.Remove(guid);

    // validate the captch
    if (String.IsNullOrEmpty(actualValue) || String.IsNullOrEmpty(expectedValue) || !String.Equals(actualValue, expectedValue, StringComparison.OrdinalIgnoreCase))
    {
        this.RouteData.Values.Add("captchaValid", false);
        return true;
    }

    this.RouteData.Values.Add("captchaValid", true);
    return true;
}
```

And with the following *HtmlHelper*:

```
public static string CaptchaImage(this HtmlHelper helper, int height, int width)  
{
    CaptchaImage image = new CaptchaImage {
        Height = height,
        Width = width,
    };

    HttpRuntime.Cache.Add(
        image.UniqueId,
        image,
        null,
        DateTime.Now.AddSeconds(ManagedFusion.Web.Controls.CaptchaImage.CacheTimeOut),
        Cache.NoSlidingExpiration,
        CacheItemPriority.NotRemovable,
        null);

    StringBuilder stringBuilder = new StringBuilder(256);
    stringBuilder.Append("<input type="hidden" name="captcha-guid" value="");
    stringBuilder.Append(image.UniqueId);
    stringBuilder.Append("" />");
    stringBuilder.AppendLine();
    stringBuilder.Append("<img src="");
    stringBuilder.Append("/captcha.ashx?guid=" + image.UniqueId);
    stringBuilder.Append("" alt="CAPTCHA" width="");
    stringBuilder.Append(width);
    stringBuilder.Append("" height="");
    stringBuilder.Append(height);
    stringBuilder.Append("" />");

    return stringBuilder.ToString();
}
```

The rest of the source can be downloaded, if you are interested:

- [CAPTCHA Source](http://coderjournal.com/uploads/2008/03/captcha1.zip "CAPTCHA Source")

I have tested this to work with in the guidelines that I need, which are pretty broad. However if you find a circumstance where this won't work please let me know and I would be happy to integrate it in to this code.

**Update (2008-3-9):** The latest refresh of my [ASP.NET MVC CAPTCHA](http://www.coderjournal.com/2008/03/actionfilterattribute-aspnet-mvc-captcha/) control for Preview 2 of the MVC framework using *ActionFilterAttribute*.