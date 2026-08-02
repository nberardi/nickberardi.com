---
title: "Mozy Backup Review"
date: 2007-04-04T05:33:30-05:00
slug: "mozy-backup-review"
draft: false
description: "Just over 5 months ago I lost a ton of data in the process of a couple stupid moments, this included code I had not backed up, some documents, iTunes..."
cover:
  image: "/images/2007/04/mozy-config-backup-sets1.png"
  alt: "Mozy Backup Review"
  relative: false
  hidden: false
  hiddenInSingle: false
  hiddenInList: false
---

Just over 5 months ago I lost a ton of data in the process of a couple stupid moments, this included code I had not backed up, some documents, iTunes music, pictures, and database data that I had been collecting for many years. I was lucky I could get most of this back through some old backups, but I pretty much lost a good months worth of data. From that day on I vowed to never have this happen again, so I started on a hunt to find the best solution for backing up my wifes desktop and my laptop. I first went the route of backing up my laptop to an internal network storage drive, but I with in a few days realized that my data wasn't really protected it was just duplicated and could easily be lost in, god forbid, a house fire. So I knew I needed to pay somebody to keep my data in a place other than my house, so I set out to find the best online backup solution for the smallest budget. It had to be:

- **Reliable** in that I do not want the service here today, gone tomorrow.
- **Fast** in that I do not want it to take weeks to upload 15 GB.
- Data is **easily assessable** from the web and PC.
- **Secure** in that I do not want my data to be openly readable.
- **Configurable** in that I want control over what is backed up.
- **Unlimited** in that I didn't want my bill to rise over time.
- A nice to have would be **Versioning** of my files, where versions over time of the same file are kept in tact.

