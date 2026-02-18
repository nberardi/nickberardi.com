---
title: "Interesting Extension Hack To Get Around NullReferenceException's"
date: 2008-04-24T06:19:22-05:00
slug: "interesting-extension-hack-to-get-around-nullreferenceexceptions"
draft: false
tags:
  - ".NET"
  - "C#"
  - "Extension Methods"
  - ".NET 3.5"
description: "Today I came across an interesting extension pattern that I didn't know how the runtime would react. Normally when you do something like the following:..."
---

Today I came across an interesting extension pattern that I didn't know how the runtime would react. Normally when you do something like the following:

```
string s = null;  
Console.WriteLine(s.Trim()); // throws NullReferenceException
```

You get a NullReferenceException meaning that you didn't first check to see if the object was null before trying to call one of its methods. This is pretty common and results in patterns that usually look like this:

```
string s = null;  
string result = null;

if (s != null)  
    result = s.Trim();

Console.WriteLine(result);
```

This results in a ton of extra code to just verify you inputs. It's a dirty task but somebody has to do it. So today it occurred to me that maybe extension methods were my answer to this code bloat. To better understand extension method, [Scott Hanselman has done a great job explaining how they function](http://www.hanselman.com/blog/HowDoExtensionMethodsWorkAndWhyWasANewCLRNotRequired.aspx "How do Extension Methods work and why was a new CLR not required?") and what they look like to the CLR.

So I whipped up the following console application and tested my theory out.

```
public static class Extension  
{
    public static string TryTrim(this string s)
    {
        if (s == null)
            return s;

        return s.Trim();
    }
}

class Program  
{
    static void Main(string[] args)
    {
        string s = null;
        Console.WriteLine(s.TryTrim());  // notice that I don't have the code bloat like above
    }
}
```

This works without a NullReferenceException because the code actually looks like this to the compiler.

```
public static class Extension  
{
    public static string TryTrim(string s)
    {
        if (s == null)
            return s;

        return s.Trim();
    }
}

class Program  
{
    static void Main(string[] args)
    {
        string s = null;
        Console.WriteLine(TryTrim(s));  // this is how the run time sees the code
    }
}
```

So with this new understanding of extension methods you don't have to worry about checking if a variable is null or not before trying to use an extension method. The more I use extension methods the more I love them.