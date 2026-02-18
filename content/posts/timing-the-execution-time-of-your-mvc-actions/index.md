---
title: "Timing The Execution Time Of Your MVC Actions"
date: 2010-10-26T13:00:06-05:00
slug: "timing-the-execution-time-of-your-mvc-actions"
draft: false
tags:
  - "Performance"
  - "ActionFilter"
  - "asp.net mvc"
description: "I recently had the need to find out how much time elapsed during the execution of just my action, so I created a handy little action filter based on..."
---

I recently had the need to find out how much time elapsed during the execution of just my action, so I created a handy little action filter based on *System.Diagnostics.Stopwatch*.  This action filter adds the elapsed time to an HTTP header, appropriately named, *X-Stopwatch*.

I choose to use a header instead of a response in the content body, so that it could be used both with non-HTML responses (binary, JSON, XML, etc) and HTML response.  I was amazed at the usefulness of this simple piece of code, because it instantly gave me insight in to the actual execution time of my action to see if my optimizations were having any effect.  It allowed me to monitor the execution time of code that I can specifically and easily control the performance of.

Here is the filter if you want to add it to your own projects.

```
public class StopwatchAttribute : ActionFilterAttribute  
{
    private Stopwatch _stopwatch;

    public StopwatchAttribute()
    {
        _stopwatch = new Stopwatch();
    }

    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        _stopwatch.Start();
    }

    public override void OnActionExecuted(ActionExecutedContext filterContext)
    {
        _stopwatch.Stop();

        var httpContext = filterContext.HttpContext;
        var response = httpContext.Response;

        response.AddHeader("X-Stopwatch", _stopwatch.Elapsed.ToString());
    }
}
```

You can [view the full C# File here on my GitHub repository](http://github.com/managedfusion/managedfusion-web/blob/master/Source/Web/Mvc/StopwatchAttribute.cs).  This could obviously be modified to suit your own needs.