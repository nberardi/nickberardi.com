---
title: "RavenDB Sequential Number Generator"
date: 2012-01-19T04:40:53-05:00
slug: "ravendb-sequential-numbe-generator"
draft: false
tags:
  - "RavenDB"
description: "RavenDB has a great identity generator that is very fast to generate a new identity when you are inserting a ton of records at once. You can read more..."
---

RavenDB has a great identity generator that is very fast to generate a new identity when you are inserting a ton of records at once. You can read more about it here: <http://ravendb.net/documentation/docs-api-key-generation> and <http://codeofrob.com/archive/2010/05/16/ravendb-hilo-what-how-and-why.aspx>

However if you start and stop the RavenDB service, by restarting your computer, or recycling your app pool, the numbering of the identity generator skips, which for most people it really doesn't matter. However sometimes sequential numbers really matter, for example in an invoice number you don't want to skip a number because it can really screw up your accounting office?

So faced with this problem I created a method that made sure the sequence of numbers being returned was always in order, regardless of restarts to the RavenDB service. Before I get into the code lets first discuss the downsides to this code I am going to present.

- First and fore most this is going to be a lot slower than the Hilo system, because with each increment it syncs the number back to the database
- This code is only designed for one application to generate this number from RavenDB, this is because the lock that makes the sequential number possible is in the application, not RavenDB
- Last thing, and I am saying this because it needs to be repeated, this code is not designed if you need to insert a 100,000 records at once. If you need to do that you might want to come up with a better solution

```
private static readonly object GeneratorLock = new object();

private int NextAccountNumber()  
{
    lock (GeneratorLock)
    {
        using (new TransactionScope(TransactionScopeOption.Suppress))
        {
            while (true)
            {
                try
                {
                    var document = GetDocument();
                    if (document == null)
                    {
                        PutDocument(new JsonDocument {
                            Etag = Guid.Empty, // sending empty guid means - ensure the that the document does NOT exists
                            Metadata = new RavenJObject(),
                            DataAsJson = RavenJObject.FromObject(new { Current = 1}),
                            Key = "Raven/InvoiceNumber"
                        });
                        return 1;
                    }

                    int current;
                    current = document.DataAsJson.Value("Current");
                    current++;

                    document.DataAsJson["Current"] = current;
                    PutDocument(document);

                    return current;
                }
                catch (ConcurrencyException)
                {
                    // expected, we need to retry
                }
            }
        }
    }
}

private void PutDocument(JsonDocument document)  
{
    DocumentStore.DatabaseCommands.Put(
        "Raven/InvoiceNumber", 
        document.Etag,
        document.DataAsJson,
        document.Metadata);
}

private JsonDocument GetDocument()  
{
    return DocumentStore.DatabaseCommands.Get("Raven/InvoiceNumber");
}
```

If you see any changes that should be made, I have created a Gist with this code. <https://gist.github.com/1641384> Branch it and make your changes and share below in the comments.