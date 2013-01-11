var webdriver = require('wd'); // require the webdriver node module 
var driver; 

// create an object describing the type of browser we want to run the test on
var browserOptions = {
	'firefox': {
			browserName: 'firefox'
		  , tags: ["helloworld","firefox"]
		  , name: "HelloWorld Test - Firefox"
	}
}

// set a default value in jasmine-node for an acceptable time to wait for a test to complete
var acceptableDelay = 10000; // 10 seconds
jasmine.DEFAULT_TIMEOUT_INTERVAL = acceptableDelay; 

// create a new group of Jasmine test using the describe function 
describe("HelloWorld", function(){

	// set up code to run before each test in this group is run
	beforeEach(function(){
		driver = webdriver.remote();

		/*driver = webdriver.remote(
			  "ondemand.saucelabs.com"
			  , 80
			  , "huzutech"
			  , "895d210d-b875-4d30-b6ab-b6b6361b1e3e"
			);*/
	});

	// tear down code to tidy things up after each test in this group is complete
	afterEach(function(){
		driver.quit();
	});

	/*
		Tests 
	*/

	// a simple helloworld test using the jasmine-node suport for asynchronous test (IE using the done() function)
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

	// a simple helloworld test using the standard Jasmine support for asynchronous tests.
	it("Should have an asynchronous test done the jasmine way", function(){
		var done, pageTitle;

		// the runs function describes the steps required to produce a result that can be tested 
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

		// the first waitsFor function is used to indicate the test script is complete
		waitsFor(function(){
			return done;
		},"The test took too long", acceptableDelay);

		// the second runs function describes the test assertion 
		runs(function(){
			expect(pageTitle).not.toBeNull();
		})
	})

});