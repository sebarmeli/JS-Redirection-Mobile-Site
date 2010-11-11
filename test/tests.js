/*
 * 
 * Mocks incapsulated in this object literal. There are mocks for document and for navigator.
 * 
 */
window.TEST ={
	
	object : {
		param : "isStandardSite",
	
		mobile_prefix : "m"
	},
	
	sessionStorage : {	
		item : "",
		
		getItem : function(name) {
			return window.TEST.sessionStorage.name;
		},
		
		setItem : function(name, value) {
			window.TEST.sessionStorage.name = value;
		}	
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
		
		cookie : "",
		
		referrer : ""
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
	redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for iPhone not happening");
})

test ('AndroidRedirection()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "";
	redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockAndroidNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for Android not happening");
})

module("Redirection not happening");

test ('NoRedirectionFromDesktop()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "";
	redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockFFDesktopNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no redirection happening");
})

test ('NoRedirectionFromMobileBecauseOfSessionStorage()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "isStandardSite";
	window.TEST.sessionStorage.setItem("isStandardSite","true");
	redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.object);
	
	expect(1);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobileBecauseOfCookie()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "isStandardSite";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = window.TEST.object.param;
	redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobile()', function() {
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.object.param = "isStandardSite";
	window.TEST.mockDocument.cookie = "";
	window.TEST.mockDocument.referrer = "http://m.domain.com/test";
	redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.object);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})


