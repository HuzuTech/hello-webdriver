var webdriver = require('wd');
var fs = require('fs');
var assert = require('assert');

var driver = webdriver.remote();

desired = {
   browserName: 'iexplore'
}; 
driver.init(desired,function(sessionId, err){
	testHapiCMS(driver);
	//testiFrames(driver);
});
   

function setElementValue(selector, value, cb)
{
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

function testHapiCMS(browser){
    browser.get('https://hapi-cms-test.herokuapp.com/', function (err, url) {
		browser.elementByTagName("iframe", function(err, element){

if(err)console.log("err = "+err);
console.log(element);	

			browser.getTagName(element, function(err, name){

console.log('\ntag name:'+name);

				driver.frame(Number(element.toString()), function(err){
					if(err) console.log('error: '+err);
				     
					setElementValue("#Username", "owner", function(){
						setElementValue("#Password", "HuzuRocks!", function(){
							driver.elementByCss("#login-btn", function(err, element){
								element.click(function (err) {
									driver.frame(null, function(err){
										driver.waitForVisibleByCss("div.home", 2000, function(err){
											assert.ifError(err);
											driver.quit();
										});
									});
								});
							});
						});	
					});
				});
			});
		});
	});
}