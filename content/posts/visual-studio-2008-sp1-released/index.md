---
title: "Visual Studio 2008 SP1 Released"
date: 2008-08-12T04:07:33-05:00
slug: "visual-studio-2008-sp1-released"
draft: false
tags:
  - "Team Foundation Server"
  - "TFS"
  - "Visual Studio"
  - ".NET 3.5"
description: "Visual Studio 2008 SP1 Improved WPF designers SQL Server 2008 support ADO.NET Entity Designer Visual Basic and Visual C++ components and tools (including..."
---

### Visual Studio 2008 SP1

- Improved WPF designers
- SQL Server 2008 support
- ADO.NET Entity Designer
- Visual Basic and Visual C++ components and tools (including an MFC-based Office 2007 style ‘Ribbon’)
- Visual Studio Team System Team Foundation Server (TFS) addresses customer feedback on version control usability and performance, email integration with work item tracking and full support for hosting on SQL Server 2008
- Richer JavaScript support, enhanced AJAX and data tools, and Web site deployment improvements

### The .NET Framework 3.5 SP1

- Performance increases between 20-45% for WPF-based applications – without having to change any code
- WCF improvements that give developers more control over the way they access data and services
- Streamlined installation experience for client applications
- Improvements in the area of data platform, such as the ADO.NET Entity Framework, ADO.NET Data Services and support for SQL Server 2008’s new features

### Team Foundation Server 2008 SP1

A number of improvements have been made to Visual Studio Team System 2008 Team Foundation including:

**Version Control**

- Simplified the user experience through cleaner “Add to Source Control” dialogs, drag and drop support to the Source Control Explorer and a much easier to use “Workspace” dialog for working folder mappings.
- Version control now automatically supports non-solution controlled files.
- Various changes to the Source Control Explorer such as a new checkin date/time display column, local path hyperlink support and en editable source location field.

**Work Item Tracking**

- Microsoft Office 2007 integration is now done using the standard Office “Ribbon” delivering a cleaner and easier to use integration to the different Microsoft Office 2007 products.
- Email integration for work items and links for Team system Web Access to make it easier to use email as part of the development lifecycle.

**Visual SourceSafe migration tool**

- The migration tool has been dramatically improved through many performance and reliability improvements. SP1 provides support for the elimination of namespace conflicts, automatic solution rebinding, improves timestamp coherency and increases the amount of migration logging information available.

**Additional Features**

- Support for using SQL Server 2008 with Team Foundation Server.
- Team System Web Access provides “live” links to work items and checkin emails. This improves the customer experience for users who do not use Team Explorer.
- Scripting support for the creation of Team Projects.

**Performance and scalability**

- With SP1 a large part of the focus was to improve the performance and scalability of Team Foundation Server through changes such as faster synchronization with Active Directory, improved checkin concurrency, a faster way to create source tree branches, online index rebuilding for less maintenance downtime and better support for very large checkin sets.
- Improvements in the number of projects a server can support that make not only the scalability of the server better but also the client experience when connecting to a server with a large number of projects on it.

During the install, of TFS 2008 SP1, I received the error: **Failed to call WMI on the RS server**.  I did some searching on Google and found a post that I did [back in November on the same problem](/posts/tf220064-team-foundation-server-2008-reporting-service-permissions/).  I followed my exact same steps and it fixed the issue.  I don't know why this DNS issue continues to cause Microsoft problems, but I really wish they would fix this bug.