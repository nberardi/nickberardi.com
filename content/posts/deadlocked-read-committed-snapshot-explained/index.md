---
title: "Deadlocked!: \"read committed snapshot\" Explained"
date: 2008-08-25T06:32:01-05:00
slug: "deadlocked-read-committed-snapshot-explained"
draft: false
tags:
  - "Database"
  - "LINQ"
  - "read committed snapshot"
  - "SQL Server"
description: "I just recently read Jeff Atwood's Deadlocked! article. I just wanted to give some more insight in to the read committed snapshot so that it is not..."
---

I just recently read [Jeff Atwood's Deadlocked!](http://www.codinghorror.com/blog/archives/001166.html) article. I just wanted to give some more insight in to the `read committed snapshot` so that it is not perceived as "magic". It has some definite advantages when dealing with deadlocks, however if your code relies on row level locking you are not going to be able to use this type of reading in SQL Server.

First lets talk about how you enable it. It is not a [transactional isolation level](http://msdn.microsoft.com/en-us/library/ms173763.aspx), so if you set it, it will effect your whole database. **You have been warned!**

```
alter database [YourDatebaseHere]  
set read_committed_snapshot on  
go
```

Basically what this does is create a snapshot or read-only database of your current results that is separate from your live database. So when you run a `SELECT` statement, to read your data, you are reading from a read-only copy of your database. When you change your database, it happens on the live database, and then a new copy or snapshot is created for reading against.

Personally I am using it on [IdeaPipe](http://www.ideapipe.com), because like most Web 2.0 applications there are a heavy amount of reads and very few updates that effect the row. So chances are if you have a website this will decrease your number of deadlocks. But make sure to test thoroughly before implementing `read committed snapshot`.

When I was doing my initial research a while ago I found this article [talking about how snapshot isolation can bite you where it hurts](http://www.devx.com/dbzone/Article/32957/0/page/4).

> For example, suppose READ COMMITTED SNAPSHOT is not enabled in the database and you want to assign one more ticket to a person, but only if that user does not already have high priority tickets:
>
> ```
> BEGIN TRANSACTION  
> UPDATE Tickets SET AssignedTo = 6 WHERE TicketId = 1  
> AND NOT EXISTS(SELECT 1 FROM Tickets WHERE AssignedTo = 6 AND Priority='High')  
> --- do not commit yet
> ```
>
> Note that you have not explicitly specified an isolation level, so your transaction runs under the default READ COMMITTED level. If another connection issues a similar update:
>
> ```
> UPDATE Tickets SET AssignedTo = 6 WHERE TicketId = 2  
> AND NOT EXISTS(SELECT 1 FROM Tickets WHERE AssignedTo = 6 AND Priority='High')
> ```
>
> it will hang in a lock waiting state. Once you commit your first transaction the second one will complete, but it will not assign ticket 2 to user 6, which is the correct behavior as designed.

However if `read committed snapshot` is enabled on the database the user will end up with two high priority tickets, because the first read happens against a snapshot and the update happens against the live database. So this will obviously cause problems for specifications and business rules that rely on row level locking. **So be careful, and make sure you specifically know what is happening with your code before turning this on**

*Note:* Chances are if you are using LINQ you don't have to worry about the above scenario, however I am not a DBA expert, only a student of the practice. So take what I say with a grain of salt.