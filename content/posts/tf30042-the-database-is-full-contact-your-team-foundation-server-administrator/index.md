---
title: "TF30042: The database is full. Contact your Team Foundation Server administrator."
date: 2009-02-17T16:57:45-05:00
slug: "tf30042-the-database-is-full-contact-your-team-foundation-server-administrator"
draft: false
tags:
  - "Database"
  - "SQL Server"
  - "TF30042"
  - "TFS"
description: "Today I received the following error while trying to check in some code after a marathon night of coding: TF30042: The database is full. Contact your Team..."
---

Today I received the following error while trying to check in some code after a marathon night of coding:

> TF30042: The database is full. Contact your Team Foundation Server administrator.

I got one of those "oh crap" sinking feelings, that some how my TFS server had decided to just die.  After doing a little research on this error, which there is very little (read close to none) information about on the internet.  So I gave up searching and decided to do a little trial and error adhock testing, and I found out that this error has nothing to do with the database but everything to do with the size of the database's log file.  I came up with the following solution, that you will want to run in Microsoft SQL Server Management Studio:

**WARNING!!! My TFS server is in a non-production environment and I am basically the only one who uses it.  Make sure to check with your network administrator and make a back up before you run the following code.**

```
USE [master]

ALTER DATABASE [ReportServer] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [ReportServerTempDB] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TfsWorkItemTracking] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TfsIntegration] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TfsVersionControl] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TfsWorkItemTrackingAttachments] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TfsActivityLogging] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TfsBuild] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [STS_Config_TFS] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [STS_Content_TFS] SET RECOVERY SIMPLE WITH NO_WAIT  
ALTER DATABASE [TFSWarehouse] SET RECOVERY SIMPLE WITH NO_WAIT

ALTER DATABASE [ReportServer] SET RECOVERY SIMPLE  
ALTER DATABASE [ReportServerTempDB] SET RECOVERY SIMPLE  
ALTER DATABASE [TfsWorkItemTracking] SET RECOVERY SIMPLE  
ALTER DATABASE [TfsIntegration] SET RECOVERY SIMPLE  
ALTER DATABASE [TfsVersionControl] SET RECOVERY SIMPLE  
ALTER DATABASE [TfsWorkItemTrackingAttachments] SET RECOVERY SIMPLE  
ALTER DATABASE [TfsActivityLogging] SET RECOVERY SIMPLE  
ALTER DATABASE [TfsBuild] SET RECOVERY SIMPLE  
ALTER DATABASE [STS_Config_TFS] SET RECOVERY SIMPLE  
ALTER DATABASE [STS_Content_TFS] SET RECOVERY SIMPLE  
ALTER DATABASE [TFSWarehouse] SET RECOVERY SIMPLE 

DBCC SHRINKDATABASE(N'ReportServer')  
DBCC SHRINKDATABASE(N'ReportServerTempDB')  
DBCC SHRINKDATABASE(N'TfsWorkItemTracking')  
DBCC SHRINKDATABASE(N'TfsIntegration')  
DBCC SHRINKDATABASE(N'TfsVersionControl')  
DBCC SHRINKDATABASE(N'TfsWorkItemTrackingAttachments')  
DBCC SHRINKDATABASE(N'TfsActivityLogging')  
DBCC SHRINKDATABASE(N'TfsBuild')  
DBCC SHRINKDATABASE(N'STS_Config_TFS')  
DBCC SHRINKDATABASE(N'STS_Content_TFS')  
DBCC SHRINKDATABASE(N'TFSWarehouse')
```

The above code will actually put all the TFS databases in *Simple Recovery* mode, which basically means no log file, and then shrinks all the log files that were previously in use. After you run this script in Microsoft SQL Server Management Studio you should not get this error message anymore, when you try to check in your files.