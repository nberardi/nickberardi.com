---
title: "Three20 And Custom NIB TableViewCells"
date: 2011-08-23T03:14:46-05:00
slug: "three20-and-custom-nib-tableviewcells"
draft: false
tags:
  - "iOS"
  - "iPad"
  - "iPhone"
  - "Objective-C"
description: "I am pretty new to Objective-C development and iOS development in general, but in my effort to fill small gaps on the internet with useful information, I..."
---

I am pretty new to Objective-C development and iOS development in general, but in my effort to fill small gaps on the internet with useful information, I believe I have found a small area that hasn’t had much love.

If you are unfamiliar with iOS development you may have never heard of Three20.  Three20 is a framework developed by Facebook and used in the creation of Facebook’s iOS app.  It can best be described from [their own site](http://three20.info/):

> Three20 is a open source Objective-C library used by dozens of well-known brands in the App Store, including Facebook, Posterous, Pulse, Meetup.com, and SCVNGR. Three20 provides powerful view controllers such as the Launcher, the popular Photo Browser, and internet-aware tables.
>
> The library is modular, meaning you choose which elements of the library to include in your app. This modular design allows Three20 to be one of the only Objective-C frameworks that encourages what are called 'extensions' from the community.

Overall the Three20 framework is really well documented and has proven to be more than useful. As a developer who is new to Objective-C and iOS development, I have been pleasantly surprised by how fast I have been able to create a very useful application in a very short period of time.

One thing that isn’t supported by Three20 and that there isn’t much documentation on the internet about, is using Three20 in conjunction with a view created by the Interface Builder. In my case using Three20 and a custom *UITableViewCell* created by Interface Builder.

## Using A Custom UITableViewCell In Three20

For this blog post I am going to narrow my focus to just the code that is needed to get a custom table view cell, built in Interface Builder, to show up in a Three20 managed table view. There are tons of useful examples on the internet on how to create a custom table view cell in Interface Builder, so that part of this exercise is outside of the scope of this post.

*I am also going to assume you are familiar with creating your own data sources for the table views, which is critical to what I am going to talk about next.  If you are not familiar with how table views work in iOS and Three20 please review this* [*sample Twitter app*](https://github.com/facebook/three20/tree/master/samples/TTTwitter) *provided by Three20.*

The first thing you need to do is setup your own table view cell in Interface Builder. *If you need help or want a refresher I found [this site](http://adeem.me/blog/2009/05/30/iphone-sdk-tutorial-part-6-creating-custom-uitableviewcell-using-interface-builder-uitableview/) to be very useful.*

The next thing we need to do is add the following code to our tables data source. This code tells the data source the class type of the cell we want to use for a specific data type. *In the case of the app I am creating the object that is being bound to the cell is called TickerItem, and the cell is called TickerCell.*

```
-(Class)tableView:(UITableView *)tableView cellClassForObject:(id)object {  
    if ([object isKindOfClass:[TickerItem class]]) {
        return [TickerCell class];
    } else {
        return [super tableView:tableView cellClassForObject:object];
    }
}
```

The above code checks that the object in question for the cell is a *TickerItem* class, and if so returns the *TickerCell* type. For any other kind of object passed in, it is forwarded to the parent classes same method for type determination.

The second and final piece of code that we need to support showing Interface Builder built objects (that is a mouth full) is used search the *mainBundle* for the for the NIB named *TickerCell* and then bind the data object and the cell together to create our custom cell.

```
- (UITableViewCell*)tableView:(UITableView *)tableView  
        cellForRowAtIndexPath:(NSIndexPath *)indexPath {

    UITableViewCell* cell = nil;
    id object = [self tableView:tableView objectForRowAtIndexPath:indexPath];

    if ([object isKindOfClass:[TickerItem class]]) {

        cell = [tableView dequeueReusableCellWithIdentifier:@"TickerCell"];

        if (cell == nil) {
            NSArray *nib = [[NSBundle mainBundle] loadNibNamed:@"TickerCell" owner:self options:nil];
            cell = [nib objectAtIndex:0];
        }

        if([cell isKindOfClass:[TTTableViewCell class]]) {
            [(TTTableViewCell*)cell setObject:object];
        }

        [self tableView:tableView cell:cell willAppearAtIndexPath:indexPath];
    } else {
        cell = [super tableView:tableView cellForRowAtIndexPath:indexPath];
    }

    return cell;
}
```

As always if the object doesn’t match the *TickerItem* type, same as in the previous class, we need to forward the call on to the parent class to handle the correct binding.

From this point your code should be able to display the cell that you created in Interface Builder.

## Conclusion

This took me a good half day to figure out, because you have to merge some Three20 specific method calls with some custom NIB instantiation calls that usually happen automatically. But after I figured out these internals hooking the two of the frameworks together was easy and straight forward.

I hope that somebody will find some use in this code, and save them selves a half day of searching the internet for the answer.