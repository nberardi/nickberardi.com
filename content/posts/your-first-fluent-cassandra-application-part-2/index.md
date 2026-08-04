---
title: "Your First Fluent Cassandra Application (part 2)"
date: 2010-06-06T03:19:38-05:00
slug: "your-first-fluent-cassandra-application-part-2"
draft: false
tags:
  - ".NET"
  - "Cassandra"
  - "Database"
  - "NoSQL"
description: "Last time I demonstrated how to create your first Fluent Cassandra app. After we finished learning about how to create records and save them to the..."
---

Last time I demonstrated how to create [your first Fluent Cassandra app](/posts/your-first-fluent-cassandra-application/).  After we finished learning about how to create records and save them to the database, I issued a challenge to implement comments for our command line blog app we created.  I hinted at how I would have done it with this column family configuration:

```
<ColumnFamily Name="Comments"  
    ColumnType="Super"
    CompareWith="TimeUUIDType"
    CompareSubcolumnsWith="UTF8Type" />
```

And this is what we are going to implement today.

#### Basic Structure

The basic information of our blog’s comments we need to keep, is the standard information that you would expect from any blog comment.

- Name
- Email
- Website
- Comment
- Date

However in Cassandra we aren’t going to use the standard flat table that you might see in an RDBMS system, where the comment row contains all the information in the bullet list above, plus a reference to the post identity, all summed up under a comment identity.  In a column based database like Cassandra we would use a structure that looks like this:

|  |  |  |
| --- | --- | --- |
| **key:**  "first-blog-post" | **super column name:**  2010-6-3 12:43:00 AM (in Time UUID) | **name:**  "Nick Berardi" |
| **email:**  "[nick@coderjournal.com](mailto:nick@coderjournal.com)" |
| **website:**  "www.coderjournal.com" |
| **comment:** "Wow fluent cassandra is really neeto…" |
| **super column name:**  2010-6-3 3:12:33 PM (in Time UUID) | **name:**  "Joe User" |
| **email:**  "[joe@gmail.com](mailto:joe@gmail.com)" |
| **website:**  "" |
| **comment:** "I agree with you Nick!" |

The first thing you might notice is that the key for our comments family is going to be the same as the key for our posts family.  This is done to tie the contents of the two tables together under one comment lookup entity.  The next thing you may notice is that the super column name isn’t actually a string, it is a Time UUID or for you .NET people a **System.Guid** that stores the date time.  And then the last thing is the actual property columns for all the meta data we want to store about each comment.

#### Coding The Comments

We are going to pick up where we left off in the last post.  If you want to follow along, open up your previous project from the last post, or [use the file located here](https://github.com/managedfusion/fluentcassandra/blob/master/test/FluentCassandra.Sandbox/Program.cs).

The first thing we need to do, as we did with the posts, is to get the repository for the comments column family.

```
// get the comments family  
var commentsFamily = db.GetColumnFamily<TimeUUIDType, UTF8Type>("Comments");
```

Then we need to create the record for adding the comments against, as we did for the tags and post details in the previous post:

```
dynamic postComments = commentsFamily.CreateRecord(key: "first-blog-post");
```

And this time lets attach the *postComments* to the database ahead of time, so that it tracks the changes as they are made.

```
// lets attach it to the database before we add the comments  
db.Attach(postComments);
```

Now lets create 5 comments that are 5 seconds apart from each other to give us some data to play with in the database, and then save the changes off to the database.

```
// add 5 comments  
for (int i = 0; i < 5; i++)  
{
    dynamic comment = postComments.CreateSuperColumn();
    comment.Name = i + " Nick Berardi";
    comment.Email = i + " nick@coderjournal.com";
    comment.Website = i + " www.coderjournal.com";
    comment.Comment = i + " Wow fluent cassandra is really great and easy to use.";

    postComments[GuidGenerator.GenerateTimeBasedGuid()] = comment;

    Console.WriteLine("Comment " + i + " Done");
    Thread.Sleep(TimeSpan.FromSeconds(5));
}

// save the comments
db.SaveChanges();
```

Now that we have 5 comments in the database stored for our blog post, we should probably query them out:

```
DateTime lastDate = DateTime.Now;

for (int page = 0; page < 2; page++)  
{
```

Since comments are sometimes paged, we are going to query two pages of comments separately from the database for our blog post.  Our comments are stored by date, so we need to pull them out of the database by date.  This is done by starting at the current date and querying backwards.

```
// lets back the date off by a millisecond so we don't get paging overlaps  
lastDate = lastDate.AddMilliseconds(-1D);

Console.WriteLine("Showing page " + page + " starting at " + lastDate.ToLocalTime());

var comments = commentsFamily.Get("first-blog-post")  
    .Reverse()
    .Fetch(lastDate)
    .Take(3)
    .FirstOrDefault();
```

The above is a little more complex than our last query, but easy enough to understand the basic premise of what it is doing, because of the descriptive fluent interface.  Since we are querying by date it is easiest to pull them out in the reverse order of LIFO (last-in-first-out).  To do this we use a method called **Reverse**, which does exactly what it sounds like, reverses the column order.  Then we are going to **Fetch** a column starting at our *lastDate* and **Take** 3 columns for our page.  And to finish it off since we are only querying one key, we are going to use the LINQ method **FirstOrDefault** to return our queried records back to us.

If the above query was SQL it would look something like this:

```
SELECT TOP(3) *  
FROM comments  
WHERE commented_on <= getdate()
```

Now that we have our comments, lets display the comment as we did for the post in the previous article.

```
foreach (dynamic comment in comments)  
{
    var dateTime = GuidGenerator.GetDateTime((Guid)comment.ColumnName);

    Console.WriteLine(String.Format("{0:T} : {1} ({2} - {3})",
        dateTime.ToLocalTime(),
        comment.Name,
        comment.Email,
        comment.Website
    ));

    lastDate = dateTime;
}
```

Nothing really mind blowing is happening here, we use the column name (our Time UUID) to extract the date, and then we display the properties for the comments.  There is a subtle part of the code at the bottom of the *foreach* loop where we set the date to the lastDate.  This is done to keep track of the last date we pulled out of the database so we can requery by that date when we pull the comments from the database for the second page.  You may or may have not noticed this code in the above statement:

```
// lets back the date off by a millisecond so we don't get paging overlaps  
lastDate = lastDate.AddMilliseconds(-1D);
```

But this is used so we don’t pull back the same comment over again.

#### Fun Part

The fun part for me is hitting the run button and waiting to see if everything is working as I intended.  If everything is working as expected this is what the output will look like for our new comments section.

```
Comment 0 Done  
Comment 1 Done  
Comment 2 Done  
Comment 3 Done  
Comment 4 Done  
Showing page 0 starting at 6/6/2010 9:13:22 AM  
9:13:17 AM : 4 Nick Berardi (4 nick@coderjournal.com - 4 www.coderjournal.com)  
9:13:12 AM : 3 Nick Berardi (3 nick@coderjournal.com - 3 www.coderjournal.com)  
9:13:07 AM : 2 Nick Berardi (2 nick@coderjournal.com - 2 www.coderjournal.com)  
Showing page 1 starting at 6/6/2010 9:13:07 AM  
9:13:02 AM : 1 Nick Berardi (1 nick@coderjournal.com - 1 www.coderjournal.com)  
9:12:57 AM : 0 Nick Berardi (0 nick@coderjournal.com - 0 www.coderjournal.com)
```

We added in our 5 comments and and then we pulled back 2 pages of up to 3 comments each.

Pretty neat huh?