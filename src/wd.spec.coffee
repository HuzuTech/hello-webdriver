webdriver = require "wd"
assert = require "assert"

rootURL = "https://hapi-cms-dev.herokuapp.com/"

driverOptions = 
	browserName : "firefox"

acceptableTimeout = 10000


# Test Fixtures
describe "HAPI CMS", ->
	describe "homepage", ->
		it "should accept valid login details", ->

			finished = false
			username = "owner"
			pazzwrd = "HuzuRocks!"
			loginComplete = false

			runs ->
				driver = webdriver.remote()
				driver.init driverOptions, (err, sessionid) -> 
					driver.get rootURL, (err) ->
						driver.frame 0, (err) ->
							setElementValueByCss driver, "#Username", username, ->
								setElementValueByCss driver, "#Password", pazzwrd, ->
									driver.elementByCss "#login-btn", (err, element) ->
										element.click (err) ->
											driver.frame null, ->
												driver.waitForVisibleByCss "div.home", acceptableTimeout,(err) ->
													loginComplete = true unless err
													finished = true
													driver.quit()

			waitsFor(
				-> finished,
				"login sequence to complete",
				acceptableTimeout
			)
			runs ->
				expect(loginComplete).toBe(true)

		it "should reject invalid login details", ->

			finished = false
			username = "ebeneezer"
			pazzwrd = "good"
			errorMessageVisible = false

			runs ->
				driver = webdriver.remote()
				driver.init driverOptions, (err, sessionid) -> 
					driver.get rootURL, (err) ->
						driver.frame 0, (err) ->
							setElementValueByCss driver, "#Username", username, ->
								setElementValueByCss driver, "#Password", pazzwrd, ->
									driver.elementByCss "#login-btn", (err, element) ->
										element.click (err) ->
											driver.waitForVisibleByCssSelector "#validation-message", acceptableTimeout, (err) ->
												driver.waitForVisibleByCssSelector "span.field-validation-error", acceptableTimeout, (err, validationError) ->
													errorMessageVisible = true unless err
													finished = true
													driver.quit()
			waitsFor(
				-> finished,
				"server to reject login attempt",
				acceptableTimeout
			)
			runs ->
				expect(errorMessageVisible).toBe(true)

# Helper methods
setElementValueByCss = (webDriver, cssSelector, value, callback) ->
	try
		webDriver.elementByCss(
			cssSelector, 
			(err, element) ->
				webDriver.type element, value, (err) -> callback()
			)
	catch exc 
		console.log "Error setting value of page element: #{exc.message}"
