---
title: "TimeUUID only makes sense with version 1 UUIDs"
date: 2010-05-16T18:43:04-05:00
slug: "timeuuid-only-makes-sense-with-version-1-uuids"
draft: false
tags:
  - ".NET"
  - "Cassandra"
  - "Java"
  - "TimeUUID"
description: "In a world where we are all use to dealing with objects we often forget that everything gets reduced to ones and zeros before being transmitted over the..."
---

In a world where we are all use to dealing with objects we often forget that everything gets reduced to ones and zeros before being transmitted over the wire to the destination.  Most times the destination easily handles converting this object back in to an object on the other side that is easily understood and consumed.  The frustration comes when we run in to a situation where the other side doesn’t understand our transmitted data.  This can often cause us to pull our hair out, become irritable, and throw out hands up in disgust.  Well recently I have been doing all that when trying to solve what sounds like simple problem on the surface.  Sending the bytes of a [Type 1 UUID](/posts/creating-a-time-uuid-guid-in-net/), or GUID, over the wire from .NET to a server running on Java.

### The Problem

It is a simple one, I need to transmit a Guid from .NET over to a UUID in Java.  Mind you Guid and UUID solve the same thing in the differently languages so this isn’t a case of mis-mapped different objects.

### TimeUUID only makes sense with version 1 UUIDs

This error is the error that came up each and every time I sent the GUID object over to the Java Server using the following method.

```
Guid g = new Guid("38400000-8cf0-11bd-b23e-10b96e4ef00d");  
var bytes = g.ToByteArray();

Server.Transmit(bytes); // this method call is an example
```

The part of this that really made me pull my hair out was the fact that the GUID that I was sending over was a valid Type 1 UUID.  If you don’t believe me [check it out here](http://www.famkruithof.net/uuid/uuidgen?typeReq=-1).  So after writing a bunch of unit tests and double and triple checking the fact that the GUID I was sending over was a Type 1 GUID, it finally dawned on me that maybe the problem was the fact that Java handled the byte order of the UUID different than .NET.

So I wrote a quick Java program to verify this thesis.  And this is what I found.

```
UUID x = UUID.fromString("38400000-8cf0-11bd-b23e-10b96e4ef00d");  
System.out.println(x.toString());  
System.out.println(x.version());

// results:
// 38400000-8cf0-11bd-b23e-10b96e4ef00d
// 1

byte[] byteArray = { ... the bytes here ... };  
ByteBuffer bb = ByteBuffer.warp(byteArray);  
UUID y = new UUID (bb.getLong(), bb.getLong());  
System.out.println(y.toString());  
System.out.println(y.version());

// results:
// 00003840-f08c-bd11-b23e-10b96e4ef00d
// 11
```

You might have noticed that the byte order for the first 8 bytes of the UUID have been reversed for each section.  So I reversed the bytes in my byteArray and here is the output I received.

```
// results:  
// 38400000-8cf0-11bd-b23e-10b96e4ef00d
// 1
```

I jumped for joy when I saw this come out correctly, because it meant that I had solved the problem.

### 

### But Not So Fast

I still needed to write the code on the .NET side to handle reversing and unreversing these bytes when sending over to and receiving from the Cassandra server.  So to correct this I just created a simple byte array converter for my Cassandra type TypeConverter object for TimeUUID.

```
private byte[] ReverseLowFieldTimestamp(byte[] guid)  
{
    return guid.Skip(0).Take(4).Reverse().ToArray();
}

private byte[] ReverseMiddleFieldTimestamp(byte[] guid)  
{
    return guid.Skip(4).Take(2).Reverse().ToArray();
}

private byte[] ReverseHighFieldTimestamp(byte[] guid)  
{
    return guid.Skip(6).Take(2).Reverse().ToArray();
}

public override object ConvertTo(ITypeDescriptorContext context, System.Globalization.CultureInfo culture, object value, Type destinationType)  
{
    if (!(value is Guid))
        return null;

    if (destinationType == typeof(byte[]))
    {
        var oldArray = ((Guid)value).ToByteArray();
        var newArray = new byte[16];
        Array.Copy(ReverseLowFieldTimestamp(oldArray), 0, newArray, 0, 4);
        Array.Copy(ReverseMiddleFieldTimestamp(oldArray), 0, newArray, 4, 2);
        Array.Copy(ReverseHighFieldTimestamp(oldArray), 0, newArray, 6, 2);
        Array.Copy(oldArray, 8, newArray, 8, 8);
        return newArray;
    }

    if (destinationType == typeof(Guid))
        return (Guid)value;

    return null;
}
```

And a little coding and some unit tests later, I was able to verify that the UUID (or GUID) would be correctly transmitted to Java and read back from Java correctly with the changes I made above.  I don’t completely understand why the byte order is different, because UUID is a pretty solid standard.  But I am sure it has something to do with the [Endianness](http://en.wikipedia.org/wiki/Endianness) of the two languages.

### 

### 

### In The End

This turned out to more of an adventure than I thought it would be, and I had to break out some Java code to do it, but after about an hour coding and testing, everything seems to be working and TimeUUID is now supported under .NET.

*Note: By the way I really didn’t want to install Eclipse to test out Java snippet, luckily* [*Mono Develop*](http://en.wikipedia.org/wiki/Endianness) *supports Java development.*