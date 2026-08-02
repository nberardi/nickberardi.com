---
title: "Introducing the ASP.NET MVC (Part 1) - The Model-View-Controller Pattern"
date: 2008-12-14T05:45:08-05:00
slug: "introducing-aspnet-mvc-part-1-model-view-controller"
draft: false
tags:
  - ".NET"
  - "C#"
  - "Chapter 2"
  - "SEO"
  - "Web"
  - "Wrox"
  - "asp.net mvc"
  - "Book"
description: "About a month and a half ago I announced that I am writing a book, I was really overwhelmed by the amount of support that I received from this..."
cover:
  image: "/images/2008/12/410950-f02011.png"
  alt: "Figure 2-1"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

About a month and a half ago I announced that [I am writing a book](http://www.coderjournal.com/2008/10/asp-net-mvc-has-changed-my-life/), I was really overwhelmed by the amount of support that I received from this announcement.  Both myself and Al are really looking forward to the day when this book ships, and we start receiving real feedback on all our hard work.  However, both of us would like to start receiving feedback as soon as possible, so...

In an effort to write [the book](http://www.amazon.com/dp/0470410957/?tag=coderjournal-20 "ASP.NET MVC Website Programming Problem Design Solution (Paperback)") and keep blogging, [I decided to write/blog the last chapter](http://twitter.com/nberardi/status/1052827985), Chapter 2.  I am doing this so I can receive feedback on this chapter as early as possible.  Because this chapter, in my opinion, is probably the most critical of the book, it defines the context around ASP.NET MVC and how it differs from ASP.NET Web Forms, as well as giving a historical perspective of the MVC pattern.

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

### The Model-View-Controller Pattern

The Model-View-Controller architectural pattern has been around since 1978 and was first described by Trygve Reenskaug while working on a programming language called Smalltalk at Xerox PARC.  The implementation was first described in his now famous paper on the subject, titled Applications Programming in Smalltalk-80: How to use Model-View-Controller, published on December 1979, and has been popping its head up in many different ways and forms since the original paper was published.  Reenskaug maintains a page that explains MVC in his own words (<http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html>), and contains his publications on the subject; it is well worth the read and is only two pages long.

The MVC pattern has been implemented in most every programming language that is in use today, including ColdFusion, Java, JavaScript, Perl, PHP, Python, Ruby, Smalltalk, XML, and of course .NET.  In fact in November, 2002 the W3C, the main international standards body for the World Wide Web, voted to make the MVC pattern part of their XForms specification, which will be integrated directly into the XHTML 2.0 standard.

Reenskaug explains on this site that "The essential purpose of MVC is to bridge the gap between the human user's mental model and the digital model that exists in the computer."  As illustrated in Figure 2-1.

[caption id="attachment\_387" align="alignnone" width="691" caption="Figure 2-1"]![Figure 2-1](/images/2008/12/410950-f02011.png "MVC Diagram")[/caption]

He goes on to explain that "The ideal MVC solution supports the user illusion of seeing and manipulating the domain information directly.  The structure is useful if the user needs to see the same model element simultaneously in different contexts and/or from different viewpoints."  This is important because it puts the emphasis not on the application, but how the user perceives the data, the controller and view is only a means to the end of allowing the user to visualize the model in other words.

Reenskaug defines the Model-View-Controller in the following way.

- **Model**: Represents knowledge.  A model can be in the simplest case a single object in your application, or in a complex case combination of objects.  It should represent the world as seen by the developer for the application that is being developed, in other words your database or domain.
- **View**: Visual representation of the *Model*.  It should highlight the certain aspects of the model while minimizing the others where possible.  According to Reenskaug it should act as a presentation filter.  What he describes as a presentation filter is the notation of a contract created between the *Model* and the *View* that will provide the parts of the model requested for the presentation by the *View*.
- **Controller**: A controller provides a link between the user and the system.  It provides the user with actions that can be taken against the *Model*, which in other words creates a set of inputs that can be acted upon and represented to the user in one or more ways through a *View*.

### Bringing MVC Down To Earth

The concepts and ideas behind MVC were honestly a little abstract for me when I was first getting started, it took me a while to understand how the Model, View, and Controller where suppose to work together to create an application.  Unfortunately at the time I didn't have a great example that clearly defined the lines between the different parts of the Model, View, and Controller, so I had to learn the hard way.  Lucky for us Jeff Atwood, of codinghorror.com fame, provided an example that really struck a chord with me.  Figure 2-2 is a visual representation of his example.

[caption id="attachment\_388" align="alignnone" width="1097" caption="Figure 2-2"]![Figure 2-2](/images/2008/12/410950-f02021.png "MVC Browser Model (Atwood)")[/caption]

This example almost perfectly represents MVC in a way that any web developer with only basic knowledge of HTML and CSS can understand.

- **Model**: The HTML is the "skeleton" or definition of the data to be displayed to the user.
- **View**: The CSS is the "skin" that gives the HTML a visual presentation.  The CSS can be swapped out to view the original content in a different manor, without altering the underlying *Model*.  They are relatively, but not completely, independent of each other.
- **Controller**: The browser is responsible for combining the CSS and HTML, into a final representation that is rendered out to the screen in the form of pixels.  It gathers input from users, but it is restricted to the input defined by the HTML in the form of input, select, textarea, and button DOM objects.

I find this to be an awesome acknowledgement to the success of the Model-View-Controller, because the browser is a natural interface for a computer user that wants to visualize the World Wide Web.  It successfully maps the *Mental Model*, from Figure 2-1, that a designer envisioned as an interface for the user to the *Computer Model*, which a developer coded for use on the World Wide Web.  So I hope this helped you visualize MVC in a way that helps you break out and understand the concepts behind the Model, View, and Controller.  If you would like to read Jeff's full article it is available at <http://www.codinghorror.com/blog/archives/001112.html>.

For the purpose of this book we are going to define MVC as the following:

- **Model**: The classes which are used to store and manipulate the state of the database, through our domain objects, combined with some business logic.
- **View**: The user interface parts, coded in HTML, necessary for rendering the *Model* to the user.  It may also render the *Model* as XML or JSON if needed programmatically by JavaScript.
- **Controller**: The application layer that will accept the input and save that information to the database through our Model.  It will also contain a small amount of business logic necessary for controlling and validating the inputs.  The controller will also decide which view to render, the HTML, XML, or JSON depending on the form that was requested by the browser.

The above definition of MVC for our application, The Beer House, is an almost exact representation of MVC as defined by the ASP.NET MVC team.

This post is licensed under a different license than the rest of my site. Copyright © Wiley Publishing Inc 2009