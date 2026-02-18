---
title: "Creating a more accurate JSON .NET Serializer"
date: 2007-08-24T07:16:22-05:00
slug: "creating-a-more-accurate-json-net-serializer"
draft: false
tags:
  - ".NET"
  - "Framework 2.0"
  - "JavaScript"
  - "JavaScript"
  - "Web"
  - "Web 2.0"
description: "Recently I have been diving in to the world of REST and all the great things that come along with that. If you are not familiar with REST and what it..."
---

Recently I have been diving in to the world of REST and all the great things that come along with that. If you are not familiar with REST and what it means to have a REST Web Service for your site, you can go through the [Digg API](http://apidoc.digg.com/ "Digg API"), which should give you a pretty good idea. My company has been contracted to build the framework for a new Web 2.0 initiative of one of our clients. You cannot do Web 2.0 if you are not using some kind of AJAX/REST combination.

With the inclusion of [Microsoft AJAX.NET](http://ajax.asp.net) are some very useful tools that have been added to the web services library. My current focus in System.Web.Script.Serialization.JavaScriptSerializer, which takes you objects and turns them in to a [JSON](http://www.json.org/) string that can be evaluated by JavaScript and reversed in to an object. JSON (pronounced Jason) is very useful in AJAX because you do not have to retrieve and parse XML through the XML Browser Request that powers current AJAX implementations.

I found the attribute support lacking in the JavaScriptSerializer when compared to the XmlSerializer, ScriptIgnoreAttribute compared to XmlRootAttribute, XmlAttributeAttribute, XmlIgnoreAttribute, XmlElementAttribute, XmlArrayAttribute, and XmlArrayItemAttribute. So I decided to extend the JavaScriptSerializer to use the XML attributes to serialize my objects and give me greater control over how they were written in to JSON text form. The added benefit was that my XML and JSON outputs serialized the exact same way when the web service generated them. Below I have included the code.

```
using System;  
using System.Collections;  
using System.Collections.Generic;  
using System.Collections.ObjectModel;  
using System.Reflection;  
using System.Web.Script;  
using System.Web.Script.Serialization;  
using System.Xml.Serialization;

namespace ManagedFusion.Script.Serializer  
{
    public class XmlJavaScriptConverter<T> : JavaScriptConverter
    {
        public override object Deserialize(IDictionary<string,string> dictionary, Type type, JavaScriptSerializer serializer)
        {
            throw new Exception("The method or operation is not implemented.");
        }

        public override IDictionary<string,string> Serialize(object obj, JavaScriptSerializer serializer)
        {
            return SerializeObject(obj);
        }

        private IDictionary<string,string> SerializeObject(object obj)
        {
            IDictionary<string,string> values = new Dictionary<string,string>();
            Type type = obj.GetType();

            foreach (FieldInfo info in type.GetFields(BindingFlags.Public | BindingFlags.Instance))
                if (!info.IsDefined(typeof(XmlIgnoreAttribute), true))
                    values.Add(SerializeName(info), SerializeValue(info.GetValue(obj), info));

            foreach (PropertyInfo info2 in type.GetProperties(BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance))
            {
                if (!info2.IsDefined(typeof(XmlIgnoreAttribute), true))
                {
                    MethodInfo getMethod = info2.GetGetMethod();
                    if ((getMethod != null) && (getMethod.GetParameters().Length <= 0))
                        values.Add(SerializeName(info2), SerializeValue(getMethod.Invoke(obj, null), info2));
                }
            }

            return values;
        }

        private string SerializeName(MemberInfo member)
        {
            string name = null;

            if (member.IsDefined(typeof(XmlElementAttribute), true))
            {
                object[] attrs = member.GetCustomAttributes(typeof(XmlElementAttribute), true);

                if (attrs.Length > 0)
                {
                    XmlElementAttribute attr = attrs[0] as XmlElementAttribute;

                    name = attr.ElementName;
                }
            }

            if (member.IsDefined(typeof(XmlAttributeAttribute), true))
            {
                object[] attrs = member.GetCustomAttributes(typeof(XmlAttributeAttribute), true);

                if (attrs.Length > 0)
                {
                    XmlAttributeAttribute attr = attrs[0] as XmlAttributeAttribute;

                    name = attr.AttributeName;
                }
            }

            if (member.IsDefined(typeof(XmlArrayAttribute), true))
            {
                object[] attrs = member.GetCustomAttributes(typeof(XmlArrayAttribute), true);

                if (attrs.Length > 0)
                {
                    XmlArrayAttribute attr = attrs[0] as XmlArrayAttribute;

                    name = attr.ElementName;
                }
            }

            if (String.IsNullOrEmpty(name))
                name = null;

            return name ?? member.Name;
        }

        private object SerializeValue(object obj, MemberInfo member)
        {
            if (obj == null)
                return obj;

            // make sure the object isn't an easily handled primity type
            if (Type.GetTypeCode(obj.GetType()) != TypeCode.Object)
                return obj;

            if (obj is IDictionary)
                return obj;

            if (obj is ICollection)
            {
                IList<object> list = new List<object>();
                object[] attrs = member.GetCustomAttributes(typeof(XmlArrayItemAttribute), true);
                string arrayName = null;

                if (attrs.Length > 0)
                {
                    XmlArrayItemAttribute attr = attrs[0] as XmlArrayItemAttribute;

                    arrayName = attr.ElementName;
                }

                if (String.IsNullOrEmpty(arrayName))
                {
                    foreach (object o in (obj as ICollection))
                    {
                        if (Type.GetTypeCode(o.GetType()) != TypeCode.Object)
                            list.Add(o);
                        else
                            list.Add(SerializeObject(o));
                    }
                }
                else
                {
                    foreach (object o in (obj as ICollection))
                    {
                        IDictionary<string,object> list2 = new Dictionary<string,object>();

                        if (Type.GetTypeCode(o.GetType()) != TypeCode.Object)
                            list2.Add(arrayName, o);
                        else
                            list2.Add(arrayName, SerializeObject(o));

                        list.Add(list2);
                    }
                }

                return list;
            }

            return SerializeObject(obj);
        }

        public override IEnumerable<Type> SupportedTypes
        {
            get { return new ReadOnlyCollection<Type>(new List<Type>(new Type[] { typeof(T) })); }
        }
    }
}
```

Then to serialize the object in my code I have the following code in place.

```
JavaScriptSerializer jsSerializer = new JavaScriptSerializer();  
jsSerializer.RegisterConverters(new List<JavaScriptConverter>(new JavaScriptConverter[] { new XmlJavaScriptConverter<T>() }));  
string response = jsSerializer.Serialize(SerializableObject);
```

The serializer from above outputs the following code.

```
{"timestamp":"\/Date(1187968133328)\/","maxCount":10,"count":1,"terms":[{"term":"dvd hollywood"}]}
```

From this object as the reference.

```
[XmlRoot("search")]
public class GetTermsResponse  
{
    private string[] _terms;
    private int _maxCount;

    [XmlAttribute("timestamp")]
    public DateTime TimeStamp
    {
        get { return DateTime.Now; }
        set { ; }
    }

    [XmlAttribute("maxCount")]
    public int MaxCount
    {
        get { return _maxCount; }
        set { _maxCount = value; }
    }

    [XmlAttribute("count")]
    public int Count
    {
        get { return Terms.Length; }
        set { ; }
    }

    [XmlArray("terms")]
    [XmlArrayItem("term")]
    public string[] Terms
    {
        get { return _terms; }
        set { _terms = value; }
    }
}
```

So that wasn't too hard the next step for this code is to make it so it can deserialize the JSON string back to an object, but the chances of that happening are almost 100/1 against the use of that functionality, because POST using JSON is a very dangerous activity and shouldn't be attempted unless you know all the problems that may occur. So this code above should work in most real world examples. Happy coding.