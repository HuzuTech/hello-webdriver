var webdriver = require('wd');
var fs = require('fs');
var assert = require('assert');

var driver = webdriver.remote();

desired = {
   browserName: 'chrome'
}; 
driver.init(desired,function(sessionId, err){
	testHapiCMS(driver);
	//testiFrames(driver);
});
   

function setElementValue(selector, value, cb){
	driver.elementByCss(selector, function(err, element){
		driver.type(element, value, function (err) {
			cb()
		});
	
	});
}

function testiFrames(browser){
	browser.get('http://localhost:3000/', function(err, url){
		browser.title(function(err, title){
			if(err) console.log(err);
			else console.log(title);
		});
	});
}

function testHapiCMS(browser) {
} then(functon () 
     return browser.get(''https://hapi-cms-test.herokuapp.com/'');
}).then(fucntion(){	 
	 return browser.elementByTagName("iframe");
     if(err)console.log("err = "+err);
     console.log(element);
}).then (fucntion(){
     return browser.getTagName(element);
     console.log('\ntag name:'+name);
}).then (function(){
	 driver.frame(Number(element.toString());
	 if(err) console.log('error: '+err);
}).then (function(){
	 setElementValue("#Username", "owner");
	 setElementValue("#Password", "HuzuRocks!");
	 return browser.elementByCss('#login-btn');
}).then (fucntion(el){
	 return browser.clickElement(el);
}).then (fucntion(){	 
	 driver.frame(null);
	 driver.waitForVisibleByCss("div.home", 2000);
	 assert.ifError;
}).fin(fucntion () {
     browser.quit ();
}).done();	 