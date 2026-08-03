---
title: "The State of ALT.NET"
date: 2009-03-18T03:17:11-05:00
slug: "the-state-of-altnet"
draft: false
tags:
  - ".NET"
  - "ALT.NET"
description: "Over the past 6 months I have been trying to really quantify what it means to be using ALT.NET practices. And I can honestly say that I still honestly..."
---

Over the past 6 months I have been trying to really quantify what it means to be using ALT.NET practices. And I can honestly say that I still honestly don't know what it means to be an ALT.NETer. But I have come to a number of conclusions about the state of the ALT.NET community, that I wanted to share.

### (1) The ALT.NET Community is fractured among itself.

There are too many different ways of out there of what it means to be a *true* ALT.NETer. There is the Test Driven Design crowd, there is the Domain Driven Design crowd, and to many other *Driven Design* paradigms to mention right now. Each advocate will stand up and say that their way is the only way to develop a true ALT.NET application, and all other ways are an abomination to software development.

#### From this point forward...

We need to understand that it doesn't matter what paradigm you choose to follow or even if it has a name, just that you choose a way to design your application before you start coding. And as long as the way you choose to code is robust, easy to maintain, and easy for another developer to pick up where you left off -- you are doing it right.

### (2) Take the religious zealotry out of ALT.NET

This sort of goes back to #1, but I feel that it needs to be called out directly. There are too many people out there preaching about how their brand of ALT.NET is the only path to salvation from the drudgery of everyday .NET programming. I have heard from a number of people that you don't have a *true* ALT.NET application unless you are using an IoC library, nHibernate, and separate your domain model in to a separate project library away from your data access layer. These types of strict requirements and zealotry for one type of component set the bar way to high for any average developer to say they are following the ALT.NET principals.

#### From this point forward...

It is an acceptable practice to use what ever makes the most sense for your project and your team. For example if you need IoC container and it makes your life easier as a developer to build the framework of your application you should use it, on the flip side if your application is pretty static and there is no need to have these swappable containers you should feel free to not use IoC containers until your application requirements dictate they are needed.

### (3) Craftsmanship with out Engineering is no way to program software.

There seems to be a very strong focus on craftsmanship over standard engineering processes in the ALT.NET community. It seems like each week there is a new hot craftsmanship feature from some other language that is trying to be replicated in .NET. Lately it has been the focus of fluent API's and the duck typing features that dynamic languages like Ruby have built in to their frameworks. This constant change and focus on new hot must have craftsmanship features really detracts from good solid software engineering principals that should be the focus of the ALT.NET education process.

K. Scott Allen had a really good analogy of this focus on craftsmanship over solid engineering of your code. He called it the [Aluminum Wiring in side your software](http://odetocode.com/Blogs/scott/archive/2009/03/16/12651.aspx). In his article he talked about how the shortage of copper in the US during the 60's and 70's caused home construction to use Aluminum wiring over Copper wiring in houses, and how the use of Aluminum caused oxidization, corrosion, and overheating of the houses electrical system. He then went on to ask if all these new craftsmanship features are going to cause the same problems in software development and he specifically called out:

- Mock objects
- Fluent APIs
- Declarative programming

I believe K. Scott is not to far from the truth, because we are sacrificing good engineering practices for what really amounts to programmer candy, just like the US construction industry sacrificed good engineering materials to save a few dollars.  It didn't pay off for the home owners in the long run, and I surmise that this focus on craftsmanship will not pay off for the software in the long run either.

#### From this point forward...

We need to focus on good software engineering over the latest fad in software programming.  Currently the latest fad is making C# work like Ruby.  But it is just that a fad, that will quickly fade away when something new comes along.  It is basically the programmers equivalent of the rise and fall of Paris Hilton in the media.  Ruby is a nice language and has its niche purposes on the web, however there is a reason why Ruby doesn't run mission critical applications (ex. financial systems) like C#, C++, or Java does, it simply doesn't scale all that well.  Only time will tell if it will be around for the long haul or fade way in to the abyss of languages that grace this earth for only a short time.  But either way we shouldn't be making business critical changes to the way we engineer software applications based on the craftsmanship of the newest language to hit the streets.

### Conclusion

My conclusion is a short one on the state of ALT.NET. From everything I have learned over the past 6 months and the immersion in the tools that have come from the ALT.NET community, I have really come to one conclusion that seems to sum them all up.

> **ALT.NET started with some really down to earth goals of educating .NET developers about alternatives to developing software, by taking principals from other languages and frameworks and integrating them in to the .NET developers thought process.** However this simple mission statement has seemed to have morphed into zealotry for design practices and certain tools and an obsession to always change the .NET framework to work more like the latest fad instead of forging out the best practices from other languages and frameworks. The state of ALT.NET is that it is broken, because it seems to be governed by a disorganized committee of bloggers with their own agendas. ALT.NET needs a hero, and that hero just needs to set down some commandments that all other ALT.NET conversations are governed by. *See Update Below* This is the only way the ALT.NET movement is going to survive the test of time.

This isn't going to be an easy task, but I am willing to work with anybody who wants to form a working group to explorer the creation of these ALT.NET Commandments. If you are interested please click the [Contact link](http://www.managedfusion.com/info/contact-us.aspx) above and maybe we can get something moving to help ALT.NET survive the test of time.

**Update:** [Lee Drumond pointed out something](http://leedumond.com/blog/does-alt-net-need-a-dictator/) that I didn't consider about what I said above, and it probably should be rephrased so it is not taken the wrong way.  I had said:

> ALT.NET needs a hero, and that hero just needs to set down some commandments that all other ALT.NET conversations are governed by... I am willing to work with anybody who wants to form a working group to explore the creation of these ALT.NET Commandments.

This should have actually went something like this...  ALT.NET needs a commitee thats sole focus is on advancing the principals of ALT.NET forward and breaking down the bariers in corporations through education.  Once corporations see the benifits of ALT.NET, developers will be finacially modivated to learn the ALT.NET ways, to keep and advance their own careers.  If the movement is not organized, it is nothing more than a social group that may gain a couple followers here and there, and really piss off others, just like any social group would.

By the way nothing I have said here is anything new to the ALT.NET community, it has all been said and repeated many times over in different ways and different formats.  Unfortunately it is usually met with the same reactions, as **Jeremy** has commented below, and very little retrospective seems to be happening.  Everything just moves forward as the status quo, as if there is nothing wrong with the fact that the same concerns are voiced over and over again.

- [Goodbye CodeBetter and ALT.NET (Sam Gentile)](http://samgentile.com/blogs/samgentile/archive/2007/10/06/goodbye-codebetter-and-alt-net.aspx "Goodbye CodeBetter and ALT.NET (Sam Gentile)")
- [Abandon ALT.NET (Colin Ramsay)](http://colinramsay.co.uk/2007/10/07/abandon-altnet/ "Abandon ALT.NET (Colin Ramsay)")
- [Alternative Rock (Frans Bouma)](http://weblogs.asp.net/fbouma/archive/2007/10/08/alternative-rock.aspx "Alternative Rock (Frans Bouma)")