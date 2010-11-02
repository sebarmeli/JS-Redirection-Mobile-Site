# JS Mobile Redirection

This "redirection_mobile" script will cover a basic scenario of full JS mobile redirection.
The user will be redirected to the mobile version of the site (home page)if it's trying to access the site from a mobile device. 		  	     This check is mainly done checking the User-Agent string. The mobile URL will be obtained appending a prefix (default is "m")) to the hostname of the current URL.
	 
In same case the user needs to be redirected to the Desktop version of the site from a mobile device. To achieve that, a possible solution is appending a parameter to the URL (default one is "isDesktopRedirection=true"). In that case a cookie will be set up and until the cookie exists the user will access to the desktop version from a mobile device (default expiry time is one hour after he creation of the cookie) even without the parameter appended.
     	
The function is attached to the window scope, mainly for testing purpose, but to avoid that, you can use "redirection_mobile_self" script that is using the default "mobile_prefix" ("m") and the default parameter ("isDesktopRedirection=true").

Both the scripts have their minified versions (used YUI compressor).

Test cases have been written to test the functionality and they are applied to "redirection_mobile" script.

Feel free to clone the project and improve it!
	
	
	
	 
