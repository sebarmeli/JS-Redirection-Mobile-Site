/*!
* JS Redirection Mobile
*
* Copyright (c) 2011 Sebastiano Armeli-Battana (http://sebarmeli.com)
* Dual licensed under the MIT or GPL Version 3 licenses.
* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site/
*/

/* 
* This version is exactly the same as redirection_mobile.js, but it's an anonymous self-executing
* function, and it's using the default values for 'redirection_paramName' ("mobile_redirect"), 'mobile_prefix'("m"),
* 'mobile_url'("") and 'cookie_hour'(1). In this way you can drop this file on your web server with no configuration
* 
* @author Sebastiano Armeli-Battana
* @version 0.9.5 
* 
*/

/*globals window, redirection_mobile, document, navigator, location */
(function(window, document, navigator) {

		// Helper function for adding time to the current date
	var addTimeToDate = function(msec) {

		// Get the current date
		var exdate = new Date();

		// Add time to the date
		exdate.setTime(exdate.getTime() + msec);

		//Return the new Date
		return exdate;

	};

	// Helper function for getting a value from a parameter in the querystring
	var getQueryValue = function(param) {

		if (!param) {
			return;
		}

		var querystring = document.location.search,
			queryStringArray = querystring && querystring.substring(1).split("&"),
			i = 0,
			length = queryStringArray.length;

		for (; i < length; i++) {
			var token = queryStringArray[i],
				firstPart = token && token.substring(0, token.indexOf("="));
			if (firstPart === param ) {
				return token.substring(token.indexOf("=") + 1, token.length);
			}
		}

	};

	// Retrieve the User Agent of the browser
	var agent = navigator.userAgent.toLowerCase(),

		// Constants
		FALSE = "false",

		// parameter to pass in the URL to avoid the redirection
		redirection_param = "mobile_redirect",

		// prefix appended to the hostname
		mobile_prefix = "m",

		// new url for the mobile site domain 
		mobile_url = "",

		// protocol for the mobile site domain 
		mobile_protocol = document.location.protocol,

		// URL host of incoming request
		host = document.location.host,

		// value for the parameter passed in the URL to avoid the redirection
		queryValue = getQueryValue(redirection_param),

		// Compose the mobile hostname considering "mobile_url" or "mobile_prefix" + hostname
		mobile_host = mobile_url ||
			(mobile_prefix + "." + 
				(!!host.match(/^www\./i) ?
					host.substring(4) : 
						host)),

		// Expiry hours for cookie
		cookie_hours = 1,

		// Check if the UA is a mobile one (iphone, ipod, android, blackberry)
		isUAMobile =!!(agent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mobi|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i));

	// Check if the referrer was a mobile page (probably the user clicked "Go to full site") or in the 
	// querystring there is a parameter to avoid the redirection such as "?mobile_redirect=false"
	// (in that case we need to set a variable in the sessionStorage or in the cookie)
	if (document.referrer.indexOf(mobile_host) >= 0 || queryValue === FALSE ) {

		if (window.sessionStorage) {
			window.sessionStorage.setItem(redirection_param, FALSE);
		} else {
			document.cookie = redirection_param + "=" + FALSE + ";expires="+
				addTimeToDate(3600*1000*cookie_hours).toUTCString();
		}
	}

	// Check if the sessionStorage contain the parameter
	var isSessionStorage = (window.sessionStorage) ? 
		(window.sessionStorage.getItem(redirection_param) === FALSE) :
			false,
		
		// Check if the Cookie has been set up
		isCookieSet = document.cookie ? 
			(document.cookie.indexOf(redirection_param) >= 0) :
				false;

	
	// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
	if (isUAMobile && !(isCookieSet || isSessionStorage)) {
		
		document.location.href = mobile_protocol + "//" + mobile_host;
	}
}(window, document, navigator));