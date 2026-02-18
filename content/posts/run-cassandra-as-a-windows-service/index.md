---
title: "Run Cassandra As A Windows Service"
date: 2010-06-17T07:16:42-05:00
slug: "run-cassandra-as-a-windows-service"
draft: false
tags:
  - "Cassandra"
  - "Windows Service"
description: "One of the main issues that comes up over and over again for Cassandra is: How do I run Cassandra as a Windows Service? In this post I am going to answer..."
---

One of the main issues that comes up over and over again for Cassandra is:

> How do I run Cassandra as a Windows Service?

In this post I am going to answer that question and in the process demonstrate how to do it in less than 10 minutes.

### Background

Cassandra is mainly developed by Linux developers so very little attention has been paid to the Windows developer or administrator as far as Cassandra goes.  So as Windows developers we have to hop through a couple more hoops than just clicking on an *install.exe* file and and letting it do all the work.  However lucky for us, those hoops are easy and quickly hopped through.

### Step 1

If you haven’t done so already please read my [jump start for Windows users on install Cassandra](http://coderjournal.com/2010/03/cassandra-jump-start-for-the-windows-developer/), this guide will get you ready for the next steps.

### Step 2

The second step is also an easy one, you need to download a package called *RunAsService*, which provides the ability to run any program as a Windows Service.

- [**Download RunAsService.zip**](/images/2010/06/RunAsService.zip)

After you have downloaded the file extract the contents to a directory of your choosing.  (I extracted it to **c:\RunAsService**)

*Note: RunAsService was originally developed [here](http://runasservice.sourceforge.net/), however I recompiled it to run on .NET 2.0.*

### Step 3

To install RunAsService open up a command prompt with Administrative privileges and run this command.

```
cd c:\RunAsService  
install networkservice
```

This registers RunAsService with your Windows Service.  Make sure to keep your command prompt open because you will need it for the 5th step.

### Step 4

To configure RunAsService for Cassandra open up the *RunAsService.exe.config* file in your favorite text editor and replace <service.settings> section with the following so that it looks like this:

```
<!-- Services configuration -->  
<service.settings>
    <!-- Run Cassandra as a service -->
    <!-- My Cassandra install path is C:\apache-cassandra\ -->
    <service>
        <name>Cassandra Database</name>
        <executable>C:\apache-cassandra\bin\cassandra.bat</executable>
        <parameters></parameters>
    </service>
</service.settings>
```

After you have finished, save the config file and exit your text editor.

*Note: My Cassandra install is in **c:\apache-cassandra\** you will have to correct the config above for where you installed it if different than mine.*

### Step 5

The last and final step of this process is to start the RunAsService service.  You can either do it through the Services control panel or just type the following in to your command prompt.

```
net start runasservice
```

You should see a response in the command line saying that the service has been successfully started.  To verify that Cassandra has been started you can use the **cassandra-cli.bat** file:

```
cd c:\apache-cassandra\bin\  
cassandra-cli.bat  
connect localhost/9160
```

It should report that it is connected to the server if the service is running.  And with that we are done, and I told you it would only take about 10 minutes.