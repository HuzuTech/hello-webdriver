webdriver = require "wd"
assert = require "assert"

rootURL = "https://hapi-cms-dev.herokuapp.com/"
driverOptions = 
	browserName : "phantomjs"

driver = webdriver.remote()
driver.init driverOptions, (err, sessionid) -> 
	driver.get rootURL, (err) ->
		driver.title (err, title) ->
			console.log title
			driver.quit()