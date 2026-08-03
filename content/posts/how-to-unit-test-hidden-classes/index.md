---
title: "How To: Unit Test Hidden Classes"
date: 2007-03-14T06:38:59-05:00
slug: "how-to-unit-test-hidden-classes"
draft: false
tags:
  - ".NET"
description: "Unit testing is an important part of developing high quality software. Many of you are probably not familiar with the term Unit Testing. Wikipedia defines..."
---

Unit testing is an important part of developing high quality software. Many of you are probably not familiar with the term Unit Testing. Wikipedia [defines Unit Testing](http://en.wikipedia.org/wiki/Unit_testing) as

> In computer programming, unit testing is a procedure used to validate that individual units of source code are working properly. A unit is the smallest testable part of an application. In procedural programming a unit may be an individual program, function, procedure, web page, menu etc, while in object-oriented programming, the smallest unit is always a Class; which may be a base/super class, abstract class or derived/child class. Units are distinguished from modules in that modules are typically made up of units.

One of the most popular ways to Unit Test .NET code is [NUnit](http://nunit.org/). However, I am not going to get in to the basics of Unit Testing in this post. If you are interesting in learning more about NUnit and Unit Testing please visit [NUnit QuickStart page](http://www.nunit.org/index.php?p=quickStart). This post is going to deal with how does a developer test a class that has a private or hidden constructor.

Private constructors are very useful tool in a developer arsenal, because there are many instances when you want to give the consumer of your code access to the object but not the ability to create it. I have provided an example below:

```
public class Customer  
{
    public static Customer GetCustomer(int customerId)
    {
        // get information from database
        Customer customer = new Customer(customerId, database.GetString("CustomerName"), database.GetDecimal("CustomerAccountBalance"));

        return customer;
    }

    internal Customer (int id, string name, decimal accountBalance)
    {
        // set customer properties
    }

    public int Id { get { return _id; } }

    public string name { get { return _name; } }

    public decimal AccountBalance { get { return _balance; } }

    public void DebitBalance (decimal amount) { ; }

    public void CreditBalance (decimal amount) { ; }
}
```

There is no real way to test the constructor of this `Customer` object unless you embed your Unit Tests right in your code. But personally I find that method sloppy because you are mixing QA and Development together, and they should be seperate to at least maintain good software development practices.

If you were to create a Unit Test in the same assembly as the `Customer` class above, it would look something like this:

```
Customer customer = new Customer(/* ID */ 20, /* Name */ "Joe Customer", /* Account Balance */ 3400.0M);

// credit the customer $30.00
customer.CreditAccount(30M);

// assert that the original account balance plus the additional credit are equal
Assert.AreEqual(3430.0M, customer.AccountBalance);
```

But this isn't very useful if you want to separate your code from your tests. So what is needed is a way to instantiate a private method from outside an assembly. So in order to solve this problem I created the following code that I use in all my Unit Test Projects for just this circumstance. (*note:* The following code is not for the faint of heart. It combines generics and use of the reflector namespace).

```
using System;  
using System.Collections.Generic;  
using System.Reflection;  
using System.Security.Permissions;

public static class TestHelper  
{
    public static T CreateInstanceForNonPublicConstructor<T>(params object[] parameters)
    {
        List<Type> constructorSignature = new List<Type>(parameters.Length);

        // add all the types in order of the parameters to create the consturctor
        // signature so that the correct constructor can be retreived
        foreach (object parameter in parameters)
            constructorSignature.Add(parameter.GetType());

        ConstructorInfo typeConstructor = typeof(T).GetConstructor(BindingFlags.Instance | BindingFlags.NonPublic, null, constructorSignature.ToArray(), null);
        return (T)typeConstructor.Invoke(parameters);
    }
}
```

In order to use this code to instantiate the `Customer` class above, in an *external assembly*, the same Unit Test from outside the assembly would look like this:

```
Customer customer = TestHelper.CreateInstanceForNonPublicConstructor<Customer>(new object[] { /* ID */ 20, /* Name */ “Joe Customer”, /* Account Balance */ 3400.0M });

// credit the customer $30.00
customer.CreditAccount(30M);

// assert that the original account balance plus the additional credit are equal
Assert.AreEqual(3430.0M, customer.AccountBalance);
```

So I have demonstrated that it is possible to fully test all objects from an external assembly using standard Unit Testing as well as keeping your code separate from your tests and upholding good software development practices.

**Update:** It wasn't very clear that this code can apply to any type of constructor (`public`, `private`, and `internal`), this code I have in `TestHelper` can be used in any development process you need it in, I have just chosen to apply it to Unit Testing.
