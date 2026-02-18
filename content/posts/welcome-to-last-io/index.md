---
title: "Welcome To Last.io"
date: 2010-06-28T13:31:30-05:00
slug: "welcome-to-last-io"
draft: false
tags:
  - "last.io"
description: "I wanted to save this historic post for my blog, post number 250, for a special occasion. And I can’t think of a more special occasion than what I am..."
---

I wanted to save this historic post for my blog, post number 250, for a special occasion.  And I can’t think of a more special occasion than what I am about to announce.  Over the past month or so I have been working on a new web application, in my spare time.  The goal of the web app was to provide a more usable and accessible interface to a product that I believe has great potential beyond what the publisher originally imagined.

The product that I am talking about is [Microsoft Tag](http://tag.microsoft.com), it is probably not very well known to most of you.  But here is the basic concept.  You are given a image representation of a hyperlink so that it can be easily shared in a visual and usually physical medium such as a poster, banner ad, magazine, or something in print.  Or at least it is marketed that way.  The idea behind it is that you can get information that is relevant to a customer by having them just focus their camera phone on an image that looks like this in any of the mediums I listed a few sentences ago:

[![microsoft-tag](/images/2010/06/microsofttag_thumb.gif "microsoft-tag")](/images/2010/06/microsofttag.gif)

If you would like to try Microsoft Tag out please follow the directions on the tag on your mobile phone.

### Where last.io Fits In

The concept behind **[last.io](http://last.io)** is that there are many circumstances that don’t fit into the marketing of Microsoft Tag, where a tag would be the perfect way to share a link.  **last.io** is bring together the short URL services that provide a tiny URL for consumption on services like twitter and Microsoft Tag for consumption in a more visual medium.

The idea for **last.io** came to me while watching the audience members at a monthly Philly.NET meeting take a picture, with their smart phone, of a slide with a link to more information about the presentation, that the presenter thought was important for the audience to jot down and keep for future use.  However this process seemed flawed and inefficient to me.  First of all the audience members need to then take that picture and transcribe the slide in to the URL bar, which is pretty painful to impossible to do on your phone.  The process of this gets exponentially more complex the longer the URL is, so it can be very frustrating.  Second the presenter has no idea now many people actually made it from his presentation to the link, and the drop off factor of interested people goes down, when people forget they took the picture to transcribe later, the longer the URL is, and the less sense of immediacy the audience has to get the information.

### Who is last.io For

last.io is:

- **For Apps**
  Create a tag and put it on posters, billboards, or advertisements for your iPhone apps, so that your customers can download your app with ease.
- **For Presentations**
  Want to provide downloadable content or links in your presentations, and even short URL's are too complicated to have your audience copy down. Try a tag and let them visit the link with ease.
- **For Developers**
  Use our API to create short URL's and tags and embed them in your applications and websites to provide easy transfer from the computer screen to your customers mobile phones with ease.
- **For Anything**
  Create a tag or short URL for anything you can imagine to help make your content more accessible to anybody and anywhere.

### How Does last.io Work

The first thing you must do when you go to **[last.io](http://last.io)** is to enter in a URL that you want shortened:

[![image](/images/2010/06/image_thumb10.png "image")](/images/2010/06/image11.png)

After you do this you will be presented with your short url:

[![image](/images/2010/06/image_thumb11.png "image")](/images/2010/06/image12.png)

You are provided a short URL that will work just the same as any other short URL, by doing a 301 redirect to the location that you entered in.  In the above case the short URL is:

<http://last.io/1>

From here if you want a tag you will just need to click on the self explanatory “Click Here To Create A Tag” text on the right hand side of the box.  By do this it will remove the text, un-dim the image, and provide you your fresh new tag.  Which can then be clicked on to see the full size version:

[![image](/images/2010/06/image_thumb12.png "image")](/images/2010/06/image13.png)

Easy as that.

### But What If I Want To Embed The Image

Well that is actually pretty easy to do.  Because the raw image is provided by taking the short URL, in the example case above, <http://last.io/1>, and adding an exclamation point to the end of the URL like so.

[<http://last.io/1>!](http://last.io/1!)

You can do this with any of the last.io URL’s because if the URL doesn’t already have a tag when the exclamation point is added, a tag is created, and then returned for your convenience.

### Conclusion

So do you think this is something you can find a use for?  Currently there is [a very limited API](http://last.io/pages/api) for creating the URL’s, but it will soon be expanding, beyond the concept phase.