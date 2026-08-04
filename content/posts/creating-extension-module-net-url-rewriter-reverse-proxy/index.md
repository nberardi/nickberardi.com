---
title: "Creating an extension module for .NET URL Rewriter and Reverse Proxy"
date: 2008-12-09T15:37:25-05:00
slug: "creating-extension-module-net-url-rewriter-reverse-proxy"
draft: false
tags:
  - ".NET"
  - "Coder Journal"
  - "Database"
  - "How To"
  - "Managed Fusion"
  - "MySQL"
  - "SEO"
  - "URL Rewriter and Reverse Proxy"
description: "Wow that is a long title. Recently I have been looking for quick posts that I can put out each day to keep my blog relevant and also so I don't feel like..."
---

Wow that is a long title. Recently I have been looking for quick posts that I can put out each day to keep my blog relevant and also so I don't feel like I am slacking off too much. Today I want to post about a little known feature in my [.NET URL Rewriter and Reverse Proxy](http://www.codeplex.com/urlrewriter) (aka. Managed Fusion URL Rewriter) that I have developed in my spare time, [mostly out of necessity](/posts/url-rewriter-reverse-proxy-iis-wordpress/) for this blog and other projects I have worked on.  Here is a quick run through of what it does.

> Managed Fusion URL Rewriter is a powerful URL manipulation engine based on the Apache [mod\_rewrite](http://httpd.apache.org/docs/2.0/mod/mod_rewrite.html) extension. It is designed, from the ground up to bring all the features of Apache mod\_rewrite to IIS 6.0 and IIS 7.0. Managed Fusion Url Rewriter works with ASP.NET on Microsoft's Internet Information Server (IIS) 6.0 and Mono XPS Server and is fully supported, for all languages, in IIS 7.0, including ASP.NET and PHP. Managed Fusion Url Rewriter gives you the freedom to go beyond the standard URL schemes and develop your own scheme.

But one feature that I added that is not part of the official Apache mod\_rewrite documentation is the ability to add custom modules to extend the use of the URL rewriter in non-traditional ways.  One great example of this was born out of wanting to clean up the SEO mess I created in the early days of this blog.  I had to support the following different types of URL patterns:

1. <http://www.coderjournal.com>**/?p=23**
2. <http://www.coderjournal.com>**/2008/03/14/some-post.html**
3. <http://www.coderjournal.com>**/2008/03/14/some-post**

to transform them in to the URL pattern that I finally settled on today:

- <http://www.coderjournal.com>**/2008/03/some-post**

In the above list #2 and #3 were pretty easy to transform using the following rules:

```
RewriteRule ^(/[0-9]{4}/.*).html$    $1/ [NC,R=301]  
RewriteRule ^(/[0-9]{4}/[0-9]{1,2}/)[0-9]{1,2}/(.*)$    $1$2 [R=301]
```

Because they contained all of the elements that make up my current URL.  As you can imagine problems arose when I had to support links that used #1's syntax.  It contains zero elements that I can use to create my current URL.  Being a programmer who beleives that each part of a system should handle gracefully the domain it was designed to support, in this case a URL rewriter should be able to handle any senario that has to do with URL rewriting.  I added in support that allowed developers to naturally extend the URL rewriter to accomplish any type of URL rewriting task they could think of.

### Setting Up the URL Rewriter Rules

In my case I needed to handle the following SQL query everytime I saw a URL that matched #1.

```
select concat('http://www.coderjournal.com/',year(post_date),'/',month(post_date),'/',post_name,'/') from wp_posts where ID = $1;
```

What this query does is query the WordPress database table that contains all the posts by the post ID and have it return the actual absolute path to the post, that should be displayed in the URL.  To do this I created a new directive for the mod\_rewrite syntax called **RewriteModule**.  I also had to extend the **RewriteRule** and **RewriteCond** directives to support these new module extensions.  The *RewriteModule*, *RewriteRule*, and *RewriteCond* are defined by the following syntax:

```
RewriteModule <Reference Name> <Namespace>,<Assembly>  
RewriteRule[([<Left Module>],[<Right Module>])] <Pattern> <Substitution>  
RewriteCond[([<Left Module>],[<Right Module>])] <Test String> <Condition Pattern>
```

The parts in light blue parts above are optional to creating the rule.  In my case for this blog the rewriter directives looked like the following:

```
RewriteModule PostQueryString CoderJournal.Rewriter.Rules.PostQueryStringRuleAction, CoderJournal.Rewriter.Rules  
RewriteRule(,PostQueryString)   ^/\?p=([0-9]+)$    "select guid from wp_posts where ID = $1;" [R=301]
```

I have highlighted in **red** the important parts of the syntax that indicate the custom module processor that should be used on the *RewriteRule* directive and how it relates back to the class defined in the *RewriteModule*.

### Creating the Module

I have to warn you that I am not going to demonstrate and show all the properties and methods on the interface that are important for creating a custom module, but I am going to show you the actual meat of the module that is involved in the lookup of the URL from the database.

```
public Uri Execute(int logLevel, string logCategory, HttpContext context,  
                   Pattern pattern, Uri url, string[] conditionValues, 
                   IDictionary<string, string> flags)
{
    string inputUrl = url.GetComponents(UriComponents.PathAndQuery, UriFormat.UriEscaped);
    string sqlCommand = pattern.Replace(inputUrl, Text, conditionValues);
    string substituedUrl = String.Empty;

    using (MySqlConnection connection = new MySqlConnection(Properties.Settings.Default.DatabaseConnection)) {
        using (MySqlCommand command = connection.CreateCommand()) {
            command.CommandText = sqlCommand;
            command.CommandType = CommandType.Text;

            try {
                connection.Open();
                substituedUrl = command.ExecuteScalar() as string;
            } finally {
                connection.Close();
            }
        }
    }

    return new Uri(url, substituedUrl);
}
```

It may not be clear right away what is going on, but on line 6, I am replacing the defined value in the regular expression (*^/\?p=([0-9]+)$*) with the SQL query (from above) to produce a query that will be run against the database. So if the following URL came in to my server:

- <http://www.coderjournal.com/?p=372>

It would produce a SQL query that looked like this:

```
select concat('http://www.coderjournal.com/',year(post_date),'/',month(post_date),'/',post_name,'/') from wp_posts where ID = 372;
```

Notice that the ID, 372, shows up in both the URL and the query, that is because this is the part I am most interested in, in the URL, because it is the only part of the URL that I need to query the database to find the actual path of the post.

Now that we have the query we can execute it on the database, using lines 9 through 21, and create the resulting URL on line 23. The resulting URL is then passed back through the URL rewriter, and processed using the flags defined. In my case **[R=301]**, actually indicates that I want to do a *301 Permanent Redirect* on the URL, which tells the browser and search engines, a like, that they need to update their URL for this page.

You can test out the above conditions by using the following URL's that all redirect back to this page:

1. <http://www.coderjournal.com/?p=372>
2. <http://www.coderjournal.com/2008/12/9/creating-extension-module-net-url-rewriter-reverse-proxy.html>
3. </posts/creating-extension-module-net-url-rewriter-reverse-proxy/>

The code as always is available on my SVN server at Google Code.

- [The Module for Coder Journal](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2008/12/PostQueryStringRuleAction.cs)
- [The Rules File for Coder Journal](http://code.google.com/p/coderjournal/source/browse/trunk/Posts/2008/12/example%20-%20ManagedFusion.Rewriter.rules)

I hope this comes in handy to some of you developers that have to support legacy URL's in your own product or a project that you are working on. As always if you have any questions or need anything clarified please feel free to contact me or leave a comment below.