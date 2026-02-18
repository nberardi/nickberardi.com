---
title: "Track Cookie Usage with a Web Service via AJAX"
date: 2007-03-08T08:01:11-05:00
slug: "track-cookie-usage-with-a-web-service-via-ajax"
draft: false
tags:
  - "Google"
  - "Search Engine"
  - "SEO"
description: "Many of the modern and sophisticated traffic monitoring software can track everything from number of visits, where a visitor came from, what search terms..."
---

Many of the modern and sophisticated traffic monitoring software can track everything from number of visits, where a visitor came from, what search terms were used to find your site, where the visitor came from geographically, to what type of browser they are using on what platform.

Many of the JavaScript based solutions such as [Google Analytics](http://www.google.com/analytics/) offer much more information about the browser than ones that sit between the web and the web server such as [AWStats](http://awstats.sourceforge.net/). This is because there is much more information provided via JavaScript about the screen resolution and color depth, however the down side is that if JavaScript is disabled you don't get any information. So it is usually a wise idea to use a combination of both Client and Server based traffic monitoring.

However one feature that they all seem to lack is tracking if a user has cookies enabled on their browser. For the life of me I cannot understand why this is the case for the JavaScript based Client side solutions. So I developed a small web service in .NET that allowed me to track this information via an AJAX call. You can accomplish the same thing with about an hour of your time and the [ASP.NET AJAX Library](http://ajax.asp.net/) provided by [Microsoft](http://microsoft.com).

First you need to create a web service called CookieSupport.asmx with the following code.

```
using System;  
using System.IO;  
using System.Web.Services;  
using System.ComponentModel;

using Microsoft.Web.Script.Services;

namespace CookieTest  
{
    /// 
    /// Summary description for CookieSupport
    /// 
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    [ScriptService]
    public class CookieSupport : System.Web.Services.WebService
    {
        [WebMethod]
        public void Supported(bool supported)
        {
            using (StreamWriter writer = File.CreateText("c:results.txt"))
            {
                writer.WriteLine(@"----------------------------------------
IPAddress = {0}  
Cookies Supported = {1}  
Location = {2}  
Browser = {3}",  
                   Context.Request.UserHostAddress,
                   supported,
                   Context.Request.Url,
                   Context.Request.UserAgent
                );
                writer.Flush();
                writer.Close();
            }
        }
    }
}
```

Second you need to add the script manager to the body.

```
    <asp:ScriptManager id="scriptManager" runat="server">
        <Services>
            <asp:ServiceReference Path="CookieSupport.asmx" />
        </Services>
    </asp:ScriptManager>
```

Last you need to add the following script in the head of your website.

```
// POST cookie support of browser back to web service
function PostCookiesSupport()  
{
    var cookieEnabled = navigator.cookieEnabled;

    //if not IE4+ nor NS6+
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
        document.cookie = "testcookie"
        cookieEnabled = (document.cookie.indexOf("testcookie")!=-1)? true : false
    }

    CookieTest.CookieSupport.Supported(cookieEnabled);
}
```

You may have noticed that `CookieTest.CookieSupport.Supported(cookieEnabled);` is the same namespace as the C# web service I listed in the first step. They took the idea of C# namespaces and translated it in to JavaScript to make it easy to remember and call.   
This is facilitated though the [ScriptServiceAttribute](http://ajax.asp.net/docs/mref/T_System_Web_Script_Services_ScriptServiceAttribute.aspx) which creates a JavaScript file that is imported into your website, that is based on the methods of the WebService. You can view this generated JavaScript by visiting `http://www.yoursite.com/CookieSupport.asmx/js`, I have also included it below:

```
Type.registerNamespace('CookieTest');  
CookieTest.CookieSupport=function() {  
this._timeout = 0;  
this._userContext = null;  
this._succeeded = null;  
this._failed = null;  
}
CookieTest.CookieSupport.prototype={  
Supported:Sys.Net._WebMethod._createProxyMethod(this,"Supported", "CookieTest.CookieSupport.Supported",false,"supported"),_get_path: function() { return CookieTest.CookieSupport.get_path(); },  
    set_timeout: function(value) { this._timeout = value; },
    get_timeout: function() { return this._timeout; },
    set_defaultUserContext: function(value) { this._userContext = value; },
    get_defaultUserContext: function() { return this._userContext; },
    set_defaultSucceededCallback: function(value) { this._succeeded = value; },
    get_defaultSucceededCallback: function() { return this._succeeded; },
    set_defaultFailedCallback: function(value) { this._failed = value; },
    get_defaultFailedCallback: function() { return this._failed; }
}
CookieTest.CookieSupport._staticInstance = new CookieTest.CookieSupport();  
CookieTest.CookieSupport.set_path = function(value) { CookieTest.CookieSupport._staticInstance._path = value; }  
CookieTest.CookieSupport.get_path = function() { return CookieTest.CookieSupport._staticInstance._path; }  
CookieTest.CookieSupport.set_timeout = function(value) { CookieTest.CookieSupport._staticInstance._timeout = value; }  
CookieTest.CookieSupport.get_timeout = function() { return CookieTest.CookieSupport._staticInstance._timeout; }  
CookieTest.CookieSupport.set_defaultUserContext = function(value) { CookieTest.CookieSupport._staticInstance._userContext = value; }  
CookieTest.CookieSupport.get_defaultUserContext = function() { return CookieTest.CookieSupport._staticInstance._userContext; }  
CookieTest.CookieSupport.set_defaultSucceededCallback = function(value) { CookieTest.CookieSupport._staticInstance._succeeded = value; }  
CookieTest.CookieSupport.get_defaultSucceededCallback = function() { return CookieTest.CookieSupport._staticInstance._succeeded; }  
CookieTest.CookieSupport.set_defaultFailedCallback = function(value) { CookieTest.CookieSupport._staticInstance._failed = value; }  
CookieTest.CookieSupport.get_defaultFailedCallback = function() { return CookieTest.CookieSupport._staticInstance._failed; }  
CookieTest.CookieSupport.set_path("/CookieSupport.asmx");  
CookieTest.CookieSupport.Supported= function(supported,onSuccess,onFailed,userContext) {CookieTest.CookieSupport._staticInstance.Supported(supported,onSuccess,onFailed,userContext); }
```

This came in very useful for me tracking the number of users that have cookies enabled. This may come in very useful for anybody else who wants to join their client side script via AJAX with a web service. This new technology in ASP.NET has limitless possibilities of joining your existing web services with the client side browser with out having to refresh the content of your page with each and every call that needs to be made.

As always happy coding.