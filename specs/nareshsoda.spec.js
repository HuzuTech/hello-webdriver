var soda = require('soda')
  , assert = require('assert');

var browser = soda.createClient({
    host: 'localhost'
  , port: 4444
  , url: 'http://www.huzutech.com'
  , browser: 'firefox'
});

browser
  .chain
  .session()
  .open('/')
  .getTitle(function (title) {
      assert.ok(~title.indexOf("Virtual World Platform and Software | Huzutech Ltd"))
  })
  .end(function (err) {
      browser.testComplete(function () {
          console.log('done');
          if (err) throw err;
      });
  });