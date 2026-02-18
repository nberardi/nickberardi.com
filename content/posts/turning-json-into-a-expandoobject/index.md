---
title: "Turning JSON into a ExpandoObject"
date: 2010-07-19T07:06:21-05:00
slug: "turning-json-into-a-expandoobject"
draft: false
tags:
  - "DLR"
  - "Dynamic"
  - ".NET 4.0"
description: "Recently I had the need for a web service of mine to take a JSON blob as an input. This isn’t really exciting or all that interesting a problem, but I..."
---

Recently I had the need for a web service of mine to take a JSON blob as an input.  This isn’t really exciting or all that interesting a problem, but I really didn’t enjoy the code smell that came from drilling in to the resulting Dictionary object that comes from desterilizing the JSON object into something that .NET understands.

```
public ActionResult Create()  
{
    IDictionary<string, object> request;

    using (var bodyStream = new StreamReader(Request.InputStream))
    {
        var json = bodyStream.ReadToEnd();

        JavaScriptSerializer ser = new JavaScriptSerializer();
        request = ser.Deserialize<IDictionary<string, object>>(json);
    }

    var accountRequest = request["account"] as IDictionary<string, object>;
    var billingRequest = request["billing"] as IDictionary<string, object>;
    var billingInfoRequest = billingRequest["info"] as IDictionary<string, object>;
    var billingInvoiceRequest = billingRequest["invoice"] as IDictionary<string, object>;
    var billingItemsRequest = billingRequest["items"] as IDictionary<string, object>;

    // create account
    var account = new Account {
        CreatedOn = DateTime.UtcNow,
        Email = accountRequest["email"] as string,
        Name = accountRequest["company"] as string,
        UserName = request["user_name"] as string
    };

    // ... more code using the dictionary object
}
```

After remembering that the **[ExpandoObject](http://msdn.microsoft.com/en-us/library/system.dynamic.expandoobject.aspx)** was also based on **IDictionary<string, object>** I thought it might be a marriage met in heaven.

> The ExpandoObject class enables you to add and delete members of its instances at run time and also to set and get values of these members. This class supports dynamic binding, which enables you to use standard syntax likesampleObject.sampleMember instead of more complex syntax like sampleObject["sampleMember"].

Since I won’t know what the JSON will actually look like until it is passed in to the web service, and I really don’t want to create different objects just for the sake of making a temp pass through object from JSON to my app code, the use of the *ExpandoObject* is great because it helps keep my code clean looking and more readable.  Because as a developer I don’t really care that the data is coming in as JSON, all that I really care about is the data it self.  So my aim is to simplify my life and the readability of my code.

The first thing I usually do when creating an API is write a reference application, or in other words use a test driven approach when starting to write a new API.  I started with the following reference code:

```
public ActionResult Create()  
{
    dynamic request;    

    using (var bodyStream = new StreamReader(Request.InputStream))
    {
        var json = bodyStream.ReadToEnd();

        JavaScriptSerializer ser = new JavaScriptSerializer();
        var dictionary = ser.Deserialize<IDictionary<string, object>>(json);
        var request = dictionary.Expando();
    }

    var account = new Account {
        CreatedOn = DateTime.UtcNow,
        Email = request.account.email,
        Name = request.account.company,
        UserName = request.account.user_name
    };

    // ... more code using the expando object
}
```

This seems much cleaner doesn’t it?  Now let me so you the **Expando** extension method that I created to accomplish this.  It is relatively straight forward I take an *IDictionary<string, object>* object and copy it into an *ExpandoObject* object, which is also implements *IDictionary<string, object>*.  So the copying from one to the other is pretty straight forward for the most part.

```
public static ExpandoObject Expando(this IDictionary<string, object> dictionary)  
{
    var expando = new ExpandoObject();
    var expandoDic = (IDictionary<string, object>)expando;

    foreach (var item in dictionary)
    {
        bool alreadyProcessed = false;

        if (item.Value is IDictionary<string, object>)
        {
            expandoDic.Add(item.Key, Expando((IDictionary<string, object>)item.Value));
            alreadyProcessed = true;
        }
        else if (item.Value is ICollection)
        {
            var itemList = new List<object>();
            foreach (var item2 in (ICollection)item.Value)
                if (item2 is IDictionary<string, object>)
                    itemList.Add(Expando((IDictionary<string, object>)item2));
                else
                    itemList.Add(Expando(new Dictionary<string, object> { { "Unknown", item2 } }));

            if (itemList.Count > 0)
            {
                expandoDic.Add(item.Key, itemList);
                alreadyProcessed = true;
            }
        }

        if (!alreadyProcessed)
            expandoDic.Add(item);
    }

    return expando;
}
```

Not as straight forward as a *foreach* loop, but not totally out of the question for something that you couldn’t read and understand in about 10 minutes.

This may add a slight bit of overhead between the coping of one dictionary into another, and the use of the dynamic runtime, but I think the over all ease in readability is more of a productivity gain than the slight bit of overhead that was gained.