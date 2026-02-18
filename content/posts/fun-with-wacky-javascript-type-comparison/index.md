---
title: "Fun With Wacky JavaScript Type Comparison"
date: 2009-08-13T05:05:03-05:00
slug: "fun-with-wacky-javascript-type-comparison"
draft: false
tags:
  - "JavaScript"
  - "JavaScript"
description: "I recently had a conversation with Scoot Koon (LazyCoder) over Twitter about the wacky JavaScript type comparisons that are allowed. I was interested to..."
---

I recently had a conversation with [Scoot Koon (LazyCoder)](http://www.lazycoder.com) over [Twitter](http://twitter.com/lazycoder) about the [wacky JavaScript type comparisons](http://twitter.com/nberardi/status/3285947110) that are allowed.  I was interested to see what weird oddities would come out if I compared the whole type system against it self.  So I sat down and wrote a simple JavaScript routine to do just that, and the below reference table is the output of that routine.

|  | null | undefined | true | false | -1 | 0 | 1 | NaN | Infinity | "" | " " | "null" | "undefined" | "true" | "false" | "-1" | "0" | "1" | "NaN" | "Infinity" |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| null | null | null | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| undefined | undefined | undefined | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| true | -- | -- | true | -- | -- | -- | true | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | true | -- | -- |
| false | -- | -- | -- | false | -- | false | -- | -- | -- | false | false | -- | -- | -- | -- | -- | false | -- | -- | -- |
| -1 | -- | -- | -- | -- | -1 | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -1 | -- | -- | -- | -- |
| 0 | -- | -- | -- | 0 | -- | 0 | -- | -- | -- | 0 | 0 | -- | -- | -- | -- | -- | 0 | -- | -- | -- |
| 1 | -- | -- | 1 | -- | -- | -- | 1 | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | 1 | -- | -- |
| NaN | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| Infinity | -- | -- | -- | -- | -- | -- | -- | -- | Infinity | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | Infinity |
| "" | -- | -- | -- | "" | -- | "" | -- | -- | -- | "" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| " " | -- | -- | -- | " " | -- | " " | -- | -- | -- | -- | " " | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| "null" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "null" | -- | -- | -- | -- | -- | -- | -- | -- |
| "undefined" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "undefined" | -- | -- | -- | -- | -- | -- | -- |
| "true" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "true" | -- | -- | -- | -- | -- | -- |
| "false" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "false" | -- | -- | -- | -- | -- |
| "-1" | -- | -- | -- | -- | "-1" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "-1" | -- | -- | -- | -- |
| "0" | -- | -- | -- | "0" | -- | "0" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "0" | -- | -- | -- |
| "1" | -- | -- | "1" | -- | -- | -- | "1" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "1" | -- | -- |
| "NaN" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "NaN" | -- |
| "Infinity" | -- | -- | -- | -- | -- | -- | -- | -- | "Infinity" | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | "Infinity" |

So some of the oddities that emerged to me are:

- The word "Infinity" is equal to the type `Infinity`, however "true" or "false" don't equal `true` or `false` respectively.
- `" " == 0 == false` and also `"" == 0 == false`, however `" " != ""`
- **Update** Just noticed that `NaN != NaN` but `Infinity == Infinity`

If you would like to try this your self, or want to add to it, here is the code that I used.

```
var values = [null, undefined, true, false, -1, 0, 1, NaN, Infinity, "", " ", "null", "undefined", "true", "false", "-1", "0", "1", "NaN", "Infinity"];

document.write("<table><thead><tr><th></th>")  
for (var x = 0; x < values.length; x++) {  
    document.write("<th>" + (x > 8 ? """ : "") + values[x] + (x > 8 ? """ : "") + "</th>");
}
document.write("</tr></thead><tbody>");  
for (var i = 0; i < values.length; i++) {  
    document.write("<tr>");
    document.write("<th>" + (i > 8 ? """ : "") + values[i] + (i > 8 ? """ : "") + "</th>");

    for (var j = 0; j < values.length; j++) {
        var output = values[i] == values[j];

        document.write("<td style="text-align:center;" + (i == j ? "background-color:black;" : (output ? "background-color:green;color:#00AF33;" : "color:#e0e0e0;")) + "">");
        document.write(output ? (i > 8 ? """ : "") + values[i] + (i > 8 ? """ : "") : "--");
        document.write("</td>");
    }

    document.write("</tr>");
}
document.write("</tbody></table>");
```

I think [Scott really hit the nail on the head](http://twitter.com/lazycoder/statuses/3287262166) when he said this about JavaScript coercion.

[![LazyCoder (Scott Koon) on JavaScript Coercion](http://coderjournal.com/uploads/2009/08/lazycoder-on-javascript-coercion1.png "LazyCoder (Scott Koon) on JavaScript Coercion")](http://twitter.com/lazycoder/statuses/3287262166)