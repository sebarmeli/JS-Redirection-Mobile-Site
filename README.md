# JS Mobile Redirection

This "redirection_mobile" script will cover a basic scenario of full JS mobile redirection. 
It needs to be located in the desktop version of the site.

The user will be redirected to the mobile version of the site if it's trying to access the site from a mobile device. This check is mainly done sniffing the User-Agent string. The mobile URL will be obtained appending a prefix (default is "m")) to the hostname of the current URL.
	 
In some cases the user wants to access to the Desktop version of the site from a mobile device (sometimes the desktop version has more functionality). The script handles this situation as well, it checks if the previous page hit was one from the mobile site. In that case we can assume the user is trying to access to the "desktop" version from a mobile device and the redirection won't occur. To keep the user in the desktop version for the whole session, sessionStorage object ha been used, specifically an item will be stored to distinguish if we're browsing through the desktop site. 
There is a fallback for old browsers that don't support sessionStorage, and it will use a cookie. The cookie that makes the access to the desktop version from a mobile device possible will expiry in one hour or you configure the expiry time.

To use this function, you need to import the script in you page and call the SA.redirection_mobile() in a similar way as below:

&lt;script src="/js/redirection_mobile.js"&gt;&lt;/script&gt;
&lt;script&gt;
	 SA.redirection_mobile ({
		param:"isDefault",
		mobile_prefix : "mobile",
	cookie_hours : "2" 
	});
&lt;/script&gt;


Alternatively you can use "redirection_mobile_self.js", that is an anonyimous self-executing function and it uses the default values for "mobile_prefix" ("m"),  for "param" ("isStandardSite") and for cookie_hours (1). It doesn't need any configuration or any invocation, so you just need to drop it in your webserver and call the script from your HTML.

&lt;script src="/js/redirection_mobile_self.js"&gt;&lt;/script&gt;

I also created "redirection_mobile_testable.js" that is just a copy from "redirection_mobile.js", but it's using few arguments such as "document", "window", "navigator" for testing purpose. Test cases have been written, using QUnit, to test this script.

The scripts have their minified versions (used YUI compressor).

#Who is using it?

Holden Australia (http://www.holden.com.au), Cityweb (http://www.citywebs.co.uk/) 

#Update 21/11/2010:

All main mobile devices have been considered.

#Update 20/12/2010:

Fixed a critical issue on IE

Feel free to fork it!