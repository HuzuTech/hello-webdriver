var webdriver = require('wd');
var driver; 

var browserOptions = {
	'firefox': {
			browserName: 'firefox'
		  , tags: ["helloworld","firefox"]
		  , name: "HelloWorld Test - Firefox"
	}
}

var acceptableDelay = 10000;

jasmine.DEFAULT_TIMEOUT_INTERVAL = acceptableDelay; 


describe("HelloWorld", function(){


	beforeEach(function(){
		driver = webdriver.remote();

		/*driver = webdriver.remote(
			  "ondemand.saucelabs.com"
			  , 80
			  , "huzutech"
			  , "895d210d-b875-4d30-b6ab-b6b6361b1e3e"
			);*/
	});

	afterEach(function(){
		driver.quit();
	});

	it("Should have an asynchronous test done the jasmine-node way ", function(done){
		driver.init(browserOptions, function(){ 
			driver.get('http://www.huzutech.com', function(){
				driver.title(function(err, title){
					expect(title).toBe("Virtual World Platform and Software | Huzutech Ltd");
					done();
				})
			});
		});
	});

	it("Should have an asynchronous test done the jasmine way", function(){
		var done, pageTitle;

		runs(function(){

			done = false;

			driver.init(browserOptions, function(){ 
				driver.get('http://www.huzutech.com', function(){
					driver.title(function(err, title){
						pageTitle = title;
						done = true;
					})
				});
			});
		});

		waitsFor(function(){
			return done;
		},"The test took too long", 10000);

		runs(function(){
			expect(pageTitle).not.toBeNull();
		})
	})

});