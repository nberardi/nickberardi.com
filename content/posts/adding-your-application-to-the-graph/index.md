---
title: "Adding Your Application To The Graph"
date: 2011-01-10T02:40:18-05:00
slug: "adding-your-application-to-the-graph"
draft: false
tags:
  - "Facebook"
  - "Open Graph Protocol"
  - "Stack Exchange"
description: "Recently Jeff Attwood asked: Is meta description still relevant? In the question he quoted an anonymous “expert”: Meta descriptions are used by Google..."
---

Recently [Jeff Attwood asked](http://webmasters.stackexchange.com/questions/7574/is-meta-description-still-relevant):

> Is meta description still relevant?

In the question he quoted an anonymous “expert”:

> Meta descriptions are used by Google probably 80% of the time for the snippet. They don’t help with rankings but you should probably use them. You could just auto generate them from the first part of the question.

To be honest I think this recommendation comes from stalwarts in the SEO community who just can't move past the fact that their knowledge of how search worked back in 1999 isn't how it works in 2011. It use to be that the description tag was used as the blurb below the title, because no real analytics was really done on a page. Everything you searched for was based on the keyword or the description meta tags.

I would say that it is not worth the extra bytes to add it to your page.  Because the search engines you really care about, Google and Bing, already find the relevant information in the page. And if they don't the search probably isn't going to show up anyways.

The one place that it might remotely be useful for is for pages that consist entirely of Flash, Silverlight, or AJAX, where the content isn't easily indexable by the search engine, and the site has a ton of inbound links that the search engine deems relevant. (ex. a popular Flash game)

## The Open Graph

Alternatively, if you really have bytes to kill, and you want to add relevant meta information to your page. You should probably be looking at the Open Graph Protocol:

<http://developers.facebook.com/docs/opengraph>

### What is the Open Graph Protocol

This is a protocol much like the meta keywords and descriptions used by search engines of the past.  But unlike the deprecated use of the meta keywords and description tags, this meta protocol is actively in use by Facebook.

> The Open Graph protocol enables you to integrate your Web pages into the social graph. It is currently designed for Web pages representing profiles of real-world things — things like movies, sports teams, celebrities, and restaurants. Including Open Graph tags on your Web page, makes your page equivalent to a [Facebook Page](http://www.facebook.com/advertising/?pages). This means when a user clicks a [Like button](http://developers.facebook.com/docs/reference/plugins/like) on your page, a connection is made between your page and the user. Your page will appear in the "Likes and Interests" section of the user's profile, and you have the ability to publish updates to the user. Your page will show up in same places that Facebook pages show up around the site (e.g. search), and you can target ads to people who like your content. The structured data you provide via the Open Graph Protocol defines how your page will be represented on Facebook.

Since Facebook is a highly structuralized environment it makes sense to control your information that is sent to them using meta data.

### Meta Tagging And The Graph

Lets start with an example, and walk through how we would update it using the Open Graph Protocol (OGP).  Since this is the page that started this post, it seems fitting that it is the page I should use to demonstrate the OGP.

<http://webmasters.stackexchange.com/questions/7574/is-meta-description-still-relevant>

Lets take a look at what the meta data looks like for this page.

```
<title>Is meta description still relevant? - Pro Webmasters - Stack Exchange</title>

<link rel="canonical" href="http://webmasters.stackexchange.com/questions/7574/is-meta-description-still-relevant">
<link rel="image_src" href="http://sstatic.net/webmasters/img/SE-logo75.png">

<meta name="title" content="Is meta description still relevant? - Pro Webmasters - Stack Exchange">
```

*Note: I have removed tags that are not relevant to this discussion.*

Lets first take a look at what the Facebook Lint tools can pick up from the information already provided in these Meta tags.  The Facebook Lint tool shows what information it can extract out of your page, for when it posts the information to your users Facebook wall when they click for example the Like button.

[![facebook-lint-debug](http://coderjournal.com/uploads/2011/01/facebook-lint-debug_thumb.png "facebook-lint-debug")](http://coderjournal.com/uploads/2011/01/facebook-lint-debug.png)

To view this same information as of writing this post you can visit the Facebook Lint tool too.

<http://developers.facebook.com/tools/lint/?url=http://webmasters.stackexchange.com/questions/7574/is-meta-description-still-relevant>

The **first** thing we should be concerned about is that the site name, in this case “Pro Webmasters – Stack Exchange” isn’t broken out from the title of the article.  By breaking out the site name it allows Facebook to create a unique link between Facebook users and your site, so that when something else interesting coming from your site shows up in their graph of friends they will get alerted to it on their news feed.  So this is very important for the organic growth of your site in the Facebook community.

The **second** thing we should be concerned about is that the image Facebook automatically choose to associate with this post is broken.  Which I am sure is just an oversight on the Stack Exchange team since it comes from their CDN server.

[http://sstatic.net/webmasters/img/SE-logo75.png](http://sstatic.net/webmasters/img/SE-logo75.png "http://sstatic.net/webmasters/img/SE-logo75.png")

But what is more concerning is that you are letting the users of the site control the images that are associated with your sites name.  So even though this isn’t that concerning, it is a level of control that Facebook affords to you.  If you choose not to exercise it they just choose the first image they find on the site.

The **third** thing is that while in this case it turned out the description was relatively accurate as a description of the post.  It might not always be the case, and most of the time you can generate a better description than Facebook can by choosing from the description meta tag or the first paragraph tag on your site.  So this is just another level of control that Facebook affords you to make so that the message that is communicated through Facebook is as accurate as possible.

### Meta Tagging Your Site For the Graph

Given the three problems I described with the StackExchange meta tagging relating to the OGP, I would add the following to their page header.

```
<title>Is meta description still relevant? - Pro Webmasters - Stack Exchange</title>

<link rel="canonical" href="http://webmasters.stackexchange.com/questions/7574/is-meta-description-still-relevant">
<link rel="image_src" href="http://sstatic.net/webmasters/img/SE-logo75.png">

<meta name="title" content="Is meta description still relevant? - Pro Webmasters - Stack Exchange">

<!-- Open Graph Protocol - Site Specific -->

<meta property="og:site_name" content="Pro Webmasters - Stack Exchange" />
<meta property="fb:app_id" content="0123456789" />

<!-- Open Graph Protocol - Page Specific -->

<meta property="og:title" content="Is meta description still relevant?" />
<meta property="og:type" content="article" />
<meta property="og:image" content="http://sstatic.net/webmasters/img/SE-logo75.png" />
<meta property="og:url" content="http://webmasters.stackexchange.com/questions/7574/is-meta-description-still-relevant" />
<meta property="og:description" content="I received this bit of advice about the meta description ..." />
```

I broke the implementation in to two specific sections.

1. Site Level Information
2. Page Level Information

A little background information is probably necessary on how these meta tags are used by Facebook.  This all relies on a number of variables in Facebook but here are the basics.  If a user likes your URL using a [Like button](http://developers.facebook.com/docs/reference/plugins/like), a News Feed story similar to the one below will be published to Facebook. The `og:title` links to `og:url` and the `og:site_name` is rendered pointing to your site's domain automatically:

![Open Graph stream](http://developers.facebook.com/images/devsite/open-graph-stream.png)

However if this meta data wasn’t provided and the original non-OGP implementation of the StackExchange question was used.  The News Feed post would read “Fransis Luu likes Is meta description still relevant? - Pro Webmasters - Stack Exchange” instead of the much more stylized “Fransis Luu likes Is meta description still relevant? on Pro Webmasters – Stack Exchange” with all the proper linking.

#### Site Level Information

This is information that will most likely stay the same across all pages in your site regardless of the type or content.

- **og:site\_name:** this should be your site name.  It provides a human readable name that helps identify your site to Facebook users.
- **fb:app\_id:** this allows you to use Facebook Insight (the Google Analytics of Facebook) to monitor the traffic coming from and going to your site.  As well as provide a unique identifier so that the site can be used in the graph when alerting friends of friends about the joint interests in the same site.

#### Page Level Information

This is information that will most likely be unique to just the page.

- **og:title:** The title of the content being displayed in the page.
- **og:type:** The type of information being displayed on this page.  This can be used to describe real-life objects such as people, places and things.  But in this case since the page doesn’t talk about real-life things, it should just be labeled as *article*.
- **og:image:** The image you want associated with the link to the article.  If this is not provided a seemingly random image is chosen from the page.
- **og:url:** The is the canonical URL that you want associated with the page.  This serves the same purpose as <link rel=”canonical” /> meta tag, but it is probably important that it is set in addition to any other meta information in your header.
- **og:description:** The content blub of one or two sentences that you want posted in the News Feed along with your link, to provide more content on the link.

## What Facebook Users See

As a test I clicked a couple of the like buttons on my website, so that you could see why implementing the OGP is important. I took a picture from two different perspectives. My news feed, and my profile feed.

**News Feed**

**![](http://coderjournal.com/uploads/2011/01/facebook-news-feed.png "facebook-news-feed")**

As you can see both of my likes statements were grouped together and property attributed to my blog "Nick Berardi's Coder Journal".  So Facebook is able to use the meta information that we provide to create nice and fluent statements for the friends in the graph to see.  It also creates a nice compact statement that doesn't create a lot of redundant information for friends who may be interested in what I like.

**Profile Feed**

**![](http://coderjournal.com/uploads/2011/01/facebook-profile-page.png "facebook-profile-page")**

On the profile page it is a different story, because on the profile page it is more important to communicate each individual like statement instead of saving space.  So each one is attributed individually in the order which I said I liked them.

## In Conclusion

As you can see while the importants of the description and keywords meta data has decreased as search engines became smarter at interpreting what you were looking for.  All meta data hasn’t seen the same fate, and new medians like Facebook need this meta data to provide accurate information about your content, in addition to allowing you control over how that information gets seen by users in their system.