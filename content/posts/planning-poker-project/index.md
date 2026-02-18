---
title: "Consensus: Planning Poker Project"
date: 2013-07-02T10:00:40-05:00
slug: "planning-poker-project"
draft: false
tags:
  - "Consensus"
description: "Last Friday I decided to sit down and see how painful it would be to integrate AngularJS, SignalR, and TypeScript together to produce a useful and..."
---

Last Friday I decided to sit down and see how painful it would be to integrate AngularJS, SignalR, and TypeScript together to produce a useful and interesting tool.  The tool I decided to create was an online planning poker tool for distributed teams that need to do SCRUM planning.  I personally have a need for this, since it is very hard if not impossible to effectively to do poker planning over a conference call.

If you are not familiar with planning poker, [you can learn more here](http://en.wikipedia.org/wiki/Planning_poker), the general premise is this:

> The reason to use Planning poker is to avoid the influence of the other participants. If a number is spoken, it can sound like a suggestion and influence the other participants' sizing. Planning poker should force people to think independently and propose their numbers simultaneously. This is accomplished by requiring that all participants show their card at the same time.

To play planning poker, each player is provided a set of cards loosely-based on the Fibonacci sequence, and the following procedure is used for estimating the tasks for the upcoming sprint.
> - A Moderator, who will not play, chairs the meeting.
>
> - The Product Manager provides a short overview. The team is given an opportunity to ask questions and discuss to clarify assumptions and risks. A summary of the discussion is recorded by the Project Manager.
>
> - Each individual lays a card face down representing their estimate. Units used vary - they can be days duration, ideal days or story points. During discussion, numbers must not be mentioned at all in relation to feature size to avoid anchoring.
>
> - Everyone calls their cards simultaneously by turning them over.
>
> - People with high estimates and low estimates are given a soap box to offer their justification for their estimate and then discussion continues.
>
> - Repeat the estimation process until a consensus is reached. The developer who was likely to own the deliverable has a large portion of the "consensus vote", although the Moderator can negotiate the consensus.
>
> - An egg timer is used to ensure that discussion is structured; the Moderator or the Project Manager may at any point turn over the egg timer and when it runs out all discussion must cease and another round of poker is played. The structure in the conversation is re-introduced by the soap boxes.

Now that you have a basic understanding of what planning poker consists of, the parts of the procedure that I am going to build an application for are specifically choosing the cards, and showing them.

### Why did I choose AngularJS, SignalR, and TypeScript over other similar technologies?

No reason in particular, I have been using AngularJS, SignalR, and TypeScript for quite a while now, but I had never used any of them in conjunction with each other.  As a fun exercise to see how easy or painful it would be to use all 3 in the same project I decided to create this poker planning tool, which I called Consensus.

### Where can I find a working copy?

You can find a working copy of the Consensus software at: <http://consensus.azurewebsites.net/>

### Break down of future posts:

I am going to break this application into a 4 part series of blog posts, that deals with integrating just two components at a time. I believe this is the best approach, because not only does a combination of two of these technologies expand how relative the post will be to the audience, over all three technologies at the same time. But it also breaks up a very long topic into 4 easily digestible posts, instead of just throwing it together in one large post that is too long for anybody but the most die-hard to care about reading.

1. [SignalR + TypeScript](http://coderjournal.com/2013/07/signalr-and-typescript/)
2. [AngularJS + TypeScript](http://coderjournal.com/2013/07/angularjs-and-typescript/)
3. [SignalR + AngularJS](http://coderjournal.com/2013/07/signalr-and-angularjs/)
4. [Bringing it all together](http://nickberardi.com/consensus-bringing-it-all-together/)

Stay tuned the posts should start rolling out soon.