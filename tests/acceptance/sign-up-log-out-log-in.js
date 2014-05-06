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

		it("Then I am told I am logged in", function () {
			expect(browser.text("#logged-in")).to.contain("You are logged in as " + username);
		});

		describe("The I log out", function (done) {
			before(function (done) {
				browser.clickLink("#log-out", done);
			});

			it("Then I am told I have logged out", function () {
				expect(browser.text("#info-box")).to.contain("Bye! You've now logged out.");
			});

			it("Then I am not told I am logged in", function () {
				expect(browser.text("#logged-in")).to.not.contain("You are logged in as " + username);
			});

			describe("Then I log in", function (done) {
				before(function (done) {
					browser.visit("/login", function () {

						browser.fill('#username', username);
						browser.fill('#password', password);
						browser.pressButton("#login", done);
					});
				});

				it("Then I am told I have logged in", function () {
					expect(browser.text("#info-box")).to.contain("Welcome back, you've logged in!");
				});

				it("Then I am told I am logged in", function () {
					expect(browser.text("#logged-in")).to.contain("You are logged in as " + username);
				});

				describe("The I log out", function (done) {
					before(function (done) {
						browser.clickLink("#log-out", done);
					});

					it("Then I am told I have logged out", function () {
						expect(browser.text("#info-box")).to.contain("Bye! You've now logged out.");
					});

					it("Then I am not told I am logged in", function () {
						expect(browser.text("#logged-in")).to.not.contain("You are logged in as " + username);
					});
				});
			});
		});
	});
});