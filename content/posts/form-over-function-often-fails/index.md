---
title: "Form over function often fails"
date: 2009-07-06T03:20:03-05:00
slug: "form-over-function-often-fails"
draft: false
tags:
  - "ALT.NET"
  - "Le Meridian"
  - "Starwood"
  - "TDD"
  - "Unit Testing"
description: "Have you ever been asked to program something as simple as this chain lock for a door: And after it has gone through the design process, usability groups,..."
---

Have you ever been asked to program something as simple as this chain lock for a door:

![Door Chain Lock](/nickberardi.com/images/2009/07/door_chain_n183-590.jpg "Door Chain Lock")

And after it has gone through the design process, usability groups, your corporate intigration team, and any Tom, Dick, or Harry that wants to put their finger print on the project to get credit.  You end up with something like this:

At least it looks pretty, and functions once as intended. However every time the door opens after that it fails to work as the user would assume, and gives a false sense of security.

This is a major security flaw and these are the exact situations, as programmers, we are hired to prevent. I am not talking about chain locks on a door, but programs that were suppose to serve simple processes, but after going through the design and review machines it came out looking like some Frankin-program.

**This is why as developers, we must create unit tests based off requirements and not based off of the program we have created.** It is usually easier to get a unit test to pass after we have programmed something, but often times that leads to a false sense of security for both us as developers and the users who rely on the program. If the second, pretty-looking-lock, was properly unit tested based off the requirements of the first lock, **it would have never made it's way in to the high priced Le Meridian hotel in Paris**.

**Be sure to unit test to provide both a sense of security for you as the developer and an expected experience for your users.**