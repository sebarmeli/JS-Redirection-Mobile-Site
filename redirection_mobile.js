/*!
* JS Redirection Mobile
*
* Developed by
* Sebastiano Armeli-Battana (@sebarmeli) - http://www.sebastianoarmelibattana.com
* Dual licensed under the MIT or GPL Version 3 licenses.
*/
/*
	Copyright (c) 2011 Sebastiano Armeli-Battana (http://www.sebastianoarmelibattana.com)

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
* This script will cover a basic scenario of full JS mobile redirection.
* The user will be redirected to the mobile version of the site (home page)
* if it's trying to access the site from a mobile device. This check is
* mainly done checking the User-Agent string. 
* The mobile URL will be obtained appending a prefix (default is "m") to 
* the hostname of the current URL. It's used a naked domain to avoid conflict with
* www.
* 
* In some cases the user needs to be redirected to the Desktop version of the site 
* from a mobile device. This happens when the user clicks on a link such as "Go to full site"
* or when there is a specific parameter in the querystring.
*
* In that case a new key/value in sessionStorage (for modern browsers) 
* will be set and until the user doesn't close browser window or tab it will access
* to the desktop version from a mobile device. There is a fallback for old browsers that
* don't support sessionStorage, and it will use a cookie. The cookie will expiry in one hour 
* (default value) or you configure the expiry time.
* 
* To use this function, you need to call it as SA.redirection_mobile(config);
* 	E.g. SA.redirection_mobile ({redirection_paramName : "modile_redirect", mobile_prefix : "mobile", cookie_hours : "2" })
* or
* 	E.g. SA.redirection_mobile ({mobile_url : "mobile.whatever.com/example", mobile_sheme : "https" })
* or
* 	E.g. SA.redirection_mobile ({mobile_prefix : "mobile", mobile_scheme : "https"})
* or
* 	E.g. SA.redirection_mobile ({mobile_prefix : "mobile", mobile_scheme : "https", redirection_paramName : "modile_redirect"})
* or
* 	E.g. SA.redirection_mobile ({mobile_url : "mobile.whatever.com/example", ipad_redirection : "true"})
* or
* 	E.g. SA.redirection_mobile ({{mobile_url : "mobile.whatever.com/example", beforeredirection_callback : (function(){alert('2')}) }})
*
*
* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site/
* @author Sebastiano Armeli-Battana
* @version 0.8
* @date 02/04/2011 
* 
*/
	
/*globals window,document, navigator, SA */
if (!window.SA) {window.SA = {};}

/*
* @param config object containing three properties:
*			- mobile_prefix : prefix appended to the hostname (such as "m" to redirect to "m.domain.com")
*			- mobile_url : mobile url to use for the redirection (such as "whatever.com" to redirect to "whatever.com" )
*			- mobile_scheme : url scheme (http/https) of the mobile site domain
*			- cookie_hours : number of hours the cookie needs to exist after redirection to desktop site
*			- redirection_paramName : parameter to pass in the querystring of the URL to avoid the redirection (the value must be equal to "false").
*				It's also the name of the item in the localStorage (or cookie name) to avoid mobile
*				redirection. Default value is "mobile_redirect". Eg: http://domain.com?mobile_redirect=false
*			- ipad_redirection : boolean value that enables/disables(default) the redirection for the iPad. - Default:false
*			- beforeredirection_callback : callback launched before the redirection happens
*/
SA.redirection_mobile = function(config) {

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
		TRUE = "true",

		// configuration object
		config = config || {};
	
		// parameter to pass in the URL to avoid the redirection
		redirection_param = config.redirection_paramName || "mobile_redirect",
		
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

		// Check if the UA is a mobile one (iphone, ipod, android, blackberry)
		isUAMobile =!!(agent.match(/(iPhone|iPod|blackberry|android|htc|kindle|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i));


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
	
	// iPad Check
	if (!!(agent.match(/(iPad)/i))) {

		// Check if the redirection needs to happen for iPad
		(config.ipad_redirection === TRUE) ? isUAMobile = true : isUAMobile = false;

	}


	// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
	if (isUAMobile && !(isCookieSet || isSessionStorage)) {
		
		// Callback call
		if (config.beforeredirection_callback) {
			config.beforeredirection_callback.call(this);
		}
		
		document.location.href = mobile_protocol + "//" + mobile_host;
	} 
};	