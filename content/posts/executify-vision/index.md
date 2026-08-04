---
title: "Executify's Vision"
date: 2013-01-15T07:23:34-05:00
slug: "executify-vision"
draft: false
tags:
  - "Azure"
description: "As I explained about a month ago when I introduced Executify, I have launched a new website that works a lot like Azure Mobile Service Jobs except that..."
---

As I explained [about a month ago when I introduced Executify](/posts/welcome-to-executify/), I have launched a [new website](http://executify.com) [that works a lot like Azure Mobile Service Jobs](/posts/azure-mobile-service-jobs/) except that you have more control over the jobs and you can create them in the .NET 4.5 Framework.

Since then I have wanted to explain the vision behind it. Executify's vision is to make cloud code easier and more affordable to develop and execute. Traditionally if you want to execute code in the cloud as a background task, you are left with very few affordable options and you have to pay a monthly fee even if you only use the code a few times a month.

This is why we at Executify have developed cloud code on-demand, where you only pay for the execution time you use each month. No more, no less, and [no complicated pricing plans](http://executify.com/pricing).

## What is Cloud Code?

Our mission is to free developers from reinventing the wheel when all they really want to accomplish is a simple coding task in the cloud. We at Executify feel this pain, because we are also developers and we have run into the same problems you have run into when trying to deploy our code jobs to the cloud.

- Creating our own scheduling algorithm
- Trying to justify the costs of a cloud worker role to our bosses
- Constantly making sure the scheduled job has been run and the output has been saved

That is why we invented our Executify Cloud Code service which makes it easy to build and deploy your own on-demand cloud code that you can execute through a REST call or via a scheduled cron job. Our Cloud Code is easy to use because it is built on the same .NET Framework that powers millions of apps worldwide. The only difference is that instead of running it on your own servers, it runs in Executify's cloud. That lets you rest assured that no matter the circumstances your code will run when you want and how you want.

## Where is the Cloud Code run?

The Executify platform is built on top of the Azure cloud. As you develop and deploy your Executify Cloud Code Jobs you can rest assured that you get the scalability and performance that you have come to expect from the Azure cloud.

As an added benefit of being on the Azure platform you are able to access your Azure services without needing to do any customization or create special firewall rules. This is especially useful if you need to do clean up or run custom commands in your database on a scheduled basis.

But lets be clear, this doesn't rule out you using Executify with Amazon's AWS Cloud, it is just much easier configuration wise if Azure is your preferred platform.

## What does the future hold for Executify?

Over the next couple of weeks, I will be introducing the features and benefits of having your scheduled tasks on Executify, so stay tuned.