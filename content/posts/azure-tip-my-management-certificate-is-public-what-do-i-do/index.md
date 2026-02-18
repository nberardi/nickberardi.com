---
title: "Azure Tip: My Management Certificate Is Public What Do I Do?"
date: 2013-01-24T08:29:10-05:00
slug: "azure-tip-my-management-certificate-is-public-what-do-i-do"
draft: false
tags:
  - "Azure"
description: "Yesterday @writeameer posted on twitter a search query, using the new GitHub Code Search, showing that there are a whole lot of users on GitHub that have..."
---

Yesterday [@writeameer](https://twitter.com/writeameer) posted on twitter a search query, using the new [GitHub Code Search](https://github.com/blog/1381-a-whole-new-code-search), showing that there are a whole lot of users on GitHub that have exposed their management certificates to the public.  If you are not aware a management certificate gives you access to administer your Azure account using the Windows Azure SDK tools.  Which among other things allows you to publish, change, delete, or basically cause total havoc if it fell in to the wrong hands in your Azure account.

> @[robconery](https://twitter.com/robconery) Azure for free![github.com/search?p=2&q=M…](https://t.co/uonlTx5v "https://github.com/search?p=2&q=ManagementCertificate%3D%22&ref=searchresults&type=Code")
> — writeameer (@writeameer) [January 24, 2013](https://twitter.com/writeameer/status/294269807547805696)

### So what can be done about this?

Nothing can really be done about the old certificate being out in the public, once it is out there assume somebody has a copy of it. Luckily it is pretty easy to remove these certificates and generate new ones. Here is how you do it:

![Deleting A Certificate](/nickberardi.com/images/2013/01/Deleting-A-Certificate.png)

1. Go to: <https://manage.windowsazure.com>
2. Log in using your account credentails.
3. Go to the settings tab at the bottom of the left hand side menu.
4. Click "Management Certificates" right below the word "Settings".
5. Select a certificate, by clicking on it.
6. Click the delete button in the bottom center of the screen.
7. Repeat 5 and 6 until all certificates are deleted.
8. You can either upload a new certificate, or just wait, a certificate is usually automatically created when you publish your certain types of projects like Web Roles.

![Create New Certificates](/nickberardi.com/images/2013/01/Create-New-Certificates.png)

---

**Note:** Azure is really shaping up to be a fantastic and innovative platform, so I plan on making *Azure Tips* a weekly feature of my blog, so stay tuned for some more tips in the near future.