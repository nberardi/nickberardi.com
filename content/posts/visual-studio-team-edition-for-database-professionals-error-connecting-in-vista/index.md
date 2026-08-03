---
title: "Visual Studio Team Edition for Database Professionals Error Connecting in Vista"
date: 2007-03-01T17:44:33-05:00
slug: "visual-studio-team-edition-for-database-professionals-error-connecting-in-vista"
draft: false
tags:
  - ".NET"
  - "Database"
  - "Microsoft"
  - "SQL Server"
description: "As you may all know I have Windows Vista Ultimate x64 and last post I talked about upgrading to SQL Server 2005 SP2. However while starting my first..."
---

As you may all know I have Windows Vista Ultimate x64 and last post I talked about [upgrading to](http://www.coderjournal.com/2007/02/microsoft-sql-server-2005-sp2-for-vista/) [SQL Server 2005 SP2](http://www.coderjournal.com/2007/02/microsoft-sql-server-2005-sp2-for-vista/). However while starting my first Database Project I encountered the following error.

> ---------------------------
> Microsoft Visual Studio
> ---------------------------
> An error has occurred while establishing a connection to the server. When connecting to SQL Server 2005, this failure may be caused by the fact that under the default settings SQL Server does not allow remote connections. (provider: SQL Network Interfaces, error: 26 - Error Locating Server/Instance Specified)
> ---------------------------
> OK
> ---------------------------

It has basically taken me around 24 hours to finally find a solution. The solution was so simple, but yet totally undocumented on if you encounter this error do this. So I am hoping to at least correct that with this post for all the future Googler's out there.

1. In VS 2005 go to `Tools > Options > Database Tools > Design-time Validation Database` and clear out text box SQL Server Instance Name. Click OK.
2. Also for good measures I did this under `Database Connections` too.

Yeah that is it for some reason `localhost` isn't considered a valid SQL Server Instance name. But my problem is solved and I hope this helps somebody else.
