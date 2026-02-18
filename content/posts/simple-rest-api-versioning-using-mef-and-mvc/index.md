---
title: "Simple REST API Versioning Using MEF and MVC"
date: 2010-09-08T13:51:18-05:00
slug: "simple-rest-api-versioning-using-mef-and-mvc"
draft: false
tags:
  - "MEF"
  - "MVC"
description: "I know that is a whole host of acronyms in the title, so let me explain. Recently it came to my attention at my day job that I was going to have to..."
---

I know that is a whole host of acronyms in the title, so let me explain.  Recently it came to my attention at my day job that I was going to have to support two versions of our API simultaneously.  This information came as no surprise to me, but unfortunately it wasn’t something I originally planned for when carefully laying out the URL patterns for the REST API.

Since I was going to have to yank the current code apart to support the new API in parallel with the previous API, I decided to do things right and put a wish list in place for what I wanted to accomplish with the next version of the API:

1. Ability to support /vN/ (ex. /v1/ and /v2/) in the URL so that the URL looks like <http://mysite>**/v1/**api/method
2. Ability to deploy versions of API in separate DLL’s, so that the URL is versioned similar to the libraries.

As I was searching for a non-hacky way to accomplish this I stumbled across using MEF for creating a MEF based MVC Controller Factory.  This was a great find because it provided me everything I was looking for.  It allowed me to add meta data to each controller, so that I could specify the version that the controller was (i.e. “v1” or “v2” etc.).

To get started the first thing I needed to do was setup the MEF container.  On the web it is a little more complicated, because of the stateless nature of a web application.  So I created a [**MefHttpApplication**](http://github.com/managedfusion/managedfusion-web/blob/master/src/Composition/MefHttpApplication.cs) base to replace the standard **HttpApplication** in the **Global.asax** file.  Here is how it should look:

```
public class MvcApplication : MefHttpApplication
```

Next we need to change the default route to support versioning:

```
routes.MapRoute(  
    "Default",
    "{version}/{controller}/{action}",
    new { version = "v1" }
);
```

After that is completed the next step is to actually register our new Controller Factory with MVC.  This is a very important step because it is the glue between MVC and MEF, and it is what brings the two frameworks together.

```
public void RegisterControllerFactory(ControllerBuilder controllerBuilder)  
{
    controllerBuilder.SetControllerFactory(new MefControllerFactory(ContainerManager));
}

protected override void Application_Start()  
{
    base.Application_Start();

    RegisterControllerFactory(ControllerBuilder.Current);
}
```

Before we go on to create our **MefControllerFactory**, it is probably best to show how the meta-data attributes for MEF are applied to the controllers, it will make understanding how the **MefControllerFactory** works easier.  I am not going to go in to much detail, because there are much more in-depth and better explanations than I can give on how these work, I am only going to tell you the code that I am showing you does work:

```
[Export(typeof(IController))]  
[ExportMetadata(Constants.MetaControllerName, "Billing")]
[ExportMetadata(Constants.MetaApiVersion, "v1")]
[ExportMetadata(Constants.MetaScopeMode, WebScopeMode.Request)]
public class BillingController : Controller
```

The next thing we need to create is the **MefControllerFactory**.

> I am just going to post the parts below that I want to talk about and that are relevant to this blog post, but I have [posted the full file online](http://gist.github.com/571188) for your viewing pleasure.

With the MefControllerFactory we want to find the controller out of the MEF container that both matches the version and the controller name that is being requested as part of the route.  To do this we can use LINQ:

```
controllers = controllers  
    .Where(exp =>
        exp.Metadata.ContainsKey(Constants.MetaControllerName)
        && String.Equals(exp.Metadata[Constants.MetaControllerName].ToString(), controllerName, StringComparison.InvariantCultureIgnoreCase))
    .Where(exp =>
        exp.Metadata.ContainsKey(Constants.MetaControllerName)
        && String.Equals(exp.Metadata[Constants.MetaApiVersion].ToString(), version, StringComparison.InvariantCultureIgnoreCase));
```

The above LINQ query queries for all controllers in the MEF container that have both the same controller name and same API version as was requested by the route. The important parts to notice about the above query is the names **Constants.MetaControllerName** and **Constants.MetaApiVersion** they are the same constants that are used in the above **ExportMetadata** attributes on the controller.

The last part to getting this working is merely a preference of mine.  But when I create a versioned URL schema like this I like to have separate projects for each version, so I break out the Controller classes in to their own project, so that I have a library of just controllers.  I do this so that when I want to create another version of the API say going from v1 to v2 or v2 to v3, I just need to take a copy of my entire controller project and update the versions and start working from that point moving forward.

Hope this helps somebody, because versioning your web API is a complex process, because if you don’t want to be a totally jerk to your users you have to support both interfaces for a period of time to give the users a chance to move from the current version to the next.  My goal with the above code was to make supporting both versions easy.