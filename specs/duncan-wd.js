var webdriver = require('wd');
var fs = require('fs');
var assert = require('assert');

var driver = webdriver.remote();

driver.init(function(sessionId, err){
	testHapiCMS();
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

function testHapiCMS(){
	driver.get('https://hapi-cms-test.herokuapp.com/?whatthefuckisthis', function(err, url){
			driver.elementByCss(
				"div.hzt-app-content iframe", function(err, element){
				console.log("element toString "+element.toString());
				console.log(arguments);

console.log(element);

				driver.getTagName(element, function(err, name){

console.log('tag name:'+name);

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
				driver.text(element, function(err, text){ console.log(text);})
			});
	})
}