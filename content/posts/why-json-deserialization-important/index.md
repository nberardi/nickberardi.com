---
title: "Why is JSON Deserialization so Important to Developers?"
date: 2008-04-03T03:48:08-05:00
slug: "why-json-deserialization-important"
draft: false
tags:
  - ".NET"
  - "C#"
  - "JSON"
  - "Serialization"
description: "Recently I have been working on a RESTful interface for a Web 2.0 project that I will be releasing very soon. And one of the self imposed requirements..."
---

Recently I have been working on a RESTful interface for a Web 2.0 project that I will be releasing very soon. And one of the self imposed requirements that I set out to achieve was to have the RESTful interface output the same structure JSON as XML. This way that any developer using the interface would feel comfortable using the JSON and XML interchangeably. But, I have been having a lot of trouble recently getting my JSON and XML to output the same structure when using the built in .NET methods. I have tried the following:

- JavaScriptSerializer/XmlSerializer
- DataContractJsonSerializer/DataContractSerializer

Neither can be forced to output the same structure. Mostly because they are both concerned about serialization and deserialization. Now I ask the question, **Why is JSON deserialization so important to have?** JSON stands for JavaScript Object Notation, the keyword in there is JavaScript, why are we trying to force a technology designed for a specific language and purpose in to a different technology. In my opinion it seems akin to trying to communicate between two JavaScript methods with the following C# code:

```
struct Person {  
    public string Name = "Nick Berardi";
    public Uri Blog = new Uri("http://www.coderjournal.com");
    public DateTime BirthDate = new BirthDate(1980, 3, 14, 0, 0, 0);
}
```

There is no point to doing that because the JavaScript language already has a way to communicate objects, it's called JSON. So why as C# developers, or whatever language we use, we insist on creating a deserializer when only a serializer is needed to translate our preferred object to JSON so that JavaScript, different language, can understand. By creating a deserializer we are basically encouraging/saying that this is a valid way to communicate between languages.

I personally see JSON as a communication protocol between two non-JavaScript languages as a fad. The communication between two non-JavaScript languages has already been decided to be either Remoting or XML, both were created with this idea of object transportation in mine, and both are very extensible and don't fall short where JSON does.

Now that all that is said, I personally don't have a problem with JSON having a deserializer, because there is going to be a time when you need to deserialize JSON, but it should be the exception not the rule, and it shouldn't be part of the JSON serializer. I say this for the following reason, because when you combine a serializer and deserializer there is an expectation that the type is going to be the same going in as coming out. This was planned for in XML, with XML namespaces to define the type, however this was not planned for in JSON, so special cases have to be developed in order to support deserialization such as the inclusion of "\_\_type" property in the JSON object. As illustrated [in this article from Scott Hanselman](http://www.hanselman.com/blog/SerializingObjectsAsJavaScriptUsingAtlasJSONNETAndAjaxPro.aspx "Serializing Objects as JavaScript using Atlas, JSON.NET and AjaxPro"):

```
{ "__type":"ConsoleApplication1.Person, ConsoleApplication1, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" ... }
```

You may say, "So what, that is what needs to be done to deserialize the object." Well that my friends is called a Hack, and as professional developers we shouldn't be hacking technologies, that were not designed for our purpose, together with our applications.  We should be using the correct technology for the problem that results in the least amount of technical debt.