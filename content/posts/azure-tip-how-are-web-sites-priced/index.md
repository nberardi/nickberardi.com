---
title: "Azure Tip: How are Web Sites priced?"
date: 2013-01-31T10:19:00-05:00
slug: "azure-tip-how-are-web-sites-priced"
draft: false
tags:
  - "Azure"
description: "One of the questions that comes up often related to Azure Websites is: How are Web Sites priced? To understand how they are priced you have to understand..."
---

![Azure Websites](/nickberardi.com/images/2013/01/Azure-Websites.png)One of the questions that comes up often related to Azure Websites is: **How are Web Sites priced?**

To [understand how they are priced](http://www.windowsazure.com/en-us/pricing/calculator/) you have to understand what a Web Site is to Azure. To Azure a Web Site, in its most simple definition, is: A single app pool tied to a single site running in IIS on a virtual machine.

Now that we understand this let's look at the pricing models. Their are three tiers:

- **Free** - You share a virtual machine with many other customers and you have to use as domain name supplied by Azure. Your web sites may or may not be on the same virtual machine with the others.
- **Shared** - You share a virtual machine with a few other customers and can use your own domain name. Your web sites may or may not be on the same virtual machine with the others.
- **Reserved** - You have a reserved virtual machine that is only for your use and you can use your own domain name. Your web sites will be on the same virtual machine with you others in the same region.

As you know now, the virtual machines and how they are shared is the main deciding factor in what tier you choose and the price you pay.  But lets break it down a little, because the pricing model changes on the tier you choose.

Before we get into the break down of the tiers and how their pricing differs it is good to understand one thing, every tier we talk about is priced per region. As of writing this post there are 5 tiers.

- West US
- East US
- East Asia
- West Europe
- North Europe

### Free

You can run up to **10 Web Sites** per sub-region for free in a multi-tenant environment.  What this means is that each data-center you can run up to **10 web sites for free**.

### Shared

You can run your production site in a multi-tenant environment with support for custom domain names.  Notice that unlike the free tier that there was no mention of how many web sites you were allowed to have per region.  There is a very good reason for this, that is because you are billed out per website that you setup.  As of writing this the price is **$9.36 per website per region per month**.

### Reserved

You can load balance up to **100 Web Sites** across instances dedicated to your apps with support for custom domain names.  Notice that like the free tier there is a limit on the number of web sites you can run, it is 10 times more than the free tier, but there is still a limit.  You may be asking why the difference from the Shared tier, well there is a very good reason for this and it relates back to how the Reserved tier differs from Free and Shared.  In the Reserved tier you are billed per virtual machine instance per region per month.  And Microsoft has determined you shouldn't have more than 100 web sites per virtual machine.

Now that you know you pay per virtual machine instance per region per month, you have options as to the speed and amount of RAM that your virtual machine has similar to the options the rest of Azure enjoys.  Here is the break down:

- **Small VM** (1.6GHz CPU, 1.75 GB RAM) - **$57.60 per region per instance per month**
- **Medium VM** (2 x 1.6GHz CPU, 3.5 GB RAM) - **$115.20 per region per instance per month**
- **Large VM** (4 x 1.6GHz CPU, 7 GB RAM) - **$230.40 per region per instance per month**

*The thing to know and understand is that when you switch the tier from Shared to Reserved or vice versa all your websites are moved at once to the other tier.  Because of how they are priced and the complexity of the different tiers this is the current approach that Microsoft is using.  So in other words, per region you can only have one tier of pricing.*

### Conclusion

Unlike other services in Azure, the Web Sites is a rather complex pricing model because of the multiple tiers, and at a certain level of websites or usage it may make sense to move from a Shared tier to a Reserved tier.  So if you have more than 6 web sites or you are blowing through your usage limits it may make sense for you to move up to the reserved tier to keep your web site running and to save money.

---

**Note:** Azure is really shaping up to be a fantastic and innovative platform, so I plan on making *Azure Tips* a weekly feature of my blog, so stay tuned for some more tips in the near future.