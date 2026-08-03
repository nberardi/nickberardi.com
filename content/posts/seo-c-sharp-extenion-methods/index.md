---
title: "SEO and C# Extention Methods"
date: 2007-12-07T11:04:29-05:00
slug: "seo-c-sharp-extenion-methods"
draft: false
tags:
  - ".NET"
  - "Framework 3.5"
  - "SEO"
description: "I previously talked about the importance of using the correct kind of redirect to optimize your website for search engines in an article titled. World Of..."
---

I previously talked about the importance of using the correct kind of redirect to optimize your website for search engines in an article titled. [World Of HTTP/1.1 Status Codes](http://www.coderjournal.com/2007/04/world-of-http11-status-codes/). I just recently decided to create a C# Utility class to help me in this endeavor and to extended the far from complete HttpResponse.Redirect method. I am using a new C# 3.0 language extension called [Extension Methods](http://msdn2.microsoft.com/en-us/library/bb308966.aspx#csharp3.0overview_topic3). Basically what the extension method does is, it allows you to, add methods to types that you don't have the ability to modify, in my case the HttpResponse class.

I have created the following code to give me better control over my redirects in the HttpResponse class.

```
public static void Redirect(this HttpResponse response, int type, string url)  
{
    response.Clear();

    switch (type)
    {
        case 301:
            response.StatusCode = (int)HttpStatusCode.MovedPermanently;
            response.StatusDescription = "Moved Permanently";
            break;

        case 302:
            response.StatusCode = (int)HttpStatusCode.Found;
            response.StatusDescription = "Found";
            break;

        case 303:
            response.StatusCode = (int)HttpStatusCode.SeeOther;
            response.StatusDescription = "See Other";
            break;

        case 304:
            response.StatusCode = (int)HttpStatusCode.NotModified;
            response.StatusDescription = "Not Modified";
            break;

        case 307:
            response.StatusCode = (int)HttpStatusCode.TemporaryRedirect;
            response.StatusDescription = "Temporary Redirect";
            break;

        default:
            goto case 302;
    }

    response.RedirectLocation = url;

    response.ContentType = "text/html";
    response.Write("<html><head><title>Object Moved</title></head><body>");
    response.Write("<h2>Object moved to <a href=\"" + HttpUtility.HtmlAttributeEncode(url) + "\">here</a>.</h2>");
    response.Write("</body></html>");

    response.End();
}
```

So now in your code you don't have to jump through hoops to chance the StatusCode, StatusDescription, RedirectLocation, and ContentType, just so you can respond with a 301 Redirect instead of a 302 Redirect (the default for HttpResponse.Redirect and the most dangerous of the redirects from an SEO point of view). All that you need to have access to is the Response property from your Page or Context and you are good to go.

```
Response.Redirect(301, "http://www.coderjournal.com");
```

So that is all you need to do to give your self better control over your redirects in .NET. You can also use this same C# 3.0 Extension Methods for any object that you need to add a custom method on to.
