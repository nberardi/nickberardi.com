---
title: "Consensus: Bringing it all together"
date: 2014-04-02T16:46:32-05:00
slug: "consensus-bringing-it-all-together"
draft: false
tags:
  - "Consensus"
description: "This post has been a long time in the making. Actually that is sort of a lie, I completely forgot that I promised a 4 part series until my friend Jon..."
---

> This post has been a long time in the making. Actually that is sort of a lie, I completely forgot that I promised a 4 part series until my friend [Jon Galloway](https://twitter.com/jongalloway) decided to mention *consensus* in his BUILD 2014 presentation.

As part of my 4 part series in creating the app I described in my prior posts, I am going to be creating an online planning poker application for distributed teams using AngularJS, SignalR, and TypeScript. In case you missed the prior posts in the series here they are:

1. [SignalR + TypeScript](http://nickberardi.com/signalr-and-typescript/)
2. [AngularJS + TypeScript](http://nickberardi.com/angularjs-and-typescript/)
3. [SignalR + AngularJS](http://nickberardi.com/signalr-and-angularjs/)

As we saw with **SignalR + TypeScript** it is rather trivial to define the interfaces for the SignalR client in TypeScript, and by doing this it makes sure that your JavaScript code never suffers from the development angst that happens when as action methods change in your SignalR hub.

Then we saw that **AngularJS + TypeScript** was even more straight forward than *SignalR + TypeScript* because you didn't have to define and keep in sync an interface that represented your server infrastruture. The only interface you had to define was the `$scope` interface that was inherited from `ng.IScope`. All the other code was pretty much straight AngularJS both for the HTML template and the TypeScript code.

After putting everything we learned in to practice, combining **SignalR + AngularJS** was just a matter of wiring what we had already learned about in *SignalR + TypeScript* and *AngularJS + TypeScript* together.

## SingalR + AngularJS + TypeScript

You can imagin we have already done most of the leg work here, so combining all three together should be pretty straight forward at this point. The full source of the TypeScript [can be found here](https://github.com/nberardi/consensus/blob/master/src/Consensus/Scripts/consensus.pokerRoom.ts) but a good example of what we are dealing with is the `joinRoom` method in the TypeScript code, it combines everything we have been talking about pretty concisely.

```
private joinRoom(room: PokerRoom = this.room) : JQueryPromise {  
    this.$location.path("/rooms/" + encodeURIComponent(room.Name));

    var that = this;
    return this._poker.server.joinRoom(room).done(function (data) {
        that.$scope.room = data;

        var me = that.me;
        data.Cards.forEach(function (card) {
            if (card.User.Email === me.Email)
                that.$scope.myCard = card;
        });

        that.$scope.$apply();
    });
}
```

## Conclusion

Hopefully you have learned as much as I have from creating this app. I came into this fully expecting that bringing together TypeScript, AngularJS, and SignalR would be a nightmare. But after diving in, I found the experience quite a bit easier and less frustrating than I expected it to be.

Here is what the app looks like running in a couple browsers.

![screenshot of the app running in 2 browsers](/nickberardi.com/images/2014/Apr/screenshots.png)

If you want to explore and play with this web app yourself you can visit [consensus.azurewebsites.net](http://consensus.azurewebsites.net) or if you perfer to download and run the code yourself, you can find it here for your forking needs [github.com/nberardi/consensus](https://github.com/nberardi/consensus).

Best of luck! Contact me with questions.