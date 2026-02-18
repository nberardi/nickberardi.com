---
title: "Cassandra Jump Start For The Windows Developer"
date: 2010-03-30T15:49:29-05:00
slug: "cassandra-jump-start-for-the-windows-developer"
draft: false
tags:
  - "Cassandra"
  - "NoSQL"
description: "Recently I have been exploring the NoSQL options for .NET and specifically a database called Cassandra.&#160; In case you haven’t heard of Cassandra..."
---

Recently I have been exploring the NoSQL options for .NET and specifically a database called Cassandra.  In case you haven’t heard of Cassandra before, it is a decentralized, fault-tolerant, elastic database designed by Facebook for high availability.  As [Wikipedia describes it](http://en.wikipedia.org/wiki/Cassandra_(database)):

> **Cassandra** is an open source distributed database management system. It is an Apache Software Foundation top-level project, as of February 17, 2010, **designed to handle very large amounts of data spread out across many commodity servers while providing a highly available service with no single point of failure**. It is a NoSQL solution that was initially developed by Facebook and powers their Inbox Search feature. Jeff Hammerbacher, who led the Facebook Data team at the time, has **described Cassandra as a BigTable data model running on an Amazon Dynamo-like infrastructure**.

I bet you have used data that has been served by Cassandra and not even realized it, here are some prominent users of Cassandra:

- Facebook
- Digg
- Twitter
- Reddit

Sounds interesting or at least worth a look, right?  Well I thought so, however during my journey of getting the database setup I have come to realize there is almost no documentation on installation for Linux, and even less for Windows.  So I am going to provide you with a jump start to installing Cassandra on your machine.  I am doing this so you don’t have to spend days jumping around the web, going down false paths, and pulling your hair out like I did, all so you can get on to what you really care about … development.

### First Things First

The first thing you need to understand about Cassandra is that it is developed in Java.  So you can run it on any machine that supports Java 6 or better.  So before you go any farther make sure you [Java JRE is updated to the latest version](http://java.sun.com/javase/downloads/index.jsp).

The next thing you need is a copy of Cassandra.  Which can be [found here](http://cassandra.apache.org/download/).  My setup is going to be based off of the latest stable release.

### Running From Windows

As I said before you can run from an operating system that Java has a runtime for.  So the first and probably most obvious one for a Windows developer, is running Cassandra on Windows.  To install Cassandra on windows just follow these steps:

1. Extract Cassandra to a directory of your choice (I used **c:\development\cassandra**)
2. Set the following environment variables
   1. JAVA\_HOME (To the directory where you install the JRE, this should not be the bin directory)
   2. CASSANDRA\_HOME (To the directory you extracted the files to in step 1)
3. Modify your Cassandra config file as you like and don’t forget to update the directory locations from a UNIX like path to something on your windows directory (in my example the config file is located at **c:\development\cassandra\conf\storage-conf.xml**)
4. Open **cmd** and run the **cassandra.bat** file (in my example the batch file is located at **c:\development\cassandra\bin\cassandra.bat**)   

   ```
   cd c:\development\cassandra\bin\  
   .\cassandra.bat
   ```
5. You can verify that Cassandra is running, by trying to connect to the server.  To do this open a new **cmd** and run the **cassandra-cli.bat** file from the **bin** directory.
     

   ```
   cd c:\development\cassandra\bin\
   .\cassandra-cli.bat
   connect localhost/9160
   ```

This is easy to get running, but there is some manual process that you have to go through each time to get the server running. In the future when you want to start up the Cassandra database for development, just repeat Step 4.

### Running From A Linux Virtual Machine

The other way, to run Cassandra is through a Virtual Machine running Linux.  This setup is just as easy as the Windows setup as long as you have some experience with Linux.  I am going to start the install steps assuming that you have already [installed Ubuntu Server](http://www.ubuntu.com/getubuntu/download-server).  This way the process is generic if you want to run the server on an physical or virtual machine.

1. Make sure you update.
     

   ```
   sudo apt-get update
   sudo apt-get upgrade
   ```
2. Open up your apt-get sources list with nano for editing.
     

   ```
   sudo nano /etc/apt/sources.list
   ```
3. Add the following Apache Cassandra sources to the list.

   ```
   deb http://www.apache.org/dist/cassandra/debian unstable main
   deb-src http://www.apache.org/dist/cassandra/debian unstable main
   ```

   After you add these two lines, press CTRL+X to close Nano. It’ll ask “Save modified buffer?” Press Y. Press Enter when Nano asks “File Name to Write.”
4. Update your apt-get sources to get the latest information about Cassandra in to your sources repository.
     

   ```
   sudo apt-get update
   ```
5. At this point you are going to get an error, don’t freak out, this is totally expected.  It will look something like this:
     

   ```
   W: GPG error: http://www.apache.org unstable Release: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY F758CE318D77295D
   ```
6. Use the following three commands to import the signature in to your repository.
     

   ```
   gpg --recv-keys F758CE318D77295D
   sudo apt-key add ~/.gnupg/pubring.gpg  
   sudo apt-get update
   ```

     

   NOTE: You must replace the key value ‘F758CE318D77295D’ with the key value you received in your error message.
7. Now is the big moment to install Cassandra.
     

   ```
   sudo apt-get install cassandra
   ```
8. Now just restart your machine, to do it from the command line run the following:
     

   ```
   sudo reboot
   ```

Unlike Windows to startup this Cassandara database so that you can start using it for development, you just need to boot up the physical or virtual machine and it should be ready for development.

### The Thrifty Way To Connect

Thrift is a protocol also developed by Facebook to create agnostic interfaces for all the common languages based off a simple configuration file.  The Thrift team [describes their mission as](http://incubator.apache.org/thrift/about/):

> Thrift is a software project spanning a variety of programming languages and use cases. Our goal is to make reliable, performant communication and data serialization across languages as efficient and seamless as possible.

As I found out there wasn’t any good way to build the thrift executable in Windows, which is another reason the Linux VM came in handy.  The thrift executable is needed to generate the protocol interface for Cassandra.  You can read how to [build the thrift executable here](http://wiki.apache.org/thrift/FrontPage) for your operating system.

After you have the executable you need to run it against the Cassandra interface definition.  I am not going to go much into depth with this, because this part of the process is pretty well documented on the internet, but here is the command I ran to create the generated Cassandra interface for C#.

```
thrift -gen csharp cassandra.thrift
```

I am not going to leave you high and dry, I have already generated the Cassandra Thrift interfaces for the following languages for you:

- [C#](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-csharp)
- [C++](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-cpp)
- [Erlang](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-erl)
- [HTML](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-html)
- [Java](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-java)
- [JavaScript](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-js)
- [OCaml](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-ocaml)
- [Perl](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-perl)
- [PHP](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-php)
- [Python](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-py)
- [Ruby](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-rb)
- [XSD](https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/gen-xsd)

**Note: these where generated based on Cassandra 0.5.1, so that may and probably won’t work with future releases of Cassandra.**

You can find the necessary supporting libraries for each of the above languages by going to <http://svn.apache.org/viewvc/incubator/thrift/trunk/lib/>.

### Conclusion

If you are like me and interested in using it with a .NET application here is a quick demonstration class that will help you get started.

<https://code.google.com/p/coderjournal/source/browse/trunk/Posts/2010/03/CassandraDemo.cs>

But no matter the language you use, I hope this has provided you a good jump start with Cassandra.