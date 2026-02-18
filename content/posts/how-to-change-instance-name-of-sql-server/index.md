---
title: "How To: Change Instance Name Of SQL Server"
date: 2008-02-11T03:16:55-05:00
slug: "how-to-change-instance-name-of-sql-server"
draft: false
tags:
  - "database"
  - "How To"
  - "NAT"
  - "Network"
  - "SQL Server"
  - "T-SQL"
description: "Recently I change the network name of one of my servers at work, because the box changed its job from a virtual machine server to the database server...."
---

Recently I change the network name of one of my servers at work, because the box changed its job from a virtual machine server to the database server. Everything was going great until I decided to setup the server for replication and received the following error message.

> New Publication Wizard
> ------------------------------
> SQL Server replication requires the actual server name to make a connection to the server. Connections through a server alias, IP address, or any other alternate name are not supported. Specify the actual server name, 'old\_name'. (Replication.Utilities)
> ------------------------------
> OK
> ------------------------------

So with a little hunting and SQL queries I found out that SQL Server doesn't use the network name, it only excepts that as an alias. My SQL Server instance was still named "old\_name". I found that out by running these two queries:

```
sp_helpserver  
select @@servername
```

So in order to get the network name and the SQL Server instance name back in sync I had do these steps:

1. Run this in Microsoft SQL Server Management Studio:

   ```
   sp_dropserver 'old_name'  
   go  
   sp_addserver 'new_name','local'  
   go
   ```
2. Restart SQL Server service. I prefer the command prompt for this, but you can just as easily do it in *Services* under the *Control Panel*
   `net stop mssqlserver`
   `net start mssqlserver`

Then after that is done run this again, to make sure everything is changed:

```
sp_helpserver  
select @@servername
```

I don't understand why SQL Server uses it's own name versus the network name, might be due to the fact you can have multiple SQL Server instances install on one machine. It wasn't too hard to change and probably stems from the days when SQL Server was known as Sybase, all in all, I learned something new and it only took 30 minutes of my day to fine the answer.