---
title: "How NOT To Optimize LINQ Statements"
date: 2008-09-24T01:35:05-05:00
slug: "how-not-to-optimize-linq"
draft: false
tags:
  - ".NET"
  - "C#"
  - "database"
  - "IdeaPipe"
  - "LINQ"
description: "About a month ago I was experimenting with different ways to optimize my LINQ queries against the IdeaPipe database, in order to improve the read times. I..."
---

About a month ago I was experimenting with different ways to optimize my LINQ queries against the [IdeaPipe](http://www.ideapipe.com) database, in order to improve the read times. I wanted to improve the read times because our new [Facebook Application](http://apps.new.facebook.com/ideapipe/) was being launched and I anticipated an increase in our traffic to the server, which is used to host IdeaPipe and the Facebook Application component.

Whenever I am trying to optimize SQL queries I fire up [SQL Server Profiler](http://msdn.microsoft.com/en-us/library/ms181091.aspx) and take a look at how the queries are performing. This helps me identify queries that are taking a longer time to execute and probably need to be looked at or re-thought. One of the queries that I identified as needing improvement was the following LINQ query:

### Old Query

```
from i in source  
join xgl in GroupIdeaLinks on i.IdeaId equals xgl.IdeaId into groupLinksGroup  
from gl in groupLinksGroup.DefaultIfEmpty()  
let visibility = (gl == null ? 'O' : gl.Group.VisibilityPermission)  
let groupId = (gl == null ? -1 : gl.GroupId)  
where visibility == 'O' || GroupMembers.Count(m => m.GroupId == groupId && m.IsApproved && m.UserId == userId && (visibility == 'G' || (m.RoleId & (int)Role.Manager) == 0)) == 1  
select i;
```

That produced this monster of a SQL statement:

```
SELECT [t5].[IdeaId], [t5].[CategoryId], [t5].[UserId], [t5].[IsPopular], [t5].[PopularOn], [t5].[Title], [t5].[SafeDescription], [t5].[Description], [t5].[Path], [t5].[Score], [t5].[Rank], [t5].[ExternalLink], [t5].[VideoLink], [t5].[BumpUpCount], [t5].[BumpDownCount], [t5].[TotalBumpCount], [t5].[TotalCommentCount], [t5].[CreatedOn], [t5].[rowversion]  
FROM (  
    SELECT [t4].[IdeaId], [t4].[CategoryId], [t4].[UserId], [t4].[IsPopular], [t4].[PopularOn], [t4].[Title], [t4].[SafeDescription], [t4].[Description], [t4].[Path], [t4].[Score], [t4].[Rank], [t4].[ExternalLink], [t4].[VideoLink], [t4].[BumpUpCount], [t4].[BumpDownCount], [t4].[TotalBumpCount], [t4].[TotalCommentCount], [t4].[CreatedOn], [t4].[rowversion], [t4].[value],
        (CASE
            WHEN [t4].[test] IS NULL THEN @p1
            ELSE [t4].[GroupId]
         END) AS [value2]
    FROM (
        SELECT [t0].[IdeaId], [t0].[CategoryId], [t0].[UserId], [t0].[IsPopular], [t0].[PopularOn], [t0].[Title], [t0].[SafeDescription], [t0].[Description], [t0].[Path], [t0].[Score], [t0].[Rank], [t0].[ExternalLink], [t0].[VideoLink], [t0].[BumpUpCount], [t0].[BumpDownCount], [t0].[TotalBumpCount], [t0].[TotalCommentCount], [t0].[CreatedOn], [t0].[rowversion], [t2].[test], [t2].[GroupId],
            (CASE
                WHEN [t2].[test] IS NULL THEN @p0
                ELSE CONVERT(NChar(1),[t3].[VisibilityPermission])
             END) AS [value]
        FROM [Ideas].[Ideas] AS [t0]
        LEFT OUTER JOIN (
            SELECT 1 AS [test], [t1].[GroupId], [t1].[IdeaId]
            FROM [Groups].[GroupIdeaLink] AS [t1]
            ) AS [t2] ON [t0].[IdeaId] = [t2].[IdeaId]
        INNER JOIN [Groups].[Groups] AS [t3] ON [t3].[GroupId] = [t2].[GroupId]
        ) AS [t4]
    ) AS [t5]
WHERE (UNICODE([t5].[value]) = @p2) OR (((  
    SELECT COUNT(*)
    FROM (
        SELECT
            (CASE
                WHEN ([t6].[GroupId] = [t5].[value2]) AND ([t6].[IsApproved] = 1) AND (([t6].[UserId]) = @p3) AND ((UNICODE([t5].[value]) = @p4) OR (([t6].[RoleId] & @p5) = @p6)) THEN 1
                WHEN NOT (([t6].[GroupId] = [t5].[value2]) AND ([t6].[IsApproved] = 1) AND (([t6].[UserId]) = @p3) AND ((UNICODE([t5].[value]) = @p4) OR (([t6].[RoleId] & @p5) = @p6))) THEN 0
                ELSE NULL
             END) AS [value]
        FROM [Groups].[GroupMembers] AS [t6]
        ) AS [t7]
    WHERE [t7].[value] = 1
    )) = @p7)
```

So I started playing around with the LINQ statement until I reduced the size of my SQL query significantly. The following is the result of that optimization:

### New Query

```
var groupMembership = (from gm in GroupMembers  
                       let visibility = gm.Group.VisibilityPermission
                       where visibility == 'O' || (gm.IsApproved && gm.UserId == userId && (visibility == 'G' || (gm.RoleId & (int)Role.Manager) == 0))
                       select gm.GroupId).Distinct();

from i in Ideas  
join xgl in GroupIdeaLinks on i.IdeaId equals xgl.IdeaId into groupLinksGroup  
from gl in groupLinksGroup.DefaultIfEmpty()  
where gl == null || groupMembership.Contains(gl.GroupId)  
select i;
```

Which outputs the following SQL query:

```
SELECT [t0].[IdeaId], [t0].[CategoryId], [t0].[UserId], [t0].[IsPopular], [t0].[PopularOn], [t0].[Title], [t0].[SafeDescription], [t0].[Description], [t0].[Path], [t0].[Score], [t0].[Rank], [t0].[ExternalLink], [t0].[VideoLink], [t0].[BumpUpCount], [t0].[BumpDownCount], [t0].[TotalBumpCount], [t0].[TotalCommentCount], [t0].[CreatedOn], [t0].[rowversion]  
FROM [Ideas].[Ideas] AS [t0]  
LEFT OUTER JOIN (  
    SELECT 1 AS [test], [t1].[GroupId], [t1].[IdeaId]
    FROM [Groups].[GroupIdeaLink] AS [t1]
    ) AS [t2] ON [t0].[IdeaId] = [t2].[IdeaId]
WHERE ([t2].[test] IS NULL) OR (EXISTS(  
    SELECT NULL AS [EMPTY]
    FROM (
        SELECT DISTINCT [t3].[GroupId]
        FROM [Groups].[GroupMembers] AS [t3]
        INNER JOIN [Groups].[Groups] AS [t4] ON [t4].[GroupId] = [t3].[GroupId]
        WHERE (UNICODE([t4].[VisibilityPermission]) = @p0) OR (([t3].[IsApproved] = 1) AND (([t3].[UserId]) = @p1) AND ((UNICODE([t4].[VisibilityPermission]) = @p2) OR (([t3].[RoleId] & @p3) = @p4)))
        ) AS [t5]
    WHERE [t5].[GroupId] = [t2].[GroupId]
    ))
```

As you can tell the second query is much more compact and it does the exact same thing as the first query. I was pretty proud of my self and riding high on my genius, until this happened:

Well this didn't really happen, but you get the point. I quickly came down from my high when I tested the performance of the new query in SQL Server Profiler, and received these results from the two queries:

- OLD QUERY (Reads 130, Durration 5)
- NEW QUERY (Reads 218, Durration 28)

That is right my optimization increased the number of times SQL has to read the table by 68% and time it takes to execute by 460%. So I reversed all my changes and learned a lesson on **how not to optimize a LINQ statement**.

The moral of the story is you probably don't need to optimize your SQL query through LINQ, just keep it simple and optimize your LINQ statement and leave the rest up to the professionals at Microsoft who created the LINQ to SQL expression query generator.