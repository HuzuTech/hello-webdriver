var webdriver = require('wd');
var assert = require('assert');

var driver = webdriver.remote();
var driverOptions = {
		browserName : "phantomjs"
}
driver.init(driverOptions, function(err, sessionID){
	testiFrames();
});

/*
	Utility functions
*/
function setElementValue(selector, value, cb)
{
	try{
		driver.elementByCss(selector, function(err, element){
			driver.type(element, value, function (err) {
				cb()
			});
		
		});
	}
	catch(err){
		console.log("Error setting value: "+err);
		driver.quit();
	}
}

/*
	The tests
*/
function testiFrames(){

	console.log("Testing iFrames");

	var frame1ref, frame2ref;

	console.log(driver);

	driver.get("http://localhost:3000/", function(err, url){


		driver.elementsByTagName("iframe", function(err, frames){

			console.log("Found "+frames.length+" frames");
			frame1ref = frames[0].value;

			driver.frame(0, function(err){

				if(err) console.log("Error switching frame: "+err);
				driver.elementByCssSelector("#btn1", function(err, element){
					if(err) console.log("Error finding button: "+err);
					element.click(function(err){
						if(err) console.log("Error clicking button: "+err);
						else console.log("clicked it");

						// get the output div 
						driver.elementByCssSelector("#txt1", function(err, thediv){
							thediv.getValue(function(err, value){
								assert.equal("WTF", value.toString());
								driver.quit();
							});
						});
						
					});
				});
			});
		});
	});
}







function testHapiCMS(){
	driver.get('https://hapi-cms-test.herokuapp.com/', function(err, url){

			//driver.elementByCssSelector("div.hzt-app-content iframe", function(err, element){
			driver.elementByCssSelector("div.hzt-app-content iframe", function(err, element){

console.log(element);

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
}