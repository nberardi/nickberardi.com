---
title: "Sometimes a nanosecond makes all the difference"
date: 2012-09-20T16:54:43-05:00
slug: "sometimes-a-nanosecond-makes-all-the-difference"
draft: false
tags:
  - "Cassandra"
description: "In the Cassandra database there is a type known as TimeUUID. Which I have talked about a couple times on my blog and even created a pretty well received..."
---

In the Cassandra database there is a type known as TimeUUID. Which I have [talked about](http://coderjournal.com/2010/04/creating-a-time-uuid-guid-in-net/) [a couple times](http://coderjournal.com/2010/05/timeuuid-only-makes-sense-with-version-1-uuids/) on my blog and even [created a pretty well received class for generating them](https://gist.github.com/3759706). This type is typically used for log data, because it helps you create a unique value in the database that has an extractable timestamp. Because of how .NET creates `DateTime.Now` you rarely get a resolution smaller than a millisecond in the DateTime, even though DateTime supports a notion of a tick which is equivalent to 100 nanoseconds or 1/10,000 of a millisecond. As you can see there is plenty of room for more resolution, and this extra room not being used causes pain when you need a resolution smaller than milliseconds, which many high performance logging situations demand, so that all your log entries are put in order especially when you are receiving more than one in a millisecond time span.

So you may be asking yourself what does this have to do with Cassandra and TimeUUID.  Well [it was brought up to me today](https://github.com/managedfusion/fluentcassandra/issues/66) that because of the limitations of DateTime duplicate TimeUUID were being created in [FluentCassandra](https://github.com/managedfusion/fluentcassandra), which is obviously not something you want to see for a value that claims it self to be unique.  So today I set out to provide more resolution to the DateTime type, so that FluentCassandra could create unique TimeUUID's using tick resolution instead of millisecond resolution.

And I call my creation, aptly, `DateTimePrecise`.

```
public class DateTimePrecise  
{
    private const long TicksInOneSecond = 10000000L;

    private readonly double _syncSeconds;
    private readonly Stopwatch _stopwatch;
    private DateTimeOffset _baseTime;

    public DateTimePrecise(int syncSeconds)
    {
        _syncSeconds = syncSeconds;
        _stopwatch = new Stopwatch();

        Syncronize();
    }

    private void Syncronize()
    {
        lock (_stopwatch) {
            _baseTime = DateTimeOffset.UtcNow;
            _stopwatch.Restart();
        }
    }

    public DateTimeOffset GetUtcNow()
    {
        var elapsedSeconds = _stopwatch.ElapsedTicks / (double)Stopwatch.Frequency;

        if (elapsedSeconds > _syncSeconds) {
            Syncronize();
            return _baseTime;
        }

        var elapsedTicks = Convert.ToInt64(elapsedSeconds * TicksInOneSecond);
        return _baseTime.AddTicks(elapsedTicks);
    }
}
```

DateTimePrecise uses the `Stopwatch` class which operates based your CPU's frequency or clockrate. So you get very accurate measurements using Stopwatch. A very accurate measurement is exactly what we needed for our precise times. To create the precise time we create a base time of when the Stopwatch was started and then when the time is requested we add the elapsed time of the Stopwatch onto the base time. And this process is sycronized (or in other words reset) at defined intervals, so that the precise date time doesn't diverge too radically from the system time.

You can find the [source code for the above `PreciseDateTime` class here](https://gist.github.com/3759754), which also includes some static helper methods so that you can just use the class and not have to worry about instantiating it, same way you do with `DateTime.Now`. A special thanks James Michael Hare needs to be made because [his blog post](http://geekswithblogs.net/BlackRabbitCoder/archive/2012/01/12/c.net-little-pitfalls-stopwatch-ticks-are-not-timespan-ticks.aspx) inspired this class. Specifically the part where he shows the radical difference in precision between `TimeSpan` and the actual resolution of the Stopwatch.

> For those interested, you can convert from Stopwatch ticks to seconds by using the Stopwatch.Frequency static property, which tells you the ration of Stopwatch ticks per second. Thus these two are (roughly, due to precision differences) the same:
>
> ```
> // take the ElapsedTicks, then divide by Frequency to get seconds  
> Console.WriteLine("ElapsedTicks to sec:  {0}", sw.ElapsedTicks / (double)Stopwatch.Frequency);
>
> // take the Elapsed property, and query total number of seconds it represents
> Console.WriteLine("Elapsed.TotalSeconds: {0}", sw.Elapsed.TotalSeconds);
> ```
>
> Which gives us results (on my machine) like:
>
> ```
> ElapsedTicks to sec:  4.9998583024032  
> Elapsed.TotalSeconds: 4.9998583
> ```

**Wow...** look at those numbers they represent the exact same number, but there is an extra 6 digits of resolution on the `ElapsedTicks`.

I hope you find use in `DateTimePrecise`, and it will be released with the next release of [FluentCassandra to NuGet](http://nuget.org/packages/fluentcassandra).