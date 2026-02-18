---
title: "FluentCassandra Primer"
date: 2012-06-17T13:34:01-05:00
slug: "fluentcassandra-primer"
draft: false
tags:
  - "Cassandra"
description: "Getting Started To get started you have to understand the basic terminology of the Cassandra database. Unlike relational databases (i.e. SQL Server,..."
---

## Getting Started

To get started you have to understand the basic terminology of the Cassandra database. Unlike relational databases (i.e. SQL Server, MySQL, etc) Cassandra is what is known as a Key/Value pair database. The Cassandra data model has 4 main concepts which are cluster, keyspace, column family and super column.

- A **Cluster** (also called as ring) is several servers (or nodes) functioning together to act as a single Cassandra database occurrence. A cluster will contain at least one node, and each cluster can contain many keyspaces.
- A **Keyspace** can contain many column families.
- A **Column Family** contains multiple columns referenced by a record keys.
- A **Column** contains a name, value, and a timestamp. The column name can be a static label (such as "name" or "email") or it can be set to a wide range of values (ex. a date of a log entry). The actual columns that make up a row are can be determined by the client application or pre set in a more traditional method using CQL.

To better understand what all this means lets do a naming remapping from relational databases to Cassandra.

| Relational | Cassandra |
| --- | --- |
| Database | Keyspace |
| Table | Column Family |
| Row | Record |
| Column | Column |

There are more differences, but we will save those for a different time. The above is to give you general working knowledge of the naming used in Cassandra and by proxy in FluentCassandra.

## First Query

```
using (var db = new CassandraContext(keyspace: "Testing", host: "localhost")) {  
    var usersFamily = db.GetColumnFamily("Users");

    var adminUsers =
        from u in usersFamily.AsObjectQueryable<User>()
        where u.IsAdmin == true
        select u;

    Console.WriteLine("The following users are admins:");
    foreach(var u in adminUsers) {
        Console.WriteLine(u.UserName);
    }
}
```

One of the main goals of FluentCassandra was to produce easily readable code. Hopefully the above is somewhat easy to follow. But to be safe lets step through the above query line by line, to give you a first hand working knowledge as to whats happening.

### Explanation

```
using (var db = new CassandraContext(keyspace: "Testing", host: "localhost")) {
```

On the first line we are creating a database context. In this context we are setting the keyspace and host that we want to run the queries against. The database context implements `IDisposable`, by wrapping it in a `using` block it ensures that all connections to the database are cleaned up when the context isn't in use anymore.

```
  var usersFamily = db.GetColumnFamily("Users");
```

Next we are getting the column family reference. This reference is going to be the main way in FluentCassandra of interacting with the column families. This object contains many different paths for accessing Cassandra, the one I am going to show you next is via LINQ. We will discuss the other ways in a different article.

```
  var adminUsers =  
      from u in usersFamily.AsObjectQueryable<User>()
      where u.IsAdmin == true
      select u;
```

The above should be very familiar to anybody who as worked with any form on LINQ in the past. The one thing that you may notice right off the bat is the following `.AsObjectQueryable<User>()` stacked on to the end of the column family. This method is nessisary for querying the column family using an object, column families by default don't have objects associated with them, because the columns in the column family can vary by length and type across records.

```
    Console.WriteLine("The following users are admins:");  
    foreach(var u in adminUsers) {
        Console.WriteLine(u.UserName);
    }
}
```

The last part doesn't need much explaining. It just loops through all of the user objects pulled from the database and writes them out to the command line.

### More detailed example

To see a more detailed example that sets up the keyspace and column families programatically, and uses the different methods of querying, inserting, updating and deleting allowed by FluentCassandra. Please go to: <https://github.com/managedfusion/fluentcassandra/blob/master/test/FluentCassandra.Sandbox/Program.cs>