# JS Mobile Redirection

This "redirection_mobile" script will cover a basic scenario of full JS mobile redirection. 
It needs to be located in the desktop version of the site.

The user will be redirected to the mobile version of the site if it's trying to access the site from a mobile device (iPad has NOT been included). This check is mainly done sniffing the User-Agent string. 
	 
In some cases the user wants to access to the Desktop version of the site from a mobile device (sometimes the desktop version has more functionality). The script handles this situation as well, it checks if the previous page hit was one from the mobile site (we can assume the user is trying to access to the "desktop" version from a mobile device) or if the url contains a specific parameter.In these case the redirection won't occur. 
To keep the user in the desktop version for the whole session, sessionStorage object has been used, specifically an item will be stored to distinguish if we're browsing through the desktop site. 
There is a fallback for old browsers that don't support sessionStorage, and a cookie will be used. The cookie that makes the access to the desktop version from a mobile device possible will expiry in one hour or you configure the expiry time.

To use this function, you need to import the script in your page and call the SA.redirection_mobile() function. The function accepts an argument which is a configuration object with few properties:

- mobile_prefix : prefix appended to the hostname, such as "m" to redirect to "m.domain.com". "m" is the default value if the property is not specified.
- mobile_url : mobile url to use for the redirection (without the protocol), such as "whatever.com"/example to redirect to "whatever.com/example". If "mobile_prefix" is existing as well, "mobile_prefix" will be ignored. Empty string is the default value.
- mobile_scheme : url scheme (http/https) of the mobile site domain, such as "https" to redirect to "https://m.domain.com". The protocol of the current page is the default value.
- redirection_paramName : parameter to pass in the querystring of the URL to avoid the redirection (the value must be equal to "false" to avoid redirection). Default value is "mobile_redirect". 		 Eg: http://domain.com?mobile_redirect=false
It's also the name of the item in the localStorage (or cookie name) used to avoid mobile redirection. 
- cookie_hours : number of hours the cookie needs to exist after redirection to desktop site. "1" is the default value.
- ipad_redirection : boolean value that enables/disables(default) the redirection for the iPad. Default:"false". The value needs to be a string (so wrapped in double or single quotes).
- beforeredirection_callback : callback launched before the redirection happens

Below you can see an example that can clarify on how to use the script to redirect the user to "http://mobile.domain.com" from "http://domain.com":

<pre>
	<code>
		&lt;script src="/js/redirection_mobile.js"&gt;&lt;/script&gt;
	</code>
</pre>
<pre>
	<code>
		&lt;script&gt;
			 SA.redirection_mobile ({
				redirection_paramName:"mobile_redirect",
				mobile_prefix : "mobile",
				cookie_hours : "2" 
			});
		&lt;/script&gt;
	</code>
</pre>

Considering the previous code, from version 0.6, if you hit a page such as "http://domain.com/?mobile_redirect=false" the redirection won't happen.  For all the browser session, if sessionStorage is supported by the browser, the redirection won't occur. If sessionStorage (HTML5) is not supported, a cookie "mobile_redirect=false" will be stored for 2 hours and it will block the redirection to the mobile site.

Another example, if you'd like to redirect the user to "https://whatever.com/example" this is the invocation you need:

<pre>
	<code>
		&lt;script&gt;
			 SA.redirection_mobile ({
				mobile_url : "whatever.com/example",
				mobile_prefix : "https"
			});
		&lt;/script&gt;
	</code>
</pre>

If you'd like to redirect the user to "https://whatever.com/example" even when using an Ipad, and if you need to execute a function before the redirection happens, this is the invocation you need:

<pre>
	<code>
		&lt;script&gt;
			 SA.redirection_mobile ({
				ipad_redirection : "true",
				beforeredirection_callback : (function(){alert("!");})
			});
		&lt;/script&gt;
	</code>
</pre>

Alternatively you can use "redirection_mobile_self.js", that is an anonyimous self-executing function and it uses the default values for the different properties:
- "mobile_prefix" : "m"
- "redirection_paramName" : "mobile_redirect"
- "cookie_hours" : 1
- "mobile_url" : ""
- "mobile_scheme" : protocol of the current page
- "ipad_redirection" : "false"
- "beforeredirection_callback" : n/a

It doesn't need any configuration or any invocation, so you just need to drop it in your webserver and call the script from your HTML.

<pre>
	<code>
		&lt;script src="/js/redirection_mobile_self.js"&gt;&lt;/script&gt;
	</code>
</pre>


I also created "redirection_mobile_testable.js" that is just a copy from "redirection_mobile.js", but it's using few arguments such as "document", "window", "navigator" for testing purpose. Test cases have been written using QUnit.

The scripts have their minified versions (YUI compressor has been used).

#Who is using it?

Holden Australia (http://www.holden.com.au), Cityweb (http://www.citywebs.co.uk/) 

#Licence?

Dual licensed under the MIT or GPL Version 3 licenses.

#Update 21/11/2010:

All main mobile devices have been considered.

#Update 20/12/2010:

Fixed a critical issue on IE

#Update 06/01/2011:

Version 0.5 released

#Update 21/01/2011:

Version 0.6 released - IMPORTANT Change in parameters -- "redirection_paramName" will replace "param"

#Update 11/02/2011:

Version 0.7 released - Added support for Nintendo WII and more HTC phones.

#Update 02/04/2011:

Version 0.8 released - Added support for "ipad_redirection" and "beforeredirection_callback" properties. Ipad excluded from the standard redirection

Feel free to fork it!