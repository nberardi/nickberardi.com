---
title: "With Each Step Forward, Microsoft Takes Two Back"
date: 2010-08-09T02:09:54-05:00
slug: "with-each-step-forward-microsoft-takes-two-back"
draft: false
tags:
  - "Microsoft"
  - "Razor"
  - "WebMatrix"
  - "Bad Programming"
description: "Today I was browsing a Microsoft published document on creating ASP.NET Web Pages using the Razor Syntax and to my surprise I found this gem on page..."
---

Today I was browsing a Microsoft published document on creating [ASP.NET Web Pages using the Razor Syntax](http://download.microsoft.com/download/6/f/2/6f27f25a-4c21-4e01-bcdd-28cac2dca81c/aspnetwebpageswithrazorsyntax_book_beta.pdf) and to my surprise I found this gem on page 65.

```
 @{  
    var db = Database.OpenFile("SmallBakery.sdf"); 
    var selectQueryString = "SELECT * FROM Products ORDER BY Name"; 
 } 
<!DOCTYPE html> 
<html> 
  <head> 
    <title>Small Bakery Products</title> 
    <style> 
        h1 {font-size: 14px;} 
        table, th, td { 
          border: solid 1px #bbbbbb; 
          border-collapse:collapse; 
          padding:2px; 
        } 
     </style> 
  </head> 
  <body> 
    <h1>Small Bakery Products</h1> 
    <table> 
        <thead> 
            <tr> 
                <th>Id</th> 
                <th>Product</th> 
                <th>Description</th> 
        <th>Price</th> 
            </tr> 
        </thead> 
        <tbody> 
            @foreach (var row in db.Query(selectQueryString)){ 
             <tr> 
                <td>@row.Id</td> 
                    <td>@row.Name</td> 
                    <td>@row.Description</td> 
                    <td>@row.Price</td> 
             </tr> 
            } 
        </tbody> 
    </table> 
  </body> 
</html>
```

In case you missed it here is the meat of the problem I have with this example:

```
@{  
    var db = Database.OpenFile("SmallBakery.sdf"); 
    var selectQueryString = "SELECT * FROM Products ORDER BY Name"; 
 }
```

This is in direct relation with Microsoft’s latest attempt to make programming easier for bad software developers.  Ayende probably put it best in his article entitled “[Microsoft.Data and Positioning](http://ayende.com/Blog/archive/2010/08/04/microsoft.data-and-positioning.aspx)” when he said:

> If Microsoft thinks that they can get the market for bad developers, good for them. But that needs to be highly segmented. It should be *clear* that going with that route is leading you to a walled garden and that writing real apps this way is *not* good. The best comparison I can think of is Access apps in the 90s. There was a clear separation between “just wanna write some forms over data app over the weekend” and “I want to build a real application”. When you built an app in Access, you had very clear idea about the limitations of the application, and you knew that if you wanted something more, it would be a complete re-write.
>
> That was a *good* thing, because it meant that you could do the quick & dirty things, but when things got messy, you knew that you had to make the jump.
>
> **The problem with things like Microsoft.Data is that there is no such line in the sand. And when you call it “Microsoft.\*” you give it a seal of approval for *everything*. And when you have a piece of code that is explicitly designed to support *bad coding practices*, it is like peeing in the pool.** If there is only one pool, it is going to affect everyone. There wouldn’t be nearly as much objection if it was called WebMatrix.Data, because that would clearly put it in someone else’s pool, and it that turn into a putrid swamp, I don’t really care.

I know proponents of this approach are going to say, it’s only an example to give a quick demonstration of how the Razor syntax works, and no good developer would take this seriously.  But I don’t know what land Microsoft lives in, because in my land examples like this are seen by both good developers and bad developers a like and examples like this quickly turn in to production apps.  Bad developers have the same deadlines as good programmers do, and bad developers don’t have the same forethought about the pains that come from bad coding practices, so they are more apt to take the example at face value and look at it as a good example of how they should be programming coming from Microsoft itself.

And don’t even get me started about handling your post back logic in the same page, and then doing an insert into the database that is found on page 68.

```
@{  
    var db = Database.OpenFile("SmallBakery.sdf"); 
    var Name = Request["Name"]; 
    var Description = Request["Description"]; 
    var Price = Request["Price"]; 

    if (IsPost) { 

        // Read product name. 
        Name = Request["Name"]; 
        if (Name.IsEmpty()) { 
            Validation.AddFieldError("Name", "Product name is required."); 
        } 

        // Read product description. 
        Description = Request["Description"]; 
        if (Description.IsEmpty()) { 
            Validation.AddFieldError("Description",  "Product description is required."); 
        } 

        // Read product price 
        Price = Request["Price"]; 
        if (Price.IsEmpty()) { 
            Validation.AddFieldError("Price", "Product price is required."); 
        } 

        // Define the insert query. The values to assign to the  
        // columns in the Products table are defined as parameters  
        // with the VALUES keyword. 
        if(Validation.Success) { 
            var insertQuery = "INSERT INTO Products (Name, Description, Price) VALUES (@0, @1, @2)"; 
            db.Execute(insertQuery, Name, Description, Price); 
            // Display the page that lists products. 
            Response.Redirect(@Href("~/ListProducts")); 
        } 
    } 
}
```

I shouldn’t have to explain what is wrong with this.  This is the way that PHP 3 and classic ASP developers use to construct pages over 10 years ago, which by the way is no longer recommended practice for either language.  PHP 5 now has classes and a couple very well accepted MVC frameworks, classic ASP is all but gone, and Ruby, with Ruby on Rails which is an MVC framework, has most of the mind share of dynamic languages at the time of writing this.

So why is Microsoft continuing to target PHP 3 users, when they should be targeting PHP 5 and Ruby on Rails users for the mind share of rapid application development?  I am calling on Microsoft to take this abomination of a document down, and just put up a simple Razor syntax language reference at the very least, and at the very most gut this document and create a document that doesn’t perpetuate bad software development practices and becoming a shining star to software developers and not a rusty anchor.