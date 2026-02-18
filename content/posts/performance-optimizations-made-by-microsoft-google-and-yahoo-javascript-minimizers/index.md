---
title: "Performance Optimizations Made By Microsoft, Google, and Yahoo JavaScript Minimizers"
date: 2010-01-20T12:46:52-05:00
slug: "performance-optimizations-made-by-microsoft-google-and-yahoo-javascript-minimizers"
draft: false
tags:
  - "Closure Compiler"
  - "Google"
  - "JavaScript"
  - "JavaScript"
  - "Microsoft"
  - "Optimization"
  - "Yahoo"
  - "YUI"
  - "YUI Compressor"
  - "AJAX Minifier"
description: "In my first post about JavaScript compression and the different levels supported by the three major competitors in the JavaScript minimization,..."
---

In my [first post about JavaScript compression](http://www.coderjournal.com/2010/01/yahoo-yui-compressor-vs-microsoft-ajax-minifier-vs-google-closure-compiler/ "Yahoo YUI Compressor vs. Microsoft AJAX Minifier vs. Google Closure Compiler") and the different levels supported by the three major competitors in the JavaScript minimization, obfuscation, and optimization tools space.  I the article I discussed which tool provided the best compression in regards to the resulting byte count.  And found that Google took the over all crown with Microsoft following very closely behind.  A comment posted on that article by [Eric J. Smith of Code Smith](http://www.codesmithtools.com/), provided a nice lead in to my second article in this series, he posted this comment:

[![Eric J. Smith Comment](http://coderjournal.com/uploads/2010/01/comment1.png "Eric J. Smith Comment")](http://www.coderjournal.com/2010/01/yahoo-yui-compressor-vs-microsoft-ajax-minifier-vs-google-closure-compiler/#comment-50720)

So if you haven’t guessed it yet by the title and then by Eric’s comment this post is going to be on the optimizations provided by the tools.  So lets get started…

### Setup

Back in October I saw [an interesting article on this same subject](http://ajaxian.com/archives/microsoft-ajax-minifier-vs-yui-compressor) comparing Yahoo and Microsoft on site called [Ajaxian](http://ajaxian.com/). But at the time Microsoft AJAX Minimizer was only on RC6, and as of this article is at version 1.1, so somethings have changed and I wanted to provide a more relevant comparison which included Google too. I borrowed Ajaxian’s code they used to test the different tools for my own experiment in this article.

```
function notCalled(text) {  
    alert(text);
}
/**
 * @license comment
 */
var o = (function(){  
var o = {};  
var b = "on";  
var c = "on" + b + "mouse";  
var d = c + 1000 + "on";  
var x = o[d];  
/*!
important comment  
*/
var i = 1000;  
o["on" + "click"] = function(){};  
o["on" + "mouse" + "over"] =  
o["on" + "mouse" + "out"] =  
o["on" + "mouse" + "move"] = o["on" + "click"];  
o["on" + "click"] = o["on" + "click"];  
if(i)  
i++  
;
return o  
})();
```

The above code is designed to test many different aspects of optimization.  Including:

1. Code that is not called from anywhere.
2. Preservation of Licenses, Copy Rights, and any other important comments.
3. Frequently used string literal combination.
4. Understanding of logic, to remove repeated and unnecessary dynamic access.
5. Number compression.  (changing 1000 to 1e3)
6. Get rid of the gibberish variables at the beginning of the function that serve no purpose.

### Simple Compression

First things first lets just see how each of them handle simple compression, with out any optimizations enabled on each tool.  I did that by running the following:

```
# Ajax Minifier  
ajaxmin.exe test.js -o output.js

# YUI Compressor
java -jar yuicompressor-2.4.2.jar --nomunge --preserve-semi --disable-optimizations -o output.js test.js

# Google Closure
java -jar compiler.jar --compilation_level WHITESPACE_ONLY --js test.js
```

Above produces the following output

```
// Ajax Minifier  
function notCalled(text){alert(text)}var o=function(){var o={},b="on",c="on"+b+"mouse",d=c+1e3+"on",x=o[d],i=1e3;o["onclick"]=function(){};o["onmouseover"]=o["onmouseout"]=o["onmousemove"]=o["onclick"];o["onclick"]=o["onclick"];if(i)i++;return o}()

// YUI Compressor
function notCalled(text){alert(text);}var o=(function(){var o={};var b="on";var c="on"+b+"mouse";var d=c+1000+"on";var x=o[d];  
/*
important comment  
*/
var i=1000;o["on"+"click"]=function(){};o["on"+"mouse"+"over"]=o["on"+"mouse"+"out"]=o["on"+"mouse"+"move"]=o["on"+"click"];o["on"+"click"]=o["on"+"click"];if(i){i++;}return o;})();

// Google Closure
/*
 comment
*/
function notCalled(text){alert(text)}var o=function(){var o={};var b="on";var c="on"+b+"mouse";var d=c+1E3+"on";var x=o[d];var i=1E3;o["on"+"click"]=function(){};o["on"+"mouse"+"over"]=o["on"+"mouse"+"out"]=o["on"+"mouse"+"move"]=o["on"+"click"];o["on"+"click"]=o["on"+"click"];if(i)i++;return o}();
```

Some interesting things I noticed about the above code is:

- Yahoo was the only tool who preserved the “\*!” comment block and Google was the only one who preserved the “\*\*” comment block.
- Google and Microsoft both changed the number 1000 into 1e3.
- Microsoft combined the strings together, that were next to each other.
- Yahoo added some extra parentheses, around the *if(i)i++;* statement.

### 

### Simple Optimization

Next we are going to look at some basic optimizations made by each tool.  I again did that by running the following:

```
# Ajax Minifier  
ajaxmin.exe -h test.js -o output.js

# YUI Compressor
java -jar yuicompressor-2.4.2.jar -o output.js test.js

# Google Closure
java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js test.js
```

Above produces the following output

```
// Ajax Minifier  
function notCalled(a){alert(a)}var o=function(){var a={},c="on",d="on"+c+"mouse",e=d+1e3+"on",f=a[e],b=1e3;a["onclick"]=function(){};a["onmouseover"]=a["onmouseout"]=a["onmousemove"]=a["onclick"];a["onclick"]=a["onclick"];if(b)b++;return a}()

// YUI Compressor
function notCalled(a){alert(a)}var o=(function(){var h={};var e="on";var j="on"+e+"mouse";var g=j+1000+"on";var a=h[g];  
/*
important comment  
*/
var f=1000;h.onclick=function(){};h.onmouseover=h.onmouseout=h.onmousemove=h.onclick;h.onclick=h.onclick;if(f){f++}return h})();

// Google Closure
/*
 comment
*/
function notCalled(a){alert(a)}var o=function(){var a={},b=1E3;a.onclick=function(){};a.onmouseover=a.onmouseout=a.onmousemove=a.onclick;a.onclick=a.onclick;b&&b++;return a}();
```

Some interesting things to note about this new code is:

- Yahoo and Google**still** keep their respective comment blocks.
- Google and Microsoft both **still** changed the number 1000 into 1e3.
- Google and Yahoo show a better understanding of the code by changing the dynamic event hash mappings in to actual bound properties.  Microsoft **still**  only combines the strings together.
- All of the tools obfuscated the variable names.
- Microsoft and Google both combined the three variables at the beginning of the method in to a one statement.
- Anybody notice the optimization that Google did *b&&b++* instead of *if(b)b++*, this shows a really good understanding of the code.
- On the other had Yahoo added some extra parentheses, again, around the *if(i)i++* statement, but dropped the extra semi-colon.
- Google was the only one who got rid of the gibberish variables at the beginning of the function that served no purpose.

### Best Optimizations

Next we are going to check out the best possible combination of options for each tool to produce the most optimized code.  We will produce this with the following:

```
# Ajax Minifier  
ajaxmin.exe -hc test.js -o output.js

# YUI Compressor
java -jar yuicompressor-2.4.2.jar -o output.js test.js

# Google Closure
java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js test.js
```

*You may have noticed that we are using the same commands for Yahoo, this is on purpose, because Yahoo really doesn’t have a simple state the compares to the other tools.*

The following output was produced

```
// Ajax Minifier  
function notCalled(a){alert(a)}var o=function(){var d="click",c="mouse",a="on",b={},f=a,g=a+f+c,h=g+1e3+a,i=b[h],e=1e3;b[a+d]=function(){};b[a+c+"over"]=b[a+c+"out"]=b[a+c+"move"]=b[a+d];b[a+d]=b[a+d];if(e)e++;return b}()

// YUI Compressor
function notCalled(a){alert(a)}var o=(function(){var h={};var e="on";var j="on"+e+"mouse";var g=j+1000+"on";var a=h[g];  
/*
important comment  
*/
var f=1000;h.onclick=function(){};h.onmouseover=h.onmouseout=h.onmousemove=h.onclick;h.onclick=h.onclick;if(f){f++}return h})();

// Google Closure
/*
 comment
*/
(function(){var a={},b=1E3;a.onclick=function(){};a.onmouseover=a.onmouseout=a.onmousemove=a.onclick;a.onclick=a.onclick;b&&b++;return a})();
```

Some interesting things to note about this code is:

- Yahoo and Google**still** keep their respective comment blocks.
- Google and Microsoft both **still** changed the number 1000 into 1e3.
- Google and Yahoo **still** show a better understanding of the code by changing the dynamic event hash mappings in to actual bound properties.
- Microsoft combined the “click”, “mouse” and “on” strings in to variables that are concatenated together in the variables and event references.
- All of the tools **still** obfuscated the variable names.
- Microsoft and Google **still** both combined the three variables at the beginning of the method in to a one statement.
- Google **still** kept the *b&&b++* instead of *if(b)b++*.
- Yahoo added some extra parentheses, again, around the *if(i)i++* statement, but dropped the extra semi-colon.
- Google **still** was the only one who got rid of the gibberish variables at the beginning of the function that served no purpose.
- Google removed the *notCalled* function, since it was not being used in this script file.  This is good and bad, because if you referenced this from the outside, then this will cause problems when you try to use it.

### Final Word

Even though Google *ADVANCED\_OPTIMIZATIONS* scored the highest and Microsoft with –*hc* turned on scored second on [my last post](http://www.coderjournal.com/2010/01/yahoo-yui-compressor-vs-microsoft-ajax-minifier-vs-google-closure-compiler/).  I think Google with *SIMPLE\_OPTIMIZATIONS* turned on is my current favorite for providing a good balance between optimization, compression, and compatibility with the original version.  Closely followed by Yahoo with out any configuration options turned off.  These two placed #3 and #5, respectively, in my previous post.

Even though Google with *ADVANCED\_OPTIMIZATIONS*, did the best overall, it still scares me a little for the following reasons that I mentioned last time:

> There are a couple things that should be noted about *Google Closure with Advanced Options*, which [may not make the most beneficial option](http://code.google.com/closure/compiler/docs/api-tutorial3.html#dangers) for you to choose when you are trying to minify your files.
>
> 1. Removal of Code You Want to Keep
> 2. Inconsistent Property Names
> 3. Compiling Two Portions of Code Separately
> 4. Broken References between Compiled and Uncompiled Code

Here are the files that resulted from the above testing:

1. [test.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/test.js)
2. [microsoft.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/microsoft.js)
3. [microsoft-h.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/microsoft-h.js)
4. [microsoft-hc.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/microsoft-hc.js)
5. [yahoo-all.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/yahoo-all.js)
6. [yahoo.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/yahoo.js)
7. [google-w.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/google-w.js)
8. [google-s.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/google-s.js)
9. [google-a.js](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/01/optimization/google-a.js)

So which of the following optimizations do you feel the most comfortable with?