/*
 * 
 * Mocks incapsulated in this object literal. There are mocks for document and for navigator.
 * 
 */
window.TEST ={
	
	object : {
		param : "isDesktopRedirection=true",
	
		mobile_prefix : "m"
	},
	
	mockDocument: {
		location : {
			hash :  "",
			host  : "domain.com" ,
			hostname : "domain.com",
			href : "http://domain.com/home",
			pathname : "/home",
			port : "",
			protocol : "http:",
			search : ""
		},
		
		cookie : ""
	},
	
	mockIphoneNavigator : {
		userAgent : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16"
	},
	
	mockAndroidNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 0.5; en-us) AppleWebKit/522+ (KHTML, like Gecko) Safari/41"
	},
	
	mockFFDesktopNavigator : {
		userAgent : "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.6) Gecko/20100629 Firefox/3.6 ( .NET CLR 3.5.30729)"
	}	
};

module("Redirection happening");
 
test ('iPhoneRedirection()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "";
	redirection_mobile(window.TEST.mockDocument, window.TEST.mockIphoneNavigator,  window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com/home", "Redirection for iPhone not happening");
})

test ('AndroidRedirection()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "";
	redirection_mobile(window.TEST.mockDocument, window.TEST.mockAndroidNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com/home", "Redirection for Android not happening");
})

module("Redirection not happening");

test ('NoRedirectionFromDesktop()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "";
	redirection_mobile(window.TEST.mockDocument, window.TEST.mockFFDesktopNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no redirection happening");
})

test ('NoRedirectionFromMobileBecauseOfParameter()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "isDesktopRedirection=true";
	window.TEST.mockDocument.location.search = "?" + window.TEST.object.param;
	redirection_mobile(window.TEST.mockDocument, window.TEST.mockIphoneNavigator, window.TEST.object);
	
	expect(2);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
	ok (window.TEST.mockDocument.cookie.indexOf(window.TEST.object.param) >= 0, "");
})

test ('NoRedirectionFromMobileBecauseOfCookie()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "isDesktopRedirection=true";
	window.TEST.mockDocument.cookie = window.TEST.object.param;
	redirection_mobile(window.TEST.mockDocument, window.TEST.mockIphoneNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})


