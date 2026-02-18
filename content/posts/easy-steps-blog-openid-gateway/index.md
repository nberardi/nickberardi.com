---
title: "2 Easy Steps To Turn Your Blog Into An OpenID Gateway"
date: 2008-05-13T15:11:34-05:00
slug: "easy-steps-blog-openid-gateway"
draft: false
tags:
  - "IdeaPipe"
  - "OpenID"
  - "Web Standards"
description: "Many of you probably have heard of OpenID, but have never had a chance to use it. However, I predict that most of you reading this blog will have used it..."
---

Many of you probably have heard of OpenID, but have never had a chance to use it. However, I predict that most of you reading this blog will have used it by the end of the year. I can make this prediction with an almost 100% certainty because there is a growing movement behind it that has many big players actively buying developing and integrating their platforms with the OpenID protocol. Some of the biggest players are:

1. AOL
2. Yahoo
3. Google
4. Microsoft

OpenID according to the official OpenID site is [explained as the following](http://openid.net/what/):

> OpenID eliminates the need for multiple usernames across different websites, simplifying your online experience.
> You get to choose the OpenID Provider that best meets your needs and most importantly that you trust. At the same time, your OpenID can stay with you, no matter which Provider you move to. And best of all, the OpenID technology is not proprietary and is completely free.

[![](/nickberardi.com/nickberardi.com/images/2008/05/openid1.png "openid")](/nickberardi.com/nickberardi.com/images/2008/05/openid1.png)

To facilitate my prediction, of most of you using OpenID by the end of the year, I am going to give you 2 easy steps to turn your blog, or any website, in to a OpenID gateway. That will work for OpenID 1.0, 1.1, and 2.0 versions of the protocol.

The first thing you need to turn your blog into an OpenID Gateway is an account with an OpenID provider, my favorite is [MyOpenID](http://www.myopenid.com), because of the abundance of features offered, but more providers can be found on <http://openid.net/get/>.

The second thing is pretty easy to accomplish and just involves adding some meta data to your HTML header. Just take the following snippet and replace *{youraccount.myopenid.com}* with your OpenID provider URL that was provided to you (there are 3 places in the snippet to replace the URL):

```
  <link rel="openid.server"  
        href="http://www.myopenid.com/server" />
  <link rel="openid.delegate"
        href="http://{youraccount.myopenid.com}/" />
  <link rel="openid2.local_id"
        href="http://{youraccount.myopenid.com}" />
  <link rel="openid2.provider"
        href="http://www.myopenid.com/server" />
  <meta http-equiv="X-XRDS-Location"
        content="http://www.myopenid.com/xrds?username={youraccount.myopenid.com}" />
```

After that is done you just need to type your blogs/websites URL in to any OpenID text box. Most of the OpenID authentication text boxes look like the following (with the little OpenID logo in the left of the text box):

[![](/nickberardi.com/nickberardi.com/images/2008/05/openid-input1.png "openid-input")](/nickberardi.com/nickberardi.com/images/2008/05/openid-input1.png)

You probably already have an OpenID authentication account that you can use right this moment. Some of the common ones that most internet users have and don't even realize are (just replace *{username}*):

- **Yahoo:** <http://yahoo.com/>
  **Flickr:** <http://flickr.com/>
  To enable your yahoo account to use OpenId visit <http://openid.yahoo.com/>
  Also while there check out their [gallery of OpenID](http://gallery.yahoo.com/openid) enabled applications
- **AOL:** <http://openid.aol.com/{username}>
- **Blogger:** <http://{username}.blogspot.com/>
- **Live Journal:** <http://{username}.livejournal.com/>
- **WordPress:** <http://{username}.wordpress.com>
- **Technorati:** <http://technorati.com/people/technorati/{username}>

So have fun, and check out [IdeaPipe](http://www.ideapipe.com) at the end of this month, we will be officially supporting OpenID.