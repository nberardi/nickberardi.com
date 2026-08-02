---
title: "Why isn't Journalistic integrity important to Slashdot anymore?"
date: 2008-04-25T08:13:37-05:00
slug: "why-isnt-journalistic-integrity-important-to-slashdot-anymore"
draft: false
tags:
  - "Database"
description: "Slashdot has been around for over a decade now and many tech nerds first cut their teeth on Slashdot as an information source for everything tech related,..."
cover:
  image: "hero.png"
  alt: "XKCD comic titled Exploits of a Mom"
  relative: true
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

Slashdot has been around for over a decade now and many tech nerds first cut their teeth on Slashdot as an information source for everything tech related, because it predated the blogging revolution by almost a half decade.  I can say with an almost certainty that every person who visits my blog each day, has at one point in their life read Slashdot.  I know this because, many of you like myself, for many years Slashdot was the first place you visited in the morning to checkout the latest nerd-news, and it was such an honor if one of your stories actually made it the front page.  Everything was bliss because the editors of Slashdot really tried to get good content to the viewers of the site, the editors were a little slanted towards the LAMP stack, but at least the content that made it to the front page was accurate.

Now like most journalism, no facts are checked, and stories are pushed through in order to driven an agenda.  For example:

> ##### [500 Thousand MS Web Servers Hacked](http://it.slashdot.org/it/08/04/25/1358234.shtml)
>
> **Posted by kdawson on Friday April 25, @11:48AM**  
> **from the **scream-and-shout** dept.**
>
> [andrewd18](http://www.andrewd18.com/) writes *"According to F-Secure, over 500,000 webservers across the world, including some from the United Nations and UK government, have been [victims of a SQL injection](http://www.f-secure.com/weblog/archives/00001427.html). The attack uses an SQL injection to reroute clients to a malicious javascript at nmidahena.com, aspder.com or nihaorr1.com, which use another set of exploits to install a Trojan on the client's computer. As per usual, Firefox users with NoScript should be safe from the client exploit, but server admins should be alert for the server-side injection. Brian Krebs has [a decent writeup](http://blog.washingtonpost.com/securityfix/2008/04/hundreds_of_thousands_of_micro_1.html) on his Washington Post Security Blog, Dynamoo has a list of [some of the high-profile sites](http://www.dynamoo.com/blog/2008/04/nihaorr1com-theres-no-such-thing-as.html) that has been hacked, and for fun you can watch some of the [IIS admins run around in circles](http://forums.iis.net/t/1148917.aspx?PageIndex=1) at one of the many IIS forums on the 'net."*

Every person that reads my blog should have a basic understanding of why this title is 180 degrees out of whack with the actual article that is quoted.  If not here is the short description of what in this article, on Slashdot, is totally wrong and the editor who approved it **kdawson** should be fired for gross negligence.  Luckily most of the comments on the Slashdot article show a more intelligence and greater understanding of the actual problem than the Slashdot poster and editor.  But you shouldn't have to read between the lines to get the actual story from the Slashdot article.

![](exploits-of-a-mom.png)

First of all SQL injections are a result of bad programming and are platform independent.  And are usually the result of concatenating a SQL string together in code instead of using parameters in your SQL queries.  So as you can imagine scripting languages like PHP and Old ASP have a ton of problems with SQL injection, which is unfortunate because these two languages are in the top 5 languages that run the web, luckily Old ASP has been decreasing because of ASP.NET.  However just to reiterate SQL injection can happen in any language on any platform because there are bad developers that use everything language and every platform.

So basically to say that 500,000 Microsoft web servers were hacked is a gross misrepresentation of the problem that was illustrated in the article.  The original F-Secure article had to clarify that this wasn't Microsoft's problem, probably because of the Slashdot article listed above.

> We've been receiving some questions on the platform and operating systems affected by this attack. So far we've only seen websites using Microsoft IIS webserver and Microsoft SQL Server being hit. **Do note that this attack doesn't use any vulnerabilities in any of those two applications. What makes this attack possible is poorly written ASP and ASPX (.net) code.**

If you are interested in seeing all the pages effected and if one of your pages is involved you can use this [Google Link](http://www.google.com/search?q=%22%3Cscript+src%3D%22http%3A%2F%2F*1.js%22), however make sure to take precautions against getting infected.  I will leave everybody with this last posting that was left in one of the IIS forums as a sign of what good programmers are combating every day.

> I also have been hit by this attack on Saturday 4/12/08. It compromised our database and overwritten that script into all of your products. Luckily a database restore fixed the problem. Two days later the same thing happened, I have changed all the database and login passwords and did another db restore. Now today 4/18/08 we got hit again by the same thing but this time as the pages are loaded ActivX is activated and wants to run but of course I did not allow it. Anybody has successfully solved this situation?