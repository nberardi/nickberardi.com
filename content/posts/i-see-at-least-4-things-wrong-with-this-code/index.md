---
title: "I see at least 4 things wrong with this code"
date: 2009-04-13T12:38:21-05:00
slug: "i-see-at-least-4-things-wrong-with-this-code"
draft: false
tags:
  - ".NET"
  - "Bad Code"
description: "I saw this code over on Ayende's website. I see at least 4 things wrong with this code, which was found here. public object DeepCopy (object value) { try..."
---

I saw this [code over on Ayende's website](http://ayende.com/Blog/archive/2009/04/13/there-are-so-many-things-wrong-with-this-codehellip.aspx). I see at least 4 things wrong with this code, which was [found here](http://www.codeproject.com/KB/dotnet/OptLocking_PrefixTable.aspx).

```
public object DeepCopy (object value)  
{
    try {
        return value;
    } catch (Exception ex) {
        throw ex;
    }
}
```

See if you can find them all.