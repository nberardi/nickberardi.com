---
title: "Control Google Bot With The New X-Robots-Tag"
date: 2007-07-31T19:26:57-05:00
slug: "control-google-bot-with-the-new-x-robots-tag"
draft: false
tags:
  - "Google"
  - "Search Engine"
  - "SEO"
  - "Better Coding"
description: "Google has extended its support for Google Bot restriction by giving us web developers a new tool to stick in our belt. It was announced today on the..."
---

Google has extended its support for Google Bot restriction by giving us web developers a new tool to stick in our belt. It was [announced today on the Google Blog](http://googleblog.blogspot.com/2007/07/robots-exclusion-protocol-now-with-even.html "Robots Exclusion Protocol: now with even more flexibility") that you can now control access to your non-HTML files on your website with a simple header. The header X-Robots-Tag will allow you to do everything the normal Robots Meta tag will, but now you can do it for the PDF, Word, Image, and any other document you can think of that is served via HTTP. They also announced on the same post a new type of exclusion cause that lets you set when the document will be unavailable, see below for more information on this new feature as well as currently supported ones for use with X-Robots-Tag:

- **INDEX|NOINDEX** - Tells whether the page may be indexed or not
- **FOLLOW|NOFOLLOW** - Tells whether crawlers may follow links provided on the page or not
- **ALL|NONE** - ALL = INDEX, FOLLOW (default), NONE = NOINDEX, NOFOLLOW
- **NOODP** - tells search engines not to use page titles and descriptions from the ODP on their SERPs.
- **NOYDIR** - tells Yahoo! search not to use page titles and descriptions from the Yahoo! directory on the SERPs.
- **NOARCHIVE** - Google specific, used to prevent archiving (cached page copy)
- **NOSNIPPET** - Prevents Google from displaying text snippets for your page on the SERPs
- **UNAVAILABLE\_AFTER**: [RFC 850](http://www.ietf.org/rfc/rfc0850.txt) formatted timestamp - Removes an URL from Google's search index a day after the given date/time

So how can X-Robots-Tags help you better control the content that is indexed by Google? Well you can now tell the Google Bot that you do not want specific non-HTML documents like PDF, Word, and Image documents that you don't want them cached on the Google Server or that a paper you have released on your website in PDF format should only be good until a specific date. So now you just need to force you server to include an addition X-Robots-Tag in the header which can be done with any of the modern languages and server, the header would look something like this:

```
Date: Tue, 31 Jul 2007 21:41:38 GMT  
Server: Apache/1.3.37 (Unix) PHP/4.4.4  
X-Powered-By: PHP/4.4.4  
X-Robots-Tag: index, noarchive, nosnippet  
Connection: close  
Transfer-Encoding: chunked  
Content-Type: application/pdf
```

You can do this with anything that can be served over HTTP now, so this is a huge boost for any of us control freaks that like to have our content easily organized and controlled on what is searchable on Google.