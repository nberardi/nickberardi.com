---
title: "Using a Parameter Attribute to set a Default Value in MVC"
date: 2008-08-13T04:02:07-05:00
slug: "parameter-attribute-default-value-mvc-action-method"
draft: false
tags:
  - "MVC"
  - "MVC Toolkit"
  - "Web"
  - "ActionFilter"
description: "A couple days ago I came across a breaking change in ASP.NET MVC PR4 that wasn't reported. The breaking change is that defaults from routes are no longer..."
---

A couple days ago I came across a breaking change in ASP.NET MVC PR4 that wasn't reported.  The breaking change is that defaults from routes are no longer used as defaults for parameters in the action method, if no appropriate parameter is found in the request.  Basically what this means is the following:

> I have the following route:
> URL: /home
> Controller: Home
> Action: Index
> Defaults = page: 1
> I set the page so that it always defaults to "1" if no value is found in the query string for "page".
> So when a request is executed, the Route passes back the RouteData.Values = controller: "Home", action: "Index", page: 1. Then it goes through it's normally processing and the value of the page's query string is passed in to my action method for the page parameter. So if query string page = 1 then 1, query string page = 2 then 2, and so on. This is how it worked in PR3 and how I understood it was suppose to work as a concept.
> However, in PR4, this doesn't work anymore because of *Line 166 in ControllerActionInvoker*. It specifically checks that the value is in the route values. However they are always going to be in the route values if they have been defined as a default.

I [reported it as a bug](http://www.codeplex.com/aspnet/WorkItem/View.aspx?WorkItemId=2054), because it was an obvious break from the last 3 preview releases and nothing was reported about this breaking change, and went on my merry way.  However today I received a message back from [auriel](http://www.codeplex.com/site/users/view/auriel) confriming that this was the correct process flow, and that I should set the parameter either in my action method or the action filter.

So I decided to take this obvious disapointment and turn it in to something I have been thinking about for a long time, but never really had the motivation to impliment.  In .NET you are allowed to add attributes to anything that can be defined via reflection, including classes, interfaces, structures, and even return types and parameters of methods.  So I created an attribute called **DefaultAttribute** that is a parameter attribute that can be added to your action methods like this:

```
public ActionResult Index([Default(1)]int? page)
```

This method tells us that page has a default value of 1 if the value of page is null or undefined.  The **DefaultAttribute** is rather simplistic, because it is only suppose to hold the default value:

```
[AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false)]  
public class DefaultAttribute : Attribute  
{
    public DefaultAttribute(object @default)
    {
        if (@default == null)
            throw new ArgumentNullException("default");

        Default = @default;
    }

    public object Default
    {
        get;
        private set;
    }
}
```

As you can see from the above code I have told the attribute to only allow it to be attached to a parameter by specifying this in the **AttributeUsageAttribute**.  The next and last thing that we need inorder to complete our goal of being able to set the defaults in a parameter attribute is an action filter that can read the **DefaultAttribute** from the parameter and set the default if the parameter value is null or undefined.  We are going to process the parameter defaults in an action filter called **UseActionParameterDefaultAttribute** that can be attached to the controller or direction to the action method.  The code to process the defaults is:

```
public override void OnActionExecuting(ActionExecutingContext filterContext)  
{
    var defaults = GetDefaults(filterContext);
    var actionParameters = filterContext.ActionParameters;
    foreach (var value in defaults)
        if (actionParameters[value.Key] == null)
            actionParameters[value.Key] = value.Value;
}

internal static IDictionary>string, object< GetDefaults(ActionExecutingContext filterContext)  
{
    string key = filterContext.ActionMethod.ToString() + "_ParameterDefaults";

    // get from application storage
    IDictionary>string, object< defaults = filterContext.HttpContext.Application[key] as IDictionary>string, object<;

    if (defaults == null)
    {
        defaults = new Dictionary>string, object<(filterContext.ActionParameters.Count);
        foreach (var parameter in filterContext.ActionMethod.GetParameters())
        {
            if (parameter.IsDefined(typeof(DefaultAttribute), false))
            {
                DefaultAttribute attr = parameter.GetCustomAttributes(typeof(DefaultAttribute), false)[0] as DefaultAttribute;
                string parameterName = parameter.Name;
                string actionName = filterContext.ActionMethod.Name;

                try
                {
                    defaults.Add(parameterName, ConvertParameterType(attr.Default, parameter.ParameterType, parameterName, actionName));
                }
                catch (Exception exc)
                {
                    throw new InvalidOperationException(String.Format(
                        CultureInfo.CurrentUICulture,
                        "The value of the DefaultAttribute could not be converted to the parameter '{0}' in action '{1}'.",
                        parameterName, actionName), exc);
                }
            }
        }

        // add to application storage
        filterContext.HttpContext.Application[key] = defaults;
    }

    return defaults;
}
```

Each parameter of the action method is scanned for a **DefaultAttribute** and if found is added to the defaults dictionary to be used later when checking if each parameter is null or undefined in the OnActionExecuting method. Creating this code actually [led to another request for the MVC team](http://www.codeplex.com/aspnet/WorkItem/View.aspx?WorkItemId=2059). The request was for a static storage collection for each action method so that compile-time code like attributes on the parameters don't have to be processed with each request, since they can only possibly change when the code is recompiled. So I have my fingers crossed that they will actually implement this feature. In the mean time I implemented a application level storage for the parameter defaults so I don't have to reprocess the parameters with each request.

I have added the two source files to my Google Code Project for Coder Journal, you can find them at:

- [Download DefaultAttribute.cs](http://code.google.com/p/coderjournal/source/browse/trunk/ManagedFusion/Source/Web/Mvc/DefaultAttribute.cs)
- [Download UseActionParameterDefaultAttribute.cs](http://code.google.com/p/coderjournal/source/browse/trunk/ManagedFusion/Source/Web/Mvc/UseActionParameterDefaultAttribute.cs)