After looking at Amazon, xDrive, and Carbonite I eventually stumbled across a service called [Mozy](http://mozy.com "Mozy Online Backup"), it seemed to have everything I wanted for a price that worked for me and my wife.

## Mozy LogoMozy Features

Mozy offers two services one that is a [free service](https://mozy.com/registration/free) and you can only backup up to 2GB of data, or the second is an [unlimited service](https://mozy.com/registration/unlimited) for $4.95 a month for unlimited amounts of data backup. Mozy offers the following features:

- 128-bit SSL support (to secure your data during transport)
- 448-bit Blowfish encryption (to secure your data on their server)
- Continuous or scheduled backup options
- New/Changed file detection
- Supports files larger than 3GB's
- Bandwidth throttling

## Setting Up Mozy

What I personally liked about the service was how easy it was to get going, with literally 3 clicks of the mouse I was backing up my hard drive to the Mozy servers. It took me only 3 days to backup my almost 20 GB of data, I let the service run day and night to make sure everything was backed up in the least amount of time as possible.

The Mozy backup process runs as a Windows Service, so it is unobtrusive and you can just start up your computer and forget it is even running.

[![Mozy Backing Up](/images/2007/04/mozy-backing-up.thumbnail1.png)](/images/2007/04/mozy-backing-up1.png "Mozy Backing Up") [![Mozy Status](/images/2007/04/mozy-status.thumbnail1.png)](/images/2007/04/mozy-status1.png "Mozy Status")

## Mozy Website

The Mozy website is clean and very easy to use, it is your main portal for modifying your account information, such as billing and address information, adding or removing computers from your account, and doing a web restore.

I have used the website a couple of times to grab presentations that I left at home on my computer by mistake. It is not the intended use of the service, but it is nice to know my information is at my finger tips as long as I have internet access.

### Restoring Your Files

Mozy does a great job at quickly packaging up your files so they can be downloaded. What you do to restore your files, is login to the website, select the files you want restored, and they then start the packaging process. You will receive an e-mail when the process is done packaging your files for download, the packaging process will vary depending on how many files you want restored. For instance I tested the service by having them package my 20 GB worth of data, and it only took 20 mins from me clicking the button on the website till I received notification that I could download the files. The package that they create is a [7-Zip](http://7-zip.org/) executable, which I have to give them credit for because it has some of the best compression available. Since it is an executable you do not need to have the *7-Zip* program installed on your computer. From my experience it is a very easy process from start to finish, in a time when people are probably pulling their hair out because they lost all their data, the ease of the restore is welcomed.

If you have a slow broadband connection, you can also choose to have them FedEx you files to you on DVD for a nominal price.

[![Mozy My Account](/images/2007/04/mozy-myaccount.thumbnail1.png)](/images/2007/04/mozy-myaccount1.png "Mozy My Account") [![Mozy My Computers](/images/2007/04/mozy-mycomputers.thumbnail1.png)](/images/2007/04/mozy-mycomputers1.png "Mozy My Computers") [![Mozy Restore](/images/2007/04/mozy-restore.thumbnail1.png)](/images/2007/04/mozy-restore1.png "Mozy Restore") [![Mozy Restore 2](/images/2007/04/mozy-restore2.thumbnail1.png)](/images/2007/04/mozy-restore21.png "Mozy Restore 2")

## Mozy Shell Integration

Mozy is integrated in to the Windows Explorer shell, I am using Windows Vista Ultimate x64, and I haven't used the shell integration all that much, however I have used it once or twice to retrieve previous versions of my files. It works just as it is suppose to and is much easier than doing a restore from the website especially when you only need one file. The only thing that really bothered me was the naming under Windows Vista was very similar to the Windows Vista service that does the same thing for locally stored backups.

I would love to see Mozy integrate their restore system with the Windows Vista restore system, it would be a welcomed value-add feature.

[![Mozy Backup Drive](/images/2007/04/mozy-backup-drive.thumbnail1.png)](/images/2007/04/mozy-backup-drive1.png "Mozy Backup Drive") [![Mozy Restore 4](/images/2007/04/mozy-restore4.thumbnail1.png)](/images/2007/04/mozy-restore41.png "Mozy Restore 4") [![Mozy Restore 3](/images/2007/04/mozy-restore3.thumbnail1.png)](/images/2007/04/mozy-restore31.png "Mozy Restore 3")

## Mozy Configuration

One of my favorite features of the Mozy service is the level of configuration and control I have over how my files are backed up. In addition to the ability to create backup sets, which is the idea of grouping all your *Music* or *Documents* or anything else you want to define in a backup package that can be downloaded. The *Backup Set Editor* has much of the same feel as the *iTunes Dynamic Play List*, which makes it very easy to define some custom and complex rules for you backups.

[![Mozy Config Backup Sets](/images/2007/04/mozy-config-backup-sets.thumbnail1.png)](/images/2007/04/mozy-config-backup-sets1.png "Mozy Config Backup Sets")  [![Mozy Config File System](/images/2007/04/mozy-config-file-system.thumbnail1.png)](/images/2007/04/mozy-config-file-system1.png "Mozy Config File System") [![Mozy Config Schedule](/images/2007/04/mozy-config-schedule.thumbnail1.png)](/images/2007/04/mozy-config-schedule1.png "Mozy Config Schedule") [![Mozy Config Options](/images/2007/04/mozy-config-options.thumbnail1.png)](/images/2007/04/mozy-config-options1.png "Mozy Config Options") [![Mozy Config History](/images/2007/04/mozy-config-history.thumbnail1.png)](/images/2007/04/mozy-config-history1.png "Mozy Config History") [![Mozy Backup Set Editor](/images/2007/04/mozy-backup-set-editor.thumbnail1.png)](/images/2007/04/mozy-backup-set-editor1.png "Mozy Backup Set Editor")

## Customer Support:

Mozy customer support is great, they are very responsive to any problems you might have. I will not do them justice by writing about it. So I thought I would include an e-mail they sent out January 24, 2007 that really sums up how they treat their customers. If you are a long time reader you know how much I love to hear stories about [companies doing right by their customers](http://www.coderjournal.com/2007/01/update-from-adobe/ "Update from Adobe").

> Date: Wed, 24 Jan 2007 14:07:19 -0700
> From: Josh Coates (\*\*\*\*@mozy.com)
> Subject: [Mozy Support] Mozy: Complimentary service extension
> As some of you may have noticed, the month of December and early January was a challenging time for us. We were overwhelmed by the demand for the Mozy backup service, and had a difficult time keeping up.
> Well, **we've caught up now** - but we undoubtedly upset some of you in the process. When you signed up, we made a commitment to protect your data and support the service you purchased. We didn't keep our end of the deal, and we fumbled the ball by not giving you the excellent support and service that you paid for.
> The good news is that even though we had some network glitches and slow support responses, we did manage to handle approximately 1.7 million backups during that rough period.
> We **now have an excellent support staff**, and emails are typically answered within an hour or two during business hours, and of course we have **live chat** as well if you need real-time support.
> So, to try and make up for the problems we've experienced, and to **thank you** for hanging in there, we like to offer you the follow options:- If you had a **really frustrating experience**, click here to get 3 months free service added to your account.
> - If you hit **some glitches,** but everything mostly worked out for you, click here to get 2 months free service added to your account.
> - If things went **just fine** this last month, click here to get 1 month free service added to your account.
> - But if you'd rather just let us know you're doing okay and **you don't need the extra month** of free service, click here to let us know.
> If you have any questions or feedback, don't hesitate to email me personally.
> We're here to protect your data - and we **thank you** for hanging in there during our growing pains.
> -josh
> Founder, CEO
> Mozy.com, Berkeley Data Systems, Inc.

## Conclusion

I highly recommend Mozy to any and all of my readers. As a fellow coder there is no worse feeling then losing your code that you have worked on very hard and built up over the years. Or losing any of the precious moments that you have in your digital photo albums. Having a good backup plan is important in this day and age and Mozy is the right solution for the Home user.

### Pros:

- Software is very user-friendly and customizable at the same time.
- Automatically backs up all your files, with no user intervention.
- Very small memory footprint, so it will work on most if not all machines from Year 2000 on.
- Unlimited storage for only $4.95
- Their customer support is top notch.
- Works on Vista 32-bit, Vista 64-bit, Windows XP, Windows 2000

### Cons:

- If you're on dial up or a slow internet connection, backups could take weeks.
- Does not work with Mac OS X or Linux

### Mozy Pro

If you are a business user I recommend trying [Mozy Pro](http://mozypro.com), in addition to everything I listed above, it has some [additional features](http://mozypro.com/mozy_pro/comparison) useful to businesses like a great service that has the ability to backup SQL Server, Exchange Server, as well as your File Servers. If I ever have the chance or the need to try Mozy Pro I will be sure to do a review.

To learn more about either Mozy or Mozy Pro visit their site at:

- **Mozy Pro**
  <http://mozypro.com/mozy_pro/learn_more>
- **Mozy**
  <http://mozy.com/mozy/overview>