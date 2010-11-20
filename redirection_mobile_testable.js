	/*!
	* JS Redirection Mobile
	*
	* Copyright (c) 2010 Sebastiano Armeli-Battana (http://sebarmeli.com)
	* MIT Licensed: http://www.opensource.org/licenses/mit-license.php
	* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site/
	*/

	/* 
	* This version is exactly the same as redirection_mobile.js, but uses few arguments, such as "document", 
	* "window", "navigator" for testing purpose.
	* 
	* @author Sebastiano Armeli-Battana
	* @version 0.3 
	* 
	*/

	/*globals window,document, navigator, SA */
	if (!window.SA) {window.SA = {};}

	/*
	* @param config containing two fields: param (parameter to be passed to avoid
	*             mobile redirection), mobile_prefix (prefix appended to the 
	*             hostname), cookie_hours (number of hours cookie needs to exist after
	*			redirection to desktop site)
	*/
	SA.redirection_mobile = function(document, window, navigator, config) {
		
		// Helper function
		var addTimeToDate = function(msec) {

			// Get the current date
			var exdate = new Date();

			// Add time to the date
			exdate.setTime(exdate.getTime() + msec);

			//Return the new Date
			return exdate;

		};
					
		// Retrieve the User Agent of the browser
		var agent = navigator.userAgent.toLowerCase(),
		
			// param value or default value
			param = config.param || "isStandardSite",
			
			// Constant
			TRUE = "true",
		
			// "m" is the default mobile hostname prefix 
			mobile_prefix = config.mobile_prefix || "m",
			
			// URL host of incoming request
		    host = document.location.host,
		
			// Compose the mobile hostname
			mobile_host = mobile_prefix + "." + 
							(!!host.match(/^www\./i) ?
								host.substring(4) : 
									host),
			
			// Expiry hours for cookie
			cookie_hours = config.cookie_hours || 1,
		
			// Check if the UA is a mobile one (iphone, ipod, ipad, android, blackberry)
			isUAMobile = !!(agent.match(/iPhone/i) || agent.match(/iPod/i) || 
			              agent.match(/iPad/i) || agent.match(/blackberry/i) || 
						   agent.match(/android/i));
		
		// Check if the referrer was a mobile page of the site
		// (in that case we need to set a variable in the sessionStorage or in the cookie)
		if (document.referrer.indexOf(mobile_host) >= 0) {
			if (window.sessionStorage) {
				window.sessionStorage.setItem(param, TRUE);
			} else {
				document.cookie = param + "=" + TRUE + ";expires="+
													addTimeToDate(3600*1000*cookie_hours).toUTCString();
			}
		}
		
		// Check if the sessionStorage contain the parameter
		var isSessionStorage = (window.sessionStorage) ? 
								(window.sessionStorage.getItem(param) === TRUE) :
								 false,
			
			// Check if the Cookie has been set up
			isCookieSet = document.cookie ? 
							(document.cookie.indexOf(param) >= 0) :
								false;
								
		// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
		if (isUAMobile && !(isCookieSet || isSessionStorage)) {
		  document.location.href = document.location.protocol + "//" + mobile_host;
		} 
	};