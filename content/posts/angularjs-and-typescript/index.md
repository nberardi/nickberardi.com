---
title: "Consensus: AngularJS + TypeScript"
date: 2013-07-12T11:00:52-05:00
slug: "angularjs-and-typescript"
draft: false
tags:
  - "Consensus"
description: "As part of my 4 part series in creating the app I described in my prior post, I am going to be creating an online planning poker application for..."
---

As part of my 4 part series in creating [the app I described in my prior post](/posts/planning-poker-project/), I am going to be creating an online planning poker application for distributed teams using AngularJS, SignalR, and TypeScript. In case you missed the post that started off this series here it is:

1. [SignalR + TypeScript](/posts/signalr-and-typescript/)

In this second post, I am planning to continue putting the puzzle pieces together with **AngularJS and TypeScript**, using the strengths of both technologies to make a harmonious solution. To get started we are first going to need to make sure we have the TypeScript definition for AngularJS added to our project, and to do this you need to run the following on NuGet.

```
Install-Package angularjs.TypeScript.DefinitelyTyped
```

If you have never used AngularJS before, you may want to [familiarize yourself with the AngularJS basics](http://angularjs.org/). In our app we are going to have the following application and controller.

- ng-app="**consensus**"
- ng-controller="**PokerRoomCtrl**"

Typically you would have controller code that looks like this:

```
var app = angular.module("consensus", []);  
app.controller("PokerRoomCtrl", function ($scope) {  
    $scope.room = {
        Name: "our room",
        Topic: "our topic",
        Users: [{ ... users ... }],
        Cards: [{ ... cards ... }]
    };

    $scope.myCard = {
        Value: "",
    };

    $scope.$watch("room.Name", function (value) {
        if (!value) return;
        $location.path("/rooms/" + encodeURIComponent(value));
    });

    $scope.allCardsShowing = false;

    $scope.myCardValueChanged = function () {
        alert("Card changed to " + $scope.myCard.Value);
    };

    $scope.showAllCards = function (show) {
        $scope.allCardsShowing = show;
    };
});
```

But it has the same strong typing problem that SignalR had when it came to TypeScript. But luckily for us with a little adjustment to the above code it is very easy to get TypeScript to play nice and actually benefit your AngularJS code.

As with SignalR, it is necessary to create an interface that will strongly type our code. In the case of SignalR we had to create a strongly typed client and server interface to interface with the backend server. As you probably already know, everything in AngularJS is based on a primary parameter called `$scope`, and that won't change when using TypeScript, however we are going to strongly type it, and for out example it will look something like this with our scope interface extending `ng.IScope`.

```
export interface IPokerRoomScope extends ng.IScope {  
    myCardValueChanged();
    showAllCards(show: boolean);

    allCardsShowing: bool;

    room: PokerRoom;
    myCard: PokerCard;
}
```

Now that we have our scope defined lets see how creating a controller for AngularJS is effected when doing it in TypeScript. In AngularJS the typical controller looks something like this:

```
function PokerRoomCtrl ($scope) {  
    ...
}
```

Instead of creating a `function` as defined above we are going to create a `class` with a `constructor` that takes `$scope` in TypeScript:

```
export class PokerRoomCtrl {  
    constructor(private $scope: IPokerRoomScope) {
        ...
    }
}
```

As you can see they are very familiar in structure, however they look even more closely related when you take a look at the JavaScript that is generated from TypeScript.

```
var PokerRoomCtrl = (function () {  
    function PokerRoomCtrl ($scope) {
        this.$scope = $scope;
        ...
    }
    return PokerRoomCtrl;
})();
```

To AngularJS the reference controller I showed above and the TypeScript generated controller are essentially the same thing in JavaScript, which is why AngularJS and TypeScript work together without too much hassle.

The `$scope` parameter is a dependency of the controller that is injected. You can read more about AngularJS and dependency injection [here](http://docs.angularjs.org/guide/di). The reason I bring this up, is because once you understand how AngularJS injects dependency into your controller, you'll realize that minimizers destroy AngularJS's ability to do dependency injection. And exceptions like this will be generated in your JavaScript console in the browser.

```
Error: Unknown provider: XProvider <- X
```

Because it is common place to minify JavaScript code, it is **highly recommended** that you specify an `$inject` property in your code. You can read more about the [`$inject` property here](http://docs.angularjs.org/guide/di#dinjectannotation). To do the same in TypeScript you simply have to add the following to your controller class.

```
// protect the injection from minification  
static $inject = ['$scope'];
```

The last recommendation for working with AngularJS and TypeScript is for you to define the controller class in the AngularJS app, which you may remember from the original example. TO define the controller class in the AngularJS app you do the following:

```
var app = angular.module("consensus", []);  
app.controller("PokerRoomCtrl", PokerRoomCtrl);
```

Putting this in your TypeScript code is more of a convenience than a necessity. If you don't have this app controller definition, you will have to fully reference your controller class on the page, which will include the full namespace of your TypeScript module plus the class name. Instead of me having to reference `Consensus.PokerRoomCtrl` as the controller name, I can simply just use `PokerRoomCtrl` or whatever other name you give the controller when referencing it in the AngularJS app.

### Conclusion

As you can see getting AngularJS and TypeScript working together is a lot more straight forward than SignalR and TypeScript.

There is no source code to post this time, everything will be brought together in the final 2 posts in the series, and the full project will be available for viewing on GitHub.

1. [SignalR + AngularJS](/posts/signalr-and-angularjs/)
2. [Bringing it all together](/posts/consensus-bringing-it-all-together/)