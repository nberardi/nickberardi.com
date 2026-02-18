---
title: "Add Your Twitter Status To Your Blog"
date: 2008-10-11T11:22:00-05:00
slug: "add-your-twitter-status-to-your-blog"
draft: false
tags:
  - "JavaScript"
  - "JavaScript"
  - "jQuery"
  - "Managed Fusion URL Rewriter and Reverse Proxy"
  - "Twitter"
description: "For the longest time I have been wanting to add my Twitter status to my blog in place of my quote right under my blogs name in the header. (see above)..."
---

For the longest time I have been wanting to add my Twitter status to my blog in place of my quote right under my blogs name in the header.  (see above)  Today I sat down and figured out what I needed to do to accomplish this and to my surprise it only took all of 10 minutes to complete.

What you need in order to achieve the same for your own blog is:

1. [Managed Fusion Url Rewriter and Reverse Proxy](http://www.managedfusion.com/products/url-rewriter)
   This is used to get around cross site scripting blocks that modern browsers impose on JavaScript.  It is used to create a proxy from a local URL to an external URL by fooling the browser in to thinking it is requesting the feed locally.
2. [jQuery](http://www.jquery.com)
   This is my favorite JavaScript framework, you can use your own, but my examples will be in jQuery.

The first thing you need to do is add a defined spot in your blog where you want the jQuery to write your twitter text status to. I created the following tag in my blog that has an ID of "twitter-status", the inside of this tag will be replaced with whatever status is downloaded from twitter.

```
<span><a href="http://www.twitter.com/nberardi">twitter status:</a>&nbsp;<q cite="http://www.twitter.com/nberardi" id="twitter-status">status loading...</q></span>
```

The second thing you need to do is add a *RewriteRule* to the rewriter rules for a reverse proxy to the Twitter API. The rewriter rule that I used is:

```
# get twitter status  
RewriteRule ^/twitter-status\.(.*) http://twitter.com/users/show/nberardi.$1 [NC,P]
```

So if you go to <http://www.coderjournal.com/twitter-status.xml>, you will get the direct feed that comes from <http://twitter.com/users/show/nberardi.xml>.

The third and last thing you need to do is add the jQuery JavaScript to the bottom of the page right above the </html>. What this script does is make a GET request to the URL that I defined above and downloads the content as JSON, which creates an object so that it can be used by JavaScript.

```
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>  
<script type="text/javascript">
    $.getJSON(
        "/twitter-status.json",
        { },
        // on successful call back
        function (data, textStatus) {
            $("#twitter-status").text(data.status.text);
        }
    );
</script>
```

So it was really that easy. And it can be done for any feed that you want to pull from anywhere on the internet, it just happened to be that in this case I wanted to grab a feed from twitter.