	/*!
	 * JS Redirection Mobile
	 *
	 * Developed by
	 * Sebastiano Armeli-Battana (@sebarmeli) - http://sebarmeli.com
	 */	

	/*
	 * This script will cover a basic scenario of full JS mobile redirection.
	 * The user will be redirected to the mobile version of the site (home page)
	 * if it's trying to access the site from a mobile device. This check is
	 * mainly done checking the User-Agent string. 
	 * The mobile URL will be obtained appending a prefix (default is "m") to 
	 * the hostname of the current URL.
	 * 
	 * In some cases the user needs to be redirected to the Desktop version of the site 
	 * from a mobile device. To achieve that, a possible solution is checking "referrer".
	 * In that case a cookie or a new key/value in sessionStorage (for modern browsers) 
	 * will be set and until the user doesn't close browser window or tab it will access
	 * to the desktop version from a mobile device.
	 *
	 * The function is attached to the window scope, mainly for testing purpose, but to 
	 * avoid that, you can use "redirection_mobile_self" script that is using the default 
	 * "mobile_prefix" ("m") and the default parameter ("isStandardSite=true") and it's an 
	 * anonyimous self-executing function.
	 *
	 * @param document
	 * @param window
	 * @param navigator
	 * @param object containing two fields: param (parameter to be passed to avoid
	 *             mobile redirection), mobile_prefix (prefix appended to the 
	 *             hostname)
	 * @author Sebastiano Armeli-Battana
	 * @version 0.2 
	 * 
	 */
	
	/*globals window, redirection_mobile, document, navigator, location */
	window.redirection_mobile = function(document, window, navigator, object) {
		
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
			param = object.param || "isStandardSite",
		
			//"m" is the default mobile hostname prefix 
			mobile_prefix = object.mobile_prefix || "m",
		
			// Compose the mobile hostname
			mobile_host = mobile_prefix + "." + document.location.host,
		
			// Retrieve the querystring 
			search = document.location.search,
		
			// Check if the UA is a mobile one
			isUAMobile = !!(agent.match(/iPhone/i) || agent.match(/iPod/i) || 
						agent.match(/blackberry/i) || agent.match(/android/i));
		
		// Check if the referrer was a mobile page (in that case we need to set a variable in 
		// the sessionStorage or in the cookie)
		if (document.referrer.indexOf(mobile_host) >= 0) {
			if (window.sessionStorage) {
				window.sessionStorage.setItem(param, "true")
			} else {
				document.cookie = param + "=true;expires="+
													addTimeToDate(3600*1000).toUTCString();
			}
		}
		
		// Check if the sessionStorage contain the parameter
		var isSessionStorage = (window.sessionStorage) ? 
								(window.sessionStorage.getItem(param) === "true") :
								 false,
			
			// Check if the Cookie has been set up
			isCookieSet = document.cookie ? 
							(document.cookie.indexOf(param) >= 0) :
								false;
								
		// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
		if (isUAMobile && !(isCookieSet || isSessionStorage)) {
		   document.location.href = document.location.protocol + "//" + mobile_prefix + 
										"."+ document.location.host;
		} 
		
		
	};	