---
title: "Using Distributed Transactions in your Data Layer"
date: 2007-03-16T04:59:32-05:00
slug: "using-distributed-transactions-in-your-data-layer"
draft: false
tags:
  - ".NET"
  - "Database"
  - "Framework 2.0"
  - "Microsoft"
  - "Performance"
  - "Security"
  - "SQL Server"
description: "Many developers use a pattern called ORM or Object Relation Mapping to generate data layers for their application. Many other developers choose to create..."
---

Many developers use a pattern called ORM or [Object Relation Mapping](http://en.wikipedia.org/wiki/Object-relational_mapping) to generate data layers for their application. Many other developers choose to create their own data layers by hand. I have done both and I don't have a preference of one over the other. With an ORM generator you have an easy to maintain data layer for your applications, when you create one by hand you have much more control of the data layer as far as object creation goes.

Most of the time a business layer will access the data layer in order to provide rules and logic to how the data objects in the data layer are accesses or relate to each other. An example of of how a business layer might relate to data layer is the following. You have a Sales table, a Products table, and a Customers table and objects for each of those in the data layer. In the business layer you may just have an object that is called Checkout that decrements the quantity in the Product table, and then combines the products and customer in the Sales table.

Data integrity is very important in applications like this, you cannot have a sale that is half complete because the revenue numbers would be off for the store. So one problem with keeping all these tables in separate objects is that it is hard to use some of the nice features that SQL provides, like [Transactions](http://msdn2.microsoft.com/en-us/library/ms190612.aspx).

> **Transactions:**
> A transaction is a sequence of operations performed as a single logical unit of work. A logical unit of work must exhibit four properties, called the atomicity, consistency, isolation, and durability (ACID) properties, to qualify as a transaction.
> **Properties of a transaction:**
>
> - **Atomicity:**A transaction must be an atomic unit of work; either all of its data modifications are performed, or none of them is performed.
> - **Consistency:**When completed, a transaction must leave all data in a consistent state. In a relational database, all rules must be applied to the transaction's modifications to maintain all data integrity. All internal data structures, such as B-tree indexes or doubly-linked lists, must be correct at the end of the transaction.
> - **Isolation:**Modifications made by concurrent transactions must be isolated from the modifications made by any other concurrent transactions. A transaction either recognizes data in the state it was in before another concurrent transaction modified it, or it recognizes the data after the second transaction has completed, but it does not recognize an intermediate state. This is referred to as serializability because it results in the ability to reload the starting data and replay a series of transactions to end up with the data in the same state it was in after the original transactions were performed.
> - **Durability:**After a transaction has completed, its effects are permanently in place in the system. The modifications persist even in the event of a system failure.

**Creating Distributed Transactions:**

A new feature introduced in the .NET Framework 2.0 is the [*System.Transactions*](http://msdn2.microsoft.com/en-us/library/system.transactions.aspx) namespace, which provides support for transactions across different types of transaction managers, which include data sources and message queues. The *System.Transactions* namespace defines the *[TransactionScope](http://msdn2.microsoft.com/en-us/library/system.transactions.transactionscope.aspx "System.Transaction.TransactionScope")* class, which automatically manages transactions for you.

To create and use transactions, create a *TransactionScope* block, and specify whether you want to create a new transaction context or enlist in an existing transaction context. You can also exclude operations from a transaction context if appropriate.

You can call multiple data layer objects, which really creates multiple database connection within the same transaction scope. The transaction scope decides whether to create a local transaction or a distributed transaction. The transaction scope, automatically promotes a local transaction to a distributed transaction if necessary, based on the following rules:

- When you create a *TransactionScope* object, it initially creates a local, lightweight transaction. Lightweight transactions are more efficient than distributed transactions because they do not have the overhead of the Microsoft Distributed Transaction Coordinator (DTC).
- For **SQL Server 2005** databases the first connection that you open in a transaction is automatically set as a local transaction. The resource manager then works with the *System.Transactions* namespace and supports automatic promotion of local transactions to distributed transactions when additional connections are created in the transaction scope.
- For **Non SQL Server 2005** database the first connection that you open is automatically promoted to a distributed transaction. This promotion occurs because the resource managers for these *Non SQL Server 2005* databases do not support automatic promotion from local to distributed transactions.

**Integrating Transactions Into Your Code**   
So now that we have gone over what a transaction is and the different types of transactions that .NET can use depending on the database you are connecting too. Lets get to an actual example. We will once again use our example of the Store that needs to make a sales and deduct those quantities from the database.

```
public class ShoppingCart  
{
    public Customer Customer { get; }

    public Product[] Products { get; }

    public bool Checkout ()
    {
        try
        {
            // create the transaction scope to guarantee that all the data gets committed to the database
            using (TransactionScope scope = new TransactionScope())
            {
                // create the sale
                Sale sale = new Sale();
                sale.Customer = this.Customer;

                // save the sale to the database
                sale.Save();

                decimal cost = 0.0M;

                foreach(Product p in Products)
                {
                    SaleItem item = new SaleItem();
                    item.SaleId = sale.SaleId;
                    item.ProductId = p.ProductId;

                    // subtract one item from quantity
                    p.QuantityInStock--;

                    // save the product quantity update to the database
                    p.Save();

                    // add cost of product
                    cost += p.Cost;

                    // save item to database
                    item.Save();
                }

                sale.Cost = cost;

                // save the sale so the cost is reflected in the database
                sale.Save();

                // commit all database changes to database
                // if complete is not called, due to an exception from the code above, the transaction is rolled back
                scope.Complete();
            }
        }
        catch (Exception exc)
        {
            Debug.Write(exc.ToString());
        }
    }
}
```

What is happening above is two sales commits and a commit for each product. If any of the lines above the `scope.Complete()` were to throw an exception the TransactionScope using block would immediately exit and the database saves would be rolled back. Like I mentioned before this is done to keep the integrity of the data in the database intact. For instance if I never made it to the part where I updated the `sale.Cost` the revenue for the store would be out of whack.

Stay tuned I plan on documenting more of the new features coming in .NET 3.0 and .NET 3.5. I hope this post was informative.