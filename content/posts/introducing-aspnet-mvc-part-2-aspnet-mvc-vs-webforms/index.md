---
title: "Introducing the ASP.NET MVC (Part 2) - ASP.NET MVC vs. ASP.NET Web Forms"
date: 2008-12-29T13:42:30-05:00
slug: "introducing-aspnet-mvc-part-2-aspnet-mvc-vs-webforms"
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

This is a continuation of my Introduction to ASP.NET MVC series.  As I outlined before this is in an effort to write [the book](http://www.amazon.com/dp/0470410957/?tag=coderjournal-20 "ASP.NET MVC Website Programming Problem Design Solution (Paperback)") and keep blogging, [I decided to write/blog the last chapter](http://twitter.com/nberardi/status/1052827985), Chapter 2.  I am doing this so I can receive feedback on this chapter as early as possible.  Because this chapter, in my opinion, is probably the most critical of the book, it defines the context around ASP.NET MVC and how it differs from ASP.NET Web Forms, as well as giving a historical perspective of the MVC pattern.

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

### ASP.NET MVC vs. ASP.NET Web Forms

As you have seen, in the previous section, and can probably imagine MVC is going to be an architectural pattern that is going to be around for the foreseeable future, especially on the web.  So it is very important to internalize and understand the major differences between ASP.NET MVC and the older ASP.NET Web Forms.

#### ASP.NET Web Forms

Starting with the .NET Framework Version 1.0, in January 2002, Web Forms was Microsoft's first real attempt to provide a first class web application layer that was both robust and flexible enough to meet the demands of the web at that time.  ASP.NET Web Forms has proven to be a mature technology that runs small and large scale websites alike.  Web Forms, was built around the Windows Form construction, where you had a declarative syntax with an event driven model.  This allowed visual designers to take full advantage of the drag and drop, WYSIWYG, interface that they had become accustom to under Windows Forms development in Visual Studio 6.0.  In that they only needed to drop controls onto the ASP.NET page and then wire up the events, as was common in Visual Basic 6.0 development at the time. This made Web Forms a natural choice for Windows Forms developers, because the learning curve was low and the need to understand HTML and many of the web centric technologies almost zero.  Web Forms have many strengths and weaknesses:

##### Strengths

- Mature technology
- Provides very good RAD development capabilities
- Great WYSIWYG designer support in Visual Studio
- Easy state management
- Rich control libraries from Microsoft and third party vendors
- Abstracts the need to understand HTTP, HTML, CSS, and in some cases JavaScript
- ViewState and PostBack model
- A familiar feel to Windows Forms development

Web Forms has grown so much since 2002 because it has the ability to do great things that are often much harder to accomplish in other frameworks.

##### Weaknesses

- Display logic coupled with code, through code-behind files
- Harder to unit test application logic, because of the coupled code-behind files
- ViewState and PostBack model
- State management of controls leads to very large and often unnecessary page sizes

Web Forms is not all roses and buttercups, there are some serious setbacks that usually show up when you are trying to optimize your code for scalability, the biggest problems are the ViewState and PostBack model.  ViewState is a way to store the state of the controls, such as data, selections, etc, which is needed to preserve the Windows Form like development habits of the developers.  ViewState was necessary, because the web is a stateless environment meaning that when a request comes in to the server it has no recollection of the previous request.  So in order to give state to a stateless environment you need to communicate the previous state back to the server, in Web Forms this was accomplished using hidden <input /> fields that can become ridiculously large. This increased size becomes apparent when server controls such as GridView are added to the page.  PostBack was another creation to facilitate the Windows Form development feel, it renders JavaScript for every subscribed event, which leaves web developer less control over how the browser communicates with the server.

#### ASP.NET MVC

ASP.NET was often overlooked as a viable platform for modern highly interactive websites that required a very granular control over the output of the HTML, because of the lack of control over the rendered HTML.  This granularity of control was sacrificed in Web Forms to make if more like Windows Forms development, in other words easier for the drag and drop developers.  This lack of control over the HTML rendering forced developers to move the platforms such as PHP and Ruby on Rails, which offered the level of control they required and the MVC programming model that provided a necessary separation of concerns for their highly complex web applications.

This led Microsoft to announce in the Fall of 2007 that they were going to create a platform based off of the core of ASP.NET that would compete against these other popular MVC web centric platforms.  Microsoft implemented ASP.NET MVC to be a modern web development platform that gives a 'closer to the metal' experience to the developers that program with it, by providing full control and testability over the output that is returned to the browser.  This is the main and most important different between Web Forms and MVC, in my opinion.  MVC has many strengths and weaknesses

##### Strengths

- Provides fine control over rendered HTML
- Cleaner generation of HTML (well as clean as you keep it)
- Clear separation of concerns
- Provides application layer unit testing
- Can support multiple view engines, such as Brail, NHaml, NVelocity, XSLT, etc.
- Easy integration with JavaScript frameworks like jQuery or Yahoo UI frameworks
- Ability to map URLs logically and dynamically, depending on your use
- RESTful interfaces are used by default (this helps out with SEO)
- No ViewState and PostBack model
- Supports all the core ASP.NET features, such as authentication, caching, membership, etc.
- Size of the pages generated typically much smaller because of the lack of the ViewState

##### Weaknesses

- Not event driven by the framework, so it maybe more difficult for ASP.NET Web Form developers to understand
- Requires the need to understand, at least at the basic level, HTTP, HTML, CSS, and JavaScript
- Third party library support is not as strong
- No direct upgrade path from Web Forms
- No ViewState and PostBack model (makes it more difficult to preserve state)

As you can see the pros and cons of MVC have to be weighed just as much as Web Forms, and MVC is not always the logical choice.

#### How do I choose?

It's up to you to decide and you choice needs to be weighted with a number of other factors, such as team and application requirements, when deciding which ASP.NET technology to implement.  I have developed the following worksheet that will hopefully help you decide, when you need to make this decision.

##### The Worksheet

This worksheet is meant to be a guide for when you are trying to choose between Web Forms and MVC.  The values in the Value column are representations of how easy it would be to accomplish the requirement in either MVC or Web Forms.

The values range from 0 to 30, zero being no effort to implement and 30 requiring a great amount of effort to implement.  If the value is positive then it is an advantage to MVC, if the value is negative then it is an advantage to Web Forms.  For example if the value is, +4, then the requirement is more suited for MVC, and it would take a little work to get it to work as easily in Web Forms.  Alternatively, if the value is, -25, then the requirement is definitely suited for Web Forms, and it would take a lot of work to get the requirement to work with MVC.

|  |  |  |
| --- | --- | --- |
| Requirement | Value | Selection |
| Clean HTML Rendering | +4 |  |
| Use RAD Designers | -5 |  |
| Use TDD (Test Driven Design) | +8 |  |
| Testability | +7 |  |
| Data-heavy application | -10 |  |
| Upgrade from Web Forms | -25 |  |
| Need event-driven model compared to Windows Forms programming model | -7 |  |
| Work on an Agile Team | +4 |  |
| Need separation of concerns | +10 |  |
| Creating a proof of concept or prototype | -6 |  |
| SEO | +3 |  |
| RESTful interface | +3 |  |
| Need to preserve state of request | -2 |  |
| Building an Internet Application | +3 |  |
| Building an Intranet Application | -3 |  |
| Need to support multiple views of the same application through mobile, web, and REST API | +7 |  |
| Need to use existing third party controls for ASP.NET Web Forms | -10 |  |
| Need control over the URL that is generated | +5 |  |

So after you make your selection and add up all the values, you should end up with a number representing your project.  Check that number against the table below, and you should have your answer as to which technology, MVC or Web Forms, is best for your project and team.

|  |  |
| --- | --- |
| Value | Reasoning |
| **< -50** | No Brainer, go with Web Forms |
| **-25** | Very Strongly Web Forms |
| **-10** | Strongly Web Forms |
| **-3** | Slightly Web Forms |
| **0** | It is a tossup between Web Forms and MVC |
| **+3** | Slightly MVC |
| **+10** | Strongly MVC |
| **+25** | Very Strongly MVC |
| **> +50** | No brainer, go with MVC |

I want to mention one last thing if you have want to do new development in MVC, but you have to maintain some legacy Web Form pages, you can mix MVC and Web Forms in the same application. You just need to be aware of the differences between the two, and that you probably will not be able to share any of the Web Form front end code with MVC, such as Themes, Master Pages, and User Controls.

As you probably can guess by the name of this book, The Beer House application landed well in to the MVC side of the worksheet.  Which probably doesn't surprise you if you are reading this book!

Feel free to use the above decision table and modify it for your own teams' decision process.  The information provided above however should arm you with most of the important information that you need to know when deciding which way your project should go technology wise.

This post is licensed under a different license than the rest of my site. Copyright © Wiley Publishing Inc 2009