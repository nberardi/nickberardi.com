---
title: "Consensus: SignalR + TypeScript"
date: 2013-07-03T10:00:02-05:00
slug: "signalr-and-typescript"
draft: false
tags:
  - "Consensus"
description: "As part of my 4 part series in creating the app I described in my prior post, I am going to be creating an online planning poker application for..."
---

As part of my 4 part series in creating [the app I described in my prior post](/posts/planning-poker-project/), I am going to be creating an online planning poker application for distributed teams using AngularJS, SignalR, and TypeScript.

In this first post, I would like to talk about bringing **SignalR and TypeScript** together to create a solution that follows the best practices of both frameworks. To get started we are first going to need to make sure we have the TypeScript definition for SignalR added to our project, and to do this you need to run the following on NuGet.

```
Install-Package signalr.TypeScript.DefinitelyTyped
```

If you have never used SignalR before, you may want to [familiarize yourself with the SignalR basics](http://www.asp.net/signalr/overview/hubs-api/hubs-api-guide-javascript-client).  In the app we have the following client and server endpoints.

| Server | Client |
| --- | --- |
| `join` |  |
| `joinRoom` | `userChanged` |
| `leaveRoom` | `userRemoved` |
| `resetRoom` | `resetRoom` |
| `showAllCards` | `showAllCards` |
| `changeRoomTopic` | `roomTopicChanged` |
| `changeChard` | `cardChanged` |

*(each row shows a server call and a resulting client call that is broadcast to all users in the planning poker room)*

Typically you would make calls like this:

```
var poker = $.connection.poker;  
poker.client.userChanged = function (user) {  
    console.log("user " + user.Name + " changed");
};
$.connection.hub.start().done(function () {
    $("#join").click(function () {
         poker.server.joinRoom({ Name: $("#roomName").val() }, { Name: $("#userName").val() }).done(function(room) {
             console.log("joined " + room.Name + " room and " + room.Users.length + " are present");
         });
     });
});
```

The only problem with this approach is that TypeScript knows nothing about the custom proxy that was generated at `$.connection.poker`, so it will throw errors and not allow the compilation of the code to continue. There are ways to get around this by not using the generated proxy as described in the guide I linked to earlier, but that is not type safe and really doesn't take advantage of any of the benefits that TypeScript's type safety offers. Lets do it the right way, and to do it the right way to gain the type safety we need to define our client and server interfaces to TypeScript.

The first thing we need to do is tell TypeScript about our generated proxy called `poker`.

```
interface SignalR {  
    poker: HubProxy;
}
```

You do that by extending the SignalR type interface in your typescript file. *Note that this extension of SignalR has to be done out side of the module namespace.* Next lets extend `client` and `server` extensions off of the `HubProxy` interface. This will provide us with interfaces to define our methods for the endpoints we talked about earlier in the table above.

```
interface HubProxy {  
    client: IPokerRoomClient;
    server: IPokerRoomServer;
}
```

This extends `HubProxy` in a similar way that we extended the `SignalR` interface by just adding additional properties to an already existing interface. The last thing we need to do is define the endpoint methods for our `client` and `server`. Which you can find here.

```
interface IPokerRoomClient {  
    userChanged(user: Consensus.PokerUser);
    userRemoved(user: Consensus.PokerUser);

    resetRoom(room: Consensus.PokerRoom);
    showAllCards(show: boolean);
    roomTopicChanged(topic: string);
    cardChanged(card: Consensus.PokerCard);
}

interface IPokerRoomServer {  
    join(user: Consensus.PokerUser): JQueryPromise;
    joinRoom(room: Consensus.PokerRoom): JQueryPromise;
    leaveRoom(room: Consensus.PokerRoom, user: Consensus.PokerUser): JQueryPromise;

    resetRoom(room: Consensus.PokerRoom): JQueryPromise;
    showAllCards(room: Consensus.PokerRoom, show: boolean): JQueryPromise;
    changeRoomTopic(room: Consensus.PokerRoom, topic: string): JQueryPromise;
    changedCard(room: Consensus.PokerRoom, value: string): JQueryPromise;
}
```

The above interfaces define the type safe endpoint methods for both the client and server side of SignalR. A couple new types were defined in the above code for types we haven't yet talked about. These are object types that match exactly what is used on the server side.

```
module Consensus {  
    export class PokerUser {
        public Name: string;
        public Email: string;
        public Disconnected: string;
    }

    export class PokerRoom {
        public Name: string;
        public Topic: string;
        public Users: PokerUser[];
        public Cards: PokerCard[];
    }

    export class PokerCard {
        public User: PokerUser;
        public Value: string;
    }
}
```

These types will make more sense when we actually walk through the server side code, but for now here they are. You can see all this put together here: [consensus.pokerRoom.ts](https://gist.github.com/nberardi/5904129#file-consensus-pokerroom-ts). Next lets go over the C# equivalents of the above.

```
namespace Consensus.Models  
{
    public class PokerUser
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public DateTimeOffset? Disconnected { get; set; }
    }

    public class PokerRoom
    {
        public PokerRoom()
        {
            Users = new List();
            Cards = new List();
        }

        public string Name { get; set; }
        public string Topic { get; set; }

        public virtual ICollection Users { get; set; } 
        public virtual ICollection Cards { get; set; } 
    }

    public class PokerCard
    {
        public PokerUser User { get; set; }
        public string Value { get; set; }
    }
}
```

The above are one-to-one matches of their TypeScript counter part. Having a one-to-one match isn't necessary for everything to work, but it makes life easier. The rest of the code for this post is creating working hub methods for SignalR, which I am going to briefly cover to bring our original JavaScript example in for a full loop. I am just doing this for completeness because there are many other articles on the web that deal with the topic of creating SignalR hub methods, including the article I originally referenced above.

```
public PokerRoom JoinRoom(PokerRoom room)  
{
    var user = _users.Where(x => x.Key == Context.ConnectionId).Select(x => x.Value).FirstOrDefault();

    if (user == null)
        throw new Exception("No user with this connection Id has joined yet.");

    _logger.Info("{0} joined {1} room", user.Email, room.Name);

    room = _rooms.FirstOrDefault(x => x.Name == room.Name) ?? room;

    if (!_rooms.Contains(room))
        _rooms.Add(room);

    if (room.Users.All(x => x.Email != user.Email)) {
        room.Users.Add(user);
    }

    // tell the people in this room that you've joined
    Clients.Group(room.Name).userChanged(user);

    Groups.Add(Context.ConnectionId, room.Name);

    return room;
}
```

From the original endpoint table this hub method covers the 2nd row after the header for the `joinRoom / userChanged` server and client methods. If you would like to view the rest of the methods for this hub, you can see all this put together here: [Poker.cs](https://gist.github.com/nberardi/5904129#file-poker-cs).

### Conclusion

As you can see getting SignalR and TypeScript working together isn't as straight forward as other frameworks like jQuery because the auto proxy generation. Ultimately TypeScript may seem like a pain to setup initially because of the little extra work you have to do at the beginning of a project to define your proxy interfaces. However in the end you have a type safe interface for your client and server endpoint methods, which will save you time in the long run.

If you would like to view all the source for this post, you can find it here at the GitHub Gist I setup. <https://gist.github.com/nberardi/5904129>. Best of luck and stay tuned for the next 3 posts in the series.

1. [AngularJS + TypeScript](/posts/angularjs-and-typescript/)
2. [SignalR + AngularJS](/posts/signalr-and-angularjs/)
3. [Bringing it all together](/posts/consensus-bringing-it-all-together/)