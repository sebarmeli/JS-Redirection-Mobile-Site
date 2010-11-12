# JS Mobile Redirection

This "redirection_mobile" script will cover a basic scenario of full JS mobile redirection.
The user will be redirected to the mobile version of the site (home page) if it's trying to access the site from a mobile device. This check is mainly done checking the User-Agent string. The mobile URL will be obtained appending a prefix (default is "m")) to the hostname of the current URL.
	 
In some cases the user needs to be redirected to the Desktop version of the site from a mobile device. To achieve that, a possible solution is checking "referrer" property from the document, that is the URL string of the previous page. In that case a new key/value in sessionStorage (for modern browsers) will be set and until the user doesn't close browser window or tab it will access to the desktop version from a mobile device. Actually there is a fallback for old browsers that don't support sessionStorage, and it will use a cookie. The cookie that makes the access to the desktop version from a mobile device possible will expiry in one hour.
     	
The function is attached to the window scope, mainly for testing purpose, but to avoid that, you can use "redirection_mobile_self" script that is using the default "mobile_prefix" ("m") and the default parameter ("isStandardSite=true") and it's an anonyimous self-executing function.

Both the scripts have their minified versions (used YUI compressor).

Test cases have been written to test the functionality (used QUnit) and they are applied to "redirection_mobile" script.

Feel free to clone the project and improve it!
	
	
	
	 
