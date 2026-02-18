---
title: "How to use the .NET URL Rewriter and Reverse Proxy to run WordPress on IIS"
date: 2008-02-10T06:00:22-05:00
slug: "url-rewriter-reverse-proxy-iis-wordpress"
draft: false
tags:
  - ".NET"
  - "C#"
  - "Coder Journal"
  - "How To"
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "MySQL"
  - "Proxy"
  - "Reverse Proxy"
  - "SEO"
  - "URL Rewrite"
  - "Web"
  - "wordpress"
description: "First off I would like to say that many of my readers are very intelligent, they picked up on a one line sentence in my last post about my new design and..."
---

First off I would like to say that many of my readers are very intelligent, they picked up on a one line sentence in [my last post](http://www.coderjournal.com/2008/01/new-year-makeover-wordpress-seo-sem/ "Coder Journal’s New Year Make Over") about my new design and Coder Journal switching from Linux to Windows.

> I also moved hosts from GoDaddy’s shared Linux hosting. To GoDaddy’s virtual dedicated hosting on Windows. This proved difficult since URL Rewriting isn’t currently built in to IIS 6.0 like it is in Apache. I will talk a little about this setup in a later post.

Switching from Linux to Windows wasn't the part that really intrigued many of them, it happens every day so why would it? It was the fact that I was able to get the same level of URL Rewriting out of IIS 6.0 as I was out of Apache's [mod\_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) and still be able to make WordPress look and function like it was running on Apache.

So to get started I just want to say, while I know there are [other](http://www.binaryfortress.com/wordpress-url-rewrite/) [solutions](http://www.codeplex.com/IIRF) [out there](http://www.isapirewrite.com/) to get WordPress hosted on IIS with the exact same outcome as what I am going to present below. I did this for the following reasons:

1. I am a .NET guy and I love developing software that is popular on other platforms on .NET just to see if it can be done.
2. I also believe in [Eating One's Own Dog Food](http://en.wikipedia.org/wiki/Eat_one's_own_dog_food), and the [URL Rewriter and Reverse Proxy](http://www.managedfusion.com/products/url-rewriter/) that I am presenting below, and that is used in Coder Journal, is my own creation.

### What This Post Covers

This post is meant to provide an insight in to a technology, Reverse Proxy, that many developers are unaware of and it will be demonstrated through the eyes of my blog and how it works in regards to WordPress/IIS 6.0. Some of the basics will be covered such as the working of a URL Rewriter and Reverse Proxy. This post will not cover how to code a URL Rewriter or Reverse Proxy in C#. The reader should also have a basic understanding of how RegEx, HTTP, and URL Rewriters.

### The Problem

On IIS 6.0, and previous versions, due to a lack of any standardized URL Rewriting process built in, so developers have to take nice visitor and SEO friendly URL's like this:

`http://www.coderjournal.com/2008/02/10/sample-post/`

And make IIS 6.0 compatible ugly URL's, which may or may not be SEO friendly, and neither URL is as visitor friendly as the one above.

`http://www.coderjournal.com/?p=123`   
`http://www.coderjournal.com/index.php/2008/02/10/sample-post/`

### My Solution Used On Coder Journal

The solution I choose was influenced by a number of factors, a couple that will change for the better when IIS 7.0 is released. The factors are:

- I need to run PHP for WordPress.
- I need to run FastCGI for IIS 6.0 to get the best performance out of PHP.
- .NET and PHP run separate from each other, so I cannot use a .NET URL Rewriter to control which PHP file is chosen to run. (This changes in IIS 7.0 with Integrated Pipelines)
- I need to pass all requests to www.coderjournal.com through .NET, which has a performance loss for rendering static files such as image, and text files. (This changes in IIS 7.0 with Integrated Pipelines)
- **I need to keep the URL's friendly for visitors and SEO.**

So because of what I listed above I needed to create two web servers to host www.coderjournal.com, which I will talk about later on in this article. One of the servers is the public interface to www.coderjournal.com, which I will call *frontend*, and the other is the Backend WordPress web server, which I will call *backend* that only handles standard WordPress with the ugly URL's listed above, this one is not public. The picture will demonstrate the structure better than I can explain.

[![Coder Journal Web Structure](/images/2008/02/coder-journal-structure1.png)](/images/2008/02/coder-journal-structure1.png "Coder Journal Web Structure")

As you can see, from the above picture, all requests to WordPress are handled by the frontend server for this blog. This all happens through a technique known as [Reverse Proxy](http://en.wikipedia.org/wiki/Reverse_proxy).

> A reverse proxy dispatches in-bound network traffic to a set of servers, presenting a single interface to the caller. For example, a reverse proxy could be used for [load balancing](http://en.wikipedia.org/wiki/Load_balancing_%28computing%29 "Load balancing (computing)") a cluster of web servers. In contrast, a *forward proxy* acts as a proxy for out-bound traffic. For example, an [ISP](http://en.wikipedia.org/wiki/Internet_service_provider "Internet service provider") may use a proxy to forward [HTTP](http://en.wikipedia.org/wiki/HTTP "HTTP") traffic from its clients to external web servers on the internet; it may also [cache](http://en.wikipedia.org/wiki/Cache "Cache") the results to improve performance.

So with out going in to a deep explanation of how I was able to accomplish the reverse proxy, basically for every request that comes in to frontend server that meets a certain criteria I make another HTTP web request to the backend server and then write it's response back to the original frontend server request.

#### Step 1 - Setting Up .NET to Process All Requests

Setup your frontend server to process everything through the .NET framework.

1. Open IIS and right-click on the website and select *Properties*.
2. Click the *Configuration* button under Application Settings section
3. Click the *Insert...* button to create a new wildcard mapping
4. Set the executable textbox to aspnet\_isapi.dll file location.
   for .net 2.0, 3.0, 3.5: **C:WindowsMicrosoft.NETFrameworkv2.0.50727aspnet\_isapi.dll**
5. Make sure the checkbox *Verify that file exists* is not checked.
6. Press *OK* to confirm and close all the windows.

#### Step 2 - Install PHP/WordPress

Just follow this [article on IIS.NET](http://www.iis.net/articles/view.aspx/IIS7/Hosting-Web-Applications/PHP/PHP-Applications-on-IIS---WordPress " PHP Applications on IIS - WordPress") for installing PHP/WordPress on IIS 6.0. You may also want to [install FastCGI](http://www.iis.net/fastcgi/configuration " Configuring FastCGI Extension for IIS6.0 and IIS5.1"), I recommend this, but it is optional.

#### Step 3 - Setting Up the URL Rewriter and Reverse Proxy Rules

The criteria for the requests are put inside the URL Rewriter Rules files. But before the proxy request is made, I must check to make sure the file being requested doesn't already exist on the frontend server. If it does exist on the frontend server I don't want to make a reverse proxy request. The following is the code used to do that.

```
# any file that exists just return it  
RewriteCond %{REQUEST_FILENAME} -f  
RewriteRule ^(.*) $1 [L]
```

Then after I check to make sure the file doesn't exist on the frontend server I make the request to the backend using the following rules.

```
# proxy all connections through to the backend server  
RewriteRule ^(/[0-9]{4}/.*) http://backend/index.php$1 [P]  
RewriteRule ^(/tags/.*) http://backend/index.php$1 [NC,P]  
RewriteRule ^(/topics/.*) http://backend/index.php$1 [NC,P]  
RewriteRule ^(/author/.*) http://backend/index.php$1 [NC,P]  
RewriteRule ^(/comments/feed/.*) http://backend/index.php$1 [NC,P]  
RewriteRule ^(/page/.*) http://backend/index.php$1 [NC,P]  
RewriteRule ^(.*) http://backend$1 [P]
```

### Conclusions

To get the exact same setup as I have, you will need the following software, which is all free for download:

- [Managed Fusion URL Rewrite and Reverse Proxy](http://www.managedfusion.com/products/download.aspx#url-rewriter)
- [GoDaddy Virtual Dedicated Windows Server](https://www.godaddy.com/gdshop/hosting/virtual.asp?ci=9013&display=virtual)
- [FastCGI for IIS 6.0](http://www.microsoft.com/downloads/details.aspx?FamilyID=2d481579-9a7c-4632-b6e6-dee9097f9dc5&displaylang=en)
- [PHP 5.2+ for Windows](http://us2.php.net/get/php-5.2.5-nts-Win32.zip/from/a/mirror)
- [Latest Version of WordPress](http://wordpress.org/download/)
- [MySQL 5.0+](http://dev.mysql.com/downloads/mysql/5.0.html#win32)

As always if you have any questions about the setup or the performance please post them below in the comments and I will answer them and or update the post as needed.

Happy Coding.