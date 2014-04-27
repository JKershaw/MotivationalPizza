/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require('assert'),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
		site: "http://localhost:3000"
	});

describe('Given I visit the home page', function(done) {

	before(function(done) {
		browser.visit('/', done);
	});

	it("Then I see the time now", function() {
		expect(browser.text()).to.contain("Sun");
	});
});