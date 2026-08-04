---
title: "Consensus: SignalR + AngularJS"
date: 2013-07-23T10:41:22-05:00
slug: "signalr-and-angularjs"
draft: false
tags:
  - "Consensus"
description: "As part of my 4 part series in creating the app I described in my prior post, I am going to be creating an online planning poker application for..."
---

As part of my 4 part series in creating [the app I described in my prior post](/posts/planning-poker-project/), I am going to be creating an online planning poker application for distributed teams using AngularJS, SignalR, and TypeScript. In case you missed the prior posts in the series here they are:

1. [SignalR + TypeScript](/posts/signalr-and-typescript/)
2. [AngularJS + TypeScript](/posts/angularjs-and-typescript/)

As we have seen in the prior posts when working with TypeScript is that most of the work is around strongly typing the already defined contracts in SignalR and AngularJS. However a part of the integration we haven't yet discussed is how SignalR and AngularJS play together, and as we are about to see they play together rather nicely.

From the last post you were given the following example of an AngularJS controller, and in this post we are going to expand that controller to include SignalR support.

```
var app = angular.module("consensus", []);  
app.controller("PokerRoomCtrl", function ($scope) {  
    $scope.allCardsShowing = false;

    $scope.showAllCards = function (show) {
        $scope.allCardsShowing = show;
    };
});
```

*To limit the footprint of our example, I have eliminated everything except the show all cards feature. Don't worry the full app will be brought together in full functionality next post, this is just to further the goal of looking at how AngularJS and SignalR can work together.*

Given the above code the first thing that we need to do to implement SignalR is to instantiate our proxy in the controller.

```
var poker = $.connection.poker;
```

Nothing to it, standard SignalR. Now comes the integration with SignalR, in our example from above the `showAllCards` function hanging off the controller's `$scope` needs to send an indicator to our SignalR server. The purpose of this indicator is to allow the team lead to send an indication, in the form of a boolean value, to every-bodies browsers telling them to show the cards.

```
$scope.showAllCards = function (show) {  
    poker.server.showAllCards(show);
};
```

In the above code instead of just showing the local cards like the original example from above, we are sending the value of the `show` variable to the SignalR server to be broadcast to every participant in the room. To receive this broadcasted message we need to hook up our client method to change the `$scope.allCardsShowing` variable.

```
poker.client.showAllCards = function (show) {  
    $scope.allCardsShowing = show;
    $scope.$apply();
};
```

The above method receives the message sent from the SignalR server, on all the team members browsers, and changes the `$scope.allCardsShowing` variable to the value passed from the server. The only different from this method and the original version, from above, is the use of `$scope.$apply();`. `$scope.$apply();` needs to be called to trigger a context refresh of the AngularJS `$scope` since the call originated from SignalR which is outside of AngularJS.

After we put everything together, our original example has only slightly changed to accommodate SignalR.

```
var app = angular.module("consensus", []);  
app.controller("PokerRoomCtrl", function ($scope) {  
    var poker = $.connection.poker;

    $scope.allCardsShowing = false;

    poker.client.showAllCards = function (show) {
        $scope.allCardsShowing = show;
        $scope.$apply();
    };

    $scope.showAllCards = function (show) {
        poker.server.showAllCards(show);
    };
});
```

We now have AngularJS events that will broadcast intentions out to every browser that is participating in the room. In the next post I will bring AngularJS, SignalR, and TypeScript together to show the final application.

### Conclusion

As you can see getting AngularJS and SignalR working together is a lot more straight forward than any other combination we have looked at so far.

There is no source code to post this time, everything will be brought together in the final 2 posts in the series, and the full project will be available for viewing on GitHub.

1. [Bringing it all together](/posts/consensus-bringing-it-all-together/)