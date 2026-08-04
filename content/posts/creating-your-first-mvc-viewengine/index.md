---
title: "Creating Your First MVC ViewEngine"
date: 2009-05-11T02:46:08-05:00
slug: "creating-your-first-mvc-viewengine"
draft: false
tags:
  - ".NET"
  - "MVC"
  - "ViewEngine"
  - "Web"
  - "asp.net mvc"
description: "A question that I have been hearing a lot lately is: How do I change the view location in MVC? But what they really mean to say is: How do I create a new..."
---

A question that I have been hearing a lot lately is:

> How do I change the view location in MVC?

But what they really mean to say is:

> How do I create a new ViewEngine that uses the view locations of my choosing?

It is actually very simple to do, and once you see it, I think you will agree with my assessment.  The first thing we are going to do to create our custom ViewEngine, is define the paths that we want to use for our master pages, view pages, and shared pages.  I have taken the liberty to define the following paths, you can customize them however you wish:

- **Master Pages:**
  *~/Templates*
  it use to be *~/Views/Shared* or the controllers view
- **View Pages:**
  *~/Views*
- **Shared Pages:**
  *~/Common*
  it use to be *~/Views/Shared*

The next thing we need to do is create a new class for our ViewEngine, for this example we are going to call it *SimpleViewEngine*.

```
public class SimpleViewEngine : VirtualPathProviderViewEngine  
{
}
```

As you might have noticed from above our SimpleViewEngine inherits from *VirtualPathProviderViewEngine*, this is the root ViewEngine that uses the [VirtualPathProvider](http://msdn.microsoft.com/en-us/library/system.web.hosting.virtualpathprovider.aspx) (VPP). The VPP provides a way for web applications to read files off the file system in their local web application, so it is perfect for what we are doing. If you don't want a file system based ViewEngine, and maybe want a ViewEngine based from the database, you can use the *IViewEngine* interface to create your own custom ViewEngine that fits your needs. (MVC is very flexible, by design)

The next thing we need to do is code our paths in to our SimpleViewEngine. We will do this in the constructor, so that they only have to be initialized once for the entire life span of our SimpleViewEngine.

```
public SimpleViewEngine ()  
{
    /* {0} = view name or master page name
     * {1} = controller name
     */

    // create our master page location
    MasterLocationFormats = new[] {
        "~/Templates/{0}.master"
    };

    // create our views and common shared locations
    ViewLocationFormats = new[] {
        "~/Views/{1}/{0}.aspx",
        "~/Common/{0}.aspx",
    };

    // create our partial views and common shared locations
    PartialViewLocationFormats = new[] {
        "~/Views/{1}/{0}.ascx",
        "~/Common/{0}.ascx"
    };
}
```

As you can see the format is pretty straight forward. We create a *string[]* array with the paths of where our master pages, views, and common views are located. The only thing that we need to do is set place holders in our path so the the VirtualPathProviderViewEngine can replace the master name, view name, and controller name to construct our appropriate path.

- **{0}:** is the view name or master page name.- **{1}:** is the controller name.

After we have done the hard part, which honestly wasn't that hard, of creating the constructor with the paths, we just need to return the view objects from the constructed partial paths. Since we are using the standard ASP.NET Web Form (ASPX/ASCX) rendering engine. We are able to leverage the work already done by the MVC team and just return a new instance of the *WebFormView* object.

```
protected override IView CreatePartialView(ControllerContext controllerContext, string partialPath)  
{
    return new WebFormView(partialPath, null);
}

protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)  
{
    return new WebFormView(viewPath, masterPath);
}
```

Nothing really earth shattering here, just simply filling out the constructor with the proper parameters from our method, and then returning the newly created view. If you wanted to create a view based out of the database, or off your own syntax (meaning not ASP.NET syntax) then you would have to create your own view based off of the *IView* interface. But for this example we are only concerned with changing where our views are located.

There is one more thing that we need to do, and that is register our new SimpleViewEngine for use in the framework. The registration of view engines is done in the *Global.asax*, similar to the same way we register new routes.

```
public static void RegisterViewEngines(ViewEngineCollection viewEngines)  
{
    viewEngines.Clear();
    viewEngines.Add(new SimpleViewEngine());
}

public static void RegisterRoutes(RouteCollection routes) { ... }

protected void Application_Start()  
{
    RegisterRoutes(RouteTable.Routes);
    RegisterViewEngines(ViewEngines.Engines);
}
```

So we are now done. You have created a new view engines, defined your own routes, and registered this view engine with the MVC framework. Some other types of paths you may want to consider trying for your applications, using a custom ViewEngine, are special folders for your mobile or [Facebook](/posts/mvc-facebook-wonderful-development-platform/) versions of your website.

- **Mobile:** *~/Views/{1}/**Mobile**/{0}.aspx*- **Facebook:** *~/Views/{1}/**Facebook**/{0}.aspx*

I told you it was simple and straight forward, and I hope you agree that the MVC team has done an awesome job at providing a very flexible framework for us to tweak and customize it so it fits our applications.