---
title: "Introducing the ASP.NET MVC (Part 7) - The Controller"
date: 2009-02-01T07:06:54-05:00
slug: "introducing-aspnet-mvc-part-7-the-controller"
draft: false
tags:
  - "C#"
  - "Chapter 2"
  - "Web"
  - "Wrox"
  - "asp.net mvc"
  - "Book"
description: "This is a continuation of my Introduction to ASP.NET MVC series. As I outlined before this is in an effort to write the book and keep blogging, I decided..."
---

This is a continuation of my Introduction to ASP.NET MVC series. As I outlined before this is in an effort to write [the book](http://www.amazon.com/dp/0470410957/?tag=coderjournal-20 "ASP.NET MVC Website Programming Problem Design Solution (Paperback)") and keep blogging, [I decided to write/blog the last chapter](http://twitter.com/nberardi/status/1052827985), Chapter 2. I am doing this so I can receive feedback on this chapter as early as possible. Because this chapter, in my opinion, is probably the most critical of the book, it defines the context around ASP.NET MVC and how it differs from ASP.NET Web Forms, as well as giving a historical perspective of the MVC pattern.

In the next several posts we will cover the following parts of Chapter 2 from [the book](http://www.amazon.com/dp/0470410957/?tag=coderjournal-20 "ASP.NET MVC Website Programming Problem Design Solution (Paperback)"):

- [The Model-View-Controller Pattern](http://www.coderjournal.com/2008/12/introducing-aspnet-mvc-part-1-model-view-controller/)
- [ASP.NET MVC vs. ASP.NET Web Forms](http://www.coderjournal.com/2008/12/introducing-aspnet-mvc-part-2-aspnet-mvc-vs-webforms/)
- [Installing the Prerequisites](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-3-installing-prerequisites/)
- [Your First ASP.NET MVC Project](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-4-first-aspnet-mvc-project/)
- [The Model](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-5-the-model/)
- [The View](http://www.coderjournal.com/2009/01/introducing-aspnet-mvc-part-6-the-view/)
- [The Controller](http://www.coderjournal.com/2009/02/introducing-aspnet-mvc-part-7-the-controller/)

|  |  |
| --- | --- |
|  | [ASP.NET MVC 1.0 Website Programming: Problem - Design - Solution](http://www.amazon.com/dp/0470410957?tag=omniportal-20&camp=15041&creative=373501&link_code=as3)  by Nick Berardi New: $31.49  This item has not yet been released. You may order it now and we will ship it to you when it arrives. |

### The Controller

In ASP.NET MVC, the controller contains the application logic for manipulating the model, handling user interactions, and choosing the view to display to the browser.  It can be thought of as the glue that holds the model and views together.

The controller, in actuality, is just a class object that inherits from the System.Web.Mvc.IController interface.  However, the typical implementation that you will encounter will be abstracted away from the IController interface, using an already implemented Controller class.  A properly implemented controller will contain one or more action methods, which we will cover in a later section of this chapter.

#### URL Routes

Another important part of the controller is the routes that define the URL.  The routes tell the controller factory which controller to instantiate and which action in the controller should be executed.  Let's take the default route, which we learned about earlier in the chapter, as an example:

```
routes.MapRoute(  
    "Default",
    "{controller}/{action}/{id}",
    new { controller = "Home", action = "Index", id = "" }
);
```

In the above route definition, the URL can be constructed in the following manner:

```
{controller}/{action}/{id}
```

How the controller and routes work is one of those instances where it is easier to demonstrate the capabilities than to try to explain, so here is a table to demonstrate how the above route breaks up the following URL's.

|  |  |  |  |
| --- | --- | --- | --- |
| URL | Controller | Action | ID |
| / | Home | Index |  |
| /Home | Home | Index |  |
| /Home/About | Home | About |  |
| /Account | Account | Index |  |
| /Account/User/1 | Account | User | 1 |

You may have noticed in the above table that some of the parts of the URL are not defined, and in the first case none of the parts are defined.  This is because there are a set of defaults defined for each part of the URL, and if the part of the URL is missing, then the default is used.  The default is defined with the following line in the above example code:

```
new { controller = "Home", action = "Index", id = "" }
```

In ASP.NET MVC there are two parts that need to be present in every route and they are controller and action.  This is because these two parts are required by the controller factory to find the correct controller object and then the correct action method in that controller.  All the other parts can optionally map to the action methods parameters.

When we talk about the controller factory from here on forward, we will be specifically referring to the ASP.NET MVC implementation, called DefaultControllerFactory, which is based on the controller objects using the following format: {controller\_name}Controller (i.e. **Home**Controller, **Account**Controller).  There are many other types of controller factories, such as those based on the Inversion of Control principle, Castle Windsor, Sprint.NET, Structure Map, and Unity that are available from the MVC Contrib project located at www.codeplex.com/mvccontrib, if you are interested in learning more.

#### Controller Factory

The default controller factory in the ASP.NET MVC Framework, the DefaultControllerFactory, uses the following criteria, by default, when searching for available controllers for use:

- The namespace of the web assembly with Controllers added on the end (that is, TheBeerHouse.Web.Controllers).
- The objects in the namespace must be in the following format {controller\_name}Controller (that is,  **Home**Controller, **Account**Controller).
- The objects must also inherit from the IController interface.

These criteria can best be seen in the default solution that we saw earlier in this chapter. Let's take another look at the controllers, as seen in Figure 2-25.

[caption id="attachment\_457" align="alignnone" width="276" caption="Figure 2-25"]![Figure 2-25](http://coderjournal.com/uploads/2009/02/410950-f0225.png "The Controllers")[/caption]

All of those criteria may have made the process of adding a new controller sound complex, but really all that you need to do to accomplish this is add a new code file to the Controllers directory and make sure the object in the code file inherits the Controller object from the System.Web.Mvc namespace.

#### Actions

The actions, like we talked about earlier in this chapter, are what binds the URL to the view being displayed.  They are not that difficult to understand, but to help separate out the different parts that make up an action I have divided them into a couple of logical sections below.  We are going to use the following code example to help bring all of the different sections together.

```
[AcceptVerbs(HttpVerbs.Post)]  
[OutputCache(Duration = 600)]
public ActionResult GetCustomer (string name, string email)  
{
    // code for executing the GetCustomer action
    return View(customer);
}
```

#### Methods

When we refer to an action, we are actually talking about a standard .NET method with parameters, return values, and attributes just like any other in your code.  The only thing that makes it an action is the fact that the method is inside of a controller class.

In the above example code the whole thing can be considered our method, and is probably pretty similar to every other method that you have ever seen or developed.

#### Results

A result is just another name for the return value of the method.  The only criterion for the return value is that it must be, or inherit from, the type ActionResult.

In the example code above, the result type is ActionResult, but it actually returns an object that inherits from ActionResult called ViewResult.  The ViewResult is created from a protected method available on the controller called View() which does all the necessary instantiating of the ViewResult to be returned.

#### Filters

The filters are implemented as attributes on the action methods.  There are two types of filters, one for actions and another for results.  The action filter refers to the action method and has two events. One is for custom processing before the action method has been executed and the other is for after the action method has been executed.  The results filter refers to the HTTP response and has the same two events that the action has, one for before the response is sent and one for after the response is sent to the browser.  We are not going to go into great detail about filters in this book, however we will be using them for such things as authorization, caching, and RESTful service results.

In the sample code above, the filter is the attribute called OutputCache.

#### Selectors

The selectors are implemented as attributes on the action methods.  Since both filters and selectors are implemented using attributes it is often difficult to determine the difference between them, but there is a huge difference.  The selectors are used when the controller factory is trying to determine which action method is the correct one to process the request, so they really have nothing to do with the action method execution, just the selection of the action method by the controller factory.

In the sample code above, the selector is the attribute called AcceptVerbs.

This post is licensed under a different license than the rest of my site. Copyright © Wiley Publishing Inc 2009