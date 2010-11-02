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
	 * In same case the user needs to be redirected to the Desktop version of 
	 * the site from a mobile device. To achieve that, a possible solution is 
	 * appending a parameter to the URL (default one is "isDesktopRedirection=true").
	 * In that case a cookie will be set up and until the cookie exists the user 
	 * will access to the desktop version from a mobile device (default expiry 
	 * time is one hour after he creation of the cookie) even without the 
	 * parameter appended.
     *	
	 * The function is attached to the window scope, mainly for testing purpose,
	 * but you can avoid that, creating an anonymous self-executing function.
	 *
	 * @param document
	 * @param navigator
	 * @param object containing two fields: param (parameter to be passed to avoid
	 *             mobile redirection), mobile_prefix (prefix appended to the 
	 *             hostname)
	 * @author Sebastiano Armeli-Battana
	 * @version 0.1 
	 * 
	 */
	
	/*globals window, redirection_mobile, document, navigator, location */
	window.redirection_mobile = function(document, navigator, object) {
		
		// Retrieve the User Agent of the browser
		var agent = navigator.userAgent.toLowerCase(),
		
		// param value or default value
		param = object.param || "isDesktopRedirection=true",
		
		//"m" is the default mobile hostname prefix 
		mobile_prefix = object.mobile_prefix || "m",
		
		// Retrieve the querystring 
		search = document.location.search,
		
		// Check if the UA is a mobile one
		isUAMobile = !!(agent.match(/iPhone/i) || agent.match(/iPod/i) || 
						agent.match(/blackberry/i) || agent.match(/android/i)),
		
		// Check if the Cookie has been set up
		isCookieSet = document.cookie ? 
						(document.cookie.indexOf(param) >= 0) :
						false,
			
		// Check that there is the parameter to redirect to desktop version
		isParameterSet = (search.indexOf(param) > 0);
		
		// Helper function
		var addTimeToDate = function(msec) {

			// Get the current date
			var exdate = new Date();
		
			// Add time to the date
			exdate.setTime(exdate.getTime() + msec);
			
			//Return the new Date
			return exdate;
			
		};
		
		// Check that User Agent is mobile, cookie is not set and parameter not present
		if (isUAMobile && !isCookieSet && !isParameterSet) {
		   document.location.href = document.location.protocol + "//" + mobile_prefix + 
										"."+ document.location.host;
		} 
		
		// Set the cookie in case the parameter is present
		else if (isParameterSet && isUAMobile && !isCookieSet) {
			document.cookie = param + ";expires="+
												addTimeToDate(3600*1000).toUTCString();
		}
		
	};	