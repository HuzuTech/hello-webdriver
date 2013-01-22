var webdriver = require('wd');
var fs = require('fs');
var assert = require('assert');

var driver = webdriver.remote();

driver.init(function(sessionId, err){
	testHapiCMS(driver);
});

function testGoogle(driver){


	driver.get('https://www.google.com/', function(err, url){
		
		driver.elementByName("q", function(err, element){
			
			element.type('wtf', function(err){
				driver.elementByName('btnK', function(err, element){
					element.click(function(err){
						console.log('clicked');
						driver.elementByCssSelector('div.gsq_a', function(err, element){
							element.click(function(err){})
						});
						//driver.quit();
					});
				});

			});
		});
	});


}

function setElementValue(selector, value, cb)
{
	driver.elementByCss(selector, function(err, element){
		driver.type(element, value, function (err) {
			cb()
		});
	
	});
}

function testHapiCMS(browser){
	browser.get('https://hapi-cms-test.herokuapp.com/', function(err, url){
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