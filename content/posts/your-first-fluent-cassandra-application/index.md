---
title: "Your First Fluent Cassandra Application"
date: 2010-06-02T16:18:46-05:00
slug: "your-first-fluent-cassandra-application"
draft: false
tags:
  - ".NET"
  - "Cassandra"
  - "database"
  - "NoSQL"
description: "As your are probably aware by now if you follow my Twitter status or have looked in to some of my recent posts.&#160; I am developing a library called..."
---

As your are probably aware by now if you [follow my Twitter status](http://twitter.com/nberardi) or have looked in to [some of my recent posts](http://www.coderjournal.com/2010/04/creating-a-time-uuid-guid-in-net/).  I am developing a library called [FluentCassandra](http://github.com/managedfusion/fluentcassandra) which is a .NET library for using the [Cassandra database](http://cassandra.apache.org/) in a .NETty way.  The project has [progressed quite nicely in the last couple of months](http://twitter.com/fluentcassandra) and I am finally ready to start talking about it and giving examples on how it can be used in your applications.  So lets gets started…

#### Step 1)

The first thing we need to do is make sure that your machine is properly setup to run Cassandra.  Back in March I put together [a jump start for Windows developers](http://www.coderjournal.com/2010/03/cassandra-jump-start-for-the-windows-developer/) to do just that.  So if you don’t have it running on your machine already, start there.

#### Step 2)

The next thing we need to do is to locate and configure the database *storage-conf.xml* file, which was referenced in the previous steps instructions.

1. Open the *storage-conf.xml* in your favorite text editor.
2. Add the following to the <Keyspaces /> tag in the file:   

   ```
   <Keyspace Name="Blog">  
       <ColumnFamily Name="Posts"
           ColumnType="Super"
           CompareWith="UTF8Type"
           CompareSubcolumnsWith="UTF8Type" />

       <ReplicaPlacementStrategy>org.apache.cassandra.locator.RackUnawareStrategy</ReplicaPlacementStrategy>
       <ReplicationFactor>1</ReplicationFactor>
       <EndPointSnitch>org.apache.cassandra.locator.EndPointSnitch</EndPointSnitch>
   </Keyspace>
   ```
3. Save it.

The above configuration creates one Column Family (or table in RDBMS speak) called **Posts** in a Keyspace (or database in RDBMS speak) called **Blog**.  We are going to use this column family in our code below.

#### Step 3)

Next grab a copy of FluentCassandra from <http://github.com/managedfusion/fluentcassandra>

[![image](/nickberardi.com/images/2010/06/image_thumb.png "image")](/nickberardi.com/images/2010/06/image.png)

Create your your own console app or use **FluentCassandra.Sandbox** console app provided in the source downloaded.

#### Step 4)

Now for the fun part, the coding.

The first thing we need to do is create a context for the database entities that we are going to save.  This is done with the **CassandraContext**.

```
using (var db = new CassandraContext(keyspace: "Blog", host: "localhost"))  
{
```

The above code creates a Cassandra Context for the *Blog* Keyspace on our local Cassandra database.  After we have done this we want to get a reference to the family that we are going to execute our saves against.  This is done by getting the column family with the *CompareWith* and *CompareSubcolumnWith* types we specified in the above storage-conf.xml.

```
var family = db.GetColumnFamily<UTF8Type, UTF8Type>("Posts");
```

In the above code the first generic parameter is the *CompareWith* parameter and the second generic parameter is the *CompareSubcolumnsWith* parameter.  This creates the family repository that can be used to execute CRUD commands against this column family.

Now that we have all this setup lets actually create a post record, with a key called “first-blog-post”.

```
// create post  
dynamic post = family.CreateRecord(key: "first-blog-post");
```

The easiest way to accomplish this is to use the method provided in the *family* object for creating the properly typed record for use. This object will be used in a little while but first we need to create two super columns with the details of our blog post and the tags associated with the blog post.  This is done by using the CreateSuperColumn method on the *post* object we just created.

```
// create post details  
dynamic postDetails = post.CreateSuperColumn();  
postDetails.Title = "My First Cassandra Post";  
postDetails.Body = "Blah. Blah. Blah. about my first post on how great Cassandra is to work with.";  
postDetails.Author = "Nick Berardi";  
postDetails.PostedOn = DateTimeOffset.Now;

// create post tags
dynamic tags = post.CreateSuperColumn();  
tags[0] = "Cassandra";  
tags[1] = ".NET";  
tags[2] = "Database";  
tags[3] = "NoSQL";
```

This creates two super column objects postDetails and tags that each contain their own set of columns.  In the case of the post details it contains information about the posts title, content body, author, and when it was posted on.  In the case of the tags it contains an array where each item in the array is a new column.  We will talk about why this works in a future post, but accept for now that it does work, even though one is used as an object with a bunch of properties and one is used as an array with a bunch of elements.

Lets now add the details and tags to our *post* record that we created above.

```
// add properties to post  
post.Details = postDetails;  
post.Tags = tags;
```

Just like the details above we are going to treat the *post* record as an object with properties.  This will complete our entire record that we want to save to the database.  Now lets attach it and save our record to the database.

```
// attach the post to the database  
Console.WriteLine("attaching record");  
db.Attach(post);

// save the changes
Console.WriteLine("saving changes");  
db.SaveChanges();
```

So we have now done our first Cassandra database insert.  But that is only half the fun, lets read it back out of the database.  As with the write, we are going to use the same *family* object to do the read from the database.  The first thing we need to do is get the record out of the database using the same key, “first-blog-post”.

```
// get the post back from the database  
Console.WriteLine("getting 'first-blog-post'");  
dynamic getPost = family.Get("first-blog-post").FirstOrDefault();
```

The above code uses the LINQ-like syntax to retrieve the record.  This LINQ-like syntax can be started using the method **Get** on the *family* object.  And it then can be executed with any LINQ operation, in our case above we are using **FirstOrDetault** method.  The next thing we want to see is the details of the post, which can be easily retrieved using the same object structure that we put them in the database as.

```
// show details  
dynamic getPostDetails = getPost.Details;  
Console.WriteLine(  
    String.Format("=={0} by {1}==\n{2}", 
        getPostDetails.Title, 
        getPostDetails.Author, 
        getPostDetails.Body
    ));
```

And now for the tags, which we are going to query in a way more suitable for an array.

```
// show tags  
Console.Write("tags:");  
foreach (var tag in getPost.Tags)  
    Console.Write(String.Format("{0}:{1},", tag.Name, tag.Value));
```

Finish it off with this code, and we will be ready to run our first Cassandra application.

```
}

Console.Read();
```

#### Step 5)

The first thing we need to do to run our application is to make sure the database is running.  This may sound like a no-duh moment, but if you are use to SQL Server development, you really never have to make sure the database is running, so I just like to mention it.  If you don’t remember how to do this, go back to Step 1 and look at the instructions for starting the database.

Now lets run the application and see what results.  If everything ran correctly you will receive the following output.

```
attaching record  
saving changes  
getting 'first-blog-post'  
==My First Cassandra Post by Nick Berardi==
Blah. Blah. Blah. about my first post on how great Cassandra is to work with.  
tags:0:Cassandra,1:.NET,2:Database,3:NoSQL,
```

#### Step 6)

As a follow up exercise, see if you can add comments.  Hint you will need a new super column family as defined here:

```
<ColumnFamily Name="Comments"  
    ColumnType="Super"
    CompareWith="TimeUUIDType"
    CompareSubcolumnsWith="UTF8Type" />
```

Hope this was an interesting exercise, and if you see any way to improve the interface or want to help out on the project please start by going to [http://github.com/managedfusion/fluentcassandra](http://github.com/managedfusion/fluentcassandra "http://github.com/managedfusion/fluentcassandra").

> Don't forget to check out [part 2 of this series](http://coderjournal.com/2010/06/your-first-fluent-cassandra-application-part-2/).