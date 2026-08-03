---
title: "Understand C#: Proper use IDisposable and using keyword"
date: 2007-02-21T12:05:13-05:00
slug: "proper-use-idisposable"
draft: false
tags:
  - ".NET"
  - "Framework 1.0"
description: "The System.IDisposable interface is a very useful interface to understand if you are concerned about performance in your application. Microsoft says the..."
---

The [System.IDisposable](http://msdn2.microsoft.com/en-us/library/system.idisposable.aspx) interface is a very useful interface to understand if you are concerned about performance in your application. Microsoft says the following about the IDisposable interface:

> The garbage collector automatically releases the memory allocated to a managed object when that object is no longer used, however, it is not possible to predict when garbage collection will occur. Furthermore, the garbage collector has no knowledge of unmanaged resources such as window handles, or open files and streams.

Most [System.Data](http://msdn2.microsoft.com/en-us/library/system.data.aspx), [System.IO](http://msdn2.microsoft.com/en-us/library/system.io.aspx) and [System.Windows.Controls](http://msdn2.microsoft.com/en-us/library/system.windows.controls.aspx) objects use the IDisposable interface, as well as many others, to free up unmanaged resources that may have been created when the object was initialized. Unmanaged resources are any calls that are made outside of the .NET environment, this can be GDI+ calls, SQL Driver calls, Disk IO calls, or basically anything that cannot be accounted for by the Garbage Collector.

Often times you will see database connection code that looks like this:

```
SqlConnection conn = new SqlConnection("{connection string}");  
SqlCommand command = new SqlCommand(conn);

command.CommandText = "select * from SomeTable";

// ... some more code to use the command

conn.Close();
```

However there are a problem with this code, the unmanaged resources for the SQL connection have not yet been destroyed in memory. The correct way this code should have been written is the following:

```
using (SqlConnection conn = new SqlConnection("{connection string}")) {  
    using (SqlCommand command = conn.CreateCommands()) {

    command.CommandText = "select * from SomeTable";

    // ... some more code to use the command

    conn.Close();
    }
}
```

And if you were to look at this code under a microscope the following code is actually what is happening:

```
SqlConnection conn;  
SqlCommand command

try {  
    conn = new SqlConnection("{connection string}");
    command = new SqlCommand(conn);

    command.CommandText = "select * from SomeTable";

    // ... some more code to use the command
} finally {
    conn.Close();
    command.Dispose();
    conn.Dispose();
}
```

So essentially even if an exception is thrown from your code, the unmanaged code is still cleaned up and you don't have memory leaks from unmanaged code sitting around in memory waiting to be reclaimed. It is reclaimed instantly after you are done working with it.

If you would like to learn more about the code used above please see these links

- [using Statement](http://msdn2.microsoft.com/en-us/library/yh598w02.aspx)
- [try-finally Block](http://msdn2.microsoft.com/en-us/library/zwc8s4fz.aspx)
