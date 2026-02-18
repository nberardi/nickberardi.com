---
title: "Being Stolen From Sucks"
date: 2013-02-16T18:01:12-05:00
slug: "being-stolen-from-sucks"
draft: false
description: "When you put open source software out there in the wild there is a mutual understanding that, you are going to see my source code, and probably take some..."
---

When you put open source software out there in the wild there is a mutual understanding that, you are going to see my source code, and probably take some influence from it into your own source code.  Maybe sometimes you even take a little more than influence, and copy some lines of code.  As an open source developer, we all know this is happening and we all know this is alright, encouraged, and to be expected.

When it gets to the point of out right copying of whole files it becomes a different story all together.  And that is what I am addressing today.  I should start out by saying that [Datastax](http://www.datastax.com/) is a great contributor to open source software, and has provided the Cassandra community with a great amount of free docs and tools, and is one of the primary drivers behind recommending the FluentCassandra library to clients.  I wish that is where we could leave it.

One of their developers decided to take some shortcuts and started copying FluentCassandra without attribution and passing the work off has his own. Everybody has deadlines and I understand that, but it takes a certain kid of malevolence and disdain for open source software, to out right copy certain parts of a competing code bases code for the expediency of getting your own out to market.

The developer who did this, [Pawel Kaplanski](https://github.com/pawel-kaplanski), contributed a couple issues and some minor code that ultimately had to be rewritten to FluentCassandra back in September 2012.  You can see that he does work for Datastax here and that the only thing he has done for open source software ever to contribute a few minor things to FluentCassandra over a 3 day period in September. *(side note: I would hope that a company like Datastax who loves open source software, would hire developers who love open source software, however that doesn't appear to be the case with Pawel who seems to only troll for code to make his day job easier)*

![copycat-pawel-kaplanski](/images/2013/02/copycat-pawel-kaplanski.png)

Pawel was first introduced to me back in September by Michael Figuiere. In the email Michael was explaining to me that Pawel was going to be helping me out on FluentCassandra while working on their own client library.  Which was wonderful news for me, because I always appreciate help, I thought this was a win-win for everybody involved. But as you can see from the above Github interactions, Pawel didn't quite live up to his end of the bargain, and as I will show next in seemed to only be a win for Pawel.

![email](/images/2013/02/email.png)

So lets get down to the dirty stuff.  Which I have started to [track in an issue on FluentCassandra](https://github.com/managedfusion/fluentcassandra/issues/114).  The first and most egregious copying of code, and the part of FluentCassandra that has literally taken many many weeks of my time, over the past year, in tweaking and getting just right is the LINQ Expression Evaluator.

![compare1](/images/2013/02/compare1.png)

As you can see in this picture the white spaces in the indicator on the left hand side is code that was copied.  These pieces of code contain the exact method names, program code, positions, and everything, so it is undoubtedly copied as a whole and then tweaked for his own needs.  This is just lazy and dishonest.

There are others too, notice any similarities here:

<https://github.com/datastax/csharp-driver/blob/28d8958873f55727bf515cf97b32c9cbfa31af9f/Cassandra.Data.Linq/CqlQueryEvaluator.cs>   
<https://github.com/datastax/csharp-driver/blob/28d8958873f55727bf515cf97b32c9cbfa31af9f/Cassandra/GuidGenerator.cs>   
<https://github.com/datastax/csharp-driver/blob/28d8958873f55727bf515cf97b32c9cbfa31af9f/Cassandra/GuidVersion.cs><https://github.com/datastax/csharp-driver/blob/28d8958873f55727bf515cf97b32c9cbfa31af9f/Cassandra/DateTimePrecise.cs>

No attribution at all for our hard work:

<https://github.com/managedfusion/fluentcassandra/blob/master/src/Linq/CqlQueryEvaluator.cs>   
<https://github.com/managedfusion/fluentcassandra/blob/master/src/GuidGenerator.cs>   
<https://github.com/managedfusion/fluentcassandra/blob/master/src/GuidVersion.cs><https://github.com/managedfusion/fluentcassandra/blob/2c77dfca83891a9559e14a2b58797095c0486050/src/System/DateTimePrecise.cs>

The last one is the most interesting because it dates when he copied the FluentCassandra source code as somewhere between August 25 and September 6.  Which line up nicely to his 3 days that he looked at FluentCassandra.  I know this date range because I [removed DateTimePrecise from the code base on September 6](https://github.com/managedfusion/fluentcassandra/commits/master/src/System/DateTimePrecise.cs) because it had a nasty bug in it.

![history-datetimeprecise](/images/2013/02/history-datetimeprecise.png)

To be clear I am just very irritated that Datastax promised some help to FluentCassandra and the only help we seem to have gotten was a developer who decided to steal our code and not contribute anything back.  And the two bugs that Pawel opened on FluentCassandra were bugs that he fixed in his own copy of the source code, but couldn't be bothered to contribute back to FluentCassandra.  That takes a real set of brass ones to be that blatant.![pawel-issues](/images/2013/02/pawel-issues.png)

There is one bright spot and really all that I ask for, developer [kcieslinski](https://github.com/kcieslinski) [does actually attribute FluentCassandra](https://github.com/datastax/csharp-driver/blob/master/Cassandra/BigDecimal.cs)when he copied the BigDecimal code.

![kcieslinski](/images/2013/02/kcieslinski.png)

That simple one line is all that I ever ask for.