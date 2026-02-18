---
title: "Coder Journal's New Year Make Over"
date: 2008-01-26T04:07:08-05:00
slug: "new-year-makeover-wordpress-seo-sem"
draft: false
tags:
  - "GoDaddy"
  - "How To"
  - "sem"
  - "SEO"
  - "Technorati"
  - "theme"
  - "wordpress"
  - "YSlow"
description: "New Theme My first major change was the development of my own theme. My old theme was clunky and overall I didn't like the feel that it gave to my reader..."
---

### New Theme

My first major change was the development of my own theme. My old theme was clunky and overall I didn't like the feel that it gave to my reader base. I became greatly discouraged looking for a new theme as most are more of a testament to art and less on readability and functionality. So I decided to create my own that had a very simple layout.

### Optimization of Load Time

One of the things I hated about my other blog was the fact that I didn't have control over how the HTML and thus JavaScript was laid out. Especially the JavaScript because I had duplication where I didn't need it. The script that Technorati gives you is hardly optimized for load time because of duplication of a supporting script file.

```
<a class="tr-linkcount" href="http://technorati.com/search/{your URL here}">View blog reactions</a>  
<script src="http://technorati.com/linkcount" type="text/javascript"></script>
```

If you notice the 2nd line in the script above never changes. Well to optimize this I only included the 1st line in my post text and the 2nd line is at the bottom of the page with the rest of my JavaScript.

The next thing I did was optimize my load time using YSlow. [See Jeff Atwoods Description.](http://www.codinghorror.com/blog/archives/000932.html "YSlow: Yahoo's Problems Are Not Your Problems")

1. Add Expires headers to all my static content for 10 years from the day it is downloaded.
2. Enabled Gzip compression for all my static content.
3. Put all CSS at the top of the page.
4. Reduced all DNS lookups by downloading images from LinkedIn, Technorati, and others and hosted them locally.
5. Moved all JavaScript to the bottom of the page.
6. Removed duplicate Technorati scripts.

I also moved hosts from GoDaddy's shared Linux hosting. To GoDaddy's virtual dedicated hosting on Windows. This proved difficult since URL Rewriting isn't currently built in to IIS 6.0 like it is in Apache. I will talk a little about this setup in a later post.

### SEO and SEM

I did a decent amount of SEO and SEM work to get my blog up to snuff. I took the following steps when redesigning the HTML for easy of indexing by Search Engines and Googles Media Bot (Used for giving relevant results in AdSense)

1. I download the MySQL file from the database and normalized all the URL's to the one you see above.
2. Google AdSense only allows you to have 3 AdUnits per page and the placement of the AdUnits counts. For instance I had to red0 my theme so the content was before the sidebar, in terms of the HTML, so that the AdUnit in the articles placed first so that it received the highest quality Ad.
3. I reduce my categories to a handful of manageable ones, and migrated the rest to the new Tags feature.
4. Use H1, H2, and H3 tags sparingly. They should be a way to document the internal structure of your HTML page. (i.e. logical sections) My logic is as follows
   1. H1 is used for the blog title.
   2. H2 is used for the article title.
   3. H3 is used for sections of the article.
  
5. I started using the Post Slug is very important and should abide by the following rules
   1. No more than 3-7 keywords
   2. No common English words such as (if, about, when, my, etc.)
  

  
So that was how I spent my holiday creating a new design for my blog. If you have any suggestions, I am all ears about how I can improve my blog for the better.