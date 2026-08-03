---
title: "Microsoft Source Analysis Still Needs Work"
date: 2008-05-23T14:49:45-05:00
slug: "microsoft-soruce-analysis-still-needs-work"
draft: false
tags:
  - ".NET"
description: "Microsoft just released a tool called Microsoft Source Analysis for C#. Apparently it is a tool they use internally to make sure all their souce code..."
---

![Somebody is wrong on the internet](/images/2008/05/duty_calls1.png "Somebody is wrong on the internet")

Microsoft just released a tool called [Microsoft Source Analysis for C#](https://code.msdn.microsoft.com/Release/ProjectReleases.aspx?ProjectName=sourceanalysis). Apparently it is a tool they use internally to make sure all their souce code looks the same and is easily readable by all those who use it. According to the [blog post that announced this](http://blogs.msdn.com/sourceanalysis/archive/2008/05/23/announcing-the-release-of-microsoft-source-analysis.aspx):

> Source Analysis comes with a set of default rules analyzers covering approximately 200 best practice rules. These rules are full compatible with the default layout settings in Visual Studio 2005 and Visual Studio 2008.
> Specifically, these rules cover the following, in no particular order:
>
> - Layout of elements, statements, expressions, and query clauses
> - Placement of curly brackets, parenthesis, square brackets, etc
> - Spacing around keywords and operator symbols
> - Line spacing
> - Placement of method parameters within method declarations or method calls
> - Standard ordering of elements within a class
> - Formatting of documentation within element headers and file headers
> - Naming of elements, fields and variables
> - Use of the built-in types
> - Use of access modifiers
> - Allowed contents of files
> - Debugging text

So being a neat freak about my code I had to download this tool and give it a shot. I was very excited about the tool and had great hopes for it. However when I actually tried the tool, there was no configuration for turnning off some of the rules that you didn't agree with, like there is in the code analysis analyics tool.

I got literlly over 1000 messages about using spaces instead of tabs, in 3 files, because they felt it nessisary to alert me about every single line of code in my files. They also suggest I put the using statements inside of my namespace. I don't know about you, but I hate the look of that, because stuff should be logically packed together. Only the classes show up in the namespace when you are referencing them, and the using statements are just a compiler indicator, not actual code. It did alert me about a couple of things that I found useful, such as when some of my XML comments weren't long enough and or missing, and other nicities that I can agree with.

However, I am one of those strange developers, according to Microsoft, that likes to use tabs and have my declartion of using statements outside of my namespace. If I were to take this tool seriously I would have to be shunned from the Microsoft Campus and shammed in to never coding again. I guess I should start including the [Rob Conery SupressMessage](http://blog.wekeroad.com/2008/03/12/aspnet-mvc-securing-your-controller-actions/) on my code:

> [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "1000:YouShouldntBeCoding", MessageId = "1#",
> Justification="That's not very nice... but I'm used to it :p")]

Of course I am joking about this, and I think these rules from Microsoft are totally wrong and out of wack with most C# developers. Mostly for the fact that the rules are not fully compatible with Microsofts own defaults they ship. First of all when you create a new class in C# the using statements are outside of the class you create. Second I find that using spaces just forces me to resync my code formatting more often because the spaces tend to get out of wack when you are developing software. Plus you are creating 400% more bytes in your file by using spaces over tabs. I know harddisk space doesn't cost that much, but if you are using a system like TFS it just adds unnessisary bloat to your SQL Server database.

I would have probably agreed with a good 95% of their over 200 rules, if I could get past the 3 files with over 1000 messages about using spaces instead of tabs. I really feel one alert is good enough. It still has many usability and configuration issues to overcome before it will be widely accepted by non-Microsoft developers. Plus all that being said above, I am just stubborn and like my coding style.