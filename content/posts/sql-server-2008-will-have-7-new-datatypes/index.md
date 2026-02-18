---
title: "SQL Server 2008 Will Have 7 New Datatypes"
date: 2007-06-26T08:57:49-05:00
slug: "sql-server-2008-will-have-7-new-datatypes"
draft: false
tags:
  - ".Net"
  - ".NET"
  - "Database"
  - "Microsoft"
  - "SQL Server"
description: "I haven't even herd of a new version of SQL Server 2008, coming out, but according to this blog the new version has some very interesting and new data..."
---

I haven't even herd of a new version of SQL Server 2008, coming out, but [according to this blog](http://dotnetsamplechapters.blogspot.com/2007/06/sql-server-2008-will-have-7-new.html "SQL Server 2008 Will Have 7 New Datatypes") the new version has some very interesting and new data types that will come in useful for geography processing.

**DATE** - ANSI-compliant date data type   
**TIME** - ANSI-compliant time data type with variable precision   
**DATETIMEOFFSET** - timezone aware/preserved datetime   
**DATETIME2** - like DATETIME, but with variable precision and large date range

**GEOMETRY** - "flat earth" spatial data type   
**GEOGRAPHY** - "round earth" spatial data type   
**HIERARCHYID** - represents hierarchies using path enumeration model

The first four datatypes are regular SQL datatypes but the last three datatypes are exposed as .NET system UDTs.