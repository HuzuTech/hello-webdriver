var webdriver = require('wd');

var port = process.env.PORT || 9294;

var browserOptions, rootURL; 

if(port == 9294){
	//browser = webdriver.remote();
	browserOptions = {
		browserName : "phantomjs"
	}
	rootURL = "http://localhost:9294/"
}
else{
	//browser = webdriver.remote(); // connect to saucelabs
	browserOptions = {
		browserName : "chrome"
	}
	rootURL = "https://hapi-cms-dev.herokuapp.com/";
}

function loadCMS(next){
	driver = webdriver.remote();
	driver.init(browserOptions, function(err, sessionID){
		console.log("New browser session: "+sessionID);
		driver.get(rootURL, function(err){
			if(!err) console.log("CMS homepage loaded");
			next.apply(driver);
		});
	});
}


describe("HAPI CMS", function(){

	var value, finished, error;

	beforeEach(function(){
	});

	afterEach(function(){
	});

	it("should have a title", function(){
		
		runs(function() {
      		finished, error = false;
      		value = "";

      		browser = webdriver.remote();
			browser.init(browserOptions, function(err, sessionID){
	  			browser.get(rootURL, function(err){
	  				browser.title(function(err, title){
	  					value = title;
	  					finished = true;
	  					browser.quit();

	  				});
	  			});
      		});
    	});

	    waitsFor(function() {
	      return finished;
	    }, "The browser operation should have completed by now ", 2000);

	    runs(function() {
	    	console.log("value = "+value);
	      expect(value).toBe("Hapi CMS");
	    });

	});	

	it("should have a login control",function(){
		var loginFrame = false;

		runs(function(){
			finished = false;
			
			browser2 = webdriver.remote();
			browser2.init(browserOptions, function(err, sessionID){
	  			browser2.get(rootURL, function(err){
					browser2.elementsByTagName("iframe", function(err, frames){
						loginFrame = (frames.length > 0);
						finished = true;
						browser2.quit();
					});
				});
			});
		});

		waitsFor(function(){
			return finished;
		}, "The browser operation should have completed by now ", 2000);

		runs(function(){
			expect(loginFrame).toBe(true);
		});

	})

});
