	/*!
	 * JS Redirection Mobile
	 *
	 * Developed by
	 * Sebastiano Armeli-Battana (@sebarmeli) - http://sebarmeli.com
	 * Release under the MIT licence
	 */	
	/*
	Copyright (c) 2010 Sebastiano Armeli-Battana (http://sebarmeli.com)
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
	 * @link http://github.com/sebarmeli/JS-Redirection-Mobile-Site/
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
	SA.redirection_mobile = function(config) {
		
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
			isUAMobile =!!(agent.match(/(iPhone|iPod|iPad|blackberry|android|htc|kindle|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|SIE|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone)/i));
		
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