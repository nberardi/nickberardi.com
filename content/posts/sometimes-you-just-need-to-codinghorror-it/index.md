---
title: "Sometimes you just need to CodingHorror it!"
date: 2009-12-03T05:53:46-05:00
slug: "sometimes-you-just-need-to-codinghorror-it"
draft: false
tags:
  - ".NET"
  - "Codinghorror"
  - "Database"
  - "Entity Framework"
  - "SubSonic"
description: "The title of this post is a tongue-in-cheek reference to SubSonic’s inline query by the same name, which in turn is a reference to the blogger Jeff..."
---

The title of this post is a tongue-in-cheek reference to [SubSonic’s inline query](http://www.subsonicproject.com/docs/CodingHorror) by the same name, which in turn is a reference to the blogger [Jeff Atwood’s blog](http://www.codinghorror.com) who you should all know.  [Rob Conery](http://blog.wekeroad.com/), the SubSonic project leader, named the inline query class *CodingHorror* after he allegedly read Jeff Atwood’s post titled [Embracing Languages Inside Languages](http://www.codinghorror.com/blog/archives/000989.html), in which he bestowed the virtues of inline SQL inside your code, instead of the standard bequeathed statement that I bet you all have heard “We do all database work in stored procedures.”.  Jeff outlined his though process on ad-hoc vs stored procs as follows:

> The [Subsonic project](http://www.subsonicproject.com) attempts to do something similar for SQL. Consider this SQL query:
>
> ```
> SELECT * from Customers WHERE Country = "USA"  
> ORDER BY CompanyName
> ```
>
> Here's how we would express that same SQL query in SubSonic's fluent interface:
>
> ```
> CustomerCollection c = new CustomerCollection();
> c.Where(Customer.Columns.Country, "USA");  
> c.OrderByAsc(Customer.Columns.CompanyName);  
> c.Load();
> ```
>
> I've mentioned before that [I'm no fan of object-oriented rendering](http://www.codinghorror.com/blog/archives/000617.html) when a simple string will suffice. That's exactly the reaction I had here; why in the world would I want to use four lines of code instead of one? This seems like a particularly egregious example. **The SQL is harder to write and more difficult to understand when it's wrapped in all that proprietary SubSonic object noise.** Furthermore, if you don't learn the underlying SQL-- and how databases work-- you're in serious trouble as a software developer.

### Enough of the History lesson, why are you writing this post

Well the reason for this post is two fold, I haven’t written a post in a couple of weeks, and I wanted to write about my own *CodingHorror* moment, while working with the Entity Framework, that solved a big problem I was having with getting the LIKE statement to work in LINQ.

I am working with a client of mine trying to expose their data to the web via a simple REST service.  Their whole database model has been constructed in the Entity Framework in a simple active record format.  One of the requirements, I was given, was to support wildcards on a couple of the input fields.  I thought this was no big deal, because I knew that the **StartWith**, **EndsWith**, and **Contains** methods of the **System.String** object, when used in LINQ, translated down to the SQL LIKE operator.

However at the time I didn’t anticipate how much of a pain in the butt it was to actually figure out which of these three methods I should use depending on where the wildcard was placed in the string.  And how I would support a wildcard that was placed in the middle of a string.

### Enter Entity Frameworks’s parameterized Where method

The parameterized [**Where**](http://msdn.microsoft.com/en-us/library/bb338811.aspx) method, of the *ObjectQuery<T>* object, really saved my butt.  It allowed me to produce the exact effect of the query I was looking for, and with out a lot of hacking.  Here is what I did:

```
if (!String.IsNullOrEmpty(toAddress))
    table = table.Where(
        "it.ToAddress LIKE @toAddress", 
        new ObjectParameter("toAddress", toAddress)
    );

var results =  
    from result in table
    where result.Account.AccountId == accountId
        && result.DateTime >= startDate

return View(results.ToList());
```

The best part of the above code is that I can still use LINQ, and jump in to standard SQL syntax when the LINQ syntax fell short.

This is my opinion gives the Entity Framework a step above the rest, because it means that I don’t have to complicate my life and my program by moving to a stored proc or making the whole select statement inline-SQL (which I wouldn’t ever do).

Features like this that make developing software easier, and obviously have the programmer in mind, are what we should all strive for.  I like this for the very fact that the Entity Framework team has acknowledged that LINQ, while a wonderful addition to .NET, doesn’t meet all the needs for pulling data from the database and they sought to minimize the short comings by allowing developers to jump back in to the natural SQL language.  This is a wonderful addition in my book.