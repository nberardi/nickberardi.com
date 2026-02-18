---
title: "A potentially dangerous Request.Form value was detected in ASP.NET MVC"
date: 2009-02-03T10:53:02-05:00
slug: "potentially-dangerous-requestform-detected-aspnet-mvc"
draft: false
tags:
  - "Web"
  - "asp.net mvc"
description: "If you are getting something like the following error message in ASP.NET MVC: A potentially dangerous Request.Form value was detected from the client..."
---

If you are getting something like the following error message in ASP.NET MVC:

> A potentially dangerous Request.Form value was detected from the client (Description="<p>some HTML text</p>")

This is because of something called Request Validation, that is a feature put in place to protect your application cross site scripting attacks, as described in a [White Paper on ASP.NET](http://www.asp.net/learn/whitepapers/request-validation/):

> Many sites are not aware that they are open to simple script injection attacks. Whether the purpose of these attacks is to deface the site by displaying HTML, or to potentially execute client script to redirect the user to a hacker’s site, script injection attacks are a problem that Web developers must contend with.
> Script injection attacks are a concern of all web developers, whether they are using ASP.NET, ASP, or other web development technologies.
> The ASP.NET request validation feature proactively prevents these attacks by not allowing unencoded HTML content to be processed by the server unless the developer decides to allow that content.

You need to add the following to your action method:

```
[ValidateInput(false)]  
public ActionResult MyAction (int id, string content) {  
    // ...
}
```

This is a new feature that was added to ASP.NET MVC RC1 and it will turn off request validation for this action and this action only. However you need to take special precautions to double check your content for script tags, which may indicate a cross site scripting attack. And if you find one make sure to do a simple replace that will render it harmless, such as:

```
content = content.Replace("<script", "[script").Replace("</script>","[/script]");
```

The above is not the most bullet proof code, but if you are using the *ValidateInputAttribute* on your action make sure to do a quick search on XSS or Cross Site Scripting and become familiar with the basics of this kind of attack.