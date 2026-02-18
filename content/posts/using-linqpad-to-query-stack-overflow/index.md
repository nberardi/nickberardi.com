---
title: "Using LINQPad to Query Stack Overflow"
date: 2010-06-13T11:02:10-05:00
slug: "using-linqpad-to-query-stack-overflow"
draft: false
tags:
  - "LINQ"
  - "LINQPad"
  - "OData"
  - "Stackoverflow; Stack Exchange"
description: "Update (2010-12-30): I have updated the OData URI locations below, because of a recent move and re-architecture by the StackExchange team. In case you..."
---

**Update (2010-12-30): I have updated the OData URI locations below, because of a [recent move and re-architecture](http://blog.stackoverflow.com/2010/12/re-launching-stack-exchange-data-explorer/) by the StackExchange team.**

In case you haven’t read, [Stack Overflow and the rest of the Stack Exchange sites are now able to be queried using OData](http://blog.stackoverflow.com/2010/06/introducing-stack-exchange-data-explorer/).  This is great because as Jeff points out in the blog post:

> …if you just want to play with the data, it’s kind of tedious: you have to download the entire 700 plus megabyte archive, import it into some kind of database system — and only then can you even *begin* thinking about how to query out the results you’re looking for.

This hurdle has stopped me from performing some basic queries that I would like to know on the spot.  But that is no longer the case, and I am going to show you how you can get started querying Stack Overflow from a tool called LINQPad.

### First Things, First

You need to [download LINQPad](http://www.linqpad.net/), which is a general learning and development tool for composing and executing LINQ queries.  After you have downloaded and installed the application you will have a screen that looks like this:

![LINQPad](/images/2010/06/image3.png "LINQPad")

### Setting Up Stack Overflow OData

The next step is to add [the OData endpoint](http://data.stackexchange.com/about) for Stack Overflow, which is:

**<http://data.stackexchange.com/stackoverflow/atom>**

This is done by clicking on **Add connection** in the top left of LINQPad.  Which will give you a screen that looks like this:

[![Choose Data Context](/images/2010/06/image_thumb3.png "Choose Data Context")](/images/2010/06/image4.png)

Select **WCF Data Services** and click **Next**.  You will get a connection screen where you enter the endpoint for Stack Overflow that I described above:

[![LINQPad Connection](/images/2010/06/image_thumb4.png "LINQPad Connection")](/images/2010/06/image5.png)

After entered click **OK**, and you will be taken back to the LINQPad application with a new connection to the Stack Overflow data source that lists all the available tables and fields that you can query.

[![LINQPad w/ Stack Overflow](/images/2010/06/image_thumb5.png "LINQPad w/ Stack Overflow")](/images/2010/06/image6.png)

### Lets Have Some Fun Querying

Lets start with an easy query that we all should know.  **Who is the number 1 Stack Overflow user?**

[![Surprise it is Jon Skeet.](/images/2010/06/image_thumb6.png "Surprise it is Jon Skeet.")](/images/2010/06/image7.png)

**What about which user has the highest number of votes?**

[![Not Jon Skeet, which is surprising.](/images/2010/06/image_thumb7.png "Not Jon Skeet, which is surprising.")](/images/2010/06/image8.png)

**What about down votes?**

[![Another guy in the UK](/images/2010/06/image_thumb8.png "Another guy in the UK")](/images/2010/06/image9.png)

**Show my insightful comments with a score of 5 or greater?**

[![I only have one :(](/images/2010/06/image_thumb9.png "I only have one :(")](/images/2010/06/image10.png)

### Conclusion

As you can see this is a very powerful way to get some quick answers out of Stack Overflow, and it is amazing that Microsoft, Azure, and Stack Overflow is able to bring all of this to us for free.

Also if interested they also offer [OData](http://www.odata.org/) endpoints for all of the other major Stack Exchange network of sites:

- Stack Overflow: <http://data.stackexchange.com/stackoverflow/atom>
- Server Fault: <http://data.stackexchange.com/serverfault/atom>
- Super User: <http://data.stackexchange.com/stackoverflow/atom>
- Meta Stack Overflow: <http://data.stackexchange.com/meta/atom>
- Ubuntu: <http://data.stackexchange.com/ubuntu/atom>
- Gaming: <http://data.stackexchange.com/gaming/atom>
- etc:  <http://data.stackexchange.com/<community>/atom>

Post some of your interesting queries below.