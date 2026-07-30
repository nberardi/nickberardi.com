---
title: "Twelve Years Later"
date: 2026-07-29T21:00:00-04:00
slug: "twelve-years-later"
draft: false
tags:
  - "Personal"
  - "Amazon"
  - "Alexa"
  - "Leadership"
description: "Twelve years ago I wrote a post about moving to Seattle to join Amazon, and then I never wrote another one. Here is what happened in between: two cross-country moves, four teams, and a job that grew from one desktop client to the platform behind Alexa."
---

I ended my last post — twelve years ago this month — with a joke:

> If the next time you see me and all my hair has turned grey and fallen out you will know why.

The hair went grey. Some of it left entirely. I want the record to show that I called it.

What I did not call was the twelve-year gap between that post and this one. I never sat down and decided to stop writing. There was just always something more urgent than the blog, and then one day I looked up and the "something more urgent" had lasted over a decade. That is how these things go. Nobody announces a hiatus. You just get busy, and the getting-busy compounds.

So here is the missing decade, roughly in order.

## The Move

That last post was about leaving Philadelphia for Seattle to join Amazon. I described the logistics as "2 young kids, 2 cats, and my wife," plus a house to sell in a market that owed me nothing.

All of it happened more or less as advertised, which is to say badly and then fine. We landed in Seattle in the summer of 2014. The kids started school in a state where they knew nobody. My wife rebuilt an entire life from scratch, again, which is the part of these stories that never makes it into the announcement post.

Those two young kids are teenagers now. One of them is closer to leaving for college than to the age she was when we moved. I have no clever observation about this. It is just the single most disorienting fact of the last twelve years, and it dwarfs everything else in this post.

## Seattle: Learning What Scale Actually Means

The job I moved for was Software Development Manager for the Windows and Mac desktop clients for Amazon Cloud Drive. In the 2014 post I wrote that the alluring part "wasn't working at Amazon.com, it was working on a product that operated at the scale of Amazon."

That turned out to be true, but not in the way I meant it. I thought scale was a number of users. Scale is actually a set of problems that only appear past a certain size, and most of them are boring. Uploads that fail on hotel Wi-Fi. Files that a customer swears they backed up. Release trains that slip because six teams share one binary.

We shipped five major versions of that desktop client. Version 1.0 was, honestly, a downloader. Then an upload client, then a background uploader, then sync, then automated backup. The automated backup release is the one I am still proud of, because it moved a metric that mattered — an 82% increase in the volume of data customers actually uploaded, somewhere north of a billion files a month. The client itself grew 60% in customers in a single year, from 328,000 to 526,000.

In late 2016 I picked up the Amazon Drive business as a whole and added the iOS and Android clients. In 2017 the web and iOS teams for Prime Photos. By 2018 I was a Senior Manager running the platform teams for Amazon Photos — mobile, web, and desktop.

Two things from that stretch shaped how I have worked ever since.

The first: we got upload reliability to **99.99%** across web, Android, iOS, Windows, and Mac. Not by being clever, but by being extremely stubborn about instrumentation. You cannot fix what you cannot see, and for a long time we could not see.

The second: we took the release cadence from every-other-month to a two-week train and held **97% on-time delivery**. The lesson there was not about release engineering. It was that when a team keeps missing dates, the answer is almost never to ask them to try harder. It is to go find the constraint and remove it. Large batched releases were the constraint. Once we shipped smaller and more often, the dates stopped being a fight.

## Coming Back East

In 2021 we moved again — Seattle to the Washington, DC area, to Amazon's HQ2 in Arlington.

Moving cross-country once is an adventure. Twice is a decision. We did it to be closer to family on the East Coast, which is the reason most people eventually give for going back where they came from. I do not regret Seattle for a second, and I am also very glad to be a train ride from Philadelphia again.

## Alexa

In 2019 I moved to Alexa, and I have been there ever since.

The first stretch was Alexa Sharing, Messaging, and Announcements — about 40 engineers, working on how you connect to the people you care about through a device that has no screen and no keyboard. I wrote a three-year technical strategy for Alexa Sharing during that time. Two things happened to it that I did not expect: it survived a change of leadership over the program, and years later it became a real component of Alexa+. The underlying invention is now granted as US Patent 12,088,543.

Writing a strategy that outlives the person who approved it is, I have come to think, the actual job of a senior engineering leader. Anyone can write a plan that a sponsor likes. Writing one that still makes sense after the sponsor is gone means the reasoning has to be load-bearing, not the politics.

Since January 2021 I have been Head of Engineering for the Alexa+ platform and endpoints. That means the Alexa app, the web experience, the backend services behind Alexa endpoints, and — since 2025 — the connected accessories: Echo Buds, Echo Frames, Echo Auto.

The organization went from 25 engineers to 70, across five sites in two countries: Seattle, San Jose, Arlington, Boston, and Toronto. I lead it through five managers and a senior manager, which means most days my direct output is a document or a decision, not code. I hired around twenty engineers, promoted five to eight people a year, and grew two of my managers out of individual contributor roles. That last number is the one I would put on a plaque if I were the sort of person who made plaques.

The platform carries an app with more than 50 million monthly active users, released weekly across the Apple, Google, and Amazon app stores. But the part of the job that is genuinely hard is less visible: roughly 500 engineers across 70+ partner teams are internal customers of this platform. Effectively all of Alexa engineering builds on it. Keeping a shared codebase healthy while seventy independent teams ship into it, on their own schedules, with their own deadlines — that is the actual work. The 50 million customers are downstream of getting that right.

And then generative AI arrived and rearranged the furniture. My team built the internal test platform for Alexa+, which is how the internal beta of Amazon's LLM assistant was able to iterate quickly ahead of launch. If you want a single sentence on what my job has become: making a large, mature platform capable of real-time AI without giving up the reliability that made it worth having.

## Some Things I Believe Now That I Did Not in 2014

The 2014 version of me was a Microsoft MVP who wrote a book about ASP.NET MVC and blogged mostly about frameworks. That person would find some of this unrecognizable.

**Boring reliability beats clever architecture.** I have never once been thanked for an elegant abstraction. I have been thanked for uploads that work.

**Instrumentation is a feature.** Every serious quality problem I have fixed in twelve years started with making the problem visible. Every one.

**The constraint is rarely effort.** When a team is missing its dates, look for the mechanism that is making it hard, not the motivation that is supposedly missing.

**Growing managers is the highest-leverage thing I do.** Shipping a release helps customers this month. A manager who is good at the job helps every engineer who ever reports to them.

**Strategy is writing, and writing is thinking.** Which brings me back around to why this post exists.

## Why I'm Writing Again

Twelve years of not writing was not a decision, but it did cost something. I have spent a decade working through problems that I now only half remember the reasoning for, because I never wrote them down anywhere that outlasted the meeting.

I do not have a posting schedule to promise. I have started that promise before and broken it. What I do have is a backlog of things I have learned about scaling teams, running platforms with a lot of internal customers, and retrofitting AI into systems that were not designed for it. Some of that is worth writing down.

The blog is on Hugo now, incidentally. It started life in 2007 as *Coder Journal* on WordPress, spent years on Ghost, and more than three hundred posts made the trip to Hugo intact. The URLs from 2007 still work, which I am unreasonably pleased about.

Twelve years is a long time between posts. Let us make the next gap shorter.

---

*If you knew me from the PhillyDotNet days: yes, I still owe several of you a beer. The offer stands, and I am on the right coast for it again.*
