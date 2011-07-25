/*!
* JS Redirection Mobile
*
* Copyright (c) 2011 Sebastiano Armeli-Battana (http://sebarmeli.com)
* Dual licensed under the MIT or GPL Version 3 licenses.
* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site/
*/

/* 
* This version is exactly the same as redirection_mobile.js, but uses few arguments, such as "document", 
* "window", "navigator" for testing purpose.
* 
* @author Sebastiano Armeli-Battana
* @version 0.9.5
* 
*/

/*globals window,document, navigator, SA */
if (!window.SA) {window.SA = {};}

/*
* @param configuration object containing three properties:
*			- mobile_prefix : prefix appended to the hostname (such as "m" to redirect to "m.domain.com")
*			- mobile_url : mobile url to use for the redirection (such as "mobile.whatever.com" to redirect to "whatever.com" )
*			- mobile_scheme : url scheme (http/https) of the mobile site domain
*			- cookie_hours : number of hours the cookie needs to exist after redirection to desktop site
*			- noredirection_param : parameter to pass in the querystring of the URL to avoid the redirection (the value must be equal to "true").
*				It's also the name of the item in the localStorage (or cookie name) to avoid mobile
*				redirection. Default value is "noredirection". Eg: http://domain.com?noredirection=true
*			- tablet_redirection : boolean value that enables/disables(default) the redirection for tablet such as iPad, Samsung Galaxy Tab, Kindle or Motorola Xoom. - Default:false
*				Default Url for redirection will be the same as the one for mobile devices.
*			- tablet_url : url to use for the redirection in case user is using a tablet to access the site
*			- keep_path : boolean to determine if the destination url needs to keep the path from the original url
*			- keep_query : boolean to determine if the destination url needs to keep the querystring from the original url
*			- beforeredirection_callback : callback launched before the redirection happens
*
*/
SA.redirection_mobile = function(document, window, navigator, configuration) {

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

	var agent = navigator.userAgent.toLowerCase(),
	
		// Constants
		FALSE = "false",
		TRUE = "true",

		// configuration object
		config = configuration || {},
	
		// parameter to pass in the URL to avoid the redirection
		redirection_param = config.noredirection_param || "noredirection",
		
		// prefix appended to the hostname
		mobile_prefix = config.mobile_prefix || "m",
		
		// new url for the mobile site domain 
		mobile_url = config.mobile_url,
		
		// protocol for the mobile site domain 
		mobile_protocol = config.mobile_scheme ?
			config.mobile_scheme + ":" :
				document.location.protocol,
		
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
		cookie_hours = config.cookie_hours || 1,
		
		// Parameters to determine if the pathname and the querystring need to be kept
		keep_path = config.keep_path || false,
		keep_query = config.keep_query || false,

		// new url for the tablet site domain 
		tablet_host = config.tablet_url || mobile_host,
		
		// Check if the UA is a mobile one (iphone, ipod, android, blackberry)
		isUAMobile =!!(agent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i));


	// Check if the referrer was a mobile page (probably the user clicked "Go to full site") or in the 
	// querystring there is a parameter to avoid the redirection such as "?mobile_redirect=false"
	// (in that case we need to set a variable in the sessionStorage or in the cookie)
	if (document.referrer.indexOf(mobile_host) >= 0 || queryValue === TRUE ) {

		if (window.sessionStorage) {
			window.sessionStorage.setItem(redirection_param, TRUE);
		} else {
			document.cookie = redirection_param + "=" + TRUE + ";expires="+
				addTimeToDate(3600*1000*cookie_hours).toUTCString();
		}
	}

	// Check if the sessionStorage contain the parameter
	var isSessionStorage = (window.sessionStorage) ? 
			(window.sessionStorage.getItem(redirection_param) === TRUE) :
				false,

		// Check if the Cookie has been set up
		isCookieSet = document.cookie ? 
			(document.cookie.indexOf(redirection_param) >= 0) :
				false;
	
	// Check if the device is a Tablet such as iPad, Samsung Tab, Motorola Xoom or Amazon Kindle
	if (!!(agent.match(/(iPad|SCH-I800|xoom|kindle)/i))) {

		// Check if the redirection needs to happen for iPad
		var isUATablet = (config.tablet_redirection === TRUE || !!config.tablet_url) ? true : false;
		isUAMobile = false;
	}

	// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
	if ((!!isUATablet || !!isUAMobile) && !(isCookieSet || isSessionStorage)) {

		// Callback call
		if (config.beforeredirection_callback) {
			if (!config.beforeredirection_callback.call(this)) {
				return;
			}
		}
		
		var path_query = "";
		
		if(keep_path) { 
			path_query += document.location.pathname;
		}
		
		if (keep_query) {
			path_query += document.location.search;
		}
		
		if (isUATablet){
			document.location.href = mobile_protocol + "//" + tablet_host + path_query;
		} else if (isUAMobile) {
			document.location.href = mobile_protocol + "//" + mobile_host + path_query;
		}
		
	} 
};