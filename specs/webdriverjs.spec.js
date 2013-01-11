var webdriver = require('webdriverjs'); // require the webdriverjs node module 
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
var acceptableDelay = 50000; // 10 seconds


// create a new group of Jasmine test using the describe function 
describe("HelloWorld", function(){

	// set up code to run before each test in this group is run
	beforeEach(function(){
		driver = webdriver.remote();

		/*driver = webdriver.remote(
			  "ondemand.saucelabs.com"
			  , 80
			  , "*"
			  , "*"
			);*/
	});

	// tear down code to tidy things up after each test in this group is complete
	afterEach(function(){
		driver.end();
	});

	/*
		Tests 
	*/

	// a simple helloworld test using the jasmine-node suport for asynchronous test (IE using the done() function)
	it("Should have an asynchronous test done the jasmine-node way ", function(done){
		driver
			.init(browserOptions)
			.url('http://www.huzutech.com')
			.getTitle(function(title){
					console.log("Title = " + title);
					expect(title).toBe("Virtual World Platform and Software | Huzutech Ltd");
					done();
			});
	});
});
