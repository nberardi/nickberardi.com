---
title: "Yahoo YUI Compressor vs. Microsoft AJAX Minifier vs. Google Closure Compiler"
date: 2010-01-18T10:12:12-05:00
slug: "yahoo-yui-compressor-vs-microsoft-ajax-minifier-vs-google-closure-compiler"
draft: false
tags:
  - "Closure Compiler"
  - "Google"
  - "JavaScript"
  - "JavaScript"
  - "Microsoft"
  - "Yahoo"
  - "YUI"
  - "YUI Compressor"
  - "AJAX Minifier"
description: "A little more than a year and half ago I created a MSBuild Task for the YUI Compressor that was very well received, and even highlighted on the YUI..."
---

A little more than a year and half ago I created a [MSBuild Task for the YUI Compressor](http://www.coderjournal.com/2008/05/how-to-create-a-yui-compressor-msbuild-task/) that was very well received, and even highlighted on the [YUI Compressor site](http://developer.yahoo.com/yui/compressor/).  At the time of writing that article YUI Compressor was king of the hill, and for the most part the only game in town that was really designed for production level use.  Since then a number of new competitors have been released by Google and Microsoft, and I wanted to see how they stacked up against the YUI Compressor.

### 

### Setup

For these tests I wanted to test a pretty complex set of JavaScript to really stretch the limits of each of the optimizers. So I choose jQuery 1.4 as the subject for the tests.  I choose jQuery for many reasons, but the biggest is because it is very well known set of code for most developers, and it would be very easy for anybody to test in their applications.

The setup of my machine is as follows:

- Windows 7 Pro (x64)
- Java 6 Update 17
- .NET 3.5 SP1

Each optimizer and the version:

- [Microsoft Ajax Minifier 1.1](http://download.codeplex.com/Project/Download/FileDownload.aspx?ProjectName=aspnet&DownloadId=92881&FileTime=129026947654830000&Build=16135)
- [Google Closure Compiler Revision 26](http://closure-library.googlecode.com/svn/trunk/)
- [Yahoo YUI Compressor 2.4.2](http://yuilibrary.com/downloads/#yuicompressor)

### Testing

I ran the following from the command line on jQuery 1.4 raw source code to produce the following files.  Here is the raw source code file that I used in my testing:

- [jquery-1.4.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/jquery-1.4.js)

##### Microsoft

```
ajaxmin jquery-1.4.js -o microsoft.js
```

- [microsoft.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/microsoft.js)

##### Microsoft (Hypercrunch)

```
ajaxmin -h jquery-1.4.js -o microsoft-h.js
```

- [microsoft-h.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/microsoft-h.js)

##### Microsoft (Hypercrunch Combine Literals)

```
ajaxmin -hl jquery-1.4.js -o microsoft-hc.js
```

- [microsoft-hc.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/microsoft-hc.js)

##### Google (Whitespace)

```
java -jar compiler.jar --compilation_level WHITESPACE_ONLY --js jquery-1.4.js
```

- [google-w.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/google-w.js)

##### Google (Simple)

```
java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js jquery-1.4.js
```

- [google-s.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/google-s.js)

##### Google (Advanced)

```
java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js jquery-1.4.js
```

- [google-a.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/google-a.js)

##### Yahoo

```
java -jar yuicompressor-2.4.2.jar jquery-1.4.js -o yahoo.js
```

- [yahoo.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/yahoo.js)

##### Yahoo (Minified Only)

```
java -jar yuicompressor-2.4.2.jar jquery-1.4.js --nomunge -o yahoo-m.js
```

- [yahoo-m.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/yahoo-m.js)

##### Yahoo (Disabled Optimizations)

```
java -jar yuicompressor-2.4.2.jar jquery-1.4.js --disabled-optimizations -o yahoo-o.js
```

- [yahoo-o.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/yahoo-o.js)

##### Yahoo (Preserve Unnecessary Semicolons)

```
java -jar yuicompressor-2.4.2.jar jquery-1.4.js --preserve-semi -o yahoo-s.js
```

- [yahoo-s.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/yahoo-s.js)

### Results

The above testing produced the following results.

|  | Size (bytes) | Command Options | Size Optimization | Place |
| --- | --- | --- | --- | --- |
| jQuery | 158407 |  | 100.0000% | -- |
| Microsoft | 93814 |  | 59.2234% | 8 |
| Microsoft (Hypercrunch) | 70156 | -h | 44.2884% | 4 |
| Microsoft (Hypercrunch Combine Literals) | 67149 | -hc | 42.3902% | 2 |
| Google (Whitespace) | 94225 | --compilation\_level WHITESPACE\_ONLY | 59.4829% | 9 |
| Google (Simple) | 69467 | --compilation\_level SIMPLE\_OPTIMIZATIONS | 43.8535% | 3 |
| Google (Advanced) | 63384 | --compilation\_level ADVANCED\_OPTIMIZATIONS | 40.0134% | 1 |
| Yahoo | 76453 |  | 48.2636% | 5 |
| Yahoo (Minify Only) | 94843 | --nomunge | 59.8730% | 10 |
| Yahoo (Disabled Optimizations) | 76465 | --disable-optimizations | 48.2712% | 6 |
| Yahoo (Preserve Unnecessary Semicolons) | 77384 | --preserve-semi | 48.8514% | 7 |

The results are pretty clear of who won the top prizes in the above results.  Out of the top 5 ranking outputs Google and Microsoft both took two of the positions and Yahoo took 1. Google Closure Compiler placed first when the Advanced Options were enabled which did really surprise me that much, and Microsoft AJAX Minifier placed second when Hypercrunch and Combine Literals were turned on.  The Microsoft ranking, however was very surprising to me because of the [lack-luster reviews of RC6](http://ajaxian.com/archives/microsoft-ajax-minifier-vs-yui-compressor) that was released back in October.

There are a couple things that should be noted about *Google Closure with Advanced Options*, which [may not make the most beneficial option](http://code.google.com/closure/compiler/docs/api-tutorial3.html#dangers) for you to choose when you are trying to minify your files.

1. Removal of Code You Want to Keep
2. Inconsistent Property Names
3. Compiling Two Portions of Code Separately
4. Broken References between Compiled and Uncompiled Code

Because of how the file is being optimized, it alters your code and would require you to do extra testing before deployment and it would make the resulting output almost impossible to debug against your un-minified version.  So for these reasons it may not be the best choice, if you value ease of testing over byte size of your files.

So which ever option out of Microsoft, Google, or Yahoo you decide to use, all will produce a much more optimized-for-size file than the original. And, in my opinion, if you are already using Yahoo in your build environment there really isn’t much of a reason to switch, unless you are in the top tier of websites and need to squeeze every byte out of the file for delivery over the internet.

Personally, I am going to keep using YUI Compressor, because it has been rock solid in producing minimized and obfuscated code for my current projects, but in the future I may consider going with Microsoft or Google depending on what I am trying to accomplish.