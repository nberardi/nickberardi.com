---
title: "Creating a Progressive Queue in IE6 JavaScript"
date: 2008-12-08T13:21:51-05:00
slug: "creating-progressive-queue-ie6-javascript"
draft: false
tags:
  - "IE6"
  - "Internet Explorer"
  - "JavaScript"
  - "JavaScript"
description: "Today IE6 really kicked my butt, I had the following code working in FireFox, IE7, etc, all except IE6: ShowLoadingPanel(); // execute some code here..."
---

Today IE6 really kicked my butt, I had the following code working in FireFox, IE7, etc, all except IE6:

```
ShowLoadingPanel();  
// execute some code here
HideLoadingPanel();
```

The above code is really simple, it shows a full screen loading panel when I am executing some code in between the Show and Hide functions for the loading panel. It worked in every browser that I tried except for IE6. This seemed to occur because the execution of the JavaScript was happening in the same thread as the UI rendering of the screen, which would block all screen updates to the browser until the JavaScript was executed. By the time all the JavaScript is done rendering the UI is in it's final visual state, so it looks like the loading graphic was never run. Note I don't know for sure that this is what is really happening, but it definitely seems like the most likely possibility. But if this is true it really explains the lack of support for JavaScript Animation, which heavily relies on a progressive incremental rendering of the UI.

On my way back home from work after dealing with this for a while, a light bulb clicked on in my head and it occurred to me. That I might be able to use the **[setTimeout](https://developer.mozilla.org/en/DOM/window.setTimeout)** function to force the execution in to a different thread, which would free up the current thread to render the loading screen.

```
ShowLoadingPanel();  
setTimeout(function() {  
    // execute some code here
    HideLoadingPanel();
}, 500);
```

Basically what the above is doing is creating a slight delay in the execution of the code. Which releases the current thread to render the loading screen to the browser. After that is done the rest of the code, in the *setTimeout*, is executed in the background and locking up a different thread. The important thing to remember is to keep the method that hides the loading panel inside the *setTimeout* so that the hide panel method is executed in a different process and after the code that you want to execute.

So that is how you create a progressive queue in IE6 for JavaScript. Until next time I hope you found this useful.