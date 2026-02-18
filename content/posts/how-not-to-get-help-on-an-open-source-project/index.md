---
title: "How not to get help on an Open Source Project"
date: 2009-02-25T14:04:57-05:00
slug: "how-not-to-get-help-on-an-open-source-project"
draft: false
tags:
  - "How To"
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "Rant"
description: "So over the past couple of weeks I have been helping a user get up and running on a project I have developed called Managed Fusion Url Rewriter and..."
---

So over the past couple of weeks I have been helping a user get up and running on a project I have developed called [Managed Fusion Url Rewriter and Reverse Proxy](http://codeplex.com/urlrewriter).  Now I understand that my project isn't well documented, and I really need to work on that.  So, until I get the time to better document the project, I willingly spend my time helping people through their issues.  99.9% of the time everything works out, and everybody walks away happy.  However there is this 0.1% of the time that the conversation ends like this:

> Fuck all this shit crazy.  All I wanted was a revers proxy.  I can set this shit up in 20 minutes with ISA.  I don't know why this is sooooooooooooooooooo hard.
> The syntax of RewriteRule is soooooooo confusing.  WTF does ^/(.\*)$ mean?
> any why is there a $1 on the end of my other "thing"
> RewriteRule ^/(.\*)$        <http://192.168.0.35/$1> [P]
> What does port :8888 have to do with anything.
> This is just getting to hard to make work.  I should need to have advanved knowledge of http to make stupid proxy work.
> I want to proxy everything.
> I don't think the problem is with the traffic between the two web servers, the problem seems to only apply to the number of /'s in the query string and their placement.
> My guess is if I could figure out how to make more RewriteRules and define all the / cases the shit would just go.  Somehow when there are a few slashes in the query string your guy drops the ball.  Maybe because my RewriteRule is balls or because it's broken.  I wouldn't know either way.
> All I want it to do it fucking work.
> Ugh

I mean how do you respond to this?  The guy basically has started freaking out on me, because he doesn't understand the basic premis of what my open source project is trying to accomplish and is unwilling to spend the time to learn about the [mod\_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) syntax. Plus none of what he is saying is true, [I eat my own dog food on this project](http://www.coderjournal.com/2008/02/url-rewriter-reverse-proxy-iis-wordpress/).  So I imidiatly know about simple problems such as query strings are not working.

Basically the whole problem came down to the fact that this guy was in a crunch, didn't understand the basics of the internet, and thought it would be easier to use a new technology instead of one that is proven for him such as ISA server.  None of this is my problem so it is inappropriate to swear at a person just trying to help you out.  I understood he was frustrated with a technology he has never used before, but I wasn't going to continue a conversation with a guy who was proven to be unstable and irrational.  So I just replied with:

> Ok I am done you are on your own.

There really wasn't any point to this post besides airing my disgust at this type of user.  Also to shed light on the fact that even though I am developing this software on my free time, giving it away for free, and supporting it for free, that there are many people out there that don't understand this and demand the same level of support as if they just paid you a months worth of their salery for support.

If you ever find yourself heading down this path, be aware that people who create open source software are dedicating their free time to help you out.  So be grateful for their help, because they could just as easily blow you off and spend time with their family.