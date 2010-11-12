/*globals window, redirection_mobile, document, navigator, location */
(function(window, document, navigator, object) {
	
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
		
			// Check if the UA is a mobile one
			isUAMobile = !!(agent.match(/iPhone/i) || agent.match(/iPod/i) || 
						agent.match(/blackberry/i) || agent.match(/android/i));
		
		// Check if the referrer was a mobile page (in that case we need to set a variable in 
		// the sessionStorage or in the cookie)
		if (document.referrer.indexOf(mobile_host) >= 0) {
			if (window.sessionStorage) {
				window.sessionStorage.setItem(param, "true");
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
	
}(window, document, navigator));