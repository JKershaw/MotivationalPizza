/*jshint expr: true*/
var expect = require('chai').expect,
	assert = require("assert"),
	Browser = require('zombie'),
	user = new require('./util/User')();

require('chai').should();

var browser = new Browser({
	site: "http://localhost:3000"
});

describe('Given I am logged in', function (done) {

	before(function (done) {
		user.signup(browser, done);
	});

	describe('Then I enter details for a new task', function (done) {

		before(function (done) {
			browser.fill("#newDailyGoalName", "Build a rocket ship");
			browser.pressButton("#newDailyGoalSubmit", done);
		});

		it("Then I can see the new goal listed", function () {
			expect(browser.text("#dailyGoals")).to.contain("Build a rocket ship");
		});
	});
});