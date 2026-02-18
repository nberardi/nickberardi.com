---
title: "Introducing the ASP.NET MVC (Part 6) - The View"
date: 2009-01-12T14:06:54-05:00
slug: "introducing-aspnet-mvc-part-6-the-view"
draft: false
tags:
  - ".NET"
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

### The View

In ASP.NET MVC, the view is the presentation of your applications' business layer or model.  Typically with ASP.NET MVC this is HTML, but your view can be rendered in any form that can be transmitted over the internet, including JSON, XML, binary, RSS, ATOM, and your own customized protocol if you have one.

These dynamic ranges of views that, allow it to be capable of such a wide range of delivery types in the ASP.NET MVC Framework are because of a provider engine appropriately called the view engine.  The view engine is responsible for taking the controller and action names and then delivering the right view based on these names.

When I talk about the view engine from here on forward, I will be specifically referring to the ASP.NET MVC implementation, called WebFormViewEngine, which is based on the aspx, ascx, and master files.  There are many other types of view engines, such as Brail, NHaml, NVelocity, and XSLT that are available from the MVC Contrib project located at www.codeplex.com/mvccontrib, if you are interested in learning more.

#### ViewEngine

The default ViewEngine in the ASP.NET MVC Framework, the WebFormViewEngine, uses a hierarchy of folders and aspx and ascx files when rendering HTML pages to the browser.  The WebFormViewEngine, uses the standard ASP.NET Web Forms rendering engine that has been present in the framework since version 1.0, however the emphasis has been moved from control based rendering to an inline code based rendering that is reminiscent of its predecessor, plain old ASP.

Let's take another look at the hierarchy that the default view engine uses, as seen in Figure 2-24.

[caption id="attachment\_456" align="alignnone" width="276" caption="Figure 2-24"]![Figure 2-24](/nickberardi.com/images/2009/01/410950-f02241.png "410950-f0224")[/caption]

The view engine treats aspx and ascx files almost equally, so that it is possible to render your HTML from an ascx or user control file, in the same way that an aspx or page file works.  As you can probably imagine there needs to be a hierarchy or order to which an aspx or ascx file is picked from the controller or Shared directory in Figure 2-24.  The default ASP.NET MVC view engine uses the following lookup order, from top to bottom, when trying to determine which view to render.

1. ~/Views/{controller}/{action}.**aspx**
2. ~/Views/{controller}/{action}.**ascx**
3. ~/Views/**Shared**/{action}.**aspx**
4. ~/Views/**Shared**/{action}.**ascx**

What this above lookup order means is that:

- Controller directories are always checked before the Shared directory.
- aspx or page files are always checked before the ascx or user control files.

The above lookup order even applies to master files, which allows you to select the master page template that you want to render with your view.  The lookup order that the master pages follows is slightly different than the page and user controls:

1. ~/Views/{controller}/{master\_name}.**master**
2. ~/Views/**Shared**/{master\_name}.**master**

Now that we have learned how view pages, controls, and master page are selected let's take a little closer look at the files themselves.

#### ViewMasterPage, ViewPage, and ViewUserControl

In ASP.NET MVC there are three new takes on objects that you are probably familiar with from ASP.NET Web Forms.  These types probably come as no surprise, given what we just covered in the *ViewEngine* section and the title of this section, but they are as follows listed with their Web Form equivalent.

|  |  |  |
| --- | --- | --- |
| MVC | Web Forms | Description |
| ViewMasterPage | MasterPage | Responsible for providing a template to the page object. |
| ViewPage | Page | Responsible for the main content of the web page being viewed. |
| ViewUserControl | UserControl | This is used to sub-divide content and provide a modular |

These object types in MVC are actually inherited from their Web Form counterparts, because they rely on their built in execution, in the ASP.NET Core, as a way of delivering the content through the servers such as IIS.  So all the interfaces you have become acustumed to (i.e. User, Context, Request, Response, IsPostBack, etc.) are still available in the MVC version of the page, user control, and master page.

