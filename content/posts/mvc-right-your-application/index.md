---
title: "Is MVC Right For Your Application?"
date: 2008-03-16T13:39:47-05:00
slug: "mvc-right-your-application"
draft: false
tags:
  - "jQuery"
  - "MVC"
  - "ViewState"
  - "Web"
  - "AJAX"
description: "There is a simple way to tell if you can use MVC in your web application. If any of the following are true, you probably shouldn't: You require the..."
---

There is a simple way to tell if you can use MVC in your web application.  If any of the following are true, you probably shouldn't:

1. **You require the ViewState**
   This includes any 3rd party control...  Quick way to check this is disable ViewState and check to see if you application works as expected.
2. **You require post backs**
   This usually is required by Web Forms or Microsoft AJAX Toolkit...  Fortunately most of the post back functionality can be duplicated on the client side with AJAX.  I fine jQuery makes a real easy job of this.

So that is all that you need to ask your self when thinking of upgrading or deciding which route to take when planning your new application.