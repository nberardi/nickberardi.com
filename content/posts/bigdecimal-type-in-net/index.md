---
title: "BigDecimal type in .NET"
date: 2012-05-13T20:00:51-05:00
slug: "bigdecimal-type-in-net"
draft: false
tags:
  - "BigDecimal"
  - "BigInteger"
description: "Similar to the situation I previously posted about in my last blog entry on ZLIB Compression in .NET. I needed to support a byte array coming from Java's..."
---

Similar to the situation I previously posted about in my last blog entry on [ZLIB Compression in .NET](http://coderjournal.com/2012/05/zlib-compression-in-net/). I needed to support a byte array coming from Java's [BigDecimal type](http://docs.oracle.com/javase/1.4.2/docs/api/java/math/BigDecimal.html).

To understand why I can't just use the decimal type in .NET you have to understand that BigDecimal is designed to scale way beyond typical numbers that anybody would realistically use in their day to day programming. And supporting one of these types as a standard type, would eat up much more memory than a typical programmer would want to use for a single number.

Java's BigDecimal can scale from a number that is as small as 1 byte to as many as 64 bytes. When Java's BigDecimal generates a byte array it can range from 5 bytes up to 68 bytes depending on the number being represented, with the last 4 bytes being an integer representing the number of decimal places in the number.

Here is what I came up with, which you can [also find on GitHub's Gist](https://gist.github.com/2667136).

```
using System;  
using System.Numerics;

/// 
/// A crude implimentation of the essentials needed from Java's BigDecimal
/// 
public struct BigDecimal  
{
    private readonly BigInteger _unscaledValue;
    private readonly int _scale;

    public BigDecimal(byte[] value)
    {
        byte[] number = new byte[value.Length - 4];
        byte[] flags = new byte[4];

        Array.Copy(value, 0, number, 0, number.Length);
        Array.Copy(value, value.Length - 4, flags, 0, 4);

        _unscaledValue = new BigInteger(number);
        _scale = flags[0];
    }

    public static explicit operator decimal(BigDecimal value)
    {
        var scaleDivisor = BigInteger.Pow(new BigInteger(10), value._scale);
        var remainder = BigInteger.Remainder(value._unscaledValue, scaleDivisor);
        var scaledValue = BigInteger.Divide(value._unscaledValue, scaleDivisor);

        if (scaledValue > new BigInteger(Decimal.MaxValue))
            throw new ArgumentOutOfRangeException("value", "The value " + value._unscaledValue + " cannot fit into System.Decimal.");

        var leftOfDecimal = (decimal)scaledValue;
        var rightOfDecimal = ((decimal)remainder) / ((decimal)scaleDivisor);

        return leftOfDecimal + rightOfDecimal;
    }
}
```

To understand why I had to create my own BigDecimal type, you have to understand that the .NET decimal type always generates a byte array of 16 bytes, the first 12 being the integer, and the last 4 being the number of decimal places or the scale. And because .NET always generates 16 bytes it assumes you are always going to read in 16 bytes, which is a bad assumption, but it is what it is. And because of this 16 byte logic it brings me my problem. I was having trouble reading in any number that didn't produce exactly 16 bytes for the decimal from Java's BigDecimal. So I decided to create a very crude representation of the BigDecimal type in .NET.

I am putting this code out there, so nobody else has to hunt to find a solution to read in BigDecimal type from Java. Also there is a ton of room for expansion of this type, so if you do modify please let me know so I can update the gist.