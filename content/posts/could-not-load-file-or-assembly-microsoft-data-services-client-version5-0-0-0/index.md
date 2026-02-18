---
title: "Could not load file or assembly 'Microsoft.Data.Services, Version=5.0.0.0\""
date: 2012-09-17T04:53:58-05:00
slug: "could-not-load-file-or-assembly-microsoft-data-services-client-version5-0-0-0"
draft: false
tags:
  - "OData"
  - "WCF"
description: "Recently while working on an OData endpoint for a web service I am setting up I came across this error. I did a quick search on the web, but all that I..."
---

Recently while working on an OData endpoint for a web service I am setting up I came across this error. I did a quick search on the web, but all that I came up with was a bunch of overly complicated solutions to fix this issue. So I thought I would write up a quick blog post and put an end to the insanity of this error and all the snake oil that seems to be on the web about it.

This error comes up because there is a reference in your application, either through a framework config or library reference that references the `5.0.0.0` version of the `Microsoft.Data.Services` assembly. This usually happens because you have included in a more recent version, usually [via NuGet](http://nuget.org/packages/Microsoft.Data.Services/5.0.2), and for whatever reason NuGet decided not to add the following to your config file. Either way here is all that you need to do.

```
<runtime>  
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
        <dependentAssembly>
            <assemblyIdentity name="Microsoft.Data.Services" publicKeyToken="31bf3856ad364e35" />
            <bindingRedirect oldVersion="1.0.0.0-5.0.0.0" newVersion="5.0.2.0" />
        </dependentAssembly>
    </assemblyBinding>
</runtime>
```

The `newVersion` attribute in the `bindingRedirect` element needs to be set to whatever the latest version of the `Microsoft.Data.Services` you are running from NuGet.

Please note that this will not work in Silverlight or Windows Phone, so if you are developing in either of those frameworks please try some of the snake oil. Also please then turn to Microsoft and point them to the strong naming [SemVer](http://semver.org/) approach that the ASP.NET team is using to prevent issues like this from occurring. By only updating the version number on major releases of the library.