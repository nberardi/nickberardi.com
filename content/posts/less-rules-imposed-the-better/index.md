---
title: "Less Rules Imposed The Better"
date: 2007-06-01T05:56:45-05:00
slug: "less-rules-imposed-the-better"
draft: false
tags:
  - ".NET"
  - "Better Coding"
description: "Recently I read an article from Jeff Atwood, where he basically claimed the brevity leads to better code. Personally I think his example he gave: if (s ==..."
---

Recently I read an [article](http://www.codinghorror.com/blog/archives/000878.html "The Best Code is No Code At All") from Jeff Atwood, where he basically claimed the brevity leads to better code. Personally I think his example he gave:

```
if (s == String.Empty)  
if (s == "")
```

Is just plain wrong, and this is the comment I put on his website:

I think this is a very bad example using "" and String.Empty. Because essentially "" is a magic number of sorts, I am talking totally theoretical here, I know that "" is never going to change from representing a empty string, but what happens when developers start using "\n\r" instead of Environment.NewLine, not only does it cause a problem if you move to Mono on Linux it also requires a higher knowledge level to understand what "\n\r" means and you even have to remember what order it goes in.

It is good practice to get developers thinking that magic values such as "" and "\n\r" and any number is not the right way to code. Because if you tell them it is okay to use "" then why is it not okay to use 3.14F for PI instead of using Math.Pi?

It's all about staying consistent and having the least amount of rules as possible, that is how you keep code simple across your organization.

Also by your same logic a developer should never use VB.NET because the language is way to verbose. I personally am a C# developer, but if a person is more productive in VB.NET and it meets the requirements for the project who am I to tell them they should use C# because it is less verbose.
