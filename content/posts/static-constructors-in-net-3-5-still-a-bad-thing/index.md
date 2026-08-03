---
title: "Static Constructors in .NET 3.5, still a bad thing?"
date: 2009-08-30T10:55:02-05:00
slug: "static-constructors-in-net-3-5-still-a-bad-thing"
draft: false
tags:
  - ".NET"
  - "CLR"
  - "Code Analysis"
  - "FxCop"
  - "Static Constructors"
  - "beforefieldinit"
description: "Recently at the Philly.NET User Group, Kathleen Dollard gave a great presentation on the use of generics and rethinking object orientation. Both topics..."
cover:
  image: "/images/2009/08/static-constructor-test1.png"
  alt: "Static Constructor Test"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

Recently at the Philly.NET User Group, [Kathleen Dollard](http://msmvps.com/blogs/kathleen/) gave [a great presentation on the use of generics and rethinking object orientation](http://www.phillydotnet.org/Default.aspx?tabid=785).  Both topics were very engaging.  But the part of the night that I found most intriguing was a conversation, that I had in a Ruby Tuesdays after the presentation, about the useage of static constructors and if they are still a bad thing to use in your code.

Many years ago, I had read the articles by [K. Scott Allen](http://odetocode.com/Blogs/scott/archive/2004/09/15/481.aspx) and [Brad Abrams](http://blogs.msdn.com/brada/archive/2004/04/17/115300.aspx), explaining why the original FxCop rule, *"Do not declare explicit static constructors"*, existed and the IL command `beforefieldinit`, that caused the FxCop rule to trigger and cause performance issues.  Jon Skeet explained it best [in a recent Stack Overflow post](http://stackoverflow.com/questions/610818/what-does-beforefieldinit-flag-do/610837#610837).

> Basically, `beforefieldinit` means "the type can be initialized at any point before any fields are referenced."
> *In theory* that means it can be very lazily initialized - if you call a static method which doesn't touch any fields, the JIT doesn't need to initialize the type.
> *In practice* it means that the class is initialized earlier than it would be otherwise - it's okay for it to be initialized at the start of the first method which might use it. Compare this with types which don't have beforefieldinit applied to them, where the type initialization has to occur immediately before the first actual use.

But, I had assumed that since this rule was never include in the Code Analysis (FxCop replacement) part of Visual Studio 2005, 2008, or 2010 that it was a non issue in .NET 2.0 and forward. Since all these previous credible articles that I could find were run against the .NET 1.1 framework.  But I had never really looked in to it until now.  The first thing I did was create the following program to test 8 different senarios where a static constructor could be created by the compiler or was created by me to test the performance differences.

- [Program.cs](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2009/08/Program.cs)

Each of the 8 senarios had a public interface like the following:

```
class StaticX  
{
    static string Name = "Nick Berardi";
    static string GetName() { /* to make sure the Name property was referenced */ }
}
```

The scenarios were broken down as follows:

1. **Static1:** static class, name set on field
2. **Static2:** static class, name set in constructor
3. **Static3:** static class, name set in property
4. **Static4:** static class, name set on field and in constructor
5. **Static5:** name set on field
6. **Static6:** name set in constructor
7. **Static7:** name set in property
8. **Static8:** name set on field and in constructor

![Static Constructor Test](/images/2009/08/static-constructor-test1.png "Static Constructor Test")

I then used reflector to give me the following IL dump of the code.

- [Program.il](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2009/08/Program.il)

If we look at the IL code for each of these classes and static constructors we start finding some interesting patterns in how the compiler optimizes the code.

#### Static1, Static2, Static5, and Static6

All the the following static constructor (`.cctor()`), which is interesting because half of them defined the code in the static constructor and half defined the code by setting the field during initialization.

```
.method private hidebysig specialname rtspecialname static void .cctor() cil managed  
{
    .maxstack 8
    L_0000: ldstr "Nick Berardi"
    L_0005: stsfld string ConsoleApplication1.Program/Static1::Name
    L_000a: ret 
}
```

#### Static3 and Static7

These do not have any static constructor, which we could have probably guessed because there was no constructor defined and no fields set during intialization of the classes.

#### Static4 and Static8

These do not match any of the other static constructors we have seen, probably because there is an operating occurring in them.

```
.method private hidebysig specialname rtspecialname static void .cctor() cil managed  
{
    .maxstack 8
    L_0000: ldstr "Nick"
    L_0005: stsfld string ConsoleApplication1.Program/Static8::Name
    L_000a: ldsfld string ConsoleApplication1.Program/Static8::Name
    L_000f: ldstr " Berardi"
    L_0014: call string [mscorlib]System.String::Concat(string, string)
    L_0019: stsfld string ConsoleApplication1.Program/Static8::Name
    L_001e: ret 
}
```

There is one more place we are going to want to pay attention to before we start looking at the performance, and I sort of alluded to this at the beginning of the article. That is the IL for the class definition:

```
.class abstract auto ansi sealed nested public beforefieldinit Static1  
.class abstract auto ansi sealed nested public                 Static2
.class abstract auto ansi sealed nested public beforefieldinit Static3
.class abstract auto ansi sealed nested public                 Static4
.class          auto ansi        nested public beforefieldinit Static5
.class          auto ansi        nested public                 Static6
.class          auto ansi        nested public beforefieldinit Static7
.class          auto ansi        nested public                 Static8
```

*Please note that I added in the spaces to show the differences between the definitions.*

You will notice that the `abstract` and `sealed` are missing from *Static5* - *Static8*, don't worry about those keywords they are the difference between a `static class` and an `instantiatable class`. The one we are about is `beforefieldinit`, which is only added to classes that don't already contain a static constructor. The definition of how this works has [changed slightly from the original specification](http://www.ecma-international.org/publications/standards/Ecma-335-arch.htm) ([ECMA-335](http://msdn.microsoft.com/en-us/netframework/aa569283.aspx)). Here is the break down as related to .NET Framework releases:

- 1st Edition (December 2001) - .NET 1.0
- 2nd Edition (December 2002) - .NET 1.1
- 3rd Edition (June 2005) - .NET 2.0, .NET 3.0, .NET 3.5
- 4th Edition (June 2006) - .NET 2.0, .NET 3.0, .NET 3.5 (Changes from the previous edition were made to align this Standard with ISO/IEC 23271:2006.)

I have marked changes that have been added since the first edition.

> The semantics of when and what triggers execution of such type initialization methods, is as follows:
>
> 1. A type can have a type-initializer method, or not.
> 2. A type can be specified as having a relaxed semantic for its type-initializer method (for
>    convenience below, we call this relaxed semantic `BeforeFieldInit`).
> 3. If marked `BeforeFieldInit` then the type’s initializer method is executed at, or sometime before,
>    first access to any static field defined for that type.
> 4. If not marked `BeforeFieldInit` then that type’s initializer method is executed at (i.e., is triggered
>    by):
>    - first access to any static field of that type, or
>    - first invocation of any static method of that type or
>    - first invocation of any constructor for that type. **(new in 3rd edition)**
> 5. Execution of any type's initializer method will not trigger automatic execution of any initializer
>    methods defined by its base type, nor of any interfaces that the type implements
>
> **START -- The following is new to the 3rd edition.**
> For reference types, a constructor has to be called to create a non-null instance. Thus, for reference types, the
> .cctor will be called before instance fields can be accessed and methods can be called on non-null instances. For
> value types, an “all-zero” instance can be created without a constructor (but only this value can be created
> without a constructor). Thus for value types, the .cctor is only guaranteed to be called for instances of the value
> type that are not “all-zero”. [*Note*: This changes the semantics slightly in the reference class case from the first
> edition of this standard, in that the .cctor might not be called before an instance method is invoked if the 'this'
> argument is null. The added performance of avoiding class constructors warrants this change. *end note*]
> **END**
> [*Note*: `BeforeFieldInit` behavior is intended for initialization code with no interesting side-effects, where exact
> timing does not matter. Also, under `BeforeFieldInit` semantics, type initializers are allowed to be executed *at
> or before* first access to any static field of that type, at the discretion of the CLI.
> If a language wishes to provide more rigid behavior—e.g., type initialization automatically triggers execution
> of base class’s initializers, in a top-to-bottom order—then it can do so by either:
>
> - defining hidden static fields and code in each class constructor that touches the hidden static field of its
>   base class and/or interfaces it implements, or
> - by making explicit calls to System.Runtime.CompilerServices.Runtime-HelpersRuntimeHelpers**3rd edition**.RunClassConstructor
>   (see Partition IV).
>
> *end note*]

So to analyze what has changed, it looks like some major changes took place in the CLR for the .NET 2.0 framework on how and when static constructors should be initialized. In [K. Scott Allen's post that I referenced above](http://odetocode.com/Blogs/scott/archive/2004/09/15/481.aspx) he concluded that classes with out the `beforefieldinit` IL command ran 5 times faster on the .NET 1.1 framework. Lets see if that still holds true for the .NET 2.0 framework (and .NET 3.0 and 3.5 which run off the same CLR as .NET 2.0).

To test this, I ran each of the 8 scenarios through a loop about **2.15 billion** times. Or [Int32.MaxValue](http://msdn.microsoft.com/en-us/library/system.int32.maxvalue.aspx). Then I repeated the process 5 times (for those counting each one was ran about 10 billion times), and averaged the results and came up with these numbers:

1. **Static1:** `05.7505114` seconds (static class, name set on field)
2. **Static2:** `07.4920393` seconds (static class, name set in constructor)
3. **Static3:** `11.6594099` seconds (static class, name set in property)
4. **Static4:** `08.3254804` seconds (static class, name set on field and in constructor)
5. **Static5:** `05.7362727` seconds (name set on field)
6. **Static6:** `07.6593536` seconds (name set in constructor)
7. **Static7:** `12.4801669` seconds (name set in property)
8. **Static8:** `08.3191176` seconds (name set on field and in constructor)

We can obviously throw out the outliers of setting the name in the property because they where 2 times slower than the fastest method. And we can also throw out the name being set half in the field and half in the constructor, because this is obviously not the best performing and is also not really the best way to code this type of field, and it was only in there as a baseline for doing both a field and constructor setting in the same class.

So lets look at the actual numbers of field vs constructor:

|  | field | constructor | difference |
| --- | --- | --- | --- |
| static class | `05.750511` | `07.492039` | `01.741528` |
| instantiatable class | `05.7362727` | `07.6593536` | `01.9230809` |
| difference | `00.014238`3 | `00.167314`6 |  |

The performance points are pretty much a wash between *static class* and *instantiatable class*, and there is essentially no difference between the field and constructor for everyday normal programs to think about changing how you create your static-code as related to fields or constructors. The difference was only 30%, while that sounds like a lot the difference was only 2 seconds over 2.15 billion times run, so we are really talking about fractions of milliseconds per instance. In addition it was no 500% reported by K. Scott Allen against .NET 1.1 back in 2004.

You can draw your own conclusions. **But my recommendation is to NOT spend your time changing your code from the use of static constructor to fields, because you won't find the performance gains in your application.** Spend the time on something useful, like the amount of data you are pulling from the database or other places.

I think we can finally put this issue to rest and say that there is no more performance penalty to a degree that every day programmers should care about if you are using the .NET 2.0 framework or forward. Which means I probably guessed correctly as to why they removed it from the Code Analysis rules in Visual Studio 2005.

**Update:** I had to run each static class individually again to get the correct results, because after I had published this I started playing around with other scenario and noticed that there seemed to be an **optimization of static constructor classes (without `beforefieldinit`), with the same constructor signature, that got loaded later**. With the new results, there is now there is virtually no difference between static classes and instantiatable classes which is what I sort of assumed would happen from the beginning.

If anybody knows why static constructor classes that share the same signature would be optimized can you please let me know, this is a new mystery to the static constructor debate.