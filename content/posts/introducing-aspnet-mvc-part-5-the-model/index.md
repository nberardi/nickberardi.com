---
title: "Introducing the ASP.NET MVC (Part 5) - The Model"
date: 2009-01-11T05:13:04-05:00
slug: "introducing-aspnet-mvc-part-5-the-model"
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

- [The Model-View-Controller Pattern](/posts/introducing-aspnet-mvc-part-1-model-view-controller/)
- [ASP.NET MVC vs. ASP.NET Web Forms](/posts/introducing-aspnet-mvc-part-2-aspnet-mvc-vs-webforms/)
- [Installing the Prerequisites](/posts/introducing-aspnet-mvc-part-3-installing-prerequisites/)
- [Your First ASP.NET MVC Project](/posts/introducing-aspnet-mvc-part-4-first-aspnet-mvc-project/)
- [The Model](/posts/introducing-aspnet-mvc-part-5-the-model/)
- [The View](/posts/introducing-aspnet-mvc-part-6-the-view/)
- [The Controller](/posts/introducing-aspnet-mvc-part-7-the-controller/)

|  |  |
| --- | --- |
|  | [ASP.NET MVC 1.0 Website Programming: Problem - Design - Solution](http://www.amazon.com/dp/0470410957?tag=omniportal-20&camp=15041&creative=373501&link_code=as3)  by Nick Berardi New: $31.49  This item has not yet been released. You may order it now and we will ship it to you when it arrives. |

### The Model

In ASP.NET MVC, the model referrers to your applications' business layer or domain objects.  These objects are responsible for persisting the state of your application, which is often, but note necessarily, stored in a database.

There really isn't much to explain about the model as it relates to the ASP.NET MVC Framework, because it is based on your implementation and design of your business layer.  You can use any design pattern, methodology, and or custom process to accomplish the creation of the model:

- DDD (Domain Driven Design)
- TDD (Test Driven Design)
- ALT.NET
- Repository Pattern
- Service Pattern
- Specification Pattern
- POCO (Plain Old CLR Object)
- LINQ To SQL
- ADO.NET Entity Framework
- NHiberante
- Data Tables
- Your custom own business layer
- Any combination of the above.

The point behind all of this is to try to demonstrate that it is up to you to define the model.  It is up to you to make the best decisions related to your requirements.  It is up to you to make it as simple or as complex as needed.  Everything is up to you, when we are talking about the **M** in MVC.

This post is licensed under a different license than the rest of my site. Copyright © Wiley Publishing Inc 2009