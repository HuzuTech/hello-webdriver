webdriver = require "wd"
assert = require "assert"

rootURL = "https://hapi-cms-dev.herokuapp.com/"
driverOptions = 
	browserName : "phantomjs"
acceptableTimeout = 2000


describe "HAPI CMS", ->
	describe "homepage", ->
		it "should have a title", ->
			finished = false
			title = ""

			runs ->
				driver = webdriver.remote()
				driver.init driverOptions, (err, sessionid) -> 
					driver.get rootURL, (err) ->
						driver.title (err, value) ->
							title = value
							finished = true
							driver.quit()
			waitsFor(
				-> finished, 
				"say something", 
				acceptableTimeout)
			runs ->
				console.log  title
				expect(title).not.toBe("")

		it "should have a login control", ->
			finished = false
			frameExists = false

			runs ->
				driver = webdriver.remote()
				driver.init driverOptions, (err, sessionid) -> 
					driver.get rootURL, (err) ->
						driver.frame 0, (err) ->
							if(err) 
								console.log "Frame error #{err.message}"
							frameExists = !err
							driver.quit()
							finished = true
			waitsFor(
				-> finished,
				"not sure what this is for",
				acceptableTimeout)
			runs ->
				expect(frameExists).not.toBe(false)