However when developing for MVC there is a primary difference in the way in which an MVC view is constructed in the code-behind compared to its Web Form counterpart.  The best way to illustrate this difference is by showing you all that this required to have a fully functional view in MVC:

```
public partial class MyViewPage : ViewPage  
{
}
```

Yup, that is all that is required, pretty cool huh?  This is possible because all the application logic that used to be in button clicks, post backs, and other event actions, has been moved to the controller actions.

It is actually considered bad practice in ASP.NET MVC to put any code in the code-behind file.

We have covered the basics of how views are rendered and found and the differences between MVC views compared to their Web Form counterparts.  We will be going in to a great depth of detail on programming views in later chapters of this book.  However we are not quite done, there are a couple more basics things I want to cover before moving on to *The Controller* section.  These include special properties designed to allow easy communication between the model, controller and view.

I have broken up the properties in to logical sections, so that we can discuss the purpose and intended use of each of them as envisioned by the ASP.NET MVC team.

#### ViewData, and Model

The ViewData property is used to store and transmit data from the model and controller to the view for rendering.  It can either be used as a Dictionary object, such as:

```
<%= ViewData["text"] %>
```

Or as a typed model object, such as:

```
<%= ViewData.Model.CustomerID %>
```

That is defined using generics in the inheriting object, such as a Customer type in the ViewPage:

```
public partial class EditCustomer : ViewPage<Customer>
```

It is a very versatile collection that is available to both the views and the controllers, and is passed via the ViewContext, which inherits from the ControllerContext.

#### TempData

The TempData property is a session-backed temporary storage dictionary, much like ViewData, which is available for the current request, plus one.  What this means is that any data you store in the TempData is kept in the session storage for one additional request, beyond the one you're currently processing.

You may be scratching your head like I was when I first learned about TempData, and wondering why this would be important enough to include in the framework.  There is actually a very simple answer to this question, it allows you to pass data across requests, much like you have been accustomed to with the ViewState that is used in Web Forms.  It is also great for passing data between redirects, say you have the following scenario:

A user comes in to your site unauthenticated and you have to redirect them to the login page, but you what to display a message saying they need to login before viewing the content, but that message should display only when they don't visit the login page directly.

Previously to accomplish this type of process you had to jump through hoops to determine if the user came from another page on your site, by checking the referrer or some other custom process that you had to come up with.  Additionally even after you got this done it was hard to customize that message to give the user some indication of where they came from or are going after they login.  TempData really comes to the rescue in this case, because you can the following is the only code that you need to display that message:

```
<% if (TempData["Message"] != null) { %>  
<div class="message"><%= TempData["Message"] %></div>
<% } %>
```

You can even put this code in your master page so that you can display a message to your user on any page in your site, and all that you need is these three lines of code in the view.

#### HTML and AJAX Extension Methods

The HTML and AJAX extension methods provide a way to generate snippets of code for such things as form inputs and links.  For example if you wanted to generate a text box with the name attribute set to CustomerName, you just need to put the following in your view:

```
<%= Html.TextBox("CustomerName") %>
```

And it will generate the following HTML:

```
<input type="text" name="CustomerName" id="CustomerName" value="" />
```

As one added feature if you actually wanted to render the page with CustomerName already filled in, you would just need to set ViewData["CustomerName"], in the controller, equal to whatever you want to be rendered in the HTML.

An extension method for all of the form inputs available through HTML, have been provided with the ASP.NET MVC Framework, plus some other extensions such as AJAX implementations of the form inputs, and anchor link generation for controller actions.  Ninety-nine percent of all the HTML and AJAX extension methods that you will need to generate a web page have been provided in the framework, and if there is something that you must have, you can extend your own method from the HTML helper by doing the following:

```
public static string MyCustomControl (this HtmlHelper html, string name)
```

The this keyword is what is used to add these custom methods on to the HtmlHelper, which is represented as Html in the view pages, we will cover extension methods in greater detail later on in Chapter 6.

This post is licensed under a different license than the rest of my site. Copyright © Wiley Publishing Inc 2009