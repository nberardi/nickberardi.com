---
title: ".gitconfig"
date: 2011-04-18T01:50:54-05:00
slug: "gitconfig"
draft: false
tags:
  - "Git"
description: "I have been using GIT for about a year now, and over the last year I have configured some things in GIT that make my life as a developer much easier. This..."
---

I have been using GIT for about a year now, and over the last year I have configured some things in GIT that make my life as a developer much easier.  This post is going to show you my .gitconfig and hopefully accelerate your own configurations of GIT.

### Finding the .gitconfig file

*Note: all of this below assumes you are using [msysgit](http://code.google.com/p/msysgit/). If your are not using msysgit, your mileage may vary.*

The first thing you need to do is find your .gitconfig file.  By default it is installed in the root of your Windows user profile. To get started lets open it up in notepad, by running the following command after pressing **[Windows Key] + R**.

```
notepad.exe %userprofile%/.gitconfig
```

The first thing you will probably see is any configurations you have made through the command line to set your name and email and anything else you have done using the “git config” command.

### My .gitconfig

**2011-4-21**: I updated the configuration below to include comments and some extra parameters for beyond compare that label the merge section windows.

```
; user identification  
[user]
    name = /* Your Name Here */
    email = /* Your Email Here */
[github]
    user = /* GitHub User Name */
    token = /* GitHub Token https://github.com/account#admin_bucket */

; customizations
[alias]
    unstage = reset HEAD
    hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short

; environment
[core]
    symlinks = false
    autocrlf = true
[color]
    diff = auto
    status = auto
    branch = auto
    interactive = true
[http]
    postBuffer = 52428800
[pack]
    packSizeLimit = 2g

; diff and merge
[diff]
    tool = beyondcompare
    guitool = beyondcompare
[difftool]
    prompt = false
[merge]
    tool = beyondcompare
[mergetool]
    keepBackup = false
    prompt = false

# 
# beyond compare
# http://www.scootersoftware.com/
#
[difftool "beyondcompare"]
    path = /c/development/tools/beyondcompare/
    cmd = /c/development/tools/beyondcompare/bcomp.exe \"$LOCAL\" \"$REMOTE\" -nobackups -title1=\"Old Version\" -title2=\"New Version\"
    trustExitCode = false
[mergetool "beyondcompare"]
    path = /c/development/tools/beyondcompare/
    cmd = /c/development/tools/beyondcompare/bcomp.exe \"$LOCAL\" \"$REMOTE\" \"$BASE\" \"$MERGED\" -nobackups -title1=\"Local Changes\" -title2=\"Remote Changes\" -title3=\"Committed\"
    trustExitCode = false

#
# diff merge
# http://www.sourcegear.com/diffmerge/
#
[difftool "diffmerge"]
    path = /c/development/tools/diffmerge/
    cmd = /c/development/tools/diffmerge/diffmerge.exe --nosplash --title1=\"Old Version\" --title2=\"New Version\" \"$LOCAL\" \"$REMOTE\"
    trustExitCode = false
[mergetool "diffmerge"]
    path = /c/development/tools/diffmerge/
    cmd = /c/development/tools/diffmerge/diffmerge.exe --nosplash --merge --result=\"$MERGED\" --title1=\"Local Changes\" --title2=\"Merged: $MERGED\" --title3=\"Remote Changes\" \"$LOCAL\" \"$BASE\" \"$REMOTE\"
    trustExitCode = false
```

### My Diff and Merge Tools

I have my config setup to use [beyond compare](http://www.scootersoftware.com/) but I also have included [diff merge](http://www.sourcegear.com/diffmerge/) for anybody who doesn’t have or doesn’t want to spend on beyond compare. *Note: you will need to customize the paths for beyond compare and diff merge, since your paths will probably differ from mine.*

### My Alias’s

I have a couple alias’s that I use all the time, that make working with the command line interface easier. Try them out after you update your .gitconfig file.

#### Unstaging Changes

```
git unstage
```

#### History

```
git hist
```

### Conclusion

So that is my .gitconfig file, it is basic and does exactly what I need to accomplish 99% of my daily programming tasks. I encourage you to customize yours and keep it in a cherished place like you do with your Visual Studio config files, Resharper config files, and any other productivity tools you use on a daily basis.

Please share your configurations that you cannot live with out below in the comments.