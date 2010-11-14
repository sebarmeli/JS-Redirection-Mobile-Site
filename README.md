# JS Mobile Redirection

* This script will cover a basic scenario of full JS mobile redirection.
* The user will be redirected to the mobile version of the site (home page)
* if it's trying to access the site from a mobile device. This check is
* mainly done checking the User-Agent string. 
* The mobile URL will be obtained appending a prefix (default is "m") to 
* the hostname of the current URL. It's used a naked domain to avoid conflict with
* www.
* 
* In some cases the user needs to be redirected to the Desktop version of the site 
* from a mobile device. To achieve that, a possible solution is checking the "referrer".
* In that case a new key/value in sessionStorage (for modern browsers) 
* will be set and until the user doesn't close browser window or tab it will access
* to the desktop version from a mobile device. There is a fallback for old browsers that
* don’t support sessionStorage, and it will use a cookie. The cookie that makes the access 
* to the desktop version from a mobile device possible will expiry in one hour (default value)
* or you configure the expiry time.
* 
* To use this function, you need to call it as SA.redirection_mobile(config);
* E.g. SA.redirection_mobile ({param:"isDefault", mobile_prefix : "mobile", cookie_hours : "2" })
*

This "redirection_mobile" script will cover a basic scenario of full JS mobile redirection.
The user will be redirected to the mobile version of the site (home page) if it's trying to access the site from a mobile device. This check is mainly done checking the User-Agent string. The mobile URL will be obtained appending a prefix (default is "m")) to the hostname of the current URL.
	 
In some cases the user needs to be redirected to the Desktop version of the site from a mobile device. To achieve that, a possible solution is checking "referrer" property from the document, that is the URL string of the previous page. In that case a new key/value in sessionStorage (for modern browsers) will be set and until the user doesn't close browser window or tab it will access to the desktop version from a mobile device. Actually there is a fallback for old browsers that don't support sessionStorage, and it will use a cookie. The cookie that makes the access to the desktop version from a mobile device possible will expiry in one hour or you configure the expiry time.

To use this function, you need to call it as SA.redirection_mobile(config);
E.g. SA.redirection_mobile ({param:"isDefault", mobile_prefix : "mobile", cookie_hours : "2" })
     	
Alternatively you can use "redirection_mobile_self.js", that is it's an anonyimous self-executing function and it uses the default values for "mobile_prefix" ("m"),  for "param" ("isStandardSite") and for cookie_hours (1). It doesn't need any configuration or any invocation, so you just need to drop it in your webserver and call the script from your HTML.

I also created "redirection_mobile_testable.js" that is just a copy from "redirection_mobile.js", but it's using few arguments such as "document", "window", "navigator" for testing purpose. Test cases have been written, using QUnit, to test this script.

The scripts have their minified versions (used YUI compressor).

Feel free to fork it!
	
	
	
	 
