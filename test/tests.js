/*
 * 
 * Mocks incapsulated in this config literal. There are mocks for document and for navigator.
 * 
 */
window.TEST ={
	
	config : {
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
			protocol : "http:",
			href : "http://domain.com/test",
			host  : "domain.com"
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
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for iPhone not happening");
})

test ('AndroidRedirection()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockAndroidNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for Android not happening");
})

test ('WWWRedirection()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for Android not happening");
})

module("Redirection not happening");

test ('RedirectionFromMobileToStandardVersion()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.param = "";
	window.TEST.mockDocument.cookie = "";
	window.TEST.mockDocument.referrer = "http://m.domain.com/test";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.sessionStorage.getItem("isStandardSite") === "true", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromDesktop()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/page";
	window.TEST.config.param = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockFFDesktopNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/page", "Error in no redirection happening");
})

test ('NoRedirectionFromMobileBecauseOfSessionStorage()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.config.param = "isStandardSite";
	window.TEST.mockDocument.referrer = "http://www.domain.com/test";
	window.TEST.sessionStorage.setItem("isStandardSite","true");
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	
	expect(1);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobileBecauseOfCookie()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.config.param = "isStandardSite";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = window.TEST.config.param;
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Error in no Redirection happening from mobile");
})





