---
title: "Microsoft SQL Server 2005 SP2 for Vista"
date: 2007-02-28T16:45:38-05:00
slug: "microsoft-sql-server-2005-sp2-for-vista"
draft: false
tags:
  - "database"
  - "Microsoft"
  - "Security"
  - "SQL Server"
  - "Windows Vista"
description: "Microsoft with out much fan far released service pack 2 for SQL Server 2005. There is a whole laundry list of new features and bug fixes listed on MSDN...."
---

Microsoft with out much fan far released service pack 2 for SQL Server 2005. There is a whole laundry list of new features and bug fixes listed on [MSDN](http://msdn2.microsoft.com/en-us/library/bb283536.aspx). However one of the biggest features at least for early adopters is the support for Windows Vista both x86 and x64 versions of the operating system. This release brings with it a great new tools for Windows Vista that are not available for previous operating systems.

**[Download SQL Server 2005 Service Pack 2](http://www.microsoft.com/technet/prodtechnol/sql/2005/downloads/servicepacks/sp2.mspx)**

In order to prove Microsoft is really serious about security and that UAC (**U**ser **A**ccount **C**ontrol) is here to stay. They don't automatically grant all Administrators of the machine access to SysAdmin privileges in SQL 2005. The SysAdmin privileges have to be granted on the basis of who needs them, which is common practice in any role based security. The new tool can be found at `C:Program Files (x86)Microsoft SQL Server90SharedSqlProv.exe` and is pictured below. I personally welcome this added level of security and control I have over who has SysAdmin access to SQL Server. Not that I worry about my wife going in and screwing with my data, it is just nice to have control over your computer. Thank you Microsoft for you continued focus on security.

[![SQL Server 2005 Vista User Provisioning](http://coderjournal.com/uploads/2007/02/sql-server-2005-vista-user-provisioning1.png)](http://coderjournal.com/uploads/2007/02/sql-server-2005-vista-user-provisioning1.png "SQL Server 2005 Vista User Provisioning")