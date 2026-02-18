---
title: "Determining A Significant Change In A Web Page"
date: 2010-01-12T01:00:00-05:00
slug: "determining-a-significant-change-in-a-web-page"
draft: false
tags:
  - ".NET"
  - "Debugging Flair"
  - "Difference Algorithm"
  - "Hashing"
  - "MD5"
  - "O(ND)"
description: "The problem with many web pages today is that they include useless hidden pieces of constantly changing information that serves no purpose to the general..."
---

The problem with many web pages today is that they include useless hidden pieces of constantly changing information that serves no purpose to the general web or anything else besides debugging.  A pretty good example of this is one that I found on my own blog, and removed, as I was experimenting with the code in this post:

```
<!-- 12 queries. 0.274 seconds. -->
```

This really serves no purpose to anybody but the the few debuggers who might be looking at the code for performance reasons once every so often.

You may be saying what's the big deal, it is a comment and it is not seen by the user, so who cares? Well you are right nobody does care, and this post isn’t going to change that fact, this type of debugging flair is going to continue on for the entire lifespan of the web.

But it does cause problems for any service that wants to figure out if your webpage has been changed overtime.  Like search engines, proxy caches, and the service I am working on that inspired this post.

### The simplest method for determining a change

The simplest method for determining a change is to use a hashing algorithm, [like MD5](http://en.wikipedia.org/wiki/MD5), which will provide you a 128-bit (16 byte) hash of whatever length text you put in it.

```
MD5("The quick brown fox jumps over the lazy dog")  
    = 9e107d9d372bb6826bd81d3542a419d6
```

Even a small change results it a completely different hash value.

```
MD5("The quick brown fox jumps over the lazy dog.")  
    = e4d909c290d0fb1ca068ffaddf22cbd0
```

So as you can see, by just adding a period to the end of the string, it resulted in a completely different hash of the string.  And this is an important and desirable property of most hashing algorithms called the [avalanche effect](http://en.wikipedia.org/wiki/Avalanche_effect), because it allows you to determine if there have been even the smallest of changes made.

Because of the avalanche effect, you are able to just store the hash of your old value and compare it to the hash of your new value to determine if there has been a change made.  And for reasons I won’t get into, in this post, this is desirable because you can use it compare inputs of any size, 1 B, 1 KB, 1 MB, 1 GB, 1 TB, and etc.  And with each case it will only produce a simple to store 16 byte output.

### The Problem

Many of you already know where I am going with this.  But given the fact that many web pages contain this constantly changing debugging flair that will produce different hashes with every request.

**How can you determine if a change has been significant enough to warrant the CPU cycles to reprocess the web page?**

Well that was the problem I was stuck trying to figure out.  Because after I realized that a simple hashing comparison wasn’t enough and I was spending too much time storing and processing pages that really didn’t change.  I determined a couple simple rules for determining if a change was significant enough to warrant a reprocessing.

1. Any change less that 5 characters wouldn’t be counted.
2. And the whole web page had to change by more than 1% for it to be counted as significant.

After I had these simple rules, I decided to turn to an *O(ND) Difference Algorithm* like [the one used on StackOverflow](http://stackoverflow.com/revisions/2268/list).  After a little research I determined that the StackOverflow team was probably using this [difference algorithm](http://www.mathertel.de/Diff/Default.aspx) created in C# and has been around and maintained since 2002.

Using the difference algorithm I created the following method to check for significant changes.

```
private bool IsChangeSignificant(string text1, string text2)  
{
    var differences = Difference.DiffText(text1, text2, true, true, true);
    int text2SignificantChangeLength = 0;
    int text2Length = text2.Length;

    foreach (var diff in differences)
    {
        if (diff.insertedB > 5)
            text2SignificantChangeLength += diff.insertedB;
    }

    // if more than 1% of the document has changed of changes larger than 5 characters, 
    // then it is considered significant
    // TODO: probably need a more robust solution in the future
    return ((double)text2SignificantChangeLength / (double)text2Length) > 0.01;
}
```

As my *TODO* indicates I probably need to find a more robust solution in the future, however this simple routine, so far, has given me the results I was looking for.  For the most part all the debugging flair has been marginalized as related to comparing two web pages.

However there are some downsides I can anticipate in the future.

1. A 1% change for a 1 KB web page is only about 100 characters, which is probably enough to weed out the debugging flair, however a 1% change for a 1 MB web page is about 1000 characters, and this is well beyond the debugging flair changes.
2. The CPU overhead is more significant in comparing text this way, than comparing two hashes.  In my case it made sense for various reasons to incur this overhead, it might not for you.
3. Weeding out 5 characters and above for a significant change is arbitrary, because if depends on where those 5 characters occurred at within the web page.  If it was in the main body, it is probably a more significant change than if it occurred in the footer.