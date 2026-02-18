---
title: "World Of HTTP/1.1 Status Codes"
date: 2007-04-23T22:30:48-05:00
slug: "world-of-http11-status-codes"
draft: false
tags:
  - "HTTP"
  - "Search Engine"
  - "SEO"
  - "Status Codes"
description: "In a follow up to my previous post on Proper URL Construction, I am going to dive more deeply in to the Status Codes that control the redirects that were..."
---

In a follow up to my previous post on Proper URL Construction, I am going to dive more deeply in to the Status Codes that control the redirects that were talked about in [my previous article](http://www.coderjournal.com/2007/04/a-guide-to-proper-url-construction/ "A Guid To Proper URL Construction").

Most developers are familiar with the HTTP 1.0 Status Codes, that have been recently popularized by the [SEO](http://www.google.com/search?q=define:SEO) guys. We have all heard that you should use *301 Moved Permanently* instead of *302 Temporary Redirect*. What many of the SEO guys won't tell you, because they don't know any better, is that they are using the [RFC 1945](http://tools.ietf.org/html/rfc1945 "Hypertext Transfer Protocol -- HTTP/1.0") HTTP/1.0 Standard that was released in May 1996, that is right it is about 12 years old. The newest HTTP/1.1 Standard, [RFC 2616](http://tools.ietf.org/html/rfc2616 "Hypertext Transfer Protocol -- HTTP/1.1"), was released in June 1999, and made some pretty drastic changes the the 3xx Redirect Status Codes. The goal of this post is to inform and familiarize developers with the HTTP/1.1 Standard, specifically the 3xx Redirect Status Code changes. This can have drastic effect on how you handle requests on your website and optimize your site for search engines.

### History

In the middle-to-late 1990's [302 Moved Temporarily](http://tools.ietf.org/html/rfc1945#section-9.3) was the most popular redirect code, but also an example of industrial practice contradicting the standard. HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"), but popular browsers implemented it as though it was a [303 See Other](http://tools.ietf.org/html/rfc2616#section-10.3.4).

> **Note from [302 Found](http://tools.ietf.org/html/rfc2616#section-10.3.3):** [RFC 1945](http://tools.ietf.org/html/rfc1945) and [RFC 2068](http://tools.ietf.org/html/rfc2068) specify that the client is not allowed to change the method on the redirected request. However, most existing user agent implementations treat 302 as if it were a 303 response, performing a GET on the Location field-value regardless of the original request method. The status codes 303 and 307 have been added for servers that wish to make unambiguously clear which kind of reaction is expected of the client.

Therefore, HTTP/1.1 added status codes 303 and 307 to disambiguate between the two behaviors. However, majority of Web applications and frameworks still use the 302 status code as if it were the 303.

### Proper Use of HTTP Redirects

The next part will be a guide of the conditions that should be met in order to use the specific redirect.

#### 301 Moved Permanently

- The URL (or page) is going to permanently reside in a differently location
- The domain should always be displayed a certain way, (i.e. This domain is always displayed as [coderjoural.com](http://www.coderjournal.com), so any traffic to [www.coderjournal.com](http://www.coderjournal.com) gets a 301 redirect to [coderjoural.com](http://www.coderjournal.com)).
- This should be used for most static redirects that are not generated programmatically.
- **\*NEW\*** This status was mostly designed to be used with GET and HEAD requests.

#### 303 See Other

- This is going to be the most common type of redirect that you want to use when you are programmatically changing where the user is located in your site during a POST back.
- Any time you want to redirect a user to another URL after a POST from a form has occurred (i.e. The visitor to your site registers with your site and after they are done registering you want to direct them back to the home page, this is when you would use a 303 redirect).
- **\*NEW\*** This status was designed to be used with POST requests specifically, so it should not be used for GET or HEAD requests.

#### 307 Temporary Redirect

- Anytime that you want to put up a temporary page (i.e. your site is under construction and you want all traffic temporarily redirected to a static HTML page).
- **\*NEW\*** This should be used when you want to redirect a GET request to different location each time the URL is requested.
- **\*NEW\*** This should be not be used with POST requests, because of this statement in the specification:
  > the user agent MUST NOT automatically redirect the request unless it can be confirmed by the user, since this might change the conditions under which the request was issued.

#### 302 Found

- Use this for any condition not met above.
- This should be used sparingly because there is a search engine penalty if used too much, because of some spammers that used an Exploit called [Page Hijacking](http://www.seoconsultants.com/articles/1000/pagejacking.asp "The 302 Page Hijacking Exploit").
- This is sort of the antithesis to [404](http://tools.ietf.org/html/rfc2616#section-10.4.5) [Not Found](http://en.wikipedia.org/wiki/HTTP_404 "HTTP 404") and should be used in a similar way. So if you have a page that is referenced but no longer exists, but you do not want to return a 404 and just redirect the user to a random (not static as defined in a 301) site you would use a 302 redirect. (note this argument is very weak and there is very little reason in a HTTP/1.1 world to use a 302 redirect)
- **\*NEW\*** This status should be used during GET requests for any semi-static URL's that may change in the future, but don't change with each and every request. A good example of this on Coder Journal is my Essential Software Every Developer Needs which I publish annually, and is located at <http://www.coderjournal.com/essential-software/>. It changes but it only changes once a year, so it is semi-static in terms of the internet.
- **\*NEW\*** The **302 Found** falls right between **301 Moved Permanently** and **307 Temporary Redirect** in terms of how permanent the URL is for GET requests.

An example of an HTTP Redirect Response will look something like the following, this was take from my own site when somebody queries [www.coderjournal.com](http://www.coderjournal.com):

```
HTTP/1.1 301 Moved Permanently  
Date: Tue, 24 Apr 2007 18:12:55 GMT  
Server: Apache  
Location: http://www.coderjournal.com/  
Keep-Alive: timeout=15, max=99  
Connection: Keep-Alive  
Transfer-Encoding: chunked  
Content-Type: text/html; charset=iso-8859-1131
```

If you would like to learn more about how to perform these redirects, that I have talked about above, in your favorite language please read this [article](http://www.stevenhargrove.com/redirect-web-pages/ "How to redirect a web page, the smart way") from Steven Hargrove.

**Update (2008-5-20):** I have updated my understanding of the different types of redirects that developers may want to use. See above for my new understandings.