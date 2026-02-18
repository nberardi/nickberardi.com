---
title: "A Smarter Entity Framework Include Method"
date: 2011-02-27T06:43:29-05:00
slug: "a-smarter-entity-framework-include-method"
draft: false
tags:
  - "Entity Framework"
  - "Expressions"
  - "Extension Methods"
description: "One of the things I have always disliked about Entity Framework and their support for LINQ is that while your whole LINQ statement is compile time checked..."
---

One of the things I have always disliked about Entity Framework and their support for LINQ is that while your whole LINQ statement is compile time checked to make sure you didn’t fat finger any SQL statement, the *Include()* statement is not.

How many times has something like this happened to you?

```
var account1001 = (new AccountEntities())  
    .Accounts.Include("Userx")
    .Where(account => account.Id == 1001)
    .SingleOrDefault();
```

You might have noticed in the above that I probably wanted *"Users"* instead of *"Userx"*. I don’t know about you but this happens to me all the time, and if the code was just compile time checks like the rest of the LINQ statement everything would be great and I would instantly catch the bug when the code was compiled.

I decided to make the Include method a little smarter with the use of Expressions and Extension methods, so that my include statements can be checked at compile time.  Here is how I did it.

```
public static ObjectQuery<T> Include<T>(this ObjectQuery<T> source, Expression<Func<T, object>> exp)  
{
    var path = GetPath(exp);
    return source.Include(path);
}

private static string GetPath(Expression exp)  
{
    switch (exp.NodeType)
    {
        case ExpressionType.MemberAccess:
            var name = GetPath(((MemberExpression)exp).Expression) ?? "";

            if (name.Length > 0)
                name += ".";

            return name + ((MemberExpression)exp).Member.Name;

        case ExpressionType.Convert:
        case ExpressionType.Quote:
            return GetPath(((UnaryExpression)exp).Operand);

        case ExpressionType.Lambda:
            return GetPath(((LambdaExpression)exp).Body);

        default:
            return null;
    }
}
```

The first method called *Include* has the same signature as the Include method included with the Entity Framework, except instead of taking a string for the path, the one I created above takes an Expression. The second method called *GetPath*, turns the expression in to a representitive string. So if your expression is:

```
x => x.Users
```

It will provide a string with the same signature:

```
"Users"
```

So here in the original statement from above using the new compile time checked include statement:

```
var account1001 = (new AccountEntities())  
    .Accounts.Include(account => account.Users)
    .Where(account => account.Id == 1001)
    .SingleOrDefault();
```

As we were all taught in COMPSCI 101 or learned the hard way, magic strings are bad, and how Entity Framework implemented the Include method is a form of magic string that can easily cause unexpected bugs or even crashes.  So my effort above, hopefully will help some developer avoid a bug that should have been easily avoidable by a simple compile.