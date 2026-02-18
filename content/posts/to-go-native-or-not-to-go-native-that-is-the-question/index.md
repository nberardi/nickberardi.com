---
title: "To Go Native Or Not To Go Native… That Is The Question"
date: 2010-10-20T13:23:57-05:00
slug: "to-go-native-or-not-to-go-native-that-is-the-question"
draft: false
tags:
  - "Android"
  - "iOS"
  - "iPad"
  - "iPhone"
  - "jQuery"
  - "Mono"
  - "PhoneGap"
  - "Windows Phone 7"
description: "Over the past couple of weeks I have been slowly planning and revamping my iPhone app to address user concerns, bugs, and problems. And as part of the..."
---

Over the past couple of weeks I  have been slowly planning and revamping my [iPhone app](http://nick.io/gas-prices-app) to address user concerns, bugs, and problems.  And as part of the rework I decided to support other platforms, in addition to the iPhone, such as the iPad, Android, and Windows Phone 7.  However with this new focus, I had one huge problem, how was I going to learn each new SDK.

This problem led me to struggle with if I should develop for each platform natively in its own language and SDK or use a cross platform programming language that would basically put a shim on top of the native SDK.  The pros and cons of each approach where the following:

|  |  |  |
| --- | --- | --- |
|  | **Go Native** | **Not Go Native** |
| **Pros** | - Take full advantage of SDK - Design flexibility - Officially supported - Easier to integrate already developed toolsets | - Program once - Test once - No extra hardware to buy |
| **Cons** | - Many hours spent researching problems and pulling hair out - Have to test each platform individually - Buy extra hardware, (i.e. devices and in the case of the iOS a computer) | - Less design flexibility - Could only support the platforms that the cross platform toolset supported - Not officially supported - Harder to integrate toolsets (i.e. Native Adsense, Facebook Auth) - Limited access to accelerometer, GPS, and native hardware |

Eventually I came to the conclusion that I had to accept the fact that if I wanted to support all the platforms, I was going to have to use a cross platform programming language, because I am one guy with a limited amount of time and don’t really have time to learn Obj-C and Java on top of the SDK’s for iOS, Android, and Windows Phone 7.  So I started browsing around and came up with the following options for developing cross platform:

1. MonoTouch & MonoDroid : I would be able to share the C# code across the platforms with Windows Phone 7 app if I crafted the libraries for accessing the core data, but this choice still required me to use each platforms UI, so I would have to spend the time diving in to each individual platform.
2. JavaScript & PhoneGap : This seemed like a perfect solution, because I know JavaScript and HTML, and PhoneGap would turn them into native applications by running them in a shell browser on the device, however this severely limited me in what I could do with the UI.

I really found the fact that I could continue to program in C# with MonoTouch and MonoDroid very alluring.  But, ultimately I decided I was going to go with [jQuery Mobile](http://jquerymobile.com) and [PhoneGap](http://phonegap.com), because I lacked the time to even dive in to MonoX frameworks, and I already had a solid grasp of HTML and jQuery so I decided to use PhoneGap as the platform for my next release. If you have never used PhoneGap here is how they explain it on their website:

> PhoneGap is an open source development framework for building cross-platform mobile apps. Build apps in HTML and JavaScript and *still* take advantage of core features in iPhone/iPod touch, iPad, Google Android, Palm, Symbian and Blackberry SDKs. **[Learn More ›](http://www.phonegap.com/about)**

Sounds great huh?  Well it sort of is, but has some rough spots when reaching outside of the browser.  But so far I have been able to successfully do the following from JavaScript from within the browser:

- Popup Native Alerts
- Get GPS coordinates
- Vibrate The Device

I will be posting updates during the development process here on my blog.  And the nice thing about doing something with HTML and JavaScript, is that I can share them all with you through your browser with out ever having to deploy the app to a single device.  So that part I am completely thrilled with.