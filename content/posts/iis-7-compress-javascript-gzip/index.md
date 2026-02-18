---
title: "Getting IIS 7 to Compress JavaScript"
date: 2008-04-09T06:28:22-05:00
slug: "iis-7-compress-javascript-gzip"
draft: false
tags:
  - "Compression"
  - "GZip"
  - "IIS"
  - "IIS 7.0"
  - "JavaScript"
  - "JavaScript"
description: "One of the many recommendations that Yahoo makes on optimizing your web site for high amounts of traffic, and to make the response time speedier to your..."
---

One of the many recommendations that Yahoo makes on optimizing your web site for high amounts of traffic, and to make the response time speedier to your user is [GZip encoding all your static content](http://developer.yahoo.com/performance/rules.html#gzip). I usually do this as a standard for setting up any of my Web Servers, in addition to setting expiration headers on my static content, to ensure that I am serving as little content as possible.

IIS 7 has improved and simplified the compression and serving of static files by making it easier to setup and configure [than previously in IIS 6.0](http://www.dotnetjunkies.com/Article/16267D49-4C6E-4063-AB12-853761D31E66.dcik). The IIS 7.0 compression works perfectly for CSS, HTML, and Text files, however JavaScript is another story. The JavaScript files on my IIS 7.0 server were not being compressed and served with GZip encoding, which is a major problem for any Web 2.0 site where 75% of your content severed per request is JavaScript. (I just made that number up, but it sounds right!)

I found [Rick Strahl's post on this very subject](http://www.west-wind.com/WebLog/posts/98538.aspx) that he wrote up about a 9 months ago. It was helpful in diagnosing my problem, however it didn't solve it. The HTTP compression is configured in IIS 7.0's ApplicationHost.config file (`c:\windows\system32\inetsrv\config\applicationhost.config`), see below for the default settings:

```
<httpCompression directory="%SystemDrive%\websites\_compressed" minFileSizeForComp="0">  
    <scheme name="gzip" dll="%Windir%\system32\inetsrv\gzip.dll" />
    <staticTypes>
        <add mimeType="text/*" enabled="true" />
        <add mimeType="message/*" enabled="true" />
        <add mimeType="application/javascript" enabled="true" />
        <add mimeType="*/*" enabled="false" />
    </staticTypes>
</httpCompression>
```

As you can see anything that starts with the MIME type of `text` or `message` is GZip encoded just fine. However there is also `application/javascript` as a compressible MIME type, there is nothing wrong with that, because there are 3 accepted ways to set a JavaScript MIME type.

1. `text/javascript`
2. `application/x-javascript`
3. `application/javascript`

However the problem comes in when you look at the default MIME type mappings setup, in the same ApplicationHost.config file, a little further down.

```
...  
    <mimeMap fileExtension=".jpg" mimeType="image/jpeg" />
    <mimeMap fileExtension=".js" mimeType="application/x-javascript" />
    <mimeMap fileExtension=".jsx" mimeType="text/jscript" /
...
```

As you may notice the MIME type for JavaScript files is set to `application/x-javascript`, which is not the same as the default in the compression section above. So I added the following MIME type, `application/javascript`, to my Web.config thinking I had the problem licked, and all that I had to do was change the default MIME type for JavaScript files.

```
<system.webServer>  
    <staticContent>
        <remove fileExtension=".js" />
        <mimeMap fileExtension=".js" mimeType="application/javascript" />
    </staticContent>
</system.webServer>
```

However that didn't work either, and it should have because the MIME type now matched my compression MIME type. I even verified the MIME type in fiddler. So I then tried my last option to change the MIME type to `text/javascript`, which is the defacto standard on the internet for JavaScript MIME types.

```
<system.webServer>  
    <staticContent>
        <remove fileExtension=".js" />
        <mimeMap fileExtension=".js" mimeType="text/javascript" />
    </staticContent>
</system.webServer>
```

Finally, this was the key to getting the JavaScript GZip Compression working IIS 7.0. And this didn't require me to modify the ApplicationHost.config file get it done. Which is something I love about the new IIS 7.0, I can do my whole server configuration through FTP and my Web.config file.