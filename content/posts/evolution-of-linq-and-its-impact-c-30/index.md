---
title: "Evolution Of LINQ And Its Impact C# 3.0"
date: 2007-07-09T10:32:52-05:00
slug: "evolution-of-linq-and-its-impact-c-30"
draft: false
tags:
  - ".NET"
  - "Database"
  - "Framework 3.0"
  - "Framework 3.5"
  - "Better Coding"
description: "One of the things I love to learn about is the history of how things come to be. Specifically my interests have always been in the evolutions of religion..."
---

One of the things I love to learn about is the history of how things come to be. Specifically my interests have always been in the evolutions of religion and the tech world (yeah I know pretty much polar opposites, but that is what I like to learn about). I came across an interesting article in my MSDN subscription that talked about how language features of C# 3.0 came to be. The features I am talking about are:

- Lambda Expressions
- Extension Methods
- Anonymous Types
- Implicitly Typed Local Variables
- Object Initializers
- Query Expressions
- LINQ

All these features were made possible because of they wanted to add a feature that let you query collections much like how you query SQL (LINQ) and the strong convictions of the C# language maintainers to not implement hacked together solutions. Much of the same convictions that I try to promote on this blog, and because of these convictions C# developers got some very nice features out of the language.

If you have not heard of LINQ before, this is the basic C# language construct (notice the similarities to SQL):

```
var overdrawnQuery = from account in db.Accounts  
                     where account.Balance < 0
                     select new { account.Name, account.Address };
```

This article, [The Evolution Of LINQ And Its Impact On The Design Of C#](http://msdn.microsoft.com/msdnmag/issues/07/06/CSharp30/default.aspx?loc=en "The Evolution Of LINQ And Its Impact On The Design Of C#"), is well worth the read and I recommend it to anybody that wants to learn more about C# 3.0 or is just interested in how good coding practices can have great impact on projects.
