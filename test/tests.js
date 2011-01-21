/*
 * 
 * Mocks incapsulated in this config literal. There are mocks for document and for navigator.
 * 
 */
window.TEST ={
	
	config : {
		redirection_paramName : "mobile_redirect",
	
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
			host  : "domain.com",
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
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.redirection_paramName = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for iPhone not happening");
})

test ('AndroidRedirection()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.redirection_paramName = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockAndroidNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection for Android not happening");
})

test ('WWWRedirection()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.redirection_paramName = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://m.domain.com", "Redirection not happening");
})

test ('RedirectionTo.mobi()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.domain.mobi";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.mobi", "Redirection to www.domain.mobi not happening");
})

test ('RedirectionTo/m()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.domain.com/m";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/m", "Redirection to http://www.domain.com/m not happening");
})

test ('RedirectionTomobile.()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_prefix = "mobile";
	window.TEST.config.mobile_url = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://mobile.domain.com", "Redirection to  mobile.domain.com not happening");
})

test ('RedirectionToDifferentUrl()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "www.whatever.com/example";
	window.TEST.config.mobile_prefix = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.whatever.com/example", "Redirection to http://www.whatever.com/example not happening");
})

test ('RedirectionToHttpstUrl()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.config.mobile_url = "";
	window.TEST.config.mobile_scheme = "https";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "https://m.domain.com", "Redirection to https://m.domain.com not happening");
})

module("Redirection not happening");

test ('RedirectionFromMobileToStandardVersion()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.config.redirection_paramName = "";
	window.TEST.config.mobile_prefix = "mobile";
	window.TEST.config.mobile_url = "";
	window.TEST.config.mobile_scheme = "";
	window.TEST.mockDocument.cookie = "";
	window.TEST.mockDocument.referrer = "http://mobile.domain.com/test";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.sessionStorage.getItem("mobile_redirect") === "false", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromDesktop()', function() {
	window.TEST.mockDocument.location.host = "www.domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/page";
	window.TEST.config.redirection_paramName = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockFFDesktopNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/page", "Error in no redirection happening");
})

test ('NoRedirectionFromMobileBecauseOfSessionStorage()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://domain.com/home";
	window.TEST.config.redirection_paramName = "mobile_redirect";
	window.TEST.mockDocument.referrer = "http://www.domain.com/test";
	window.TEST.sessionStorage.setItem("mobile_redirect","false");
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	
	expect(1);
	ok (window.TEST.mockDocument.location.href === "http://domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobileBecauseOfCookie()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.config.redirection_paramName = "mobile_redirect";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = window.TEST.config.redirection_paramName;
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Error in no Redirection happening from mobile");
})

test ('NoRedirectionFromMobileBecauseOfParameter()', function() {
	window.TEST.mockDocument.location.host = "domain.com";
	window.TEST.mockDocument.location.href = "http://www.domain.com/home";
	window.TEST.mockDocument.location.search = "?mobile_redirect=false";
	window.TEST.config.redirection_paramName = "mobile_redirect";
	window.TEST.sessionStorage = undefined;
	window.TEST.mockDocument.cookie = "";
	SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	ok (window.TEST.mockDocument.location.href === "http://www.domain.com/home", "Error in no Redirection happening from mobile");
})




