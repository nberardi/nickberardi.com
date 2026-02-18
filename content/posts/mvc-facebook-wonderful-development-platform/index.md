---
title: "MVC + Facebook == Wonderful Development Platform"
date: 2008-06-06T03:05:12-05:00
slug: "mvc-facebook-wonderful-development-platform"
draft: false
tags:
  - ".NET"
  - "Facebook"
  - "IdeaPipe"
  - "MVC"
  - "Web"
description: "Just recently I started experimenting with the ASP.NET MVC Framework and the Facebook Development Platform, it has been a very bumpy road, but I have..."
---

Just recently I started experimenting with the ASP.NET MVC Framework and the Facebook Development Platform, it has been a very bumpy road, but I have ironed out some major issues that I would like to share with you today. I will start with a little history of what I am trying to do. For about a month and a half I have had one of my [IdeaPipe](http://www.ideapipe.com) interns, Dimitry, experimenting with creating a [FBML (Facebook Meta Language)](http://wiki.developers.facebook.com/index.php/FBML) Application with MVC. MVC is an ideal platform for FBML because with MVC you have total control over your markup which is needed to have a lean FBML application. I am not going to go in to the differences of developing an FBML vs IFrame Facebook Application, because that information is easily found with a Google Search. What I am going to talk about is the hurdles I overcame and the custom software I had to develop to get MVC working smoothly with Facebook.

In my [last post on the subject](http://www.coderjournal.com/2008/04/create-facebook-application-mvc/) I was using the [Facebook Developer Toolkit](http://www.codeplex.com/FacebookToolkit), however because of various implementation problems that were at the foundation of the software when working with MVC, I moved to [Facebook.NET](http://codeplex.com/FacebookNET) which is a object based model for implementing the Facebook Session instead of an inheritance model. What you will need in order to get started is:

- [Facebook Developers](http://developers.facebook.com/)
- [Facebook Developers Wiki](http://wiki.developers.facebook.com/)
- [Facebook.NET](http://codeplex.com/FacebookNET) Source Code (the source code is important because we need to modify one external interface from internal to public)

One of the problems I ran into was creating a Facebook Session from my Action Method. To remedy this issue I created a FacebookAttribute that is an ActionFilterAttribute and a FacebookWebSession based off of the work done on Facebook.NET.

### FacebookAttribute

The FacebookAttribute is added to your Action Methods and will look like the following:

```
[Facebook(ApplicationName = "IdeaPipe")]  
public ActionResult SomeAction(FacebookService facebookService, FacebookSession facebookSession, int myOtherVariables)  
{ ... }
```

As you can see the FacebookAttribute just attaches to the Action Method and you just have to specify your ApplicationName that you want to instantiate. The FacebookAttribute also passes in a FacebookService and FacebookSession object for use in your method. The other keys get set in your Web.Config as any standard Facebook.NET application would.

```
<facebook>  
    <application name="IdeaPipe" apiKey="1234" secret="5678" type="GlobalApplication" />
</facebook>
```

The magic behind this attribute is pretty simple.

```
public override void OnActionExecuting(ActionExecutingContext filterContext)  
{
    FacebookApplicationSettings settings = FacebookSection.GetApplication(ApplicationName);

    ApplicationKey = ApplicationKey ?? settings.ApiKey;
    Secret = Secret ?? settings.Secret;

    FacebookWebSession session = new FacebookWebSession(ApplicationKey, Secret);
    session.Initialize(HttpContext.Current);

    FacebookService service = new FacebookService(session);

    if (filterContext.ActionParameters.ContainsKey(ActionParameterFacebookSession))
        filterContext.ActionParameters[ActionParameterFacebookSession] = session;

    if (filterContext.ActionParameters.ContainsKey(ActionParameterFacebookService))
        filterContext.ActionParameters[ActionParameterFacebookService] = service;
}
```

**Download:** [FacebookAttribute.cs](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2008/6/FacebookAttribute.cs)

### FacebookWebSession

The FacebookWebSession was developed out of necessity because the only other FacebookSession objects in Facebook.NET are strongly tied to a WebForms Control that couldn't be created as easily as I did in the FacebookAttribute. I am going to fore go the source code since much of this is a copy, paste, and rearrange from the Facebook.NET source. Plus much of it is just boring if-then-else statements that go on for awhile and just do a technical setup from the query string fields.

**Download:** [FacebookWebSession.cs](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2008/6/FacebookWebSession.cs)

### FacebookSection

This is the file that I had to change the one method from internal to public so that I could get the information contained in the Web.Config configuration for my application. Note this file will not be necessary in the future if my changes get accepted in to the Facebook.NET source tree.

This file replaces the `WebConfigurationFacebookSection.cs` of the Facebook.NET source.

**Download:** [FacebookSection.cs](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2008/6/FacebookSection.cs)   
**Download:** [Facebook.NET Binaries For MVC](/images/2008/06/facebooknet1.zip)

So that is all that you should need in order to start working with Facebook Applications in MVC. Note that it is still a good idea to include the FacebookApplication control on your pages because it is still needed. The primary goal of the source code above was to allow the use the the FacebookSession in the Action methods. If you have any questions please post them below.