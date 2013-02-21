/*
 * 
 * Mocks incapsulated in this config literal. There are mocks for document and for navigator.
 * 
 */
window.TEST ={
	
	config : {
		redirection_param : "mobile_redirect",
	
		mobile_prefix : "m",
		
		beforeredirection_callback : ""
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
			pathname : "",
			search : ""
		},
		
		cookie : "",
		
		referrer : ""
	},
	
	mockIphoneNavigator : {
		userAgent : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16"
	},
	
	mockIpadNavigator : {
		userAgent : "Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10"
	},
	
	mockAndroidNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 0.5; en-us) AppleWebKit/522+ (KHTML, like Gecko) Safari/41"
	},
	
	mockFFDesktopNavigator : {
		userAgent : "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.6) Gecko/20100629 Firefox/3.6 ( .NET CLR 3.5.30729)"
	},
	
	mockHTCdesireNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 2.2; es-es; HTC Desire HD 1.39.161.1 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
	},
	
	mockSamsungTabNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1	"
	},
	
	mockHtcNavigator : {
		userAgent : "HTC-3470/1.2 Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Tablet PC 1.7; .NET CLR 2.0.50727; InfoPath.2)"
	},

	mockAndroid4Navigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; SAMSUNG-SGH-I747 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
	},

	mockGTPNavigator : {
		userAgent : "Mozilla/5.0 (Linux; U; Android 3.2; en-us; GT-P7510 Build/HTJ85B) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/5"
	}
	
};


