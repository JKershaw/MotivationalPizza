/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie');

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

var username = "TestUser1",
	password = "secret";

describe('Given I visit the sign up', function (done) {

	before(function (done) {
		browser.visit('/signup', done);
	});

	describe("Then I signup", function (done) {
		before(function (done) {
			browser.fill('#username', username);
			browser.fill('#password', password);
			browser.pressButton("#signup", done);
		});

		it("Then I am told I have signed up", function () {
			expect(browser.text("#info-box")).to.contain("Hi there, you've signed up.");
		});
	});
});