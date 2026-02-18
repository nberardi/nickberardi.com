---
title: "How to create a non-Native jQuery event"
date: 2008-05-23T08:13:49-05:00
slug: "create-a-non-native-jquery-event"
draft: false
tags:
  - "IdeaPipe"
  - "JavaScript"
  - "JavaScript"
  - "jQuery"
description: "Today I had the need to create a custom event using jQuery, in order to launch a customized form validation event from a global submit event. I did this..."
---

Today I had the need to create a custom event using jQuery, in order to launch a customized form validation event from a global submit event. I did this so I could focus in on the first form field that had an error. My event from the `global.js` script, that is included on every page of [IdeaPipe](http://www.ideapipe.com), looks like this:

```
$("form").submit(function () {  
    var valid = $(this).validate();

    // if the form didn't validate then focus the input on the first error
    if (!valid) 
        $(this).find(":input[error]:first").focus();

    return valid;
});
```

This is pretty standard jQuery. What this code above does is set a custom function for the submit event for any <form /> tag on the page. The submit event will only be allowed to continue if a return value of true is returned from the function.

I was able to create this custom jQuery event with the following code:

```
jQuery.fn.extend({  
    validate: function (fn) {
        if (fn) {
            return jQuery.event.add(this[0], "validate", fn, null);
        } else {
            var ret = jQuery.event.trigger("validate", null, this[0], false, null);

            // if there was no return value then the even validated correctly
            if (ret === undefined)
                ret = true;

            return ret;
        }
    }
});
```

There are two different states to this method. Primarily because in JavaScript all parameters are optional for functions. So the two states of this function are:

- `validate(fn)` - sets the event
- `validate()` - fires the event

An example of setting the event is:

```
$("form.user-login").validate(function () {  
    var userNameValid = ValidateLoginUserName();
    var passwordValid = ValidateLoginPassword();

    return userNameValid && passwordValid;
});
```

In this example the form is valid if both the login user name and password validate.

An example of using the event is the same as the method above.

```
$("form").submit(function () {  
    var valid = $(this).validate();
    // do some stuff    
    return valid;
});
```

This may not be the standard `bind()` and `trigger()` that most jQuery programmers are use to, but I needed an event that would return a value of true or false, so that I my submit event handler knows if it should focus on errors or continue the submit process.

Hope everybody finds this useful.