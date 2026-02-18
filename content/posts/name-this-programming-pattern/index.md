---
title: "Does anybody have a name for this programming pattern?"
date: 2008-02-03T08:50:43-05:00
slug: "name-this-programming-pattern"
draft: false
tags:
  - ".NET"
  - "database"
  - "MVC"
  - "Programming"
  - "Software Patterns"
  - "The Modeling Pattern"
  - "Web"
description: "Recently I have been working very hard on getting a new Web 2.0 initiative off the ground. With most new initiatives I like to start out by looking for..."
---

Recently I have been working very hard on getting a new Web 2.0 initiative off the ground. With most new initiatives I like to start out by looking for software development patterns that will help me standardize my structure as well as make the programming experience common for any new members that are brought on the team. However I recently ran in to a [structural "pattern"](http://sourcemaking.com/structural_patterns) that seems like it is pretty simple and it addresses a common problem in software development. I researched as much as possible on all [the common pattern websites](http://sourcemaking.com/) that I visit and even went as far as posting on [ASP.NET Forums](http://forums.asp.net/t/1212932.aspx) to see if anybody could help me, give it a name. If this "pattern" hasn't been named yet I am going to be shocked.

I like to consider myself pretty educated when it comes to some of the recent developments in structured software development. However I am at a total loss here so I am presenting this pattern to my readers to see if they have seen it before? For now I am calling this "The Modeling Pattern":

The pattern I had in mind is to have the same object with different interfaces each modeling the required data for a specific type of User Interface.

In many websites you normally have the same information represented in various different ways. I originally arrived at this pattern after listening to [Scott Hanselman's MVC Screencast](http://www.hanselman.com/blog/ASPNET35ExtensionsPlusMVCHowToScreencast.aspx). The idea of a model, as in the M in the Model View Controller (MVC), really intrigued me. The more I thought about standard web page designs and how they are mostly based around only one "object", the more it convinced me I was using the right model. For example you have these two different views of a article on the .NET Kicks site. (Which is a great site by the way.)

### .NET Kicks Article Card

I call this a card just for the fact that it is a small representation of all the information for this article, much like a business card is a small representation of all the information about a person.   
[![.NET Kicks Article Card](/nickberardi.com/nickberardi.com/images/2008/02/dot-net-kicks-model-example1.png)](/nickberardi.com/nickberardi.com/images/2008/02/dot-net-kicks-model-example1.png ".NET Kicks Article Card")

### .NET Kicks Article

[![.NET Kicks Article](/nickberardi.com/nickberardi.com/images/2008/02/dot-net-kicks-model-example-21.png)](/nickberardi.com/nickberardi.com/images/2008/02/dot-net-kicks-model-example-21.png ".NET Kicks Article")

Notice how most of the information is similar between the two images above. We know they are similar because it is the same information represented from the database in different views. However the main difference is the amount of information show. Obviously it would be a massive overkill to load the users who kicked the story, and comments, when all that is required is the card view for the front page. I imagine most of this is not new to many of my readers, because SQL lets you create your datasets (models) however you want at will, the real trick in software development is creating the finite number of objects for the infinite number of datasets that SQL can return. That is what I am trying to address with "The Modeling Pattern", creating a finite number of objects that makes sense based on the views I need for my application, because you obviously don't want to dirty load all the properties for performance reasons. This is how I would code the above in "The Modeling Pattern".

```
interface IUserModel  
{
    int Id { get; set; }
    string UserName { get; set; }
    DateTime JoinedOn { get; set; }
}

interface IArticleCardModel  
{
    int Id { get; set; }
    string Name { get; set; }
    string Description { get; set; }
    int KickCount ( get; set; }
    int CommentCount ( get; set; }
    void Kick (IUserModel user);
}

interface IArticleModel : IArticleCard  
{
    List<string> Comments { get; }
    List<IUserModel> UserKicks { get; }
}
```

Then with these interfaces you create the objects.

```
class User : IUserModel  
{
    // implement interfaces plus supporting code
}

class Article : IArticleModel, IArticleCardModel  
{
    // implement interfaces plus supporting code
}
```

Then you create a helper class to fill these methods in the data layer.

```
static class DataHelper  
{
    public static IArticleCardModel GetArticle (int id)
    {
        IArticleCardModel a = new Article();
        // get data from database and only fill in IArticleCardModel interfaces
    }

    public static IArticleModel GetArticle (int id)
    {
        IArticleModel a = new Article();
        // get data from database and fill in IArticleModel interfaces
        // including supporting tables such as the collections
        // or fill in some and dirty fill the others
    }

    // do the same for User
}
```

To use this pattern in something like the MVC framework, you would just use the interfaces instead of the actual object. What this does for you is two fold. Defines the UI model that is required and because it is an interface it doesn't allow you access to the other properties of the class that maybe null.

So if anybody has seen this pattern before I would love to here about it. Also if you have a better name for it and you haven't heard of it, I would love it to have something more than the tactical "The Modeling Pattern".