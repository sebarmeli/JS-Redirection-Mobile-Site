# JS Mobile Redirection

redirection_mobile.js is a utility script that covers a basic scenario for redirecting your website to a mobile verison through JavaScript.

[![Build Status](https://secure.travis-ci.org/sebarmeli/JS-Redirection-Mobile-Site.png)](http://travis-ci.org/sebarmeli/JS-Redirection-Mobile-Site)

It also covers the scenario where a user wants to access the Desktop version of the site from a mobile device (sometimes the desktop version has more functionality).

The script handles tablets too, you can choose to redirect user to a mobile site or to a specific site for tablets (7'' or 10'').

## Getting started

The script needs to be put in the desktop version of the site.

The script sniffs the User-Agent string and it decides if the redirection needs to happen.
	 
If the user decides to view the 'desktop' version from a mobile site, the user is kept on that version for the whole session. 
(sessionStorage object has been used). 
There is a fallback for old browsers that don't support sessionStorage, and a cookie is used. The cookie expiries in one hour or you configure the expiry time.

To use this function, you need to import the "redirection_mobile.js" in your page and call the SA.redirection_mobile() function. 

```html
	<!doctype html>
	<html>
		<head>
			<script src="redirection-mobile.js"></script>
			<script>
				SA.redirection_mobile();
			</script>
		</head>
```

## Config

The function accepts few configurations:

- `mobile_prefix` : prefix appended to the hostname. E.g. "m" to redirect to "m.domain.com". "m" is the default value if the property is not specified.

- `mobile_url` : mobile url to use for the redirection (without the protocol), such as "whatever.com"/example to redirect to "whatever.com/example". If "mobile_prefix" exists too, "mobile_prefix" is ignored. Empty string is the default value.

- `mobile_scheme` : url scheme (http/https) of the mobile site domain, such as "https" to redirect to "https://m.domain.com". The protocol of the current page is the default value.

- `redirection_param` : parameter to pass in the querystring of the URL to avoid the redirection (the value must be equal to "false" to avoid redirection). Default value is "mobile_redirect".
Eg: http://domain.com?mobile_redirect=false
It is the name of the item in the sessionStorage (or cookie name) used to avoid mobile redirection. 

- `cookie_hours` : number of hours the cookie needs to exist after redirection to desktop site. "1" is the default value.

- `tablet_redirection` : boolean value that enables/disables(default) the redirection for tablet such as iPad, Samsung Galaxy Tab, Kindle or Motorola Xoom. - Default:false. The value needs to be a string (so wrapped in double or single quotes). If 'tablet_host' parameter not specified, the user will be redirected to the same URL as for mobile devices.

- `tablet_host` : hostname to use for the redirection in case user is using a tablet to access the site. Default value is ""

- `keep_path` : boolean to determine if the destination url needs to keep the path from the original url. Default value is 'false'

- `keep_query` : boolean to determine if the destination url needs to keep the querystring from the original url. Default value is 'false'

- `beforeredirection_callback` : if specified, callback launched before the redirection happens. If a falsy value is returned from the callback the redirection doesn't happen.

- `append_referrer` : boolean to determine if the document.referrer should be appended to the destination url. document.referrer will be URI encoded prior to appending.  Default value is 'false'

- `append_referrer_key` : if specified, the key used for the document.referrer.  defaults to 'original_referrer'

## Examples

If you want to redirect the user to "http://mobile.domain.com" from "http://domain.com":

```javascript
	SA.redirection_mobile ({
		redirection_param : "mobile_redirection",
		mobile_prefix : "mobile",
		cookie_hours : "2" 
	});
```

If you want to redirect the user to "https://whatever.com/example":

```javascript
	SA.redirection_mobile ({
		mobile_url : "whatever.com/example",
		mobile_prefix : "https"
	});
```

If you want to redirect the user to "https://whatever.com/example" even when using an Ipad or a generic tablet:

```javascript
	SA.redirection_mobile ({
		tablet_redirection : "true",
		mobile_url : "whatever.com/example",
		mobile_prefix : "https"
	});
```

If you want to avoid the redirection to happen from a callback, this is the invocation you need:

```javascript
	SA.redirection_mobile ({
		beforeredirection_callback : (function(){alert("!"); return false;})
	});
```

If you want to redirect the user to two different URLs depending on the device the user is using (mobile or tablet):

```javascript
	SA.redirection_mobile ({
		mobile_url : "mobile.whatever.com",
		tablet_host : "tablet.whatever.com",
	});
```

If the user accesses to "whatever.com/page1" and you want to redirect him to "mobile.whatever.com/page1":

```javascript
	SA.redirection_mobile ({
		mobile_prefix : "mobile",
		keep_path : true,
		keep_query : true
	});
```
## What is 'redirection-mobile-self.js'?

Alternatively you can use "redirection_mobile_self.js", that is an anonyimous self-executing function using the default values for the different properties:

- "mobile_prefix" : "m"
- "redirection_param" : "mobile_redirect"
- "cookie_hours" : 1
- "mobile_url" : ""
- "mobile_scheme" : protocol of the current page
- "tablet_redirection" : "false"
- "keep_path" : false
- "keep_query" : false
- "tablet_host" : ""
- "beforeredirection_callback" : n/a

It doesn't need any configuration or any invocation, so you just need to drop "it "redirection_mobile_self.js" on your webserver and call the script from your HTML.

```html
	<!doctype html>
	<html>
		<head>
			<script src="redirection_mobile_self.js"></script>
		</head>
```
<pre>
	<code>
		&lt;script src="/js/redirection_mobile_self.js"&gt;&lt;/script&gt;
	</code>
</pre>


I also created 'redirection-mobile-testable.js' that is just a copy from "redirection_mobile.js", but it's using few arguments such as "document", "window", "navigator" for testing purpose. 

## Testing / Building the plugin

After getting node and npm, install grunt and grunt-jasmine-runner.

```npm install grunt```
```npm install grunt-jasmine-runner```

You can run Jasmine specs through phantomjs with :

```grunt jasmine```

If you don't have phantomjs, please download it from [here](http://phantomjs.org/)

You can run JSHint, Jasmine specs and minification tool simply launching: ```grunt```

## Licence

Copyright (c) 2011-2012 Sebastiano Armeli-Battana
Licensed under the MIT license.
(https://github.com/sebarmeli/JS-Redirection-Mobile-Site/blob/master/MIT-LICENSE.

