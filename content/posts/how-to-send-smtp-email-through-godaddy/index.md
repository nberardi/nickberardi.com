---
title: "How To: Send SMTP Email Through GoDaddy"
date: 2010-10-25T14:18:53-05:00
slug: "how-to-send-smtp-email-through-godaddy"
draft: false
tags:
  - "Email On-Demand"
  - "Smart Host"
  - "SMTP"
  - "SMTP Relay"
description: "Note I cannot endorse the SocketLabs service anymore. Everything below works with any SMTP service. If you would like great alternatives please give the..."
---

> ### Note
>
> I cannot endorse the SocketLabs service anymore. Everything below works with any SMTP service. If you would like great alternatives please give the people at:
>
> - [Postmark](http://postmarkapp.com) a try for transaction email
> - or if you need to send bulk email please try out [SendGrid](http://sendgrid.com)

So you have a GoDaddy server and you want to send email through your newly acquired [SMTP Relay](http://coderjournal.com/2010/10/easy-mail-delivery-with-smtp-smart-host/). Well “[you can’t](http://stackoverflow.com/questions/4005929/unable-to-send-mail-using-system-net-mail-and-godaddy-smtp)” is probably what you are going to find if you do some poking around Google.

If you poke around a little more you will probably find GoDaddy’s official solution is to [use their internal mail relay](http://help.godaddy.com/article/122).  This is not ideal, because of arbitrary barriers they have set, such as this one:

> Our dedicated servers have an outbound email limit of 1000 per day. If you need to send more than 1000 emails per day, please call Customer Support or open a support ticket to request a higher limit.

I shouldn’t have to justify my use cases and business to a company that I am paying over $200 a month for a dedicated server.

But all is not lost, and I could still use the free email relay I created in my [previous post](http://coderjournal.com/2010/10/easy-mail-delivery-with-smtp-smart-host/). As I was searching around the SocketLabs support site I discovered the solution I was looking for and found that alternative ports have been opened to get past the port 25 filtering that a lot of residential cable companies and internet service providers force upon you.  I found this in the SocketLabs support system:

> ##### Using SocketLabs Email On-Demand With a Residential Internet Cable Service and Alternate SMTP Ports
>
> If you are going to be sending email through your residential cable internet service you should be aware that most of these ISPs will block access to third party SMTP servers through the default port 25. In this case you can use the alternative port of 2525 when configuring your SMTP connection to get around this problem.

This seemed to be exactly what I was looking for.

To start, we need to pick up where we left off in my previous [smart host blog post](http://coderjournal.com/2010/10/easy-mail-delivery-with-smtp-smart-host/), we need to configure the outgoing port that our smart host will connect to.  By doing this we accomplish the exact same goal as when I first setout of not having to change a single thing in your already functioning and setup applications.  To configuration the alternative port, follow these 4 steps:

1.  In **IIS Manager**, **right-click** the SMTP virtual server, and then **click Properties**.

1. Click the **Delivery tab**, and **click Outbound connections**.
2. In the **Outbound Connections** dialog, set the **TCP port** to “2525” as picture below

[![outbound-connections](/images/2010/10/outboundconnections_thumb.png "outbound-connections")](/images/2010/10/outboundconnections.png)

4.  **Click OK** and then **then you are done**.

To verify that it was working, I sent a test email to one of my email addresses and received an email that contained both receiving headers.  One header from the localhost and then one from my SocketLabs relay server, as was originally shown in my previous post.  Here are the receiving headers from the test email I sent using the alternative port:

```
Received: from server ([69.59.171.172]) by mxsp2.email-od.com with ESMTP; Mon, 25 Oct 2010 21:44:09 -0400  
Received: from server ([127.0.0.1]) by 26294-68734 with Microsoft SMTPSVC(7.5.7600.16601); Mon, 25 Oct 2010 18:44:10 -0700  
Subject: Web Site Information Request  
From: "Managed Fusion No Reply" noreply@managedfusion.com
```

I first discovered this setback with GoDaddy, as I was testing my smart host setup on a GoDaddy dedicated server.  This was sort of a pain in the you know what, but it is understandable and appreciated that they go through basic steps to stop spammers on their infrastructure. Luckily for me SocketLabs Email On-Demand has come through with a solution for their customers.