/*
* JS Redirection Mobile
*
* Copyright (c) 2011-2012 Sebastiano Armeli-Battana (http://www.sebastianoarmelibattana.com)
*
* By Sebastiano Armeli-Battana (@sebarmeli) - http://www.sebastianoarmelibattana.com
* Licensed under the MIT license.
* https://github.com/sebarmeli/JS-Redirection-Mobile-Site/blob/master/MIT-LICENSE.txt
*
* @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site
* @author Sebastiano Armeli-Battana
* @date 29/10/2012
* @version 1.0.0
*
*/
	
/*globals window,document, navigator, SA */
if (!window.SA) {window.SA = {};}

SA.redirection_mobile = function(configuration) {

	// Helper function for adding time to the current date -> used by cookie
	var addTimeToDate = function(msec) {
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + msec);
		return exdate;
	};

	// Helper function for getting a value from a parameter in the querystring of a URL
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
		FALSE = "false",
		TRUE = "true",

		// configuration object
		config = configuration || {},
	
		// parameter to pass in the URL to avoid the redirection
		redirection_param = config.redirection_param || "mobile_redirect",
		
		// prefix appended to the hostname
		mobile_prefix = config.mobile_prefix || "m",
		
		// new url for the mobile site domain 
		mobile_url = config.mobile_url,
		
		// protocol for the mobile site domain 
		mobile_protocol = config.mobile_scheme ?
			config.mobile_scheme + ":" :
				document.location.protocol,
		
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
		
		//append referrer 
		append_referrer = config.append_referrer || false,
		append_referrer_key = config.append_referrer_key || "original_referrer",

		// new url for the tablet site 
		tablet_host = config.tablet_host || mobile_host,
		isUAMobile = false,
		isUATablet = false;

		// Check if the UA is a mobile one (regexp from http://detectmobilebrowsers.com/ (WURFL))
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0,4))) {
			isUAMobile = true;
		}	

	// Check if the referrer was a mobile page (probably the user clicked "Go to full site") or in the 
	// querystring there is a parameter to avoid the redirection such as "?noredireciton=true"
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

	// Check if the device is a Tablet such as iPad, Samsung Tab, Motorola Xoom or Amazon Kindle
	if (!!(agent.match(/(iPad|SCH-I|xoom|NOOK|silk|kindle|GT-P|touchpad|kindle|sch-t|viewpad|bolt|playbook|Nexus 7)/i))) {
		
		// Check if the redirection needs to happen for tablets
		isUATablet = (config.tablet_redirection === TRUE || !!config.tablet_host) ? true : false;
		isUAMobile = false;
	}

	// Check that User Agent is mobile, cookie is not set or value in the sessionStorage not present
	if ((isUATablet || isUAMobile) && !(isCookieSet || isSessionStorage)) {

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
		
		if (append_referrer && document.referrer) {
			if (path_query.indexOf('?') === -1) {
				path_query += "?";
			} else {
				path_query += "&";
			}
			path_query += append_referrer_key + "=" + encodeURIComponent(document.referrer);
		}
		
		if (isUATablet){
			document.location.href = mobile_protocol + "//" + tablet_host + path_query;
		} else if (isUAMobile) {
			document.location.href = mobile_protocol + "//" + mobile_host + path_query;
		}
		
	} 
};	