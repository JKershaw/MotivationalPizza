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

	it("Then I am told I have no current tasks", function() {
		expect(browser.text("#no_current_tasks")).to.contain("You have no current tasks");
	});
});