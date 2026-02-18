---
title: "ZLIB Compression in .NET"
date: 2012-05-12T03:12:23-05:00
slug: "zlib-compression-in-net"
draft: false
tags:
  - "GZip"
  - "ZLIB"
description: "I recently encountered a situation where I needed to provide a compressed byte stream to Java's Inflator class. This probably isn't a situation that you..."
---

I recently encountered a situation where I needed to provide a compressed byte stream to Java's [Inflator class](http://docs.oracle.com/javase/1.4.2/docs/api/java/util/zip/Inflater.html). This probably isn't a situation that you run into a lot as a .NET developer, but to make a long story short, my [FluentCassandra library](http://github.com/managedfusion/fluentcassandra) had to send a compressed byte stream to the database server in order to execute a query.

The part that got me scratching my head is the fact that nothing in .NET Framework mentions ZLIB as a supportable compression type. So I had to start hunting down the specification and found that you can actually generate ZLIB compatible compression with the [DeflateStream](http://msdn.microsoft.com/en-us/library/system.io.compression.deflatestream.aspx). However the format that Java and other libraries expect has a header in the stream as well as an adler-32 checksum at the end.

Here is the solution that I came up with that can be seen below and [also on GitHub's Gist](https://gist.github.com/2667051).

```
public static byte[] ZlibCompress(byte[] data)  
{
    using (MemoryStream outStream = new MemoryStream())
    {
        // zlib header
        outStream.WriteByte(0x58);
        outStream.WriteByte(0x85);

        // zlib body
        using (var compressor = new DeflateStream(outStream, CompressionMode.Compress, true))
            compressor.Write(data, 0, data.Length);

        // zlib checksum - a naive implementation of adler-32 checksum
        const uint A32Mod = 65521;
        uint s1 = 1, s2 = 0;
        foreach (byte b in data)
        {
            s1 = (s1 + b) % A32Mod;
            s2 = (s2 + s1) % A32Mod;
        }

        int adler32 = unchecked((int)((s2 << 16) + s1));
        outStream.Write(BitConverter.GetBytes(IPAddress.HostToNetworkOrder(adler32)), 0, sizeof(uint));

        // zlib compatible compressed query
        var bytes = outStream.ToArray();
        outStream.Close();

        return bytes;
    }
}
```

I am putting this code out there, so nobody else has to hunt for hours trying to find a solution that should be built into .NET given the popularity of the ZLIB compression format.