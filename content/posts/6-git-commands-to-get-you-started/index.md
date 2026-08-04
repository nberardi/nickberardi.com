---
title: "6 Git Commands To Get You Started"
date: 2010-05-21T03:12:51-05:00
slug: "6-git-commands-to-get-you-started"
draft: false
tags:
  - "Git"
description: "I have heard a lot of chatter on blogs and twitter about how people just don’t get git.&#160; They exclaim it is too hard to learn, too hard to work with,..."
---

I have heard a lot of chatter on blogs and twitter about how people just don’t get [git](http://git-scm.com/).  They exclaim it is too hard to learn, too hard to work with, doesn’t make sense, and on and on…  To put this bluntly, I think they are just complaining for the sake of complaining, or at the very least they never bothered to learn how to use git.  So as a remedy to this, I am publishing the only 6 git commands that you really need to know to get yourself started for a project where you are the sole-developer.

#### git init

Used to initialize the current directory as your local repository for your projects source control.

```
git init
```

#### git remote

Sets the remote, or online, repository that you want to commit your local repository to.

```
git remote add origin {{git-url}}
```

#### git add

Used to add files to be committed.  To add a single file do this:

```
git add {{filename}}
```

Or to add all the files in the current directory and all subdirectories, do this:

```
git add .
```

#### git commit

Used to commit the current changes to your local repository.

```
git commit -am "your message about what changed and why"
```

#### git status

Used to show the differences between what has been committed and the current directory.

```
git status
```

#### git push

Used to push your local repository, or in other words your committed changes, to your online repository such as [GitHub](http://www.github.com).

```
git push
```

Does the same thing as the above.

```
git push origin
```

Does the same thing as above assuming you are in the *master* branch, which is default for new Git repositories.

```
git push origin master
```

### Bring in all together

Now lets bring all these commands together as an example of how they might be used in a simplistic, but real world situation.

```
git init  
touch README  
{{ Add Some Test To Your README File }}
git add README  
git commit -am "adding the readme file to my project."  
git status  
git remote add origin git@github.com:managedfusion/coderjournal.git  
git push origin master
```

Hope this helps you get started with Git. If you are interested in some of the more advanced ways of working with Git there is an excellent tutorial put together by GitHub at <http://learn.github.com/>.  Also don’t forget to [setup your .gitignore file](/posts/gitignore-config-file-for-net-projects/).  Happy coding.