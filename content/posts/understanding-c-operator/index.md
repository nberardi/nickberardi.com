---
title: "Understanding C#: ?? Operator"
date: 2007-05-11T10:06:12-05:00
slug: "understanding-c-operator"
draft: false
tags:
  - ".Net"
  - ".NET"
  - "Framework 2.0"
description: "The ?? operator returns the left-hand operand if it is not null, or else it returns the right operand. int? i = null; int count = i ?? 0; The value that..."
---

The [**??** operator](http://msdn2.microsoft.com/en-us/library/ms173224.aspx "?? Operator (C# Reference) ") returns the left-hand operand if it is not null, or else it returns the right operand.

```
int? i = null;  
int count = i ?? 0;
```

The value that **count** is set to is **0**. The **??** operator is short hand for:

```
int? i = null;  
int count = i.HasValue ? i.Value : 0;
```

Or

```
int? i = null;  
int count = 0;  
if (i.HasValue)  
    count = i.Value;
```

The *Understanding C#* series at Coder Journal will be an on going project to help the readers to better understand the C# programming language that doesn't get covered except at the more advanced levels.