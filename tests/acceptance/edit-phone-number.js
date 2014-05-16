/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require("./util/User")(),
	tasks = new require("./util/Tasks")();

var browser = new Browser({
	site: "http://localhost:3000"
}),
	newPhoneNumber = "7976048640";

describe("Given I'm logged in", function (done) {

	before(function (done) {
		user.signup(browser, function () {
			done();
		});
	});

	describe("And I visit the home page", function (done) {
		before(function (done) {
			browser.visit('/', done);
		});

		describe("And I click the profile link", function (done) {
			before(function (done) {
				browser.clickLink('#view-profile', done);
			});

			it("Then I can see my profile information", function () {
				expect(browser.query('#profile-username')).to.exist;
				expect(browser.query('#profile-phonenumber')).to.exist;
			});

			describe("And I edit my phone number", function (done) {
				before(function (done) {
					browser.fill('#profile-phonenumber', newPhoneNumber);
					browser.pressButton("Save Profile", done);
				});

				it("Then I am told my details have been updated", function () {
					expect(browser.text('#info-box')).to.contain("Your details have been updated");
				});

				describe("And I click the profile link", function (done) {
					before(function (done) {
						browser.clickLink('#view-profile', done);
					});

					it("Then I can see my new number listed", function () {
						expect(browser.query('#profile-phonenumber[value="' + newPhoneNumber + '"]')).to.exist;
					});
				});
			});
		});
	});
});