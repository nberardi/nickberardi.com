---
title: ".gitignore Config File For .NET Projects"
date: 2010-05-19T14:18:58-05:00
slug: "gitignore-config-file-for-net-projects"
draft: false
tags:
  - ".NET"
  - "Git"
description: "I wanted to post this mostly for my future reference. But I think it is also equally as useful to anybody else with a .NET project that is using the Git..."
---

I wanted to post this mostly for my future reference.  But I think it is also equally as useful to anybody else with a .NET project that is using the [Git](http://git-scm.com/) as their source control, and want to make sure non-code extras that come with .NET projects don’t get checked in.

### .gitignore File

This file specifies the paths and files to ignore in your project.  Each line constitutes a new path, and each one can use basic RegEx to generalize the ignore checking.

To create the file run the following commands from your Git command prompt for windows use [msysgit](http://code.google.com/p/msysgit/), or Linux and Mac OSX you can use the native command line for this.

```
touch .gitignore  
{{ Add The Text In The Next Part }}
git add .gitignore  
git commit -am "adding ignore checking paths for this project"  
git push origin master
```

Or you can just create a file named ".gitignore" in notepad and save it and use your favorite Git client.

```
[Oo]bj/  
[Bb]in/
*.suo
*.user
/TestResults
*.vspscc
*.vssscc
```

If you have any ignore statements that you find useful for your projects, I am interested in growing this file, so leave them down in the comments.