/*globals window, redirection_mobile, document, navigator, location */
(function(document, navigator, object) {
	
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
	
}(document, navigator));