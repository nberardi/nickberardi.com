---
title: "How to create a YUI Compressor MSBuild Task"
date: 2008-05-18T14:29:27-05:00
slug: "how-to-create-a-yui-compressor-msbuild-task"
draft: false
tags:
  - "CSS"
  - "Java"
  - "JavaScript"
  - "JavaScript"
  - "MSBuild"
  - "Web"
  - "Yahoo"
  - "YUI"
description: "Recently for IdeaPipe I have been looking for ways to deliver my content more quickly and reduce unnecessary bandwidth use. According to Yahoo's..."
---

Recently for [IdeaPipe](http://www.ideapipe.com) I have been looking for ways to deliver my content more quickly and reduce unnecessary bandwidth use.

According to [Yahoo's Performance Team](http://developer.yahoo.com/performance/) more than half of the viewers of the Yahoo websites start with an empty cache, which means the browser has to download all the resources for the first time. This combined with a high traffic website and unneeded white space and comments can really add up to a significant bandwidth use. There are many popular ways to minify your static content tax on your bandwidth, using many popular tools, as described in this excerpt from Yahoo:

> In terms of code minification, the most widely used tools to minify JavaScript code are Douglas Crockford's [JSMIN](http://crockford.com/javascript/jsmin), [the Dojo compressor](http://dojotoolkit.org/docs/shrinksafe) and Dean Edwards' [Packer](http://dean.edwards.name/packer/). Each of these tools, however, has drawbacks. JSMIN, for example, does not yield optimal savings (due to its simple algorithm, it must leave many line feed characters in the code in order not to introduce any new bugs).
> The goal of JavaScript and CSS minification is always to preserve the operational qualities of the code while reducing its overall byte footprint (both in raw terms and after gzipping, as most JavaScript and CSS served from production web servers is gzipped as part of the HTTP protocol).

The cream of the crop seems to be a tool Yahoo developed to deliver its own static text content scripts and styles, the [YUI Compressor](http://developer.yahoo.com/yui/compressor/ "YUI Compressor"):

> The YUI Compressor is JavaScript minifier designed to be 100% safe and yield a higher compression ratio than most other tools. Tests on the [YUI Library](http://developer.yahoo.com/yui/) have shown savings of over 20% compared to JSMin (becoming 10% after HTTP compression). Starting with version 2.0, the YUI Compressor is also able to compress CSS files by using a port of [Isaac Schlueter](http://foohack.com/)'s regular-expression-based CSS minifier.

The YUI Compressor is a Java JAR file that can be [download from Julien Lecomte Blog](http://www.julienlecomte.net/yuicompressor/).

The YUI Compressor yielded exceptional results, however it was missing one thing. Integration in to my build and deployment process. In IdeaPipe I use a MSBuild script to compile, manipulate, and prepare for publishing. So naturally I built a MSBuild Task to minimize my JavaScript and CSS files.

The magic actually happens by invoking Java in an external process for each file passed in to the task.

```
Process process = new Process();  
process.StartInfo = new ProcessStartInfo {  
    FileName = @"c:\program files\java\jdk1.6.0_06\bin\java.exe",
    Arguments = String.Format(
        @"-jar ""C:\development\tools\yuicompressor-2.3.5.jar"" --type {0} --charset utf8 {1} -o ""{2}"" ""{3}""",
        type,
        ShowWarnings ? "--verbose" : String.Empty,
        newFile,
        oldFile
        ),
    UseShellExecute = false,
    CreateNoWindow = true,
    RedirectStandardOutput = true,
    RedirectStandardError = true
};
process.Start();  
process.WaitForExit(5000);
```

Then I read the warning from the standard error output and send them back to Visual Studio as a compile warning if the `ShowWarning` property is true.

```
string[] warnings = process.StandardError.ReadToEnd()  
    .Replace("\r", String.Empty)
    .Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

foreach(string warning in warnings)  
    Log.LogWarning(null, null, null, oldFile, 1, 1, 1, 1, FormatWarning(warning), null);
```

To integrate this in to my MSBuild script I had to first register my task:

```
<UsingTask TaskName="ManagedFusion.Build.YuiCompress" AssemblyFile="$(ProjectDir)..\ManagedFusion.Build\bin\$(ConfigurationName)\ManagedFusion.Build.dll"/>
```

Then setup my `ItemGroup` for the files:

```
<ItemGroup>  
    <JavaScriptContent Include="$(SourceWebPhysicalPath)\**\*.js" />
    <CssContent Include="$(SourceWebPhysicalPath)\**\*.css" />
</ItemGroup>
```

Then finally I setup my task to perform the minimization against the JavaScript and CSS files seperately:

```
<Target Name="AfterBuild">  
    <!-- do other stuff to prepare for publishing -->
    <YuiCompress Files="@(JavaScriptContent)" Type="JS" />
    <YuiCompress Files="@(CssContent)" Type="CSS" />
</Target>
```

You can easily incorporate this in to your own MSBuild scripts or even your Visual Studio Project which is just an MSBuild file for compiling your source code for the project. I have included my source code below:

**Download:** [YUI Compressor MSBuild Task Source](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2008/5/YuiCompress.cs)

**Note:** There are a couple of static paths to be on the look out for and modify as necessary for your own code. In my code the Java runtime is loaded at `c:\program files\java\jdk1.6.0_06\bin\java.exe` and the YUI JAR is located at `C:\development\tools\yuicompressor-2.3.5.jar`.

**Update (2008-5-21):** Thanks [George](http://www.kineticdog.com/), apparently IIS doesn't like serving straight C# files. So I added the code to my Coder Journal Source Control, so that it can be downloaded from there.