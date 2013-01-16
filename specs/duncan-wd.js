var webdriver = require('wd');
var fs = require('fs');

var driver = webdriver.remote();

driver.init(function(sessionId, err){
	testHapiCMS(driver);
});

function testGoogle(browser){


	browser.get('https://www.google.com/', function(err, url){
		
		browser.elementByName("q", function(err, element){
			
			element.type('wtf', function(err){
				browser.elementByName('btnK', function(err, element){
					element.click(function(err){
						console.log('clicked');
						browser.elementByCssSelector('div.gsq_a', function(err, element){
							element.click(function(err){})
						});
						//browser.quit();
					});
				});

			});
		});
	});


}

function testHapiCMS(browser){
	browser.get('https://hapi-cms-test.herokuapp.com/', function(err, url){
			

			browser.elementByCss("footer", function(err, element){
if(err)console.log("err = "+err);
console.log(element);	
console.log(element["ELEMENT"]);
return;
				browser.getTagName(element, function(err, name){

console.log('\ntag name:'+name);

					browser.frame(element, function(err){
							if(err) console.log('error: '+err);
							browser.title(function(err, title){

console.log('\ntitle:'+title);
							});
					});

				});
				browser.text(element, function(err, text){ console.log(text);})
			});
	})
}