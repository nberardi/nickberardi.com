---
title: "Using Git Bash in Console2"
date: 2012-05-21T12:48:03-05:00
slug: "using-git-bash-in-console2"
draft: false
tags:
  - "Git"
description: "After reading Scott Hansleman's post about Console2 I decided to give it a try full time. Overall I have to say I am very impressed and have no intention..."
---

After reading [Scott Hansleman's post](http://www.hanselman.com/blog/Console2ABetterWindowsCommandPrompt.aspx) about [Console2](http://sourceforge.net/projects/console/) I decided to give it a try full time. Overall I have to say I am very impressed and have no intention on switching back. It really is an impressive application, so if you are interested in trying something different, go to Scott's post and follow his directions on setting it up.

As a long time [mysysgit](http://code.google.com/p/msysgit/) user for all my Git source control needs, I decided to find out if I could marry the two together to create a nice intersection between Console2 and msysgit's Bash client.  And after a bit of searching and stumbling on [my own post](http://coderjournal.com/2011/03/adding-git-command-line-to-visual-studio/) about setting up the bash client in Visual Studio, I answered my own question on how to set it up for Console2.  Here is what I cam up with:

- **Title:** Git Bash
- **Icon:** C:\Program Files (x86)\Git\etc\git.ico
- **Shell:** C:\Windows\SysWOW64\cmd.exe /c ""C:\Program Files (x86)\Git\bin\sh.exe" --login -i"

![](http://coderjournal.com/uploads/2012/05/Console2.png "Console2")