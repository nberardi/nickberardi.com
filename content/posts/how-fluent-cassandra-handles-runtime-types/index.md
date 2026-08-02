---
title: "How Fluent Cassandra Handles Runtime Types"
date: 2010-06-07T15:18:31-05:00
slug: "how-fluent-cassandra-handles-runtime-types"
draft: false
tags:
  - ".NET"
description: "Today I had the question come up about some wonky behavior with retrieving data from Cassandra for non-string types.&#160; Here is the issue in a..."
cover:
  image: "/images/2010/06/image1.png"
  alt: "How Fluent Cassandra Handles Runtime Types"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

Today I had the question come up about some wonky behavior with retrieving data from Cassandra for non-string types.  Here is the issue in a nut-shell:

```
dynamic obj = record.CreateSuperColumn();  
obj.Id = 1234;  
obj.CreatedOn = DateTime.Now;  
obj.IsOnline = true;

// blah blah blah save to database and retrieve

Console.WriteLine(obj.Id);  // (some unprintable characters)  
Console.WriteLine(obj.CreatedOn);  // (some unprintable characters)  
Console.WriteLine(obj.IsOnline);  // (some unprintable characters)
```

To understand why this is happening we first must talk about how Cassandra stores data in the database.  Cassandra stores everything by columns either by super-column or a regular column but for the sake of this post we are just going to talk about regular columns.  These regular columns are made up for three properties:

|  |  |
| --- | --- |
| **Property** | **Type** |
| Name | *CompareWith* type |
| Value | binary |
| Timestamp | 64-bit integer |

The **Name** with *CompareWith* type is set in the configuration and can be **ASCII**, **UTF8**, **LexicalUUID**, **TimeUUID**, **Long**, or **Bytes**.  In other words in the .NET world they can be **string**, **Guid, DateTime**, **long**, or **byte[]**.  The **Value** can only be the Bytes or byte[] type.  And the Timestamp is used for synchronization between Cassandra servers and shouldn’t be directly controlled.  To relate back to the type conversion problem that I mentioned above, we need to take a deeper look at what happens to the **Value** property of the column when it is set and saved.

[![image](/images//2010/06/image_thumb1.png "image")](/images/2010/06/image1.png)

From when you set a property to your chosen type to when it is saved in Cassandra it goes through a two steps that you probably aren’t aware of, first the type is serialized and stored in Fluent Cassandra's flexible BytesType that is intelligent enough to understand how to serialize common runtime types in to binary so that you as the developer doesn’t have to worry about interacting with the Cassandra database at a low level.  This intelligent type system is also the major driver behind the ASCII, UTF8, LexicalUUID, TimeUUID, Long, and Bytes type that also help serialize the **Name** property of the column correctly.

However the issue as alluded to in the beginning of the article comes when you are retrieving the object out of Fluent Cassandra.

[![image](/images/2010/06/image_thumb2.png "image")](/images/2010/06/image2.png)

Fluent Cassandra when pulling a column out of the database only has the binary data to work with, and thus doesn’t know which of the runtime types to convert it to.  That is why we need to explicitly tell Fluent Cassandra what type we need this property to be desterilized to.  We do that by casting the property to the type we want it retrieved as, to build on the example above we would get the column values in the following way:

```
Console.WriteLine((int)obj.Id);  // 1234  
Console.WriteLine((DateTime)obj.CreatedOn);  // 2010-6-7 12:30:38 PM  
Console.WriteLine((bool)obj.IsOnline);  // true
```

The act of casting is enough to tell the *BytesType* object how the binary data should be desterilized in to a runtime type that is understood by .NET.  This is all done through a lot of operator magic, but the result is the same.  You get the type you entered in to the database out of the database.

I think this is pretty straight forward once you understand what is happening in the backend.  But I am open for suggestions if you have a better idea on how deserialization can be handled in a more straight forward manor.  I am currently working on the support for complex types, but right now the following types are supported to be serialized in to column values:

- byte[], byte, sbyte
- short, ushort, int, uint, long, ulong
- float, double
- decimal
- bool
- string
- char
- Guid
- DateTime, DateTimeOffset

All other types will throw compiler errors for the time being.  I am working on a way to use binary serialization to store other types, but I am not current happy with the interface, because it is not as straight forward as the above.  Again if you have suggestions, I would love to hear them.