describe("using JS Redirection mobile", function(){

	it("should redirect to a mobile site if it's accessing the site from an Iphone", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.config.redirection_param = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.domain.com");
	});

	it("should redirect to a mobile site if it's accessing the site from an Android", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.config.redirection_param = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockAndroidNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.domain.com");
	});

	it("should redirect to a mobile site if it's accessing the site from an HTC", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.config.redirection_param = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHTCdesireNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.domain.com");
	});

	it("should redirect to a mobile site - <site>.mobi if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "www.domain.mobi";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.mobi");
	});

	it("should redirect to a mobile site - <site>.com/m if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "www.domain.com/m";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/m");
	});

	it("should redirect to a mobile site - mobile.<site>.com if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_prefix = "mobile";
		window.TEST.config.mobile_url = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://mobile.domain.com");
	});

	it("should redirect to a mobile site - www.whatever.com/example if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_prefix = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.whatever.com/example");
	});

	it("should redirect to a mobile site - https://m.domain.com if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "";
		window.TEST.config.mobile_scheme = "https";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://m.domain.com");
	});

	it("should redirect to a mobile site if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.search = "?id=111";
		window.TEST.mockDocument.location.pathname = "/mail/";
		window.TEST.config.mobile_scheme = "http";
		window.TEST.config.mobile_url = "m.domain.com";
		window.TEST.config.keep_path = true;
		window.TEST.config.keep_query = true;
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.domain.com/mail/?id=111");
	});

	it("should redirect to a mobile site if it's accessing the site from an iPad", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.search = "";
		window.TEST.mockDocument.location.pathname = "";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_redirection = "true";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://www.whatever.com/example");
	});

	it("should redirect to a mobile site if it's accessing the site from a Samsung Tablet", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_redirection = "true";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockSamsungTabNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://www.whatever.com/example");
	});

	it("should redirect to a mobile site if it's accessing the site from an Ipad and call a callback before redirecting", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_redirection = "true";
		window.TEST.config.beforeredirection_callback = (function(){return true ;});
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://www.whatever.com/example");
	});

	it("should redirect to a tablet site if it's accessing the site from an Ipad", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.config.mobile_url = "m.whatever.com";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_host = "tablet.whatever.com";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://tablet.whatever.com");
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://m.whatever.com");
	});

	it("should redirect to a mobile site keeping the path and the querystring if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.pathname = "/path1";
		window.TEST.mockDocument.location.search = "?a=b";
		window.TEST.config.mobile_url = "m.whatever.com";
		window.TEST.config.mobile_scheme = "";
		window.TEST.config.keep_path = true;
		window.TEST.config.keep_query = true;
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.whatever.com/path1?a=b");
	});

	it("should redirect to a mobile site keeping the path, querystring and referrer if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.pathname = "/path1";
		window.TEST.mockDocument.location.search = "?a=b";
		window.TEST.mockDocument.referrer = "http://google.com/sa?q=foo";
		window.TEST.config.mobile_url = "m.whatever.com";
		window.TEST.config.mobile_scheme = "";
		window.TEST.config.keep_path = true;
		window.TEST.config.keep_query = true;
		window.TEST.config.append_referrer = true;
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.whatever.com/path1?a=b&original_referrer=http%3A%2F%2Fgoogle.com%2Fsa%3Fq%3Dfoo");
	});

	it("should redirect to a mobile site keeping the path, querystring and referrer with a key of g if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.pathname = "/path1";
		window.TEST.mockDocument.location.search = "?a=b";
		window.TEST.mockDocument.referrer = "http://google.com/sa?q=foo";
		window.TEST.config.mobile_url = "m.whatever.com";
		window.TEST.config.mobile_scheme = "";
		window.TEST.config.keep_path = true;
		window.TEST.config.keep_query = true;
		window.TEST.config.append_referrer = true;
		window.TEST.config.append_referrer_key = "g";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.whatever.com/path1?a=b&g=http%3A%2F%2Fgoogle.com%2Fsa%3Fq%3Dfoo");
	});

	it("should redirect to a mobile site keeping the path and appending the referrer with a key of g if it's accessing the site from an iPhone", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.pathname = "/path1";
		window.TEST.mockDocument.location.search = "?a=b";
		window.TEST.mockDocument.referrer = "http://google.com/sa?q=foo";
		window.TEST.config.mobile_url = "m.whatever.com";
		window.TEST.config.mobile_scheme = "";
		window.TEST.config.keep_path = true;
		window.TEST.config.keep_query = false;
		window.TEST.config.append_referrer = true;
		window.TEST.config.append_referrer_key = "g";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockHtcNavigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://m.whatever.com/path1?g=http%3A%2F%2Fgoogle.com%2Fsa%3Fq%3Dfoo");
	});

	it("should redirect to a mobile site if it's accessing the site from an GTP", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.search = "";
		window.TEST.mockDocument.location.pathname = "";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_host = "";
		window.TEST.config.tablet_redirection = "true";
		window.TEST.config.keep_path = false;
		window.TEST.config.keep_query = false;
		window.TEST.config.append_referrer = false;
		window.TEST.config.append_referrer_key = "g";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockGTPNavigator, window.TEST.config);
		expect(window.TEST.mockDocument.location.href).toEqual("https://www.whatever.com/example");
	});

	it("should NOT redirect to a mobile site", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.config.redirection_param = "";
		window.TEST.config.mobile_prefix = "mobile";
		window.TEST.config.mobile_url = "";
		window.TEST.config.mobile_scheme = "";
		window.TEST.mockDocument.cookie = "";
		window.TEST.mockDocument.referrer = "http://mobile.domain.com/test";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		
		expect(window.TEST.sessionStorage.getItem("noredirection")).toEqual("false");
	});

	it("should NOT redirect to a mobile site", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/page";
		window.TEST.config.redirection_param = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockFFDesktopNavigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/page");
	});

	it("should NOT redirect to a mobile site from Android 4.0.4", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/page?mobile_redirect=false";
		window.TEST.config.redirection_param = "mobile_redirect";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockAndroid4Navigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/page?mobile_redirect=false");
	});

	it("should NOT redirect to a mobile site because of sessionStorage", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.mockDocument.location.href = "http://domain.com/home";
		window.TEST.config.redirection_param = "mobile_redirect";
		window.TEST.mockDocument.referrer = "http://www.domain.com/test";
		window.TEST.sessionStorage.setItem("mobile_redirect","false");

		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		
		expect(window.TEST.mockDocument.location.href).toEqual("http://domain.com/home");
	});

	it("should NOT redirect to a mobile site because of cookies", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/home";
		window.TEST.config.redirection_param = "mobile_redirect";
		window.TEST.sessionStorage = undefined;
		window.TEST.mockDocument.cookie = window.TEST.config.redirection_param;
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
	
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/home");
	});

	it("should NOT redirect to a mobile site because of parameters", function(){
		window.TEST.mockDocument.location.host = "domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/home";
		window.TEST.mockDocument.location.search = "?mobile_redirect=false";
		window.TEST.config.redirection_param = "mobile_redirect";
		window.TEST.sessionStorage = undefined;
		window.TEST.mockDocument.cookie = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator, window.TEST.config);
		
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/home");
	});

	it("should NOT redirect to a mobile site from an Ipad", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/home";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_redirection = "";
		window.TEST.config.redirection_param = "ss";
		window.TEST.config.tablet_host = "";
		window.TEST.sessionStorage = undefined;
		window.TEST.mockDocument.cookie = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
			
		expect(window.TEST.mockDocument.location.href).not.toEqual("https://www.whatever.com/example");
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/home");
	});

	it("should NOT redirect to a mobile site from an Ipad 2", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/home";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.tablet_redirection = "false";
		window.TEST.config.redirection_param = "ee";
		window.TEST.sessionStorage = undefined;
		window.TEST.mockDocument.cookie = "";
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIpadNavigator, window.TEST.config);
				
		expect(window.TEST.mockDocument.location.href).not.toEqual("https://www.whatever.com/example");
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/home");
	});

	it("should NOT redirect to a mobile site - callback() 1", function(){
		window.TEST.mockDocument.location.host = "http://www.domain.com/home";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.redirection_param = "aa";
		window.TEST.sessionStorage = undefined;
		window.TEST.mockDocument.cookie = "";
		window.TEST.config.beforeredirection_callback = (function(){return false;});
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
				
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/home");
	});

	it("should NOT redirect to a mobile site - callback() 1", function(){
		window.TEST.mockDocument.location.host = "www.domain.com";
		window.TEST.mockDocument.location.href = "http://www.domain.com/page";
		window.TEST.config.mobile_url = "www.whatever.com/example";
		window.TEST.config.mobile_scheme = "https";
		window.TEST.config.redirection_param = "bb";
		window.TEST.sessionStorage = undefined;
		window.TEST.mockDocument.cookie = "";
		window.TEST.config.beforeredirection_callback = (function(){var a = "hi";});
		SA.redirection_mobile(window.TEST.mockDocument, window.TEST, window.TEST.mockIphoneNavigator,  window.TEST.config);
				
		expect(window.TEST.mockDocument.location.href).toEqual("http://www.domain.com/page");
	});
});