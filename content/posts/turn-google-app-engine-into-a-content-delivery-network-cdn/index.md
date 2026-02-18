---
title: "Turn Google App Engine into your own Personal Content Delivery Network (CDN)"
date: 2008-06-12T03:43:20-05:00
slug: "turn-google-app-engine-into-a-content-delivery-network-cdn"
draft: false
tags:
  - "CDN"
  - "Content Delivery Network"
  - "Google App Engine"
  - "Google Apps"
  - "JavaScript"
  - "JavaScript"
  - "SEO"
  - "Web"
description: "As anybody who has run a growing website or blog knows, response time is going to get worse with the more users you have visiting your site. The users..."
---

As anybody who has run a growing website or blog knows, response time is going to get worse with the more users you have visiting your site. The users come from all angles, RSS feeds, homepage visits, search engine visits, people sealing your static files that you host, and pretty much anything else that can be served over HTTP. The solution to this problem is to off load your static content on to a Content Delivery Network or CDN. CDN providers cost a lot of money though, so it is nothing for us mere mortals with one server can afford.

But thanks to Google anyone can now run their own CDN **for free on Googles servers**. Lucky for you and me Google has made the process really painless and you can even have the CDN under you own domain name. In my case [static.coderjournal.com](http://static.coderjournal.com).

### What Is A Content Delivery Network?

According to [Wikipedia](http://en.wikipedia.org/wiki/Content_delivery_network):

> A **content delivery network** or **content distribution network** (*CDN*) is a system of [computers](http://en.wikipedia.org/wiki/Computer "Computer") [networked](http://en.wikipedia.org/wiki/Computer_network "Computer network") together across the [Internet](http://en.wikipedia.org/wiki/Internet "Internet") that cooperate transparently to deliver content most often for the purpose of improving performance, scalability, and cost efficiency, to end users. The first web content based CDNs were [Speedera](http://en.wikipedia.org/wiki/Speedera "Speedera"), Sandpiper, Mirror Image and Skycache, followed by [Akamai](http://en.wikipedia.org/wiki/Akamai_Technologies "Akamai Technologies") and [Digital Island](http://en.wikipedia.org/wiki/Digital_Island "Digital Island").

Basically it is a network of computers around the world that serves your content to the end user closest to one of those many servers around the world. This method of delivery cuts down on server overload, DNS hops, and delivery time.

When sites like Microsoft, Yahoo, Google, or Amazon delivery content they use Content Delivery Networks (CDN’s) to host most of their content, especially static files such as images, stylesheets, downloads and anything else you can think of. The reason they do this is to reduce load on their application servers, that serve dynamic content, such as PHP or ASP.NET pages.

### What Is Google App Engine?

So you may ask [what is Google App Engine](http://code.google.com/appengine/docs/whatisgoogleappengine.html):

> [Google App Engine](http://code.google.com/appengine/) lets you run your web applications on Google's infrastructure. App Engine applications are easy to build, easy to maintain, and easy to scale as your traffic and data storage needs grow. With App Engine, there are no servers to maintain: You just upload your application, and it's ready to serve your users.
> You can serve your app using a free domain name on the `appspot.com` domain, or use [Google Apps](http://www.google.com/a/) to serve it from your own domain. You can share your application with the world, or limit access to members of your organization.
> App Engine costs nothing to get started. Sign up for a free account, and you can develop and publish your application for the world to see, at no charge and with no obligation. A free account can use up to 500MB of persistent storage and enough CPU and bandwidth for about 5 million page views a month.

Google has also announced a [very very affordable price plan](http://googleappengine.blogspot.com/2008/05/announcing-open-signups-expected.html) that any mere mortal can afford. They are not ready to start charging people yet, but here are the details:

- $0.10 - $0.12 per CPU core-hour
- $0.15 - $0.18 per GB-month of storage
- $0.11 - $0.13 per GB outgoing bandwidth
- $0.09 - $0.11 per GB incoming bandwidth

### How do I setup my own CDN using Google App Engine?

To use Google App Engine you need to do a couple things that readies you computer to publish your static content to Google. Please take note that my setup is for Windows, but you can easily modify the process for any other OS.

#### Setup

1. You need to download and install Python on your computer. You may already have it if you are using a Unix environment (i.e. Linux or Mac OS X). If you need to download it or would just like to check to see if it is up to date, please visit <http://www.python.org/download/> and download the correct version for you operating system.
2. Install Python to `c:\Program Files\` (all my scripts that I have designed to make the publishing to Google are going to be using this path).
3. You will also need Google App Engine SDK which is available at <http://code.google.com/appengine/downloads.html>. Download the version that is for you OS. Note that the SDK will check for the Python install, so make sure you install it before the SDK.
4. Sign up for Google App Engine at <http://appengine.google.com/>, you will need a valid Google account. I suggest you sign up for a [Google Apps account](http://www.google.com/a/help/intl/en/admins/editions_spe.html) and use that as your Google account. Why I suggest this will become apparent later on.
5. Once you are done with the setup process you need to create an application. Click the “Create an Application” and give your application a name (called “application identifier”). This is a unique name for all Google App Engine applications. For example I set my application identifier to "coderjournal". Click though to the next part of the application, if this is your first time registering an application you need to specify your cell phone number and confirm your account with a SMS code that Google sends you.

#### Publish To Your CDN

1. Download my publishing files, hosted on my CDN, at <http://static.coderjournal.com/downloads/coderjournal-cdn.zip>
2. Create a directory on your computer specifically for you CDN files. My directory is `c:\websites\static.coderjournal.com`. Fill this directory with all your static files you want hosted on your CDN. Fill it full of all your css, downloads, flash, images, javascripts, videos, and anything else you want hosted.
3. Unzip the files I provided to you in step 1 into the directory you created in step 2.
4. Next we need to edit the YAML configuration file. Open the `app.yaml` file in your favorite text editor and change `application: coderjournal` to `application: {your application identifier}`.
5. Next go down and edit your static directories, in mine I have css, downloads, flash, images, and js. You can create your own by just modifying the ones I put in the file.
6. If you installed the Google App Engine SDK in the default directory and Python in `c:\Program Files\` then skip to step 7. The next part is also required if you are using the x64 version of Windows, because Google App Engine SDK installs in `c:\Program Files (x86)\`. So change the paths in `publish-cdn-coderjournal.bat` to your actual paths.
7. Now double click on `publish-cdn-coderjournal.bat` and a command window will display. Fill in your Google account and password that you used to sign up for the Google App Engine account. And you content will start to publish.
8. You now have you own private CDN that can be accessed at <http://application-identifier.appspot.com>.

#### Using Your Own Domain (Optional)

1. If you created your own Google App as suggested up in Setup step 4, you can create your own custom domain for your CDN. If you didn't, don't worry just create one, and follow the steps below.
2. Go to the dashboard of your Google Apps and click "Add more services".
3. Under other services you will see Google App Engine and a place to enter your application identifier. Enter you application identifier and click "Add It Now".
4. It will take you to the next page where you enter in the domain you want for your CDN, I suggest something simple like `static.yoursite.com`.
5. Then you just need to follow the steps for adding a CNAME to your DNS and you are ready to go with you custom domain.

### How do I use my own CDN?

Well this is the cool part! You just use the absolute path to your files. For example if you wanted to host the image to your right you would just use the following in your HTML:

**Potential Gotcha:** I forgot to mention that currently the files hosted statically are case-sensitive. I have reported this issue to Google, hopefully they will correct it soon. <http://code.google.com/p/googleappengine/issues/detail?id=466>

```
<img src="http://static.coderjournal.com/nickberardi.com/images/ideapipe-logo.png" />
```

It is really that simple. Now comes the cool part that I need your help with, and proof that this is really a true CDN. I would like to see how many different IP Addresses my CDN points to. So far I was able to find the following IP addresses:

- `72.14.207.121`
- `64.233.179.121`
- `66.249.91.121`

That point to:

`static.coderjournal.com`

To see what IP Address you get on your local machine just pull up the command prompt and type:

```
ping static.coderjournal.com
```

Please report your findings in the comments below. I am sure everybody would love to see how big Google's CDN really